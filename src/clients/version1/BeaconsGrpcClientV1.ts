let _ = require('lodash');
let services = require('../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../src/protos/settings_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IBeaconsClientV1 } from './IBeaconsClientV1';
import { BeaconV1 } from '../../data/version1/BeaconV1';
import { BeaconsGrpcConverterV1 } from './BeaconsGrpcConverterV1';

export class BeaconsGrpcClientV1 extends GrpcClient implements IBeaconsClientV1 {
    
    public constructor() {
        super(services.BeaconsClient);
    }

    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        throw new Error("Method not implemented.");
    }
    
    getBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void {
        throw new Error("Method not implemented.");
    }
    
    getBeaconByUdi(correlationId: string, udi: string, callback: (err: any, beacon: BeaconV1) => void): void {
        throw new Error("Method not implemented.");
    }
    
    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void {
        throw new Error("Method not implemented.");
    }
    
    createBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void {
        throw new Error("Method not implemented.");
    }
    
    updateBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void {
        throw new Error("Method not implemented.");
    }
    
    deleteBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void {
        throw new Error("Method not implemented.");
    }
        
    public getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        let request = new messages.BeaconsPageRequest();

        BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'settings.get_section_ids');

        this.call('get_section_ids',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeaconIdPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        let request = new messages.BeaconsPageRequest();

        BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'settings.get_sections');

        this.call('get_sections',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeaconPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }
    
    public getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.BeaconsIdRequest();
        request.setId(id);

        let timing = this.instrument(correlationId, 'settings.get_section_by_id');

        this.call('get_section_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }

    public setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.BeaconsParamsRequest();
        request.setId(id);
        BeaconsGrpcConverterV1.setMap(request.getParametersMap(), parameters);

        let timing = this.instrument(correlationId, 'settings.set_section');

        this.call('set_section',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }

    public modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.BeaconsModifyParamsRequest();
        request.setId(id);
        BeaconsGrpcConverterV1.setMap(request.getUpdateParametersMap(), updateParams);
        BeaconsGrpcConverterV1.setMap(request.getIncrementParametersMap(), incrementParams);

        let timing = this.instrument(correlationId, 'settings.modify_section');

        this.call('modify_section',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(BeaconsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }
  
}