"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module logic */
/** @hidden */
const _ = require('lodash');
/** @hidden */
const async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const BeaconTypeV1_1 = require("../../src/data/version1/BeaconTypeV1");
const BeaconsCommandSet_1 = require("./BeaconsCommandSet");
class BeaconsController {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services3_commons_node_2.Descriptor('beacons', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new BeaconsCommandSet_1.BeaconsCommandSet(this);
        }
        return this._commandSet;
    }
    getBeacons(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getBeaconById(correlationId, beaconId, callback) {
        this._persistence.getOneById(correlationId, beaconId, callback);
    }
    getBeaconByUdi(correlationId, beaconId, callback) {
        this._persistence.getOneByUdi(correlationId, beaconId, callback);
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        let beacons;
        let position = null;
        if (udis == null || udis.length == 0) {
            callback(null, null);
            return;
        }
        async.series([
            (callback) => {
                this._persistence.getPageByFilter(correlationId, pip_services3_commons_node_1.FilterParams.fromTuples('site_id', siteId, 'udis', udis), null, (err, page) => {
                    beacons = page ? page.data : [];
                    callback(err);
                });
            },
            (callback) => {
                let lat = 0;
                let lng = 0;
                let count = 0;
                for (let beacon of beacons) {
                    if (beacon.center != null
                        && beacon.center.type == 'Point'
                        && _.isArray(beacon.center.coordinates)) {
                        lng += beacon.center.coordinates[0];
                        lat += beacon.center.coordinates[1];
                        count += 1;
                    }
                }
                if (count > 0) {
                    position = {
                        type: 'Point',
                        coordinates: [lng / count, lat / count]
                    };
                }
                callback();
            }
        ], (err) => { callback(err, err == null ? position : null); });
    }
    createBeacon(correlationId, beacon, callback) {
        beacon.id = beacon.id || pip_services3_commons_node_3.IdGenerator.nextLong();
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        this._persistence.create(correlationId, beacon, callback);
    }
    updateBeacon(correlationId, beacon, callback) {
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        this._persistence.update(correlationId, beacon, callback);
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        this._persistence.deleteById(correlationId, beaconId, callback);
    }
}
exports.BeaconsController = BeaconsController;
//# sourceMappingURL=BeaconsController.js.map