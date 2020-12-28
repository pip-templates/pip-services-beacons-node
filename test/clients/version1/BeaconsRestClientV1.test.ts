import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { BeaconsMemoryPersistence } from '../../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsRestServiceV1 } from '../../../src/services/version1/BeaconsRestServiceV1';
import { BeaconsController } from '../../../src/logic/BeaconsController';

import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';
import { BeaconsRestClientV1 } from '../../../src/clients/version1/BeaconsRestClientV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('BeaconsRestClientV1', ()=> {
    let service: BeaconsRestServiceV1;
    let client: BeaconsRestClientV1;
    let fixture: BeaconsClientV1Fixture;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new BeaconsMemoryPersistence();
        let controller = new BeaconsController();

        service = new BeaconsRestServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('beacons', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new BeaconsRestClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new BeaconsClientV1Fixture(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });
    
    teardown((done) => {
        done();
    });

    test("CRUD Operations", (done) => {
        fixture.testCrudOperations(done);
    });

    test("Calculate Positions", (done) => {
        fixture.testCalculatePosition(done);
    });

});
