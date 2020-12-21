/** @module build */
import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { BeaconsNullClientV1 } from '../clients/version1/BeaconsNullClientV1';
import { BeaconsDirectClientV1 } from '../clients/version1/BeaconsDirectClientV1';
import { BeaconsCommandableHttpClientV1 } from '../clients/version1/BeaconsCommandableHttpClientV1';
import { BeaconsCommandableGrpcClientV1 } from '../clients/version1/BeaconsCommandableGrpcClientV1';
import { BeaconsGrpcClientV1 } from '../clients/version1/BeaconsGrpcClientV1';


export class BeaconsClientFactory extends Factory{
    public static NullClientDescriptor = new Descriptor('beacons', 'client', 'null', '*', '1.0');
    public static DirectClientDescriptor = new Descriptor('beacons', 'client', 'direct', '*', '1.0');
    public static CommandableHttpClientDescriptor = new Descriptor('beacons', 'client', 'commandable-http', '*', '1.0');
    public static CommandableGrpcClientV1Descriptor = new Descriptor('beacons', 'client', 'commandable-grpc', '*', '1.0');
    public static GrpcClientV1Descriptor = new Descriptor('beacons', 'client', 'grpc', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(BeaconsClientFactory.NullClientDescriptor, BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientDescriptor, BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.CommandableHttpClientDescriptor, BeaconsCommandableHttpClientV1);
        this.registerAsType(BeaconsClientFactory.CommandableGrpcClientV1Descriptor, BeaconsCommandableGrpcClientV1);
        this.registerAsType(BeaconsClientFactory.GrpcClientV1Descriptor, BeaconsGrpcClientV1);
    }
}