# HTTP Protocol (version 1) <br/> Beacons Microservice

The Beacons Microservice implements an HTTP compatible API, that can be accessed on a configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [BeaconV1 class](#class)
* [POST /v1/beacons/get_beacons](#operation1)
* [POST /v1/beacons/get_beacon_by_id](#operation2)
* [POST /v1/beacons/get_beacon_by_udi](#operation3)
* [POST /v1/beacons/calculate_position](#operation4)
* [POST /v1/beacons/create_beacon](#operation5)
* [POST /v1/beacons/update_beacon](#operation6)
* [POST /v1/beacons/delete_beacon_by_id](#operation7)

## Data types

### <a name="class"></a> BeaconV1 class

Represents a beacon

**Properties:**
- id: string - a unique beacon id
- site_id: string - the unique id of the worksite where the beacon is being used
- type: string - the beacon's type (iBeacon, EddyStoneUdi, etc.)
- udi: string - the UDI of the beacon
- label: string - the beacon's label
- center: GeoJson - the position of the beacon
- radius: double - the beacon's coverage radius

## Operations

### <a name="operation1"></a> Method: 'POST', route '/v1/beacons/get_beacons'

Retrieves a collection of beacons, according to the specified criteria

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- filter: Object
  - id: string - (optional) beacon's id
  - site_id: string - (optional) unique id of the worksite where the beacon is being used
  - label: string - (optional) the label of the beacon
  - udi: string - (optional) the UDI of the beacon
  - udis: string - (optional) a comma-separated list of UDIs
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged results
  - take: int - (optional) page length (max: 100). Operation returns paged results

**Response body:**
A DataPage<BeaconV1> object that contains an array of BeaconV1 objects as its "data", or an error

### <a name="operation2"></a> Method: 'POST', route '/v1/beacons/get_beacon_by_id'

Retrieves a single beacon by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- beacon_id: string - the beacon's unique id

**Response body:**
The BeaconV1 object, null if object wasn't found, or an error 

### <a name="operation3"></a> Method: 'POST', route '/v1/beacons/get_beacon_by_udi'

Retrieves a single beacon by its UDI

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- udi: string - the beacon's UDI

**Response body:**
The BeaconV1 object, null if object wasn't found, or an error 

### <a name="operation4"></a> Method: 'POST', route '/v1/beacons/calculate_position'

Calculates the approximate location of a device using the locations of nearby beacons (triangulation)

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- site_id: string - worksite's unique id
- udis: string[] - an array of nearby beacon UDIs

**Response body:**
A GeoJson object that contains the center-position of the provided beacons, null if beacons weren't found, or an error 

### <a name="operation5"></a> Method: 'POST', route '/v1/beacons/create_beacon'

Creates a new beacon

**Request body:**
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- beacon: BeaconV1 - the beacon object to be created. If an id is not defined, one will be generated and assigned automatically.

**Response body:**
The created BeaconV1 object, or an error

### <a name="operation6"></a> Method: 'POST', route '/v1/beacons/update_beacon'

Updates a beacon using its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- beacon: BeaconV1 - new beacon object containing updated values. Partial updates are supported

**Response body:**
The updated BeaconV1 object, or an error 
 
### <a name="operation6"></a> Method: 'POST', route '/v1/beacons/delete_beacon_by_id'

Deletes a beacon by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies the distributed transaction
- beacon_id: string - beacon's unique id

**Response body:**
The deleted BeaconV1 object, or an error