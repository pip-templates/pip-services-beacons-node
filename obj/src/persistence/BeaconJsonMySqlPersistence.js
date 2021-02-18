"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module persistence */
/** @hidden */
const _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mysql_node_1 = require("pip-services3-mysql-node");
class BeaconJsonMySqlPersistence extends pip_services3_mysql_node_1.IdentifiableJsonMySqlPersistence {
    constructor() {
        super('beacons_json');
        this.ensureTable();
        this.autoCreateObject('ALTER TABLE `beacons_json` ADD `data_id` VARCHAR(50) AS (JSON_UNQUOTE(`data`->"$.id"))');
        this.ensureIndex('beacons_json_id', { "data_id": 1 }, { unique: true });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("data->'$.id'='" + id + "'");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("data->'$.site_id'='" + siteId + "'");
        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("data->'$.label'='" + label + "'");
        let udi = filter.getAsNullableString('udi');
        if (udi != null)
            filters.push("data->'$.udi'='" + udi + "'");
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis))
            filters.push("data->'$.udi' IN ('" + udis.join("','") + "')");
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null, callback);
    }
    getCountByFilter(correlationId, filter, callback) {
        super.getCountByFilter(correlationId, this.composeFilter(filter), callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE data->'$.udi' = '" + udi + "'";
        this._client.query(query, null, (err, result) => {
            err = err || null;
            let item = result && result[0] ? result[0] || null : null;
            if (item == null)
                this._logger.trace(correlationId, "Cannot find beacon with udi=%s", this._tableName, udi);
            else
                this._logger.trace(correlationId, "Found beacon with udi=%s", this._tableName, udi);
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
}
exports.BeaconJsonMySqlPersistence = BeaconJsonMySqlPersistence;
//# sourceMappingURL=BeaconJsonMySqlPersistence.js.map