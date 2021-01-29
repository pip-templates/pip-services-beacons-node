"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsServiceFactory = void 0;
/** @module build */
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const BeaconsMemoryPersistence_1 = require("../persistence/BeaconsMemoryPersistence");
const BeaconsFilePersistence_1 = require("../persistence/BeaconsFilePersistence");
const BeaconsMongoDbPersistence_1 = require("../persistence/BeaconsMongoDbPersistence");
const BeaconsCouchbasePersistence_1 = require("../persistence/BeaconsCouchbasePersistence");
const BeaconsPostgresPersistence_1 = require("../persistence/BeaconsPostgresPersistence");
const BeaconsJsonPostgresPersistence_1 = require("../persistence/BeaconsJsonPostgresPersistence");
const BeaconsMySqlPersistence_1 = require("../persistence/BeaconsMySqlPersistence");
const BeaconJsonMySqlPersistence_1 = require("../persistence/BeaconJsonMySqlPersistence");
const BeaconsSqlServerPersistence_1 = require("../persistence/BeaconsSqlServerPersistence");
const BeaconsJsonSqlServerPersistence_1 = require("../persistence/BeaconsJsonSqlServerPersistence");
const BeaconsController_1 = require("../logic/BeaconsController");
const BeaconsCommandableHttpServiceV1_1 = require("../services/version1/BeaconsCommandableHttpServiceV1");
const BeaconsCommandableGrpcServiceV1_1 = require("../services/version1/BeaconsCommandableGrpcServiceV1");
const BeaconsGrpcServiceV1_1 = require("../services/version1/BeaconsGrpcServiceV1");
const BeaconsRestServiceV1_1 = require("../services/version1/BeaconsRestServiceV1");
class BeaconsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsServiceFactory.MemoryPersistenceDescriptor, BeaconsMemoryPersistence_1.BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePersistenceDescriptor, BeaconsFilePersistence_1.BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPersistenceDescriptor, BeaconsMongoDbPersistence_1.BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.CouchbasePersistenceDescriptor, BeaconsCouchbasePersistence_1.BeaconsCouchbasePersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsPostgresPersistence, BeaconsPostgresPersistence_1.BeaconsPostgresPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsJsonPostgresPersistence, BeaconsJsonPostgresPersistence_1.BeaconsJsonPostgresPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsMySqlPersistence, BeaconsMySqlPersistence_1.BeaconsMySqlPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconJsonMySqlPersistence, BeaconJsonMySqlPersistence_1.BeaconJsonMySqlPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsSqlServerPersistence, BeaconsSqlServerPersistence_1.BeaconsSqlServerPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsJsonSqlServerPersistence, BeaconsJsonSqlServerPersistence_1.BeaconsJsonSqlServerPersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController_1.BeaconsController);
        this.registerAsType(BeaconsServiceFactory.CommandableHttpServiceV1Descriptor, BeaconsCommandableHttpServiceV1_1.BeaconsCommandableHttpServiceV1);
        this.registerAsType(BeaconsServiceFactory.CommandableGrpcServiceV1Descriptor, BeaconsCommandableGrpcServiceV1_1.BeaconsCommandableGrpcServiceV1);
        this.registerAsType(BeaconsServiceFactory.GrpcServiceV1Descriptor, BeaconsGrpcServiceV1_1.BeaconsGrpcServiceV1);
        this.registerAsType(BeaconsServiceFactory.RestServiceDescriptor, BeaconsRestServiceV1_1.BeaconsRestServiceV1);
    }
}
exports.BeaconsServiceFactory = BeaconsServiceFactory;
BeaconsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'memory', '*', '1.0');
BeaconsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'file', '*', '1.0');
BeaconsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'mongodb', '*', '1.0');
BeaconsServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'couchbase', '*', '1.0');
BeaconsServiceFactory.BeaconsPostgresPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'postgres', '*', '1.0');
BeaconsServiceFactory.BeaconsJsonPostgresPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'json-postgres', '*', '1.0');
BeaconsServiceFactory.BeaconsMySqlPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'mysql', '*', '1.0');
BeaconsServiceFactory.BeaconJsonMySqlPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'json-mysql', '*', '1.0');
BeaconsServiceFactory.BeaconsSqlServerPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'sqlserver', '*', '1.0');
BeaconsServiceFactory.BeaconsJsonSqlServerPersistence = new pip_services3_commons_node_1.Descriptor('beacons', 'persistence', 'json-sqlserver', '*', '1.0');
BeaconsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'controller', 'default', '*', '1.0');
BeaconsServiceFactory.CommandableHttpServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'service', 'commandable-http', '*', '1.0');
BeaconsServiceFactory.CommandableGrpcServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'service', 'commandable-grpc', '*', '1.0');
BeaconsServiceFactory.GrpcServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'service', 'grpc', '*', '1.0');
BeaconsServiceFactory.RestServiceDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'service', 'rest', '*', '1.0');
//# sourceMappingURL=BeaconsServiceFactory.js.map