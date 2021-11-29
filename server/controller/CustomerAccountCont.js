const customer = require('../model/CustomerAccount');



module.exports = function (app) {
    app.get('/get/customers', (request, response) => {
        customer.getCustomers().then((data) => {
            response.json(data[0]);
        })
    })
    app.post('/insert/customer', function (req, res) {

        let order = { ...req.body }
        customer.addCustomer(order, function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
    })
    app.post('/delete/customer', (req, res) => {
        console.log(req.body);

        customer.deleteCustomer(req.body, function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
    });

    app.post('/edit/customer', (req, res) => {
        console.log(req.body);
        let order = { ...req.body }
        customer.editCustomer(order, function(err,mes){
            if(mes){
                res.status(500).send({message:mes})
            }
            else {
                res.status(201).send({message:"Success"})
            }
        })
    });


}