/** @module services */

import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class BeaconsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1.beacons');
        this._dependencyResolver.put('controller', new Descriptor('beacons', 'controller', '*', '*', '1.0'));
    }
}