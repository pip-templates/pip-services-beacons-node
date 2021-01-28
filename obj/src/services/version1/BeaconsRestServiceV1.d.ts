import { IReferences } from "pip-services3-commons-node";
import { RestService } from "pip-services3-rpc-node";
export declare class BeaconsRestServiceV1 extends RestService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    getBeacons(req: any, res: any): void;
    getBeaconById(req: any, res: any): void;
    getBeaconByUdi(req: any, res: any): void;
    createBeacon(req: any, res: any): void;
    updateBeacon(req: any, res: any): void;
    deleteBeaconById(req: any, res: any): void;
    calculatePosition(req: any, res: any): void;
    register(): void;
}
