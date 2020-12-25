/** @module persistence */

/** @hidden */
const _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IdentifiableMySqlPersistence } from 'pip-services3-mysql-node';
import { BeaconV1 } from '../data/version1';
import { IBeaconsPersistence } from './IBeaconsPersistence';

export class BeaconsMySqlPersistence extends IdentifiableMySqlPersistence<BeaconV1, string> 
    implements IBeaconsPersistence {
    
    public constructor() {
        super('beacons');
        this.autoCreateObject("CREATE TABLE beacons (id VARCHAR(32), site_id VARCHAR(32), type VARCHAR(15), udi VARCHAR(25), label VARCHAR(50), center JSON, radius REAL)");
        this.ensureIndex("beacons_site_id", { site_id: 1 });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
      
        let filters = [];
  
        let id = filter.getAsNullableString('id');
            if (id != null)
                filters.push("id='" + id + "'");
  
        let siteId = filter.getAsNullableString('site_id');
            if (siteId != null) 
                filters.push("site_id='" + siteId + "'");
  
        let tempIds = filter.getAsNullableString("ids");
        if (tempIds != null) {
            let ids = tempIds.split(",");
            filters.push("id IN ('" + ids.join("','") + "')");
        }
  
        let udi = filter.getAsNullableString("udi");
        if (udi != null)
            filters.push("udi='" + udi + "'");
  
        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("label='" + label + "'");
      
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis))
            filters.push("udi IN ('" + udis.join("','") + "')");
  
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
  
   public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
     callback: (err: any, page: DataPage<BeaconV1>) => void): void {
         super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null, callback);
   }

    public getOneByUdi(correlationId: string, udi: string,
      callback: (err: any, item: BeaconV1) => void): void {
        
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE udi=" + udi;

        this._client.query(query, (err, result) => {
            err = err || null;

            let item = result && result[0] ? result[0] || null : null; 

            if (item == null)
                this._logger.trace(correlationId, "Nothing found from %s with udi = %s", this._tableName, udi);
            else
                this._logger.trace(correlationId, "Retrieved from %s with udi = %s", this._tableName, udi);

            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
}