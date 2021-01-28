/** @module container */
import { DefaultDataDogFactory } from 'pip-services-datadog-node/obj/src/build';
import { DefaultElasticSearchFactory } from 'pip-services-elasticsearch-node/obj/src/build';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultPrometheusFactory } from 'pip-services3-prometheus-node/obj/src/build';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import {BeaconsServiceFactory} from '../build/BeaconsServiceFactory';

export class BeaconsProcess extends ProcessContainer{
    public constructor(){
        super('beacons', 'Beacons microservice');

        this._factories.add(new BeaconsServiceFactory());
        this._factories.add(new DefaultElasticSearchFactory());
        this._factories.add(new DefaultPrometheusFactory());
        this._factories.add(new DefaultDataDogFactory());
        this._factories.add(new DefaultRpcFactory());
    }
}