let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { BeaconsCouchbasePersistence } from '../../src/persistence/BeaconsCouchbasePersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsCouchbasePersistence', ()=> {
    let persistence: BeaconsCouchbasePersistence;
    let fixture: BeaconsPersistenceFixture;

    setup((done) => {
        let couchbaseUri = process.env['COUCHBASE_SERVICE_URI'];
        let couchbaseHost = process.env['COUCHBASE_SERVICE_HOST'] || 'localhost';
        let couchbasePort = process.env['COUCHBASE_SERVICE_PORT'] || 8091;
        let couchbaseUser = process.env['COUCHBASE_USER'] || 'Administrator';
        let couchbasePass = process.env['COUCHBASE_PASS'] || 'password';
        let couchbaseBucket = process.env['COUCHBASE_BUCKET'] || 'test';
        let couchbaseCollection = process.env['COUCHBASE_COLLECTION'] || 'beacons';
        // Exit if couchbase connection is not set
        if (couchbaseUri == null && couchbaseHost == null)
            return;

        var dbConfig = ConfigParams.fromTuples(
            'bucket', couchbaseBucket,
            'collection', couchbaseCollection,
            'options.auto_create', true,
            'connection.uri', couchbaseUri,
            'connection.host', couchbaseHost,
            'connection.port', couchbasePort,
            'connection.detailed_errcodes', 1,
            'credential.username', couchbaseUser,
            'credential.password', couchbasePass
        );

        persistence = new BeaconsCouchbasePersistence();
        persistence.configure(dbConfig);

        fixture = new BeaconsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err) {
                done(err);
                return;
            }
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations (skipping - fix getByUdi before enabling)', (done) => {
        //fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilters(done);
    });
});
