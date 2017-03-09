/**
 * Created by nedved on 9/3/17.
 */
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var sinon = require('sinon');
var servicediscovery = require('../lib/servicediscovery');

// `describe` makes a "suite" of tests; think of them as a group.
describe('call get', function() {
    before(function() {
        var aws= {
            accessKeyId: 'AKIAIE5BKPZ7DFGLHYPQ',
            secretAccessKey: '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',
            region: 'ap-southeast-1'
        };
        servicediscovery.connect(aws);
        console.log('serviceDiscovery.connect being called');
    });

    it('calls the get function with right appname and servicename', function() {
        var serviceName = 'serviceA';
        return expect(Promise.resolve(servicediscovery.get('pricing-engine', 'serviceA'))).to.eventually.have.deep.property('ServiceName',serviceName);
    });
    it('calls the get function with wrong appname or servicename should be rejected', function() {
        return expect(Promise.resolve(servicediscovery.get('XXXX', 'XXXX'))).to.be.rejected;
    });
});