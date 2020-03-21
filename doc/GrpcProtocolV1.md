# gRPC Protocol (version 1) <br/> Beacons Microservice

The Beacons Microservice implements a gRPC compatible API, that can be accessed on a configured port.
<!-- All input and output data is serialized in JSON format. Errors are returned in [standard format](). -->

* [BeaconV1 message](#mbeacon)
* [Point message](#mpoint)
* [BeaconsPage message](#mbeaconpage)
* [PagingParams message](#mpaging)
* [ErrorDescription message](#merror)
* [Method v1.beacons.get_beacons](#operation1)
* [Method v1.beacons.get_beacon_by_id](#operation2)
* [Method v1.beacons.get_beacon_by_udi](#operation3)
* [Method v1.beacons.calculate_position](#operation4)
* [Method v1.beacons.create_beacon](#operation5)
* [Method v1.beacons.update_beacon](#operation6)
* [Method v1.beacons.delete_beacon_by_id](#operation7)

## Data types

### <a name="mbeacon"></a> BeaconV1 message

Represents a beacon

**Properties:**
- id: string - a unique beacon id
- site_id: string - the unique id of the worksite where the beacon is being used
- type: string - the beacon's type (iBeacon, EddyStoneUdi, etc.)
- udi: string - the UDI of the beacon
- label: string - the beacon's label
- center: GeoJson - the position of the beacon
- radius: double - the beacon's coverage radius

### <a name="mpoint"></a> Point message

Represents a GeoJson point

**Properties:**
- string type - GeoJson object type, should be set to "point"
- repeated double coordinates - the latitude and longitude as an array of two double values

### <a name="mbeaconpage"></a> BeaconsPage message

Represents a DataPage of Beacons

**Properties:**
- int64 total - total amount of records
- repeated Beacon data - the DataPage's data (Beacons)

### <a name="mpaging"></a> PagingParams message

Represents a PagingParams object

**Properties:**
- int64 skip - amount of records to skip (start of page)
- int32 take - amount of records to take after skipping (page length)
- bool total - whether or not to return the total amount of records present

### <a name="merror"></a> ErrorDescription message

Represents an ErrorDescription object

**Properties:**
- string type
- string category
- string code
- string correlation_id
- string status
- string message
- string cause
- string stack_trace
- map<string, string> details

## Operations

### <a name="operation1"></a> Method 'v1.beacons.get_beacons'

Retrieves a collection of beacons, according to the specified criteria

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- map<string, string> filter
  - id: string - (optional) beacon's id
  - site_id: string - (optional) unique id of the worksite where the beacon is being used
  - label: string - (optional) the label of the beacon
  - udi: string - (optional) the UDI of the beacon
  - udis: string - (optional) a comma-separated list of UDIs
- [PagingParams](#mpaging) paging
  - skip: int - (optional) start of page (default: 0). Operation returns paged results
  - take: int - (optional) page length (max: 100). Operation returns paged results

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [BeaconsPage](#mbeaconpage) page - DataPage of Beacons

### <a name="operation2"></a> Method 'v1.beacons.get_beacon_by_id'

Retrieves a single beacon by its unique id

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- string beacon_id - the beacon's unique id

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Beacon](#mbeacon) beacon - the requested beacon, or null if no matches were found

### <a name="operation3"></a> Method 'v1.beacons.get_beacon_by_udi'

Retrieves a single beacon by its UDI

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- string udi - the beacon's UDI

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Beacon](#mbeacon) beacon - the requested beacon, or null if no matches were found

### <a name="operation4"></a> Method 'v1.beacons.calculate_position'

Calculates the approximate location of a device using the locations of nearby beacons (triangulation)

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- string site_id - worksite's unique id
- repeated string udis - an array of strings, containing nearby beacon UDIs

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Point](#mpoint) position  - a GeoJson object that contains the center-position of the provided beacons, or null if beacons weren't found

### <a name="operation5"></a> Method 'v1.beacons.create_beacon'

Creates a new beacon

**Request message:**
- string correlation_id - (optional) unique id that identifies the distributed transaction
- [Beacon](#mbeacon) beacon - the beacon object to be created. If an id is not defined, one will be generated and assigned automatically.

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Beacon](#mbeacon) beacon - the created beacon

### <a name="operation6"></a> Method 'v1.beacons.update_beacon'

Updates a beacon using its unique id

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- [Beacon](#mbeacon) beacon - new beacon object containing updated values. Partial updates are supported

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Beacon](#mbeacon) beacon - the updated beacon
 
### <a name="operation6"></a> Method 'v1.beacons.delete_beacon_by_id'

Deletes a beacon by its unique id

**Request message:** 
- string correlation_id - (optional) unique id that identifies the distributed transaction
- string beacon_id - beacon's unique id

**Response message:**
- [ErrorDescription](#merror) error - errors, if they occured
- [Beacon](#mbeacon) beacon - the deleted beacon