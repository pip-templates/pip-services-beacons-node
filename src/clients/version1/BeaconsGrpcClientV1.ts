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

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        let request = new messages.BeaconsPageRequest();

        BeaconsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(BeaconsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'beacons.get_beacons');

        this.call('get_beacons',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeaconsPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }
    
    public getBeaconById(correlationId: string, beaconId: string, 
        callback: (err: any, beacon: BeaconV1) => void): void {
        let request = new messages.BeaconIdRequest();
        request.setId(beaconId);

        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_id');

        this.call('get_beacon_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                    : null;

                callback(err, result);
            }
        );        
    }
    
    public getBeaconByUdi(correlationId: string, udi: string, 
        callback: (err: any, beacon: BeaconV1) => void): void {
        let request = new messages.BeaconUdiRequest();
        request.setUdi(udi);

        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_udi');

        this.call('get_beacon_by_udi',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                    : null;

                callback(err, result);
            }
        );        
    }
    
    public calculatePosition(correlationId: string, siteId: string, udis: string[],
        callback: (err: any, position: any) => void): void {
        let request = new messages.BeaconsPositionRequest();
        request.setUdis(udis);
        request.setSiteId(siteId);

        let timing = this.instrument(correlationId, 'beacons.calculate_position');

        this.call('calculate_position',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? response.getPosition()
                    : null;

                callback(err, result);
            }
        );        
    }
    
    public createBeacon(correlationId: string, beacon: BeaconV1, 
        callback: (err: any, beacon: BeaconV1) => void): void {
        let request = new messages.BeaconRequest();
        request.setBeacon(beacon);

        let timing = this.instrument(correlationId, 'beacons.create_beacon');

        this.call('create_beacon',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                    : null;

                callback(err, result);
            }
        );        
    }
    
    public updateBeacon(correlationId: string, beacon: BeaconV1, 
        callback: (err: any, beacon: BeaconV1) => void): void {
        let request = new messages.BeaconRequest();
        request.setBeacon(beacon);

        let timing = this.instrument(correlationId, 'beacons.update_beacon');

        this.call('update_beacon',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                    : null;

                callback(err, result);
            }
        );        
    }
    
    public deleteBeaconById(correlationId: string, beaconId: string, 
        callback: (err: any, beacon: BeaconV1) => void): void {
        let request = new messages.BeaconIdRequest();
        request.setId(beaconId);

        let timing = this.instrument(correlationId, 'beacons.delete_beacon_by_id');

        this.call('delete_beacon_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = BeaconsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? BeaconsGrpcConverterV1.toBeacon(response.getBeacon())
                    : null;

                callback(err, result);
            }
        );        
    }
  
}