"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsCouchbasePersistence = void 0;
/** @module persistence */
/** @hidden */
const _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class BeaconsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('test', 'beacons');
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");
        // To search for a partial match:
        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null)
            console.log("(id LIKE '" + idStarts + "%')");
        filters.push("(id LIKE '" + idStarts + "%')");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("site_id='" + siteId + "'");
        let label = filter.getAsNullableString('label');
        if (label != null)
            filters.push("label='" + label + "'");
        let udi = filter.getAsNullableString('udi');
        if (udi != null)
            filters.push("udi='" + udi + "'");
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(',');
        if (_.isArray(udis)) {
            let f = "( udi IN [";
            udis.forEach(udi => { f += "'" + udi + "',"; });
            f = f.slice(0, -1) + "])";
            filters.push(f);
        }
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        this.getPageByFilter(correlationId, pip_services3_commons_node_1.FilterParams.fromTuples('udi', udi), null, (error, page) => {
            if (error)
                callback(error, null);
            callback(null, page.data[0]);
        });
    }
}
exports.BeaconsCouchbasePersistence = BeaconsCouchbasePersistence;
//# sourceMappingURL=BeaconsCouchbasePersistence.js.map