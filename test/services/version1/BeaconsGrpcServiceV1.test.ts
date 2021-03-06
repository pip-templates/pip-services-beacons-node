const _ = require('lodash');
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
const async = require('async');
let assert = require('chai').assert;

let services = require('../../../../src/protos/beacons_v1_grpc_pb');
let messages = require('../../../../src/protos/beacons_v1_pb');

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { BeaconV1 } from '../../../src/data/version1/BeaconV1';
import { BeaconTypeV1 } from '../../../src/data/version1/BeaconTypeV1';
import { BeaconsMemoryPersistence } from '../../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../../src/logic/BeaconsController';
import { BeaconsGrpcServiceV1 } from '../../../src/services/version1/BeaconsGrpcServiceV1';

const BEACON1: BeaconV1 = {
    id: '1',
    udi: '00001',
    type: BeaconTypeV1.AltBeacon,
    site_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [ 0, 0 ] },
    radius: 50
};
const BEACON2: BeaconV1 = {
    id: '2',
    udi: '00002',
    type: BeaconTypeV1.iBeacon,
    site_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [ 2, 2 ] },
    radius: 70
};

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('BeaconsGrpcServiceV1', () => {
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;
    let service: BeaconsGrpcServiceV1;
    let client: any;

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/beacons_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).beacons_v1.Beacons;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    suiteSetup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();
        controller.configure(new ConfigParams());

        service = new BeaconsGrpcServiceV1();
        service.configure(grpcConfig);

        let references = References.fromTuples(
            new Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('beacons', 'service', 'grpc', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, done);
        });
    });

    suiteTeardown((done) => {
        service.close(null, (err) => {
            persistence.close(null, done);
        });
    });

    test('CRUD Operations', (done) => {
        let beacon1: BeaconV1;

        async.series([
            // Create the first beacon
            (callback) => {
                client.create_beacon(
                    {
                        beacon: BEACON1
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;
                        
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON1.udi, beacon.udi);
                        assert.equal(BEACON1.site_id, beacon.site_id);
                        assert.equal(BEACON1.type, beacon.type);
                        assert.equal(BEACON1.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Create the second beacon
            (callback) => {
                client.create_beacon(
                    {
                        beacon: BEACON2
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;
                        
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON2.udi, beacon.udi);
                        assert.equal(BEACON2.site_id, beacon.site_id);
                        assert.equal(BEACON2.type, beacon.type);
                        assert.equal(BEACON2.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
            // Get all beacons
            (callback) => {
                client.get_beacons(
                    {
                        filter: new FilterParams(),
                        paging: new PagingParams()
                    },
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        beacon1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the beacon
            (callback) => {
                beacon1.label = 'ABC';

                client.update_beacon(
                    {
                        beacon: beacon1
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;

                        assert.isNull(err);
                        
                        assert.isObject(beacon);
                        assert.equal(beacon1.id, beacon.id);
                        assert.equal('ABC', beacon.label);

                        callback();
                    }
                );
            },
            // Get beacon by udi
            (callback) => {
                client.get_beacon_by_udi(
                    {
                        udi: beacon1.udi
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;

                        assert.isNull(err);
                        
                        assert.isObject(beacon);
                        assert.equal(beacon1.id, beacon.id);

                        callback();
                    }
                );
            },
            // Calculate position for one beacon
            (callback) => {
                client.calculate_position(
                    {
                        site_id: '1',
                        udis: ['00001']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let position = response ? response.position : null;

                        assert.isNull(err);
                        
                        assert.isObject(position);
                        assert.equal('Point', position.type);
                        assert.lengthOf(position.coordinates, 2);
                        assert.equal(0, position.coordinates[0]);
                        assert.equal(0, position.coordinates[1]);

                        callback();
                    }
                );
            },
            // Delete the beacon
            (callback) => {
                client.delete_beacon_by_id(
                    {
                        beacon_id: beacon1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;

                        assert.isNull(err);
                        
                        assert.isObject(beacon);
                        assert.equal(beacon1.id, beacon.id);

                        callback();
                    }
                );
            },
            // Try to get deleted beacon
            (callback) => {
                client.get_beacon_by_id(
                    {
                        beacon_id: beacon1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let beacon = response ? response.beacon : null;

                        assert.isNull(err);
                        assert.isNull(beacon);
                        
                        callback();
                    }
                );
            }
        ], done);
    });

});