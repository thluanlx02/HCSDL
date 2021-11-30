const sql = require('mssql')

const sqlConfig = {
  user: "csdl_web_211",
  password: "123456",
  database: "assignment",
  server: 'localhost',
  options: {
    encrypt: true,
    trustServerCertificate: true
  } 
}
module.exports = function (app) {
  app.post('/food/add', async function(req, res) {
    const { name, price, description, image, quantity, category } = req.body
    try {
      const pool = await sql.connect(sqlConfig)
      await pool.request()
        .input('TenMonAn', sql.VarChar(100), name)
        .input('GiaNiemYet', sql.INT, price)
        .input('Soluong', sql.INT, quantity)
        .input('DanhMuc', sql.VarChar(100), category)
        .input('HinhAnh', sql.VarChar(500), image)
        .input('MoTa', sql.VarChar(1000), description)
        .execute('INSERTFOOD')
        res.status(201).json({
          success: true,
          message: "Insert successfully!"
        })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.originalError.info.message
      })
    }
  })

  app.get('/food' , async function(req , res) {
    try {
      const pool = await sql.connect(sqlConfig)
      const result = await pool.request().query`SELECT * FROM MonAn`;
      res.send(result)
    }
    catch (err) {
      console.log(err)
    }
  })

  app.get('/food/category' , async function(req , res) {
    try {
      const pool = await sql.connect(sqlConfig)
      const result = await pool.request().query`SELECT DISTINCT DanhMuc FROM MonAn`;
      res.send(result)
    }
    catch (err) {
      console.log(err)
    }
  })

  app.delete('/food/delete/:id', async function (req, res) {
    try {
      const pool = await sql.connect(sqlConfig)
      const result = await pool.request().query`DELETE FROM MonAn WHERE MaSoMonAn = ${req.params.id}`;
      res.send(result)
    }
    catch (err) {
      console.log(err)
    }
  })
  app.put('/food/edit/:id', async function(req, res) {
    const { name, price, description, image, quantity, category } = req.body
    console.log(name)
    try {
      const pool = await sql.connect(sqlConfig)
      await pool.request()
        .query`UPDATE MonAn SET
          TenMonAn = ${name},
          GiaNiemYet = ${price},
          MoTa = ${description},
          HinhAnh = ${image},
          Soluong = ${quantity},
          DanhMuc = ${category} 
          WHERE MaSoMonAn = ${req.params.id}`;
        res.status(201).json({
          success: true,
          message: "Edit successfully!"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
          success: false,
          message: err.originalError.info.message
        })
    }
  })
}
