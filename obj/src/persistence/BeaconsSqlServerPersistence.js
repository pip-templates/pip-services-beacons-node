"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsSqlServerPersistence = void 0;
/** @module persistence */
/** @hidden */
const _ = require('lodash');
const pip_services3_sqlserver_node_1 = require("pip-services3-sqlserver-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class BeaconsSqlServerPersistence extends pip_services3_sqlserver_node_1.IdentifiableSqlServerPersistence {
    constructor() {
        super("beacons");
        this.autoCreateObject("CREATE TABLE [beacons] ([id] VARCHAR(32), [site_id] VARCHAR(32), [type] VARCHAR(15), [udi] VARCHAR(25), [label] VARCHAR(50), [center] nvarchar(max), [radius] REAL)");
        this.ensureIndex("beacons_site_id", { site_id: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("[id]='" + id + "'");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("[site_id]='" + siteId + "'");
        let tempIds = filter.getAsNullableString("ids");
        if (tempIds != null) {
            let ids = tempIds.split(",");
            filters.push("[id] IN ('" + ids.join("','") + "')");
        }
        let udi = filter.getAsNullableString("udi");
        if (udi != null)
            filters.push("[udi]='" + udi + "'");
        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("[label]='" + label + "'");
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis))
            filters.push("[udi] IN ('" + udis.join("','") + "')");
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE [udi]=@1";
        let params = [udi];
        let request = this.createRequest(params);
        request.query(query, (err, result) => {
            err = err || null;
            let item = result && result.recordset ? result.recordset[0] || null : null;
            if (item == null)
                this._logger.trace(correlationId, "Nothing found from %s with udi = %s", this._tableName, udi);
            else
                this._logger.trace(correlationId, "Retrieved from %s with udi = %s", this._tableName, udi);
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
}
exports.BeaconsSqlServerPersistence = BeaconsSqlServerPersistence;
//# sourceMappingURL=BeaconsSqlServerPersistence.js.map