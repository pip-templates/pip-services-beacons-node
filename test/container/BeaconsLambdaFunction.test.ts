const _ = require('lodash');
const async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { BeaconTypeV1 } from '../../src/data/version1/BeaconTypeV1';
import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../src/logic/BeaconsController';
import { BeaconsLambdaFunction } from '../../src/container/BeaconsLambdaFunction';


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
const BEACON3: BeaconV1 = {
    id: '3',
    udi: '00003',
    type: BeaconTypeV1.AltBeacon,
    site_id: '2',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [ 10, 10 ] },
    radius: 50
};

suite('BeaconsLambdaFunction', ()=> {
    let lambda: BeaconsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'beacons:persistence:memory:default:1.0',
            'controller.descriptor', "beacons:controller:default:default:1.0"
        );

        lambda = new BeaconsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let beacon1: BeaconV1;

        async.series([
        // Create one beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON1
                    },
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON1.udi, beacon.udi);
                        assert.equal(BEACON1.site_id, beacon.site_id);
                        assert.equal(BEACON1.type, beacon.type);
                        assert.equal(BEACON1.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        beacon1 = beacon;

                        callback();
                    }
                );
            },
        // Create another beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON2
                    },
                    (err, beacon) => {
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
        // Create yet another beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON3
                    },
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(BEACON3.udi, beacon.udi);
                        assert.equal(BEACON3.site_id, beacon.site_id);
                        assert.equal(BEACON3.type, beacon.type);
                        assert.equal(BEACON3.label, beacon.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },
        // Get all beacons
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'get_beacons',
                        filter: {}
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Update the beacon
            (callback) => {
                beacon1.label = 'Updated Beacon 1';

                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'update_beacon',
                        beacon: beacon1
                    },
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon1.id, beacon.id);
                        assert.equal('Updated Beacon 1', beacon.label);

                        callback();
                    }
                );
            },
        // Delete account
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'delete_beacon_by_id',
                        beacon_id: beacon1.id,
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete beacon
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'get_beacon_by_id',
                        beacon_id: beacon1.id,
                    },
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isNull(beacon || null);

                        callback();
                    }
                );
            }
        ], done);
    });

});