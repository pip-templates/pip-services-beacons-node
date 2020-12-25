let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';
import { BeaconsMySqlPersistence } from '../../src/persistence/BeaconsMySqlPersistence';

suite('BeaconsMySqlPersistence', ()=> {
    let persistence: BeaconsMySqlPersistence;
    let fixture: BeaconsPersistenceFixture;

    let mysqlUri = process.env['MYSQL_URI'];
    let mysqlHost = process.env['MYSQL_HOST'] || 'localhost';
    let mysqlPort = process.env['MYSQL_PORT'] || 3306;
    let mysqlDatabase = process.env['MYSQL_DB'] || 'test';
    let mysqlUser = process.env['MYSQL_USER'] || 'user';
    let mysqlPassword = process.env['MYSQL_PASSWORD'] || 'password';
    if (mysqlUri == null && mysqlHost == null)
        return;

    setup((done) => {
        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mysqlUri,
            'connection.host', mysqlHost,
            'connection.port', mysqlPort,
            'connection.database', mysqlDatabase,
            'credential.username', mysqlUser,
            'credential.password', mysqlPassword
        );

        persistence = new BeaconsMySqlPersistence();
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

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });
    
});