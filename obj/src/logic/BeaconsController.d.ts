import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { IBeaconsController } from './IBeaconsController';
export declare class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconById(correlationId: string, beaconId: string, callback: (err: any, page: BeaconV1) => void): void;
    getBeaconByUdi(correlationId: string, beaconId: string, callback: (err: any, page: BeaconV1) => void): void;
    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    updateBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void;
}
