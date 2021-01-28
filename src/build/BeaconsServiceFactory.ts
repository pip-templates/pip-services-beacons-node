/** @module build */
import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconsMemoryPersistence } from '../persistence/BeaconsMemoryPersistence';
import { BeaconsFilePersistence } from '../persistence/BeaconsFilePersistence';
import { BeaconsMongoDbPersistence } from '../persistence/BeaconsMongoDbPersistence';
import { BeaconsCouchbasePersistence } from '../persistence/BeaconsCouchbasePersistence';
import { BeaconsPostgresPersistence } from '../persistence/BeaconsPostgresPersistence';
import { BeaconsJsonPostgresPersistence } from '../persistence/BeaconsJsonPostgresPersistence';
import { BeaconsMySqlPersistence } from '../persistence/BeaconsMySqlPersistence';
import { BeaconJsonMySqlPersistence } from '../persistence/BeaconJsonMySqlPersistence';
import { BeaconsSqlServerPersistence } from '../persistence/BeaconsSqlServerPersistence';
import { BeaconsJsonSqlServerPersistence } from '../persistence/BeaconsJsonSqlServerPersistence';
import { BeaconsController } from '../logic/BeaconsController';
import { BeaconsCommandableHttpServiceV1 } from '../services/version1/BeaconsCommandableHttpServiceV1';
import { BeaconsCommandableGrpcServiceV1 } from '../services/version1/BeaconsCommandableGrpcServiceV1';
import { BeaconsGrpcServiceV1 } from '../services/version1/BeaconsGrpcServiceV1';
import { BeaconsRestServiceV1 } from '../services/version1/BeaconsRestServiceV1';
import { ElasticSearchLogger } from 'pip-services-elasticsearch-node/obj/src/log';
import { PrometheusCounters } from 'pip-services3-prometheus-node/obj/src/count';
import { PrometheusMetricsService } from 'pip-services3-prometheus-node/obj/src/services';
import { ConsoleLogger } from 'pip-services3-components-node/obj/src/log';
import { LogCounters } from 'pip-services3-components-node/obj/src/count';


export class BeaconsServiceFactory extends Factory{
    public static MemoryPersistenceDescriptor = new Descriptor('beacons', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('beacons', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('beacons', 'persistence', 'mongodb', '*', '1.0');
    public static CouchbasePersistenceDescriptor = new Descriptor('beacons', 'persistence', 'couchbase', '*', '1.0');
    public static BeaconsPostgresPersistence = new Descriptor('beacons', 'persistence', 'postgres', '*', '1.0');
    public static BeaconsJsonPostgresPersistence = new Descriptor('beacons', 'persistence', 'json-postgres', '*', '1.0');
    public static BeaconsMySqlPersistence = new Descriptor('beacons', 'persistence', 'mysql', '*', '1.0');
    public static BeaconJsonMySqlPersistence = new Descriptor('beacons', 'persistence', 'json-mysql', '*', '1.0');
    public static BeaconsSqlServerPersistence = new Descriptor('beacons', 'persistence', 'sqlserver', '*', '1.0');
    public static BeaconsJsonSqlServerPersistence = new Descriptor('beacons', 'persistence', 'json-sqlserver', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('beacons', 'controller', 'default', '*', '1.0');
    public static CommandableHttpServiceV1Descriptor = new Descriptor('beacons', 'service', 'commandable-http', '*', '1.0');
    public static CommandableGrpcServiceV1Descriptor = new Descriptor('beacons', 'service', 'commandable-grpc', '*', '1.0');
    public static GrpcServiceV1Descriptor = new Descriptor('beacons', 'service', 'grpc', '*', '1.0');
    public static RestServiceDescriptor = new Descriptor('beacons', 'service', 'rest', '*', '1.0');
    public static ElasticSearchLogger = new Descriptor('pip-services', 'logger', 'elasticsearch', '*', '1.0');
    public static PrometheusCounters = new Descriptor('pip-services', 'counters', 'prometheus', '*', '1.0');
    public static PrometheusMetricsService = new Descriptor('pip-services', 'metrics-service', 'prometheus', '*', '1.0');
    public static ConsoleLogger = new Descriptor('pip-services', 'logger', 'console', '*', '1.0');
    public static LogCounters = new Descriptor('pip-services', 'counters', 'console', '*', '1.0');

    
    constructor(){
        super();

        this.registerAsType(BeaconsServiceFactory.MemoryPersistenceDescriptor, BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePersistenceDescriptor, BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPersistenceDescriptor, BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.CouchbasePersistenceDescriptor, BeaconsCouchbasePersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsPostgresPersistence, BeaconsPostgresPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsJsonPostgresPersistence, BeaconsJsonPostgresPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsMySqlPersistence, BeaconsMySqlPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconJsonMySqlPersistence, BeaconJsonMySqlPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsSqlServerPersistence, BeaconsSqlServerPersistence);
        this.registerAsType(BeaconsServiceFactory.BeaconsJsonSqlServerPersistence, BeaconsJsonSqlServerPersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController);
        this.registerAsType(BeaconsServiceFactory.CommandableHttpServiceV1Descriptor, BeaconsCommandableHttpServiceV1);
        this.registerAsType(BeaconsServiceFactory.CommandableGrpcServiceV1Descriptor, BeaconsCommandableGrpcServiceV1);
        this.registerAsType(BeaconsServiceFactory.GrpcServiceV1Descriptor, BeaconsGrpcServiceV1);
        this.registerAsType(BeaconsServiceFactory.RestServiceDescriptor, BeaconsRestServiceV1);
        this.registerAsType(BeaconsServiceFactory.ElasticSearchLogger, ElasticSearchLogger);
        this.registerAsType(BeaconsServiceFactory.PrometheusCounters, PrometheusCounters);
        this.registerAsType(BeaconsServiceFactory.PrometheusMetricsService, PrometheusMetricsService);
        this.registerAsType(BeaconsServiceFactory.ConsoleLogger, ConsoleLogger);
        this.registerAsType(BeaconsServiceFactory.LogCounters, LogCounters);

    }
}