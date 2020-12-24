import { BeaconsMockClientV1 } from "../../../src/clients/version1/BeaconsMockClientV1";
import { BeaconsClientV1Fixture } from "./BeaconsClientV1Fixture";

suite("BeaconsMockClientV1", () => {
    let client: BeaconsMockClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup((done) => {
        client = new BeaconsMockClientV1();
        fixture = new BeaconsClientV1Fixture(client);
        done();
    });
    
    teardown((done) => {
        done();
    });

    test("CRUD Operations", (done) => {
        fixture.testCrudOperations(done);
    });

    test("Calculate Positions", (done) => {
        fixture.testCalculatePosition(done);
    });
});
