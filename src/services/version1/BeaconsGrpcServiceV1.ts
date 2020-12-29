/** @module services */
/** @hidden */
let _ = require('lodash');
/** @hidden */
let services = require('../../../../src/protos/beacons_v1_grpc_pb');
/** @hidden */
let messages = require('../../../../src/protos/beacons_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { IBeaconsController } from '../../logic/IBeaconsController';
import { BeaconsGrpcConverterV1 } from '../../clients/version1/BeaconsGrpcConverterV1';

export class BeaconsGrpcServiceV1 extends GrpcService {
    private _controller: IBeaconsController;
	
    public constructor() {
        super(services.BeaconsService);
        this._dependencyResolver.put('controller', new Descriptor("beacons", "controller", "*", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IBeaconsController>('controller');
    }

    private getBeacons(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        BeaconsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = BeaconsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getBeacons(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let page = err == null ? BeaconsGrpcConverterV1.fromBeaconsPage(result) : null;

                let response = new messages.BeaconsPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getBeaconById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getBeaconId();

        this._controller.getBeaconById(
            correlationId,
            id,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let beacon = BeaconsGrpcConverterV1.fromBeacon(result);

                let response = new messages.BeaconReply();
                response.setError(error);
                response.setBeacon(beacon)

                callback(err, response);
            }
        );
    }

    private getBeaconByUdi(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let udi = call.request.getUdi();

        this._controller.getBeaconByUdi(
            correlationId,
            udi,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let beacon = BeaconsGrpcConverterV1.fromBeacon(result);

                let response = new messages.BeaconReply();
                response.setError(error);
                response.setBeacon(beacon)
                
                callback(err, response);
            }
        );
    }

    private calculatePosition(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let siteId = call.request.getSiteId();
        let udis = call.request.getUdisList();

        this._controller.calculatePosition(
            correlationId,
            siteId,
            udis,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);

                let response = new messages.BeaconsPositionReply();

                result=BeaconsGrpcConverterV1.fromPoint(result);

                response.setError(error);
                response.setPosition(result);

                callback(err, response);
            }
        );
    }

    private createBeacon(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let beacon = call.request.getBeacon();;

        beacon = BeaconsGrpcConverterV1.toBeacon(beacon);

        this._controller.createBeacon(
            correlationId,
            beacon,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let beacon = BeaconsGrpcConverterV1.fromBeacon(result);

                let response = new messages.BeaconReply();
                response.setError(error);
                response.setBeacon(beacon)
                
                callback(err, response);
                
            }
        );
    }

    private updateBeacon(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let beacon = call.request.getBeacon();

        beacon = BeaconsGrpcConverterV1.toBeacon(beacon);

        this._controller.updateBeacon(
            correlationId,
            beacon,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let beacon = BeaconsGrpcConverterV1.fromBeacon(result);

                let response = new messages.BeaconReply();
                response.setError(error);
                response.setBeacon(beacon)
                
                callback(err, response);
            }
        );
    }

    private deleteBeaconById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getBeaconId();;

        this._controller.deleteBeaconById(
            correlationId,
            id,
            (err, result) => {
                let error = BeaconsGrpcConverterV1.fromError(err);
                let beacon = BeaconsGrpcConverterV1.fromBeacon(result);

                let response = new messages.BeaconReply();
                response.setError(error);
                response.setBeacon(beacon)
                
                callback(err, response);
            }
        );
    }

    public register() {
        this.registerMethod(
            'get_beacons', 
            null,
            this.getBeacons
        );

        this.registerMethod(
            'get_beacon_by_id', 
            null,
            this.getBeaconById
        );

        this.registerMethod(
            'get_beacon_by_udi', 
            null,
            this.getBeaconByUdi
        );

        this.registerMethod(
            'calculate_position', 
            null,
            this.calculatePosition
        );

        this.registerMethod(
            'create_beacon', 
            null,
            this.createBeacon
        );

        this.registerMethod(
            'update_beacon', 
            null,
            this.updateBeacon
        );

        this.registerMethod(
            'delete_beacon_by_id', 
            null,
            this.deleteBeaconById
        );

    }
}