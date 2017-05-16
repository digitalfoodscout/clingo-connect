const should = require('should');
const clingoConnect = require('../clingo-connect');

describe('ClingoConnect', function () {
   it('should return all models on a valid call', function (done) {
       const asprules = ["a :- not b." , "b :- not a.", "-c."];

       clingoConnect.runASPSolver(asprules).then(results => {
           results.should.be.instanceof(Array).and.have.lengthOf(2);
           results.should.containEql(['-c', 'a']);
           results.should.containEql(['-c', 'b']);
           done();
       }).catch(err => {
           done(new Error(err));
       });
   });

    it('should fail unsatisfiable rules', function (done) {
        const asprules = ["a :- not a." , "b :- not a.", "-c."];

        clingoConnect.runASPSolver(asprules).then(results => {
            done(new Error("this should never be called"));
        }).catch(err => {
            should(err).be.exactly("Not satisfiable!");
            done();
        });
    });

    it('should fail with an syntax error', function (done) {
        const asprules = ["a :- not b. blubb" , "b :- not a.", "-c."];

        clingoConnect.runASPSolver(asprules).then(results => {
            done("this should never be called");
        }).catch(err => {
            should(err).be.exactly("Something else went wrong!");
            done();
        });
    });


});