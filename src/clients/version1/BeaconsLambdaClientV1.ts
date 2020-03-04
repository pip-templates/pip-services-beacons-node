import { FilterParams, ConfigParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsLambdaClientV1 extends CommandableLambdaClient implements IBeaconsClientV1 {
    
    constructor(config?: any) {
        // Todo: 'v1/beacons' or just 'beacons' for lambda (like in SettingsLambdaClientV1.ts)?
        super('v1/beacons');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        this.callCommand(
            'get_beacons',
            correlationId,
            { filter: filter, paging: paging },
            callback
        );
    }

    public getBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        this.callCommand(
            'get_beacon_by_id',
            correlationId,
            {
                beacon_id: beaconId
            },
            callback
        );
    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        this.callCommand(
            'get_beacon_by_udi',
            correlationId,
            {
                udi: udi
            },
            callback
        );
    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {
        this.callCommand(
            'calculate_position',
            correlationId,
            {
                site_id: siteId,
                udis: udis
            },
            callback
        );    
    }

    public createBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {
        this.callCommand(
            'create_beacon',
            correlationId,
            {
                beacon: beacon
            },
            callback
        );
    }

    public updateBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {
        this.callCommand(
            'update_beacon',
            correlationId,
            {
                beacon: beacon
            },
            callback
        );    
    }

    public deleteBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        this.callCommand(
            'delete_beacon_by_id',
            correlationId,
            {
                beacon_id: beaconId
            },
            callback
        );
    }
}