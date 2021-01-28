"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsJsonSqlServerPersistence = void 0;
/** @module persistence */
/** @hidden */
const _ = require('lodash');
const pip_services3_sqlserver_node_1 = require("pip-services3-sqlserver-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class BeaconsJsonSqlServerPersistence extends pip_services3_sqlserver_node_1.IdentifiableJsonSqlServerPersistence {
    constructor() {
        super("beacons_json");
        this.ensureTable();
        this.autoCreateObject("ALTER TABLE [beacons_json] ADD [data_key] AS JSON_VALUE([data],'$.id')");
        this.ensureIndex('beacons_json_key', { data_key: 1 }, { unique: true });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("JSON_VALUE([data],'$.id')='" + id + "'");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("JSON_VALUE([data],'$.site_id')='" + siteId + "'");
        let tempIds = filter.getAsNullableString("ids");
        if (tempIds != null) {
            let ids = tempIds.split(",");
            filters.push("JSON_VALUE([data], '$.id') IN ('" + ids.join("','") + "')");
        }
        let udi = filter.getAsNullableString("udi");
        if (udi != null)
            filters.push("JSON_VALUE([data],'$.udi')='" + udi + "'");
        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("JSON_VALUE([data],'$.label')='" + label + "'");
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis))
            filters.push("JSON_VALUE([data], '$.udi') IN ('" + udis.join("','") + "')");
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE JSON_VALUE([data],'$.udi')='" + udi + "'";
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
exports.BeaconsJsonSqlServerPersistence = BeaconsJsonSqlServerPersistence;
//# sourceMappingURL=BeaconsJsonSqlServerPersistence.js.map