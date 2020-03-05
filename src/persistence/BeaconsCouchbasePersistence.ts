let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from './IBeaconsPersistence';

export class BeaconsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<BeaconV1, string> 
    implements IBeaconsPersistence {

    constructor() {
        super('test', 'beacons');
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        // To search for a partial match:
/*      let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null)
            filters.push("(id LIKE '" + idStarts + "%')"); */

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("site_id='" + siteId + "'");

        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("label='" + label + "'");

        let udi = filter.getAsNullableString('udi');
        if (udi != null)
            filters.push("udi='" + udi + "'"); 
        
        //Todo: check how 'in' works in couchbase
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis)){
            let f = "( udi IN [";
            udis.forEach(udi => { f += "'" + udi + "'," });
            f = f.slice(0, -1) + "])";
            filters.push(f);
        }

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    // Todo: test
    public getOneByUdi(correlationId: string, udi: string, callback: (err: any, item: BeaconV1) => void): void {
        this.getPageByFilter(correlationId, FilterParams.fromTuples('udi', udi ), null, (error, page) => {
            if(error)
                callback(error, null);
            callback(null, page.data[0]);
        });
    }
}