"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/beacon_v1_grpc_pb');
let messages = require('../../../../src/protos/beacon_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const BeaconsGrpcConverterV1_1 = require("../../clients/version1/BeaconsGrpcConverterV1");
class SettingsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.SettingsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-settings", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getBeacons(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getBeacons(correlationId, filter, paging, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let page = err == null ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromBeaconPage(result) : null;
            let response = new messages.SettingsSectionPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getBeaconById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        this._controller.getBeaconById(correlationId, id, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    getBeaconByUdi(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let udi = call.request.getUdi();
        this._controller.getBeaconByUdi(correlationId, udi, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    calculatePosition(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let udis = call.request.getUdis();
        let siteId = call.request.getSiteId();
        this._controller.calculatePosition(correlationId, udis, siteId, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    createBeacon(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let beacon = call.request.getBeacon();
        ;
        this._controller.createBeacon(correlationId, beacon, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    updateBeacon(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let beacon = call.request.getBeacon();
        ;
        this._controller.updateBeacon(correlationId, beacon, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    deleteBeaconById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        ;
        this._controller.deleteBeaconById(correlationId, id, (err, result) => {
            let error = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_beacons', null, this.getBeacons);
        this.registerMethod('get_beacon_by_id', null, this.getBeaconById);
        this.registerMethod('get_beacon_by_udi', null, this.getBeaconByUdi);
        this.registerMethod('calculate_position', null, this.calculatePosition);
        this.registerMethod('create_beacon', null, this.createBeacon);
        this.registerMethod('update_beacon', null, this.updateBeacon);
        this.registerMethod('delete_beacon_by_id', null, this.deleteBeaconById);
    }
}
exports.SettingsGrpcServiceV1 = SettingsGrpcServiceV1;
//# sourceMappingURL=BeaconsGrpcServiceV1.js.map