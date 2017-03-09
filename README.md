# Dynamo Discovery Service

> Discovery service like etcd but implemented with DynamoDB

## Installation (not yet available)

```bash
$ npm install --save gfg-nodejs-libary-service-discovery
```

## Introduction


The idea is to use `DynamoDB` to keep track of the services. The downside is the extra code you have to write for 
each service. This repo will try to tackle that.

Forked from: https://github.com/SamVerschueren/dynamo-discovery-service

The table hosted on Dynamo DB is: services
Primary key: AppName
Sort key: ServiceName
Value: EndPoint

Eg.
pricing-engine
serviceA
{
    "PROD": {
      "URL": "http://www.serviceA.com"
    },
    "UAT": {
      "URL": "http://www.serviceA_uat.com"
    }
  }

## Usage

### Connecting with DynamoDB

```javascript
var servicediscovery = require('servicediscovery');

// Connect with DynamoDB via the access keys
servicediscovery.connect({
    accessKeyId: 'myAccessKey',
    secretAccessKey: 'mySecretAccessKey',
    region: 'ap-southeast-1'
});
```

### Retrieving a service

By only providing the name of the service, you will retrieve the end point for the service.

```javascript
// Retrieve the latest serviceA service for the app: pricing-engine
dds.get('pricing-engine', 'serviceA').then(function(mongo) {
    // Connect with the serviceA service
}).catch(function(err) {
    // Handle error
});
```

The return value should be

```javascript

```

## License

MIT © Sam Verschueren
