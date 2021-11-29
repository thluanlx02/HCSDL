const customer = require('../model/CustomerAccount');



module.exports = function (app) {
    app.get('/get/customers', (request, response) => {
        customer.getCustomers().then((data) => {
            response.json(data[0]);
        })
    })
    app.post('/insert/customer', function (req, res) {

        let order = { ...req.body }
        customer.addCustomer(order).then(data => {
          
            res.status(501).send({error:"Ko the insert"});
        })
    })
    app.post('/delete/customer', (req, res) => {
        console.log(req.body);

        customer.deleteCustomer(req.body).then(data => {
            res.status(201).json(data);
        })
    });

    app.post('/edit/customer', (req, res) => {
        console.log(req.body);
        let order = { ...req.body }
        customer.editCustomer(order).then(data => {
            res.status(201).json(data);

        })
    });


}