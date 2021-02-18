/** @module build */
import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
export declare class BeaconsClientFactory extends Factory {
    static NullClientDescriptor: Descriptor;
    static DirectClientDescriptor: Descriptor;
    static CommandableHttpClientDescriptor: Descriptor;
    static CommandableGrpcClientV1Descriptor: Descriptor;
    static LambdaClientV1Descriptor: Descriptor;
    static GrpcClientV1Descriptor: Descriptor;
    static RestClientV1Descriptor: Descriptor;
    static BeaconsMockClientV1Descriptor: Descriptor;
    constructor();
}
