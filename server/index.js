
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const NhapNguyenLieu = require('./controller/NhapNguyenLieuCont')
const CustomerAccount = require('./controller/CustomerAccountCont')

CustomerAccount(app)
NhapNguyenLieu(app)

app.listen(port, function () {
    console.log('Server is running..');
});