/** @module clients */
import { ConfigParams, DataPage, FilterParams, PagingParams } from 'pip-services3-commons-node';
import { RestClient } from 'pip-services3-rpc-node';
import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';
export declare class BeaconsRestClientV1 extends RestClient implements IBeaconsClientV1 {
    constructor(config?: any);
    configure(config: ConfigParams): void;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void;
    getBeaconByUdi(correlationId: string, udi: string, callback: (err: any, beacon: BeaconV1) => void): void;
    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    updateBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void;
}
