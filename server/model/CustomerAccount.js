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

async function getCustomers() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from TaiKhoanKhachHang ");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function addCustomer(product) {
    try {
        console.log(product);

        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query("INSERT "
            + "INTO TaiKhoanKhachHang(MaSoTaiKhoan,TenTaiKhoan,MatKhau,TenNguoiSuDung,DiemThuong,SoHuuBoi) "
            + "VALUES('"
            + product.MaSoTaiKhoan + "','"
            + product.TenTaiKhoan + "','"
            + product.MatKhau + "','"
            + product.TenNguoiSuDung + "','"
            + product.DiemThuong + "','"
            + product.SoHuuBoi +  "')");
        return insertProduct.recordsets;
    }
    catch (err) {
       
        console.log(err)
    }
    
}
async function deleteCustomer(MSTK) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "DELETE FROM TaiKhoanKhachHang "
        + "WHERE MaSoTaiKhoan='"+MSTK.id+"'");

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function editCustomer(product) {
    try {
        console.log(product);
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "UPDATE TaiKhoanKhachHang SET "
                  +   "TenTaiKhoan='"+product.TenTaiKhoan+"',"
                  +   "MatKhau='"+product.MatKhau+"',"
                  +   "TenNguoiSuDung='"+product.TenNguoiSuDung+"',"
                  +   "DiemThuong='"+product.DiemThuong+"',"
                  +   "SoHuuBoi='"+product.SoHuuBoi+"'"
                  + "WHERE MaSoTaiKhoan='"+product.MaSoTaiKhoan+"'");

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCustomers: getCustomers,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    editCustomer: editCustomer
}

