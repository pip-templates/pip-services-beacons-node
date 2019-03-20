import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconsNullClientV1 } from '../../src/clients/version1/BeaconsNullClientV1';
import { BeaconsDirectClientV1 } from '../../src/clients/version1/BeaconsDirectClientV1';
import { BeaconsHttpClientV1 } from '../../src/clients/version1/BeaconsHttpClientV1';

export class BeaconsClientFactory extends Factory{
    public static NullClientDescriptor = new Descriptor('beacons', 'client', 'null', '*', '1.0');
    public static DirectClientDescriptor = new Descriptor('beacons', 'client', 'direct', '*', '1.0');
    public static HttpClientDescriptor = new Descriptor('beacons', 'client', 'http', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(BeaconsClientFactory.NullClientDescriptor, BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientDescriptor, BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.HttpClientDescriptor, BeaconsHttpClientV1);
    }
}