/** @module persistence */
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMySqlPersistence } from 'pip-services3-mysql-node';
import { BeaconV1 } from '../data/version1';
import { IBeaconsPersistence } from './IBeaconsPersistence';
export declare class BeaconsMySqlPersistence extends IdentifiableMySqlPersistence<BeaconV1, string> implements IBeaconsPersistence {
    constructor();
    protected convertToPublic(value: any): any;
    protected convertFromPublic(value: any): any;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getOneByUdi(correlationId: string, udi: string, callback: (err: any, item: BeaconV1) => void): void;
}
