import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
export declare class BeaconsClientFactory extends Factory {
    static NullClientDescriptor: Descriptor;
    static DirectClientDescriptor: Descriptor;
    static HttpClientDescriptor: Descriptor;
    constructor();
}
