const product = require('../model/NhapNguyenLieu');



module.exports = function (app) {
    app.get('/get/products', (request, response) => {
        product.getProducts().then((data) => {
            response.json(data[0]);
        })
    })
    app.get('/get/manl', (request, response) => {
        product.getMNL().then((data) => {
            response.json(data[0]);
        })
    })
    app.get('/get/loaiNL', (request, response) => {
        product.getLoaiNL().then((data) => {
            response.json(data[0]);
        })
    })
    app.post('/get/tienNL', (request, response) => {
        let order = { ...request.body }
        console.log("order",order);

        product.getTienNL(order).then((data) => {
            response.json(data[0]);
        })
    })
    app.post('/get/func2', (request, response) => {
        let order = { ...request.body }
        console.log("order",order);

        product.func2(order).then((data) => {
            response.json(data[0]);
        })
    })
    app.post('/insert/product', function (req, res) {
        let order = { ...req.body }
        product.addProduct(order,function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
        
    })
    app.post('/delete/product', (req, res) => {
        product.deleteProduct(req.body,function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
    });

    app.post('/edit/product', (req, res) => {
        // console.log(req.body);
        let order = { ...req.body }
        product.editProduct(order, function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
    });


}