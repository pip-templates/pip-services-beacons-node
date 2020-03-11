// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var beacons_v1_pb = require('./beacons_v1_pb.js');

function serialize_beacons_v1_BeaconIdRequest(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconIdRequest)) {
    throw new Error('Expected argument of type beacons_v1.BeaconIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconIdRequest(buffer_arg) {
  return beacons_v1_pb.BeaconIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconReply(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconReply)) {
    throw new Error('Expected argument of type beacons_v1.BeaconReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconReply(buffer_arg) {
  return beacons_v1_pb.BeaconReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconRequest(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconRequest)) {
    throw new Error('Expected argument of type beacons_v1.BeaconRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconRequest(buffer_arg) {
  return beacons_v1_pb.BeaconRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconUdiRequest(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconUdiRequest)) {
    throw new Error('Expected argument of type beacons_v1.BeaconUdiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconUdiRequest(buffer_arg) {
  return beacons_v1_pb.BeaconUdiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconsPageReply(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconsPageReply)) {
    throw new Error('Expected argument of type beacons_v1.BeaconsPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconsPageReply(buffer_arg) {
  return beacons_v1_pb.BeaconsPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconsPageRequest(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconsPageRequest)) {
    throw new Error('Expected argument of type beacons_v1.BeaconsPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconsPageRequest(buffer_arg) {
  return beacons_v1_pb.BeaconsPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconsPositionReply(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconsPositionReply)) {
    throw new Error('Expected argument of type beacons_v1.BeaconsPositionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconsPositionReply(buffer_arg) {
  return beacons_v1_pb.BeaconsPositionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beacons_v1_BeaconsPositionRequest(arg) {
  if (!(arg instanceof beacons_v1_pb.BeaconsPositionRequest)) {
    throw new Error('Expected argument of type beacons_v1.BeaconsPositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beacons_v1_BeaconsPositionRequest(buffer_arg) {
  return beacons_v1_pb.BeaconsPositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The Beacons service definition.
var BeaconsService = exports.BeaconsService = {
  get_beacons: {
    path: '/beacons_v1.Beacons/get_beacons',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconsPageRequest,
    responseType: beacons_v1_pb.BeaconsPageReply,
    requestSerialize: serialize_beacons_v1_BeaconsPageRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconsPageRequest,
    responseSerialize: serialize_beacons_v1_BeaconsPageReply,
    responseDeserialize: deserialize_beacons_v1_BeaconsPageReply,
  },
  get_beacon_by_id: {
    path: '/beacons_v1.Beacons/get_beacon_by_id',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconIdRequest,
    responseType: beacons_v1_pb.BeaconReply,
    requestSerialize: serialize_beacons_v1_BeaconIdRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconIdRequest,
    responseSerialize: serialize_beacons_v1_BeaconReply,
    responseDeserialize: deserialize_beacons_v1_BeaconReply,
  },
  get_beacon_by_udi: {
    path: '/beacons_v1.Beacons/get_beacon_by_udi',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconUdiRequest,
    responseType: beacons_v1_pb.BeaconReply,
    requestSerialize: serialize_beacons_v1_BeaconUdiRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconUdiRequest,
    responseSerialize: serialize_beacons_v1_BeaconReply,
    responseDeserialize: deserialize_beacons_v1_BeaconReply,
  },
  calculate_position: {
    path: '/beacons_v1.Beacons/calculate_position',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconsPositionRequest,
    responseType: beacons_v1_pb.BeaconsPositionReply,
    requestSerialize: serialize_beacons_v1_BeaconsPositionRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconsPositionRequest,
    responseSerialize: serialize_beacons_v1_BeaconsPositionReply,
    responseDeserialize: deserialize_beacons_v1_BeaconsPositionReply,
  },
  create_beacon: {
    path: '/beacons_v1.Beacons/create_beacon',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconRequest,
    responseType: beacons_v1_pb.BeaconReply,
    requestSerialize: serialize_beacons_v1_BeaconRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconRequest,
    responseSerialize: serialize_beacons_v1_BeaconReply,
    responseDeserialize: deserialize_beacons_v1_BeaconReply,
  },
  update_beacon: {
    path: '/beacons_v1.Beacons/update_beacon',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconRequest,
    responseType: beacons_v1_pb.BeaconReply,
    requestSerialize: serialize_beacons_v1_BeaconRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconRequest,
    responseSerialize: serialize_beacons_v1_BeaconReply,
    responseDeserialize: deserialize_beacons_v1_BeaconReply,
  },
  delete_beacon_by_id: {
    path: '/beacons_v1.Beacons/delete_beacon_by_id',
    requestStream: false,
    responseStream: false,
    requestType: beacons_v1_pb.BeaconIdRequest,
    responseType: beacons_v1_pb.BeaconReply,
    requestSerialize: serialize_beacons_v1_BeaconIdRequest,
    requestDeserialize: deserialize_beacons_v1_BeaconIdRequest,
    responseSerialize: serialize_beacons_v1_BeaconReply,
    responseDeserialize: deserialize_beacons_v1_BeaconReply,
  },
};

exports.BeaconsClient = grpc.makeGenericClientConstructor(BeaconsService);
