'use strict';

var AWS = require('aws-sdk'),
    docClient,
    Q = require('q'),
    unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

module.exports = {
    connect: function(aws) {
        AWS.config.update(aws);
        docClient = new AWS.DynamoDB.DocumentClient();
    },
    /**
     * Sets the properties for the service name provided as parameter.
     * 
     * @param {appname}  appname        The name of the app.
     * @param {servicename}  servicename     The name of the service
     * @param {value}  value     The endpoint value.
     */
    set: function(appname, servicename,value) {

        
    },
    /**
     * Retrieves the properties for the app name and service name provided.
     * 
     * @param {string}  name        The name of the service.
     */
    get: function(appname,servicename) {
        console.log('inside of get: docClient='+docClient);
        var deferred = Q.defer();
        // Build up the params
        var params = {
            TableName: 'services',
            Key:{
                "AppName": appname,
                "ServiceName": servicename
            }
        };
        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err));
                return deferred.reject(err);
            } else {
                var items = data.Items.map(unmarshalItem);
                console.log("returned value:");
                console.log(items);
                deferred.resolve(items);
            }
        });
        // Return the promise
        return deferred.promise;
    }
};