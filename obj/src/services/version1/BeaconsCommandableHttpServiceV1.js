"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsCommandableHttpServiceV1 = void 0;
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class BeaconsCommandableHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/beacons');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('beacons', 'controller', '*', '*', '1.0'));
    }
}
exports.BeaconsCommandableHttpServiceV1 = BeaconsCommandableHttpServiceV1;
//# sourceMappingURL=BeaconsCommandableHttpServiceV1.js.map