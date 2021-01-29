/** @module build */
import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
export declare class BeaconsServiceFactory extends Factory {
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static CouchbasePersistenceDescriptor: Descriptor;
    static BeaconsPostgresPersistence: Descriptor;
    static BeaconsJsonPostgresPersistence: Descriptor;
    static BeaconsMySqlPersistence: Descriptor;
    static BeaconJsonMySqlPersistence: Descriptor;
    static BeaconsSqlServerPersistence: Descriptor;
    static BeaconsJsonSqlServerPersistence: Descriptor;
    static ControllerDescriptor: Descriptor;
    static CommandableHttpServiceV1Descriptor: Descriptor;
    static CommandableGrpcServiceV1Descriptor: Descriptor;
    static GrpcServiceV1Descriptor: Descriptor;
    static RestServiceDescriptor: Descriptor;
    constructor();
}
