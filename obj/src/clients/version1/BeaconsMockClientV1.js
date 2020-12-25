"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsMockClientV1 = void 0;
/** @module clients */
/** @hidden */
let _ = require("lodash");
/** @hidden */
let async = require("async");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
class BeaconsMockClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString("id");
        let siteId = filter.getAsNullableString("site_id");
        let label = filter.getAsNullableString("label");
        let udi = filter.getAsNullableString("udi");
        let udis = filter.getAsObject("udis");
        if (_.isString(udis))
            udis = udis.split(",");
        if (!_.isArray(udis))
            udis = null;
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (label != null && item.label != label)
                return false;
            if (udi != null && item.udi != udi)
                return false;
            if (udis != null && _.indexOf(udis, item.udi) < 0)
                return false;
            return true;
        };
    }
    getBeacons(correlationId, filter, paging, callback) {
        let filterBeacons = this.composeFilter(filter);
        let beacons = _.filter(this._items, filterBeacons);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_3.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = beacons.length;
        if (skip > 0)
            beacons = _.slice(beacons, skip);
        beacons = _.take(beacons, take);
        let page = new pip_services3_commons_node_4.DataPage(beacons, total);
        callback(null, page);
    }
    getBeaconById(correlationId, beaconId, callback) {
        let beacons = this._items.filter((x) => {
            return x.id == beaconId;
        });
        let beacon = beacons.length > 0 ? beacons[0] : null;
        callback(null, beacon);
    }
    getBeaconByUdi(correlationId, udi, callback) {
        let beacons = this._items.filter((x) => {
            return x.udi == udi;
        });
        let beacon = beacons.length > 0 ? beacons[0] : null;
        callback(null, beacon);
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
                this.getBeacons(correlationId, pip_services3_commons_node_1.FilterParams.fromTuples("site_id", siteId, "udis", udis), null, (err, page) => {
                    beacons = page ? page.data : [];
                    callback(err);
                });
            },
            (callback) => {
                let lat = 0;
                let lng = 0;
                let count = 0;
                for (let beacon of beacons) {
                    if (beacon.center != null &&
                        beacon.center.type == "Point" &&
                        _.isArray(beacon.center.coordinates)) {
                        lng += beacon.center.coordinates[0];
                        lat += beacon.center.coordinates[1];
                        count += 1;
                    }
                }
                if (count > 0) {
                    position = {
                        type: "Point",
                        coordinates: [lng / count, lat / count],
                    };
                }
                callback();
            },
        ], (err) => {
            callback(err, err == null ? position : null);
        });
    }
    createBeacon(correlationId, beacon, callback) {
        if (beacon == null) {
            if (callback)
                callback(null, null);
            return;
        }
        beacon = _.clone(beacon);
        beacon.id = beacon.id || pip_services3_commons_node_2.IdGenerator.nextLong();
        this._items.push(beacon);
        if (callback)
            callback(null, beacon);
    }
    updateBeacon(correlationId, beacon, callback) {
        let index = this._items.map((x) => {
            return x.id;
        }).indexOf(beacon.id);
        if (index < 0) {
            callback(null, null);
            return;
        }
        beacon = _.clone(beacon);
        this._items[index] = beacon;
        if (callback)
            callback(null, beacon);
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        var index = this._items
            .map((x) => {
            return x.id;
        })
            .indexOf(beaconId);
        var item = this._items[index];
        if (index < 0) {
            callback(null, null);
            return;
        }
        this._items.splice(index, 1);
        if (callback)
            callback(null, item);
    }
}
exports.BeaconsMockClientV1 = BeaconsMockClientV1;
//# sourceMappingURL=BeaconsMockClientV1.js.map