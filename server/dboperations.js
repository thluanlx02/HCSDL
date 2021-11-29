const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456',
    server: 'LINH',
    database: 'restaurant',
    port: 1433,
    options: {
        encrypt: false,
        useUTC: true,
    },
};

async function getProducts() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from product");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getProduct(productId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, productId)
            .query("SELECT * from product where Id = @input_parameter");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addProduct(product) {
    try {

        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query("INSERT "
            + "INTO product(Product_Name, Product_Type, Price, Fund, Product_Description, Instock, Image) "
            + "VALUES(N'"
            + product.Product_Name + "',N'"
            + product.Product_Type + "','"
            + product.Price + "','"
            + product.Fund + "',N'"
            + product.Product_Description + "','"
            + product.Instock + "','"
            + product.Image + "')");

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteProduct(product) {
    try {

        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "DELETE FROM product "
        + "WHERE Id='"+product.Id+"'");

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function editProduct(product) {
    try {

        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "UPDATE product SET "
                  +   "Product_Name='"+product.Product_Name+"',"
                  +   "Product_Type=N'"+product.Product_Type+"',"
                  +   "Price='"+product.Price+"',"
                  +   "Fund='"+product.Fund+"',"
                  +   "Product_Description=N'"+product.Product_Description+"',"
                  +   "Instock='"+product.Instock+"',"
                  +   "Image='"+product.Image+"'"
                  + "WHERE Id='"+product.Id+"'");

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    editProduct:editProduct
}