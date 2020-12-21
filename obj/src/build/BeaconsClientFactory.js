"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsClientFactory = void 0;
/** @module build */
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const BeaconsNullClientV1_1 = require("../clients/version1/BeaconsNullClientV1");
const BeaconsDirectClientV1_1 = require("../clients/version1/BeaconsDirectClientV1");
const BeaconsCommandableHttpClientV1_1 = require("../clients/version1/BeaconsCommandableHttpClientV1");
const BeaconsCommandableGrpcClientV1_1 = require("../clients/version1/BeaconsCommandableGrpcClientV1");
const BeaconsGrpcClientV1_1 = require("../clients/version1/BeaconsGrpcClientV1");
class BeaconsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsClientFactory.NullClientDescriptor, BeaconsNullClientV1_1.BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientDescriptor, BeaconsDirectClientV1_1.BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.CommandableHttpClientDescriptor, BeaconsCommandableHttpClientV1_1.BeaconsCommandableHttpClientV1);
        this.registerAsType(BeaconsClientFactory.CommandableGrpcClientV1Descriptor, BeaconsCommandableGrpcClientV1_1.BeaconsCommandableGrpcClientV1);
        this.registerAsType(BeaconsClientFactory.GrpcClientV1Descriptor, BeaconsGrpcClientV1_1.BeaconsGrpcClientV1);
    }
}
exports.BeaconsClientFactory = BeaconsClientFactory;
BeaconsClientFactory.NullClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'null', '*', '1.0');
BeaconsClientFactory.DirectClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'direct', '*', '1.0');
BeaconsClientFactory.CommandableHttpClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'commandable-http', '*', '1.0');
BeaconsClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'commandable-grpc', '*', '1.0');
BeaconsClientFactory.GrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'grpc', '*', '1.0');
//# sourceMappingURL=BeaconsClientFactory.js.map