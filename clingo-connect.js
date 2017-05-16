"use strict";

const spawn = require('child_process').spawn;

module.exports = {
    runASPSolver(rules) {
    return new Promise((resolve, reject) => {
        const asptext = rules.join("\n");

        const clingo = spawn('clingo', ['0', "--verbose=0"]);

        let clingoOutput = "";

        clingo.stdout.on('data', data => {
            clingoOutput += data;
        });

        clingo.stdin.write(asptext);
        clingo.stdin.end();

        const SATISFIABLE = 30;
        const UNSATISFIABLE = 20;

        clingo.on('exit', code => {
            switch (code) {
                case SATISFIABLE:
                    const models = clingoOutput.split('\n').slice(0, -2);
                    resolve(models.map(model => model.split(' ')));
                    break;
                case UNSATISFIABLE:
                    reject("Not satisfiable!");
                    break;
                default:
                    reject("Something else went wrong!");
            }
        });
    });
}
};