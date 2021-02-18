"use strict";
/** @module clients */
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class BeaconsRestClientV1 extends pip_services3_rpc_node_1.RestClient {
    constructor(config) {
        super();
        this._baseRoute = "v1/beacons";
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    configure(config) {
        super.configure(config);
    }
    getBeacons(correlationId, filter, paging, callback) {
        let time = this.instrument(correlationId, "beacons.get_beacons");
        this.call('get', '/beacons', correlationId, {
            beacons: {
                filter: filter,
                paging: paging
            }
        }, null, (err, page) => {
            time.endTiming();
            if (err == null && page != null) {
                callback(err, page);
            }
            else {
                callback(err, null);
            }
        });
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        let time = this.instrument(correlationId, "beacons.calculate_position");
        this.call('get', '/beacons/calculate_position/' + siteId + '/' + udis, correlationId, null, null, (err, beacon) => {
            time.endTiming();
            if (err == null && beacon != null) {
                callback(err, beacon);
            }
            else {
                callback(err, null);
            }
        });
    }
    createBeacon(correlationId, beacon, callback) {
        let time = this.instrument(correlationId, "beacons.create_beacon");
        this.call('post', '/beacons', correlationId, null, beacon, (err, createdBeacon) => {
            time.endTiming();
            if (err == null && createdBeacon != null) {
                callback(err, createdBeacon);
            }
            else {
                callback(err, null);
            }
        });
    }
    updateBeacon(correlationId, beacon, callback) {
        let time = this.instrument(correlationId, "beacons.update_beacon");
        this.call('put', '/beacons', correlationId, null, beacon, (err, updatedBeacon) => {
            time.endTiming();
            if (err == null && updatedBeacon != null) {
                callback(err, updatedBeacon);
            }
            else {
                callback(err, null);
            }
        });
    }
    getBeaconById(correlationId, id, callback) {
        let time = this.instrument(correlationId, "beacons.get_beacon_by_id");
        this.call('get', '/beacons/' + id, correlationId, null, null, (err, beacon) => {
            time.endTiming();
            if (err == null && beacon != null && beacon != 'null') {
                callback(err, beacon);
            }
            else {
                callback(err, null);
            }
        });
    }
    getBeaconByUdi(correlationId, udi, callback) {
        let time = this.instrument(correlationId, "beacons.get_beacon_by_udi");
        this.call('get', '/beacons/udi/' + udi, correlationId, null, null, (err, beacon) => {
            time.endTiming();
            if (err == null && beacon != null) {
                callback(err, beacon);
            }
            else {
                callback(err, null);
            }
        });
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        let time = this.instrument(correlationId, "beacons.delete_beacon_by_id");
        this.call('delete', '/beacons/' + beaconId, correlationId, null, null, (err, beacon) => {
            time.endTiming();
            if (err == null && beacon != null) {
                callback(err, beacon);
            }
            else {
                callback(err, null);
            }
        });
    }
}
exports.BeaconsRestClientV1 = BeaconsRestClientV1;
//# sourceMappingURL=BeaconsRestClientV1.js.map