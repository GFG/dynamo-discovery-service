'use strict';

var AWS = require('aws-sdk'),
    DOC = require('dynamodb-doc'),
    Q = require('q'),
    utils = require('./utils');

module.exports = {
    connect: function(aws) {
        AWS.config.update(aws);
        var ddb = new AWS.DynamoDB();
        this._dynamodb = new DOC.DynamoDB(ddb);
    },
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
            KeyConditionExpression: '#appname=:appname and #servicename=:servicename',
            ExpressionAttributeNames: {
                '#appname': 'AppName',
                '#servicename': 'ServiceName'
            },
            ExpressionAttributeValues: {
                ':appname': appname,
                ':servicename': servicename
            },
            ScanIndexForward: false
        };
        // Retrieve the item
        this._dynamodb.query(params, function(err, data) {
            if(err) {
                // Reject if an error occurred
                return deferred.reject(err);
            }
            
            if(data.Items.length === 0) {
                // If no Items where found, throw an error
                throw new Error('No service found');
            }
            
            // Resolve the item if everything went succesfully
            deferred.resolve(data.Items[0]);
        });
        
        // Return the promise
        return deferred.promise;
    }
};