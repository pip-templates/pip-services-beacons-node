"use strict";
/** @module clients */
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class BeaconsCommandableGrpcClientV1 extends pip_services3_grpc_node_1.CommandableGrpcClient {
    constructor(config) {
        super('v1.beacons');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getBeacons(correlationId, filter, paging, callback) {
        this.callCommand('get_beacons', correlationId, { filter: filter, paging: paging }, callback);
    }
    getBeaconById(correlationId, beaconId, callback) {
        this.callCommand('get_beacon_by_id', correlationId, {
            beacon_id: beaconId
        }, callback);
    }
    getBeaconByUdi(correlationId, udi, callback) {
        this.callCommand('get_beacon_by_udi', correlationId, {
            udi: udi
        }, callback);
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        this.callCommand('calculate_position', correlationId, {
            site_id: siteId,
            udis: udis
        }, callback);
    }
    createBeacon(correlationId, beacon, callback) {
        this.callCommand('create_beacon', correlationId, {
            beacon: beacon
        }, callback);
    }
    updateBeacon(correlationId, beacon, callback) {
        this.callCommand('update_beacon', correlationId, {
            beacon: beacon
        }, callback);
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        this.callCommand('delete_beacon_by_id', correlationId, {
            beacon_id: beaconId
        }, callback);
    }
}
exports.BeaconsCommandableGrpcClientV1 = BeaconsCommandableGrpcClientV1;
//# sourceMappingURL=BeaconsCommandableGrpcClientV1.js.map