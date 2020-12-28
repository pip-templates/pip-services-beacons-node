/** @module clients */

import { ConfigParams, DataPage, FilterParams, PagingParams } from 'pip-services3-commons-node';

import { RestClient } from 'pip-services3-rpc-node';
import { BeaconV1 } from '../../data/version1/BeaconV1';

import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsRestClientV1 extends RestClient implements IBeaconsClientV1 {

    constructor(config?: any) {
        super();
        this._baseRoute = "v1/beacons";

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void) {

            let time = this.instrument(correlationId, "beacons.get_beacons")
            this.call(
                'get', 
                '/beacons',
                correlationId,
                {
                    beacons:{
                        filter: filter,
                        paging: paging
                    }
                    
                },
                null,
                (err, page) => {
                    time.endTiming();
                    if (err == null && page != null) {
                        callback(err, page)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {
            let time = this.instrument(correlationId, "beacons.calculate_position")
            this.call(
                'post', 
                '/beacons/position',
                correlationId,
                null,
                {
                    udis: udis,
                    site_id: siteId
                },
                (err, beacon) => {
                    time.endTiming();
                    if (err == null && beacon != null) {
                        callback(err, beacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public createBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {

            let time = this.instrument(correlationId, "beacons.create_beacon")
            this.call(
                'post', 
                '/beacons',
                correlationId,
                null,
                beacon,
                (err, createdBeacon) => {
                    time.endTiming();
                    if (err == null && createdBeacon != null) {
                        callback(err, createdBeacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public updateBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {
            let time = this.instrument(correlationId, "beacons.update_beacon")
            this.call(
                'post', 
                '/beacons',
                correlationId,
                null,
                beacon,
                (err, updatedBeacon) => {
                    time.endTiming();
                    if (err == null && updatedBeacon != null) {
                        callback(err, updatedBeacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public getBeaconById(correlationId: string, id: string,
        callback: (err: any, beacon: BeaconV1) => void): void {

            let time = this.instrument(correlationId, "beacons.get_beacon_by_id")
            this.call(
                'get', 
                '/beacons/' + id,
                correlationId,
                null,
                null,
                (err, beacon) => {
                    time.endTiming();
                    if (err == null && beacon != null) {
                        callback(err, beacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
            let time = this.instrument(correlationId, "beacons.get_beacon_by_udi")
            this.call(
                'get', 
                '/beacons/udi/' + udi,
                correlationId,
                null,
                null,
                (err, beacon) => {
                    time.endTiming();
                    if (err == null && beacon != null) {
                        callback(err, beacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }

    public deleteBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
            let time = this.instrument(correlationId, "beacons.delete_beacon_by_id")
            this.call(
                'delete', 
                '/beacons/' + beaconId,
                correlationId,
                null,
                null,
                (err, beacon) => {
                    time.endTiming();
                    if (err == null && beacon != null) {
                        callback(err, beacon)
                    } else {
                        callback(err, null);
                    }                    
                }
            );
    }
    
}