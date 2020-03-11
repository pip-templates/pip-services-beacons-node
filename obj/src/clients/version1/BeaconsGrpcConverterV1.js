"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/beacons_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
// Todo: why isn't this part of pip-services-grpc?
class BeaconsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_2.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        BeaconsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: BeaconsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_3.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        BeaconsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_node_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromPoint(point) {
        if (point == null)
            return null;
        let obj = new messages.Point();
        obj.setType(point.type);
        obj.setCoordinatesList(point.coordinates);
        return obj;
    }
    static toPoint(obj) {
        if (obj == null)
            return null;
        let point = {
            type: obj.getType(),
            coordinates: obj.getCoordinatesList()
        };
        return point;
    }
    static fromBeacon(beacon) {
        if (beacon == null)
            return null;
        let obj = new messages.Beacon();
        obj.setId(beacon.id);
        obj.setSiteId(beacon.site_id);
        obj.setType(beacon.type);
        obj.setUdi(beacon.udi);
        obj.setType(beacon.type);
        obj.setLabel(beacon.label);
        let center = BeaconsGrpcConverterV1.fromPoint(beacon.center);
        obj.setCenter(center); //Todo: is this right? Maybe: BeaconsGrpcConverterV1.setMap(obj.getParametersMap(), beacon.center); ?
        obj.setRadius(beacon.radius);
        return obj;
    }
    static toBeacon(obj) {
        if (obj == null)
            return null;
        let beacon = {
            id: obj.getId(),
            site_id: obj.getSiteId(),
            type: obj.getType(),
            udi: obj.getUdi(),
            label: obj.getLabel(),
            center: BeaconsGrpcConverterV1.toPoint(obj.getCenter()),
            radius: obj.getRadius()
        };
        return beacon;
    }
    static fromBeaconsPage(page) {
        if (page == null)
            return null;
        let obj = new messages.BeaconsPage();
        obj.setTotal(page.total);
        let data = _.map(page.data, BeaconsGrpcConverterV1.fromBeacon);
        obj.setDataList(data);
        return obj;
    }
    static toBeaconsPage(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj.getDataList(), BeaconsGrpcConverterV1.toBeacon);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.BeaconsGrpcConverterV1 = BeaconsGrpcConverterV1;
//# sourceMappingURL=BeaconsGrpcConverterV1.js.map