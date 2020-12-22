/** @module container */

import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { BeaconsServiceFactory } from '../build/BeaconsServiceFactory';

export class BeaconsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("beacons", "Beacons microservice");
        this._dependencyResolver.put('controller', new Descriptor('beacons', 'controller', 'default', '*', '*'));
        this._factories.add(new BeaconsServiceFactory());
    }
}

export const handler = new BeaconsLambdaFunction().getHandler();