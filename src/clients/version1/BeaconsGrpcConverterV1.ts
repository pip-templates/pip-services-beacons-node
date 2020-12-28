/** @module clients */
/** @hidden */
let _ = require('lodash');
/** @hidden */
let messages = require('../../../../src/protos/beacons_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';


export class BeaconsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: BeaconsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        BeaconsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromPoint(point: any): any {
        if (point == null) return null;

        let obj = new messages.Point();
        obj.setType(point.type);
        obj.setCoordinatesList(point.coordinates);    

        return obj;
    }

    public static toPoint(obj: any): any {
        if (obj == null) return null;

        let point = {
            type: obj.getType(),
            coordinates: obj.getCoordinatesList()
        };

        return point;
    }

    public static fromBeacon(beacon: BeaconV1): any {
        if (beacon == null) return null;

        let obj = new messages.Beacon();

        obj.setId(beacon.id);
        obj.setSiteId(beacon.site_id);
        obj.setType(beacon.type);
        obj.setUdi(beacon.udi);
        obj.setType(beacon.type);
        obj.setLabel(beacon.label);
        let center = BeaconsGrpcConverterV1.fromPoint(beacon.center);
        obj.setCenter(center);
        obj.setRadius(beacon.radius);        

        return obj;
    }

    public static toBeacon(obj: any): BeaconV1 {
        if (obj == null) return null;

        let beacon: BeaconV1 = {
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

    public static fromBeaconsPage(page: DataPage<BeaconV1>): any {
        if (page == null) return null;

        let obj = new messages.BeaconsPage();

        obj.setTotal(page.total);
        let data = _.map(page.data, BeaconsGrpcConverterV1.fromBeacon);
        obj.setDataList(data);

        return obj;
    }

    public static toBeaconsPage(obj: any): DataPage<BeaconV1> {
        if (obj == null) return null;

        let data = _.map(obj.getDataList(), BeaconsGrpcConverterV1.toBeacon);
        let page: DataPage<BeaconV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }
}