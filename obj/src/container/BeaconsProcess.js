"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module container */
const build_1 = require("pip-services-datadog-node/obj/src/build");
const build_2 = require("pip-services-elasticsearch-node/obj/src/build");
const pip_services3_container_node_1 = require("pip-services3-container-node");
const build_3 = require("pip-services3-prometheus-node/obj/src/build");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const BeaconsServiceFactory_1 = require("../build/BeaconsServiceFactory");
class BeaconsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super('beacons', 'Beacons microservice');
        this._factories.add(new BeaconsServiceFactory_1.BeaconsServiceFactory());
        this._factories.add(new build_2.DefaultElasticSearchFactory());
        this._factories.add(new build_3.DefaultPrometheusFactory());
        this._factories.add(new build_1.DefaultDataDogFactory());
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory());
    }
}
exports.BeaconsProcess = BeaconsProcess;
//# sourceMappingURL=BeaconsProcess.js.map