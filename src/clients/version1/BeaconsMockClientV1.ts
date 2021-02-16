/** @module clients */
/** @hidden */
const _ = require("lodash");
/** @hidden */
const async = require("async");
import { FilterParams } from "pip-services3-commons-node";
import { IdGenerator } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";
import { BeaconV1 } from "../../data/version1/BeaconV1";
import { IBeaconsClientV1 } from "./IBeaconsClientV1";

export class BeaconsMockClientV1 implements IBeaconsClientV1 {
    private _maxPageSize: number = 100;
    private _items: BeaconV1[];

    public constructor(...items: BeaconV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString("id");
        let siteId = filter.getAsNullableString("site_id");
        let label = filter.getAsNullableString("label");
        let udi = filter.getAsNullableString("udi");
        let udis = filter.getAsObject("udis");

        if (_.isString(udis)) udis = udis.split(",");
        if (!_.isArray(udis)) udis = null;

        return (item) => {
            if (id != null && item.id != id) return false;
            if (siteId != null && item.site_id != siteId) return false;
            if (label != null && item.label != label) return false;
            if (udi != null && item.udi != udi) return false;
            if (udis != null && _.indexOf(udis, item.udi) < 0) return false;
            return true;
        };
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        let filterBeacons = this.composeFilter(filter);
        let beacons = _.filter(this._items, filterBeacons);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;

        if (paging.total) total = beacons.length;
        if (skip > 0) beacons = _.slice(beacons, skip);

        beacons = _.take(beacons, take);
        let page = new DataPage<BeaconV1>(beacons, total);
        callback(null, page);
    }
    public getBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        let beacons = this._items.filter((x) => {
            return x.id == beaconId;
        });

        let beacon = beacons.length > 0 ? beacons[0] : null;
        callback(null, beacon);
    }
    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        let beacons = this._items.filter((x) => {
            return x.udi == udi;
        });

        let beacon = beacons.length > 0 ? beacons[0] : null;
        callback(null, beacon);
    }
    public calculatePosition(correlationId: string, siteId: string, udis: string[],
        callback: (err: any, position: any) => void): void {
        let beacons: BeaconV1[];
        let position: any = null;

        if (udis == null || udis.length == 0) {
            callback(null, null);
            return;
        }

        async.series(
            [
                (callback) => {
                    this.getBeacons(
                        correlationId,
                        FilterParams.fromTuples("site_id", siteId, "udis", udis),
                        null,
                        (err, page) => {
                            beacons = page ? page.data : [];
                            callback(err);
                        }
                    );
                },

                (callback) => {
                    let lat = 0;
                    let lng = 0;
                    let count = 0;
                    for (let beacon of beacons) {
                        if (
                            beacon.center != null &&
                            beacon.center.type == "Point" &&
                            _.isArray(beacon.center.coordinates)
                        ) {
                            lng += beacon.center.coordinates[0];
                            lat += beacon.center.coordinates[1];
                            count += 1;
                        }
                    }
                    if (count > 0) {
                        position = {
                            type: "Point",
                            coordinates: [lng / count, lat / count],
                        };
                    }
                    callback();
                },
            ],
            (err) => {
                callback(err, err == null ? position : null);
            }
        );
    }

    public createBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {
        if (beacon == null) {
            if (callback) callback(null, null);
            return;
        }

        beacon = _.clone(beacon);
        beacon.id = beacon.id || IdGenerator.nextLong();

        this._items.push(beacon);
        if (callback) callback(null, beacon);
    }

    public updateBeacon(correlationId: string, beacon: BeaconV1,
        callback: (err: any, beacon: BeaconV1) => void): void {
        let index = this._items.map((x) => {
                return x.id;
            }).indexOf(beacon.id);

        if (index < 0) {
            callback(null, null);
            return;
        }

        beacon = _.clone(beacon);
        this._items[index] = beacon;

        if (callback) callback(null, beacon);
    }
    public deleteBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {
        var index = this._items
            .map((x) => {
                return x.id;
            })
            .indexOf(beaconId);

        var item = this._items[index];

        if (index < 0) {
            callback(null, null);
            return;
        }

        this._items.splice(index, 1);
        if (callback) callback(null, item);
    }
}
