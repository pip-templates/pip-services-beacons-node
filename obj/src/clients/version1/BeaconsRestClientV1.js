"use strict";
/** @module clients */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsRestClientV1 = void 0;
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
            filter: filter,
            paging: paging
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
    // TODO: implement all methods
    getBeaconById(correlationId, beaconId, callback) {
    }
    getBeaconByUdi(correlationId, udi, callback) {
    }
    calculatePosition(correlationId, siteId, udis, callback) {
    }
    createBeacon(correlationId, beacon, callback) {
    }
    updateBeacon(correlationId, beacon, callback) {
    }
    deleteBeaconById(correlationId, beaconId, callback) {
    }
}
exports.BeaconsRestClientV1 = BeaconsRestClientV1;
//# sourceMappingURL=BeaconsRestClientV1.js.map