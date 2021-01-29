var http = require('http');
var express = require('express');
var path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

const baza = require("./baza");

require('./bazaSkripta')(baza);

baza.sync({ force: true });

require('./v1Skripta')(app);
require('./v2Skripta')(app);

if (require.main === module) app.listen(3000);

module.exports = app;