"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module services */
/** @hidden */
const _ = require('lodash');
/** @hidden */
const async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class BeaconsRestServiceV1 extends pip_services3_rpc_node_1.RestService {
    constructor() {
        super();
        this._baseRoute = "v1/beacons";
        this._dependencyResolver.put("controller", new pip_services3_commons_node_1.Descriptor("beacons", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired("controller");
    }
    getBeacons(req, res) {
        let filter = req.param('filter');
        let paging = req.param('paging');
        this._controller.getBeacons(null, filter, paging, (err, page) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(page);
                this.sendResult(req, res);
            }
        });
    }
    getBeaconById(req, res) {
        let id = req.route.params.id;
        this._controller.getBeaconById(null, id, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    getBeaconByUdi(req, res) {
        let udi = req.route.params.udi;
        this._controller.getBeaconByUdi(null, udi, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    createBeacon(req, res) {
        let data = req.body;
        this._controller.createBeacon(null, data, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    updateBeacon(req, res) {
        let data = req.body;
        this._controller.updateBeacon(null, data, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    deleteBeaconById(req, res) {
        let id = req.route.params.id;
        this._controller.deleteBeaconById(null, id, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    calculatePosition(req, res) {
        let site_id = req.route.params.site_id || req.body.site_id;
        let udis = req.route.params.udis || req.body.udis;
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;
        this._controller.calculatePosition(null, site_id, udis, (err, position) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(position);
                this.sendResult(req, res);
            }
        });
    }
    register() {
        this.registerRoute('get', '/beacons', null, this.getBeacons);
        this.registerRoute('get', '/beacons/:id', null, this.getBeaconById);
        this.registerRoute('get', '/beacons/udi/:udi', null, this.getBeaconByUdi);
        this.registerRoute('get', '/beacons/calculate_position/:site_id/:udis', null, this.calculatePosition);
        this.registerRoute('post', '/beacons', null, this.createBeacon);
        this.registerRoute('put', '/beacons', null, this.updateBeacon);
        this.registerRoute('del', '/beacons/:id', null, this.deleteBeaconById);
        this.registerOpenApiSpecFromFile("./src/swagger/beacons_v1.yaml");
    }
}
exports.BeaconsRestServiceV1 = BeaconsRestServiceV1;
//# sourceMappingURL=BeaconsRestServiceV1.js.map