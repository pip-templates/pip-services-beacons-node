import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { BeaconV1 } from '../../data/version1/BeaconV1';
export declare class BeaconsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromPoint(point: any): any;
    static toPoint(obj: any): any;
    static fromBeacon(beacon: BeaconV1): any;
    static toBeacon(obj: any): BeaconV1;
    static fromBeaconsPage(page: DataPage<BeaconV1>): any;
    static toBeaconsPage(obj: any): DataPage<BeaconV1>;
}
