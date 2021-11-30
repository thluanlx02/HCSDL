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
async function Cus_Procedure1(data) {
    try {
        let pool = await sql.connect(config);
        let query = "EXEC number_of_orders_of_each_customer_in_ascendingOrder @minimum_num_of_orders='"+data.num+"'"
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function Cus_Procedure2(data) {
    try {
        let pool = await sql.connect(config);
        let query = "EXEC List_of_Customers_with_bonus_greater_than @MinBonus='"+data.num+"'"
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function addCustomer(product,fun) {
    try {
        console.log(product);

        let pool = await sql.connect(config);
        let query = "exec Insert_TaiKhoanKhachHang @MSTK='" + product.MaSoTaiKhoan 
        + "', @TenTK='" + product.TenTaiKhoan 
        + "', @MatKhau='" + product.MatKhau 
        + "', @TenNguoiSuDung='"+ product.TenNguoiSuDung
        + "', @DiemThuong='" + product.DiemThuong 
        + "', @SoHuuBoi='" + product.SoHuuBoi +"';";
        console.log(query);
        let insertProduct = await pool.request().query(
            // "INSERT "
            // + "INTO TaiKhoanKhachHang(MaSoTaiKhoan,TenTaiKhoan,MatKhau,TenNguoiSuDung,DiemThuong,SoHuuBoi) "
            // + "VALUES('"
            // + product.MaSoTaiKhoan + "','"
            // + product.TenTaiKhoan + "','"
            // + product.MatKhau + "','"
            // + product.TenNguoiSuDung + "','"
            // + product.DiemThuong + "','"
            // + product.SoHuuBoi +  "')" 
            query
             , (err, result) => {
                if(err) fun(err,err.message)
                else fun(err,null)
             });
        return insertProduct.recordsets;
    }
    catch (err) {
       
        console.log(err)
    }
    
}
async function deleteCustomer(MSTK,fun) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "DELETE FROM TaiKhoanKhachHang "
        + "WHERE MaSoTaiKhoan='"+MSTK.id+"'"  , (err, result) => {
            if(err) fun(err,err.message)
            else fun(err,null)
         });

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function editCustomer(product,fun) {
    try {
        console.log(product);
        let pool = await sql.connect(config);
        let insertProduct = await pool.request().query( "UPDATE TaiKhoanKhachHang SET "
                  +   "TenTaiKhoan='"+product.TenTaiKhoan+"',"
                  +   "MatKhau='"+product.MatKhau+"',"
                  +   "TenNguoiSuDung='"+product.TenNguoiSuDung+"',"
                  +   "DiemThuong='"+product.DiemThuong+"',"
                  +   "SoHuuBoi='"+product.SoHuuBoi+"'"
                  + "WHERE MaSoTaiKhoan='"+product.MaSoTaiKhoan+"'"  , (err, result) => {
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
    getCustomers: getCustomers,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    editCustomer: editCustomer,
    Cus_Procedure1:Cus_Procedure1,
    Cus_Procedure2:Cus_Procedure2
}

