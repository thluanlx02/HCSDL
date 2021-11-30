const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456',
    server: 'LINH',
    database: 'FastFood',
    port: 1433,
    options: {
        encrypt: false,
        useUTC: true,
    },
};

async function getProducts() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from NguyenLieuCuaLanNhap ORDER BY SoLo");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getMNL() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT MaNguyenLieu,Ten from NguyenLieu ");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getLoaiNL() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT DISTINCT Loai from NguyenLieu ");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getTienNL(data) {
    try {
        let pool = await sql.connect(config);
        let query = "EXEC TopPrice @num='"+data.num+"', @type='"+data.type+"'"
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function func2(data) {
    try {
        let pool = await sql.connect(config);
        let query = "EXEC TopImportGoods @timeA='"+data.timeA+"', @timeB='"+data.timeB+"',@num='"+data.num+"'"
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function addProduct(product,fun) {
    try {

        let pool = await sql.connect(config);
        let query = "exec InsertNLieuCuaLanNhap @SoLo='" + product.SoLo + "', @MaNguyenLieu='" + product.MaNguyenLieu 
        + "', @SoLuong='" + product.SoLuong + "', @DonGia='"+ product.DonGia+"';";

        let insertProduct = await pool.request().query(
            // "INSERT "
            // + "INTO NguyenLieuCuaLanNhap(SoLo,MaNguyenLieu,SoLuong,DonGia) "
            // + "VALUES('"
            // + product.SoLo + "','"
            // + product.MaNguyenLieu + "','"  
            // + product.SoLuong + "','"
            // + product.DonGia +  "')" 
            query
            , (err, result) => {
               if(err) fun(err,err.message)
               else fun(err,null)
            }
           );

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
        
    }
}
async function deleteProduct(product,fun) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "DELETE FROM NguyenLieuCuaLanNhap "
        + "WHERE MaNguyenLieu='"+product.MaNguyenLieu+"' AND SoLo='"+product.SoLo+"'"            , (err, result) => {
            if(err) fun(err,err.message)
            else fun(err,null)
         });

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function editProduct(product,fun) {
    try {
        // console.log(product);
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "UPDATE NguyenLieuCuaLanNhap SET "
                  +   "SoLuong='"+product.SoLuong+"',"
                  +   "DonGia='"+product.DonGia+"'"
                  + "WHERE SoLo='"+product.SoLo+"' AND MaNguyenLieu='"+product.MaNguyenLieu+"'"            , (err, result) => {
                    if(err) fun(err,err.message)
                    else fun(err,null)
                 });

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    getMNL: getMNL,
    getLoaiNL: getLoaiNL,
    getTienNL: getTienNL,
    func2:func2
}

