let chai = require('chai');
let chaiHttp = require('chai-http');
let skripta = require('./skripta');
let should = chai.should();
let except = chai.expect;
chai.use(chaiHttp);
const fs = require('fs');
var testovi = fs.readFileSync("testniPodaci.txt", 'utf8').split(/\r?\n/);

for(var i = 0; i < testovi.length; i++){
    let test = testovi[i];
    test = test.replace(/\\/gi, "");
    let obj = {};
    let testSplitan = test.split(",");

    if(testSplitan[0] != "GET" && testSplitan[0] != "POST" && testSplitan[0] != "DELETE") 
        obj = { operacija: "", ruta: "", ulaz: "", izlaz: "" };
    else{
        obj.operacija = testSplitan[0];
        obj.ruta = testSplitan[1];
        let ulazi = "";
        let izlazi = "";

        if(testSplitan[0] == "POST"){
            for (var j = 2; j < testSplitan.length - 1; j++) {
                if (j != 2) ulazi += ",";
                ulazi += testSplitan[j];
            }
            izlazi = testSplitan[testSplitan.length - 1];
        }
        else{
            ulazi = testSplitan[2];
            for (var j = 3; j < testSplitan.length; j++) {
                if (j != 3) izlazi += ",";
                izlazi += testSplitan[j];
            }
        }

        obj.ulaz = JSON.parse(ulazi);
        obj.izlaz = JSON.parse(izlazi);
    }

    if(testSplitan[0] == "GET"){
        it(obj.operacija + obj.ruta, function (done) {
            chai.request(skripta).get(obj.ruta).end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.should.be.eql(obj.izlaz);
                    done();
                });
        });
    }
    else if(testSplitan[0] == "POST"){
        it(obj.operacija + obj.ruta, function (done) {
            chai.request(skripta).post(obj.ruta).send(obj.ulaz).end((error, response) => {
                    if(response.status === 200){
                        response.should.have.status(200);
                        response.body.should.have.property("message");
                        response.body.should.be.eql(obj.izlaz);
                    }
                    else{
                        response.should.have.status(200);
                        response.body.should.have.property("message");
                        response.body.should.be.eql(obj.izlaz);
                    }
                    done();
                });
        });
    }
    else if(testSplitan[0] == "DELETE"){
        it(obj.operacija + obj.ruta, function (done) {
            chai.request(skripta).delete(obj.ruta).end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message");
                    response.body.should.be.eql(obj.izlaz);
                    done();
                });
        });
    }

}

