const clingoConnect = require("./clingo-connect");

process.stdin.resume();

const asprules = ["a :- not b." , "b :- not a.", "-c."];

clingoConnect.runASPSolver(asprules).then(results => {
    for(const model of results) {
        console.log("Model:");

        for(const literal of model) {
            console.log(literal);
        }
    }

    process.stdin.end();
}).catch(err => {
    console.log(err);
    process.stdin.end();
});