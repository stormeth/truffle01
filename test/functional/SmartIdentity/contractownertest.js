/**
  * The purpose of this test contract is to test the functions in SmartIdentity.sol
  * that involve altering the ownership of the contract.
  */

var SmartIdentity = artifacts.require("./SmartIdentity.sol");
var SmartIdentity1 = artifacts.require("./SmartIdentity.sol");
var SmartIdentity2 = artifacts.require("./SmartIdentity.sol");

contract('SmartIdentity', function(accounts) {

    var smartIdentity,
        smartIdentity1,
        smartIdentity2,
        owner,
        jill,
        pete,
        override,
        override1,
        override2,
        thirdparty;

    before("Setup the Smart Identity contract and hydrate the required variables", function() {
        owner = accounts[0];
        jill = accounts[1];
        pete = accounts[2]
        override = owner;
        override1 = jill;
        override2 = pete;
        thirdparty = accounts[3];

        SmartIdentity.new({from: owner})
        .then(function(data) {
            smartIdentity = data;
        });

        SmartIdentity1.new({from: jill})
        .then(function(data1) {
            smartIdentity1 = data1;
        });

        SmartIdentity2.new({from: pete})
        .then(function(data2) {
            smartIdentity2 = data2;
        });

        return smartIdentity,
        smartIdentity1,
        smartIdentity2,

        owner,
        jill,
        pete,
        thirdparty;
    });

    describe("My Contract Owner tests", function() {

        /**
          * Since the getOwner function can only be executed by the override account, this
          * test implies that if the owner is successfully returned, the override account
          * has been correctly set.
          */

        it("will have an owner with an override account that matches the creator of the contract", function(done) {
          SmartIdentity.new({from: override})
          .then(function(identity) {
              identity.getOwner.call()
              .then(function(response) {
                  assert.equal(response.valueOf(), owner, "owner does not match override");
                  done();
              });
          });
        });

       it("will not allow a non-owner to execute the getOwner function", function(done) {
            SmartIdentity.new({from: thirdparty})
            .then(function(identity) {
                identity.getOwner.call()
                .catch(function(error) {
                    assert.isOk(error, "Expected error has been caught");
                    done();
                });
            });
        });

        it("will attempt to setOwner as a thirdparty user and fail", function(done) {
            smartIdentity.setOwner(thirdparty, {from: thirdparty})
            .catch(function(error) {
                assert.isOk(error, "Expected error has not been caught");
                done();
            });
        });

        it("will attempt to setOverride as a thirdparty user and fail", function(done) {
            smartIdentity.setOverride(thirdparty, {from: thirdparty})
            .catch(function(error) {
                assert.isOk(error, "Expected error has not been caught");
                done();
            });
        });

        it("jill", function(done) {
          SmartIdentity1.new({from: jill})
          .then(function(identity) {
              identity1 = identity;
              //identity1.getOwner().call()
             // identity.setOverride(pete,{from:pete})
             // .then(function(response) {
             //        assert.equal(response.valueOf(), jill, "owner does not match override");
              //});
          });
          done();
        });

        it("pete", function(done) {
          SmartIdentity2.new({from: pete})
          .then(function(identity) {
              identity2 = identity;
              //identity2.getOwner().call()
              //smartIdentity1.setOverride(jill,{from:jill})
             // .then(function(response) {
             //        assert.equal(response.valueOf(), jill, "owner does not match override");
              //});
          });
          done();
        });



    });
}, 5000);
