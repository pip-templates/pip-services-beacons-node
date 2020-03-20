# Deployment Guide <br/> Beacons Microservice

* [Standalone Process](#process)

## <a name="process"></a> Standalone Process

The simplest way to deploy the microservice is to run it as a standalone process. 
This microservice is implemented in Node.js and requires installation of Node.js. 
You can get it from the official website: https://nodejs.org/

**Step 1.** Download the microservice by following these [instructions](Download.md)

**Step 2.** Add the **config.yml** file to the root of the microservice and set configuration parameters as needed. 
See the [Configuration Guide](Configuration.md) for details on how this is done.

**Step 3.** Start the microservice by running the following command from its root:

```bash
node bin/run.js
```