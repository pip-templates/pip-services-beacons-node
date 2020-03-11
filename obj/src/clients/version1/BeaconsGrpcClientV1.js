"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../src/protos/settings_v1_pb');
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const BeaconsGrpcConverterV1_1 = require("./BeaconsGrpcConverterV1");
class BeaconsGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.BeaconsClient);
    }
    getBeacons(correlationId, filter, paging, callback) {
        let request = new messages.BeaconsPageRequest();
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'beacons.get_beacons');
        this.call('get_beacons', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeaconsPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getBeaconById(correlationId, beaconId, callback) {
        let request = new messages.BeaconIdRequest();
        request.setId(beaconId);
        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_id');
        this.call('get_beacon_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                : null;
            callback(err, result);
        });
    }
    getBeaconByUdi(correlationId, udi, callback) {
        let request = new messages.BeaconUdiRequest();
        request.setUdi(udi);
        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_udi');
        this.call('get_beacon_by_udi', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                : null;
            callback(err, result);
        });
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        let request = new messages.BeaconsPositionRequest();
        request.setUdis(udis);
        request.setSiteId(siteId);
        let timing = this.instrument(correlationId, 'beacons.calculate_position');
        this.call('calculate_position', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? response.getPosition()
                : null;
            callback(err, result);
        });
    }
    createBeacon(correlationId, beacon, callback) {
        let request = new messages.BeaconRequest();
        request.setBeacon(beacon);
        let timing = this.instrument(correlationId, 'beacons.create_beacon');
        this.call('create_beacon', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                : null;
            callback(err, result);
        });
    }
    updateBeacon(correlationId, beacon, callback) {
        let request = new messages.BeaconRequest();
        request.setBeacon(beacon);
        let timing = this.instrument(correlationId, 'beacons.update_beacon');
        this.call('update_beacon', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                : null;
            callback(err, result);
        });
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        let request = new messages.BeaconIdRequest();
        request.setId(beaconId);
        let timing = this.instrument(correlationId, 'beacons.delete_beacon_by_id');
        this.call('delete_beacon_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                : null;
            callback(err, result);
        });
    }
}
exports.BeaconsGrpcClientV1 = BeaconsGrpcClientV1;
//# sourceMappingURL=BeaconsGrpcClientV1.js.map