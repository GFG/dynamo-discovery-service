'use strict';

var AWS = require('aws-sdk'),
    docClient = new AWS.DynamoDB.DocumentClient(),
    Q = require('q');

module.exports = {
    /**
     * Sets the properties for the service name provided as parameter.
     * 
     * @param {string}  name        The name of the service.
     * @param {object}  options     Extra options like host, port and version.
     */
    set: function(name, options) {
        
    },
    /**
     * Retrieves the properties for the app name and service name provided.
     * 
     * @param {string}  name        The name of the service.
     */
    get: function(appname,servicename) {
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
                console.log("returned value in string:", data);
                console.log("Greturned value in JSON:", JSON.stringify(data));
                deferred.resolve(data);
            }
        });
        // Return the promise
        return deferred.promise;
    }
};