import { ConfigParams } from 'pip-services3-commons-node';

// import { BeaconsLambdaServiceV1 } from '../../../src/services/version1/BeaconsLambdaServiceV1';
import { BeaconsLambdaClientV1 } from '../../../src/clients/version1/BeaconsLambdaClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

// Todo: add a BeaconsLambdaServiceV1? 
suite('BeaconsLambdaClientV1', () => {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";

    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;

    let config = ConfigParams.fromTuples(
        "lambda.connection.protocol", "aws",
        "lambda.connection.arn", AWS_LAMDBA_ARN,
        "lambda.credential.access_id", AWS_ACCESS_ID,
        "lambda.credential.access_key", AWS_ACCESS_KEY,
        "lambda.options.connection_timeout", 30000
    );
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;


    // let service: BeaconsLambdaServiceV1;
    let client: BeaconsLambdaClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup((done) => {
/*         service = new BeaconsLambdaServiceV1();
        service.configure(lambdaConfig); */

        client = new BeaconsLambdaClientV1();
        client.configure(lambdaConfig);

/*        service.setReferences(references);
        client.setReferences(references); */

        fixture = new BeaconsClientV1Fixture(client);

/*         service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                } */

                client.open(null, done);
/*             });*/
    });

/*     teardown((done) => {
        client.close(null, (err) => {
            service.close(null, done);    
        });
    }); */

    teardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Calculate Position', (done) => {
        fixture.testCalculatePosition(done);
    });

});