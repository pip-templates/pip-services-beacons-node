/** @module services */
/** @hidden */
let _ = require('lodash');
/** @hidden */
let async = require('async');

import { IReferences } from "pip-services3-commons-node";
import { Descriptor } from "pip-services3-commons-node";
import { ObjectSchema } from "pip-services3-commons-node";
import { TypeCode } from "pip-services3-commons-node";
import { LongConverter } from "pip-services3-commons-node";
import { RestService } from "pip-services3-rpc-node";
import { IBeaconsController } from "../../logic/IBeaconsController";

export class BeaconsRestServiceV1 extends RestService {
    private _controller: IBeaconsController;

    public constructor() {
        super();
        this._baseRoute = "v1/beacons";
        this._dependencyResolver.put(
            "controller",
            new Descriptor("beacons", "controller", "default", "*", "*")
        );
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IBeaconsController>("controller");
    }

    public getBeacons(req: any, res: any): void {
        let filter = req.param('filter');
        let paging = req.param('paging');

        this._controller.getBeacons(
            null, filter, paging, (err, page) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(page);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public getBeaconById(req: any, res: any): void {
        let id = req.route.params.id;
        this._controller.getBeaconById(
            null, id, (err, item) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(item);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public getBeaconByUdi(req: any, res: any): void {
        let udi = req.route.params.udi;
        this._controller.getBeaconByUdi(
            null, udi, (err, item) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(item);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public createBeacon(req: any, res: any): void {
        let data = req.body;

        this._controller.createBeacon(
            null, data, (err, item) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(item);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public updateBeacon(req: any, res: any): void {
        let data = req.body;

        this._controller.updateBeacon(
            null, data, (err, item) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(item);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public deleteBeaconById(req: any, res: any): void {
        let id = req.route.params.id;

        this._controller.deleteBeaconById(
            null, id, (err, item) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(item);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public calculatePosition(req: any, res: any): void {
        let orgId = req.route.params.org_id || req.body.org_id;
        let udis = req.route.params.udis || req.body.udis;
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;

        this._controller.calculatePosition(
            null, orgId, udis, (err, position) => {
                if (err) {
                    this.sendError(req, res, err);
                } else {
                    res.json(position);
                    this.sendResult(req, res);
                }
            }
        );
    }

    public register() {

        this.registerRoute('get', '/beacons', null, this.getBeacons);
        this.registerRoute('get', '/beacons/:id', null, this.getBeaconById);
        this.registerRoute('get', '/beacons/udi/:udi', null, this.getBeaconByUdi);
        this.registerRoute('post', '/beacons', null, this.createBeacon);
        this.registerRoute('post', '/beacons/position', null, this.calculatePosition);
        this.registerRoute('put', '/beacons', null, this.updateBeacon);
        this.registerRoute('del', '/beacons/:id', null, this.deleteBeaconById);

        this.registerOpenApiSpecFromFile("./src/swagger/beacons_v1.yaml");
    }
}