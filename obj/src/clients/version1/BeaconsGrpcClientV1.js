"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../src/protos/settings_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const BeaconsGrpcConverterV1_1 = require("./BeaconsGrpcConverterV1");
class BeaconsGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.BeaconsClient);
    }
    getBeacons(correlationId, filter, paging, callback) {
        throw new Error("Method not implemented.");
    }
    getBeaconById(correlationId, beaconId, callback) {
        throw new Error("Method not implemented.");
    }
    getBeaconByUdi(correlationId, udi, callback) {
        throw new Error("Method not implemented.");
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        throw new Error("Method not implemented.");
    }
    createBeacon(correlationId, beacon, callback) {
        throw new Error("Method not implemented.");
    }
    updateBeacon(correlationId, beacon, callback) {
        throw new Error("Method not implemented.");
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        throw new Error("Method not implemented.");
    }
    getSectionIds(correlationId, filter, paging, callback) {
        let request = new messages.BeaconsPageRequest();
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'settings.get_section_ids');
        this.call('get_section_ids', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeaconIdPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getSections(correlationId, filter, paging, callback) {
        let request = new messages.BeaconsPageRequest();
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'settings.get_sections');
        this.call('get_sections', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toBeaconPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getSectionById(correlationId, id, callback) {
        let request = new messages.BeaconsIdRequest();
        request.setId(id);
        let timing = this.instrument(correlationId, 'settings.get_section_by_id');
        this.call('get_section_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
    setSection(correlationId, id, parameters, callback) {
        let request = new messages.BeaconsParamsRequest();
        request.setId(id);
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        let timing = this.instrument(correlationId, 'settings.set_section');
        this.call('set_section', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        let request = new messages.BeaconsModifyParamsRequest();
        request.setId(id);
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getUpdateParametersMap(), updateParams);
        BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.setMap(request.getIncrementParametersMap(), incrementParams);
        let timing = this.instrument(correlationId, 'settings.modify_section');
        this.call('modify_section', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(BeaconsGrpcConverterV1_1.BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
}
exports.BeaconsGrpcClientV1 = BeaconsGrpcClientV1;
//# sourceMappingURL=BeaconsGrpcClientV1.js.map