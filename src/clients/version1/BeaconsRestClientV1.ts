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
                filter: filter,
                paging: paging
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

    // TODO: implement all methods
    public getBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {

    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, beacon: BeaconV1) => void): void {

    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {

    }

    public createBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {

    }

    public updateBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {

    }

    public deleteBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {

    }
    
}