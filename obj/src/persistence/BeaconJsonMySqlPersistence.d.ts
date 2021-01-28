import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableJsonMySqlPersistence } from 'pip-services3-mysql-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from './IBeaconsPersistence';
export declare class BeaconJsonMySqlPersistence extends IdentifiableJsonMySqlPersistence<BeaconV1, string> implements IBeaconsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getCountByFilter(correlationId: string, filter: FilterParams, callback: (err: any, count: number) => void): void;
    getOneByUdi(correlationId: string, udi: string, callback: (err: any, item: BeaconV1) => void): void;
}
