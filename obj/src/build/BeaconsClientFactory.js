"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const BeaconsNullClientV1_1 = require("../clients/version1/BeaconsNullClientV1");
const BeaconsDirectClientV1_1 = require("../clients/version1/BeaconsDirectClientV1");
const BeaconsCommandableHttpClientV1_1 = require("../clients/version1/BeaconsCommandableHttpClientV1");
class BeaconsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsClientFactory.NullClientDescriptor, BeaconsNullClientV1_1.BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientDescriptor, BeaconsDirectClientV1_1.BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.HttpClientDescriptor, BeaconsCommandableHttpClientV1_1.BeaconsCommandableHttpClientV1);
    }
}
exports.BeaconsClientFactory = BeaconsClientFactory;
BeaconsClientFactory.NullClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'null', '*', '1.0');
BeaconsClientFactory.DirectClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'direct', '*', '1.0');
BeaconsClientFactory.HttpClientDescriptor = new pip_services3_commons_node_1.Descriptor('beacons', 'client', 'http', '*', '1.0');
//# sourceMappingURL=BeaconsClientFactory.js.map