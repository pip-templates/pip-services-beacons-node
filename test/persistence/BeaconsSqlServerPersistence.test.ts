let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { BeaconsSqlServerPersistence } from '../../src/persistence/BeaconsSqlServerPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsSqlServerPersistence', () => {
    let persistence: BeaconsSqlServerPersistence;
    let fixture: BeaconsPersistenceFixture;

    let sqlserverUri = process.env['SQLSERVER_URI'];
    let sqlserverHost = process.env['SQLSERVER_HOST'] || 'localhost';
    let sqlserverPort = process.env['SQLSERVER_PORT'] || 1433;
    let sqlserverDatabase = process.env['SQLSERVER_DB'] || 'master';
    let sqlserverUser = process.env['SQLSERVER_USER'] || 'sa';
    let sqlserverPassword = process.env['SQLSERVER_PASSWORD'] || 'sqlserver_123';

    // Exit if postgres connection is not set
    if (sqlserverUri == '' && sqlserverHost == '')
        return;

    setup((done) => {
        persistence = new BeaconsSqlServerPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.uri', sqlserverUri,
            'connection.host', sqlserverHost,
            'connection.port', sqlserverPort,
            'connection.database', sqlserverDatabase,
            'credential.username', sqlserverUser,
            'credential.password', sqlserverPassword
        ));

        fixture = new BeaconsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilters(done);
    });

});