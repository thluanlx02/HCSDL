


--USE FastFood;
--GO




--Cau 1
CREATE OR ALTER PROCEDURE InsertNLieuCuaLanNhap(@SoLo int,
                                                @MaNguyenLieu varchar(15), 
                                                @DonGia int,
                                                @SoLuong int
                                                )
AS 
IF NOT EXISTS (SELECT SoLo FROM LanNhapHang WHERE Solo = @Solo)
  BEGIN
    RAISERROR('Invalid parameter: SoLo does not exists',16,0)
  END
 IF NOT EXISTS (SELECT MaNguyenLieu FROM NguyenLieu WHERE MaNguyenLieu = @MaNguyenLieu)
  BEGIN
    RAISERROR('Invalid parameter: MaNguyenLieu does not exists',16,0)
  END
IF (@DonGia <=0 ) 
  BEGIN
    RAISERROR('Invalid parameter: DonGia cannot be NEGATIVE or ZERO',16,0)
  END
ELSE IF (@SoLuong<=0)
  BEGIN
    RAISERROR('Invalid parameter: SoLuong cannot be NEGATIVE or ZERO',16,0)
  END
ELSE
  BEGIN
	INSERT INTO NguyenLieuCuaLanNhap (SoLo ,MaNguyenLieu ,DonGia ,SoLuong )
	VALUES (@SoLo ,@MaNguyenLieu ,@DonGia ,@SoLuong  )
  END

  GO
EXEC InsertNLieuCuaLanNhap 1009,'NL0004',10,-40000
EXEC InsertNLieuCuaLanNhap 1003,'NL0004',-10,40000
GO
SELECT * FROM NguyenLieuCuaLanNhap ORDER BY SoLo
GO




--Cau 2 a) Mỗi ngày chỉ nhập hàng từ một Nhà cung cấp sản phẩm 1 lần duy nhất

CREATE OR ALTER TRIGGER Check_Date
ON LanNhapHang
FOR INSERT, UPDATE
AS 
	BEGIN
		DECLARE @Date DATE;
		SELECT @Date = NgayNhap FROM INSERTED
		IF (@Date > GETDATE())
			BEGIN
				RAISERROR('NGAY NHAP HANG KHONG DUOC SAU NGAY HOM NAY',16,0);
				ROLLBACK;
			END;
	END;
	GO

INSERT INTO LanNhapHang
VALUES (1006,'2022-01-01','CN01','1')


--Cau 2 b) Tang so luong nguyen lieu sau moi lan nhap
CREATE OR ALTER TRIGGER Update_SoLuong
ON NguyenLieuCuaLanNhap
FOR INSERT, UPDATE,DELETE
AS 
		DECLARE @SoLuong int;
		DECLARE @Solo int
		DECLARE @SoLuong_Chenhlech int;
		DECLARE @MaNguyenLieu VARCHAR(15);
IF exists(SELECT * from inserted) and exists (SELECT * from deleted)
	BEGIN
		SELECT @Solo=SoLo FROM INSERTED 
		SELECT @SoLuong = SoLuong FROM INSERTED;
		SELECT @MaNguyenLieu = MaNguyenLieu FROM INSERTED;
		SELECT @SoLuong_Chenhlech = SoLuong FROM DELETED
		UPDATE NguyenLieuCuaKhoHang
		SET NguyenLieuCuaKhoHang.SoLuong =NguyenLieuCuaKhoHang.SoLuong+ @SoLuong - @SoLuong_Chenhlech
		FROM (SELECT LanNhapHang.MaKho,LanNhapHang.MaCN FROM LanNhapHang,NguyenLieuCuaLanNhap WHERE @Solo= LanNhapHang.SoLo) T
		WHERE T.MaKho = NguyenLieuCuaKhoHang.MaKho AND T.MaCN=NguyenLieuCuaKhoHang.MaChiNhanh 
		AND NguyenLieuCuaKhoHang.MaNguyenLieu=@MaNguyenLieu 

		
	END;

ELSE IF exists (Select * from inserted) and not exists(Select * from deleted)
	BEGIN
		SELECT @SoLuong = SoLuong FROM INSERTED;
		SELECT @Solo=SoLo FROM INSERTED 
		SELECT @MaNguyenLieu = MaNguyenLieu FROM INSERTED;
		UPDATE NguyenLieuCuaKhoHang
		SET SoLuong = @SoLuong + NguyenLieuCuaKhoHang.SoLuong
		FROM (SELECT MaKho,MaCN FROM LanNhapHang,NguyenLieuCuaLanNhap WHERE @Solo= LanNhapHang.SoLo) T
		WHERE T.MaKho = NguyenLieuCuaKhoHang.MaKho AND T.MaCN=NguyenLieuCuaKhoHang.MaChiNhanh 
		AND NguyenLieuCuaKhoHang.MaNguyenLieu=@MaNguyenLieu 
	END;

ELSE 
	BEGIN
		SELECT @SoLuong = SoLuong FROM DELETED
		SELECT @MaNguyenLieu = MaNguyenLieu FROM DELETED;
		SELECT @Solo=SoLo FROM DELETED

		UPDATE NguyenLieuCuaKhoHang
		SET NguyenLieuCuaKhoHang.SoLuong =  NguyenLieuCuaKhoHang.SoLuong - @SoLuong 
		FROM (SELECT MaKho,MaCN FROM LanNhapHang,NguyenLieuCuaLanNhap WHERE @Solo= LanNhapHang.SoLo) T
		WHERE T.MaKho = NguyenLieuCuaKhoHang.MaKho AND T.MaCN=NguyenLieuCuaKhoHang.MaChiNhanh 
		AND NguyenLieuCuaKhoHang.MaNguyenLieu=@MaNguyenLieu 
	END;
GO


--Cau 3
--a Hien thi @num nguyen lieu co gia thanh/ don vi nhap vao cao nhat theo loai san pham
CREATE OR ALTER PROCEDURE TopPrice (@num int, @type nvarchar(30))
AS	
	
	SELECT TOP(@num) Ten, DonGia,Loai,Solo
	FROM NguyenLieuCuaLanNhap,NguyenLieu
	WHERE NguyenLieuCuaLanNhap.MaNguyenLieu=NguyenLieu.MaNguyenLieu AND Loai = @type
	ORDER BY DonGia DESC

EXEC TopPrice 3 , 'FastFood'

GO

--b Hien thi lan nhap hang co thanh tien cao nhat ma co tu time A toi time B ma co it nhat @num sp

CREATE OR ALTER PROCEDURE TopImportGoods (@timeA date,@timeB date,@num int)
AS	
	
	SELECT TOP 1 LanNhapHang.SoLo, SUM(SoLuong*DonGia) AS Tong
	FROM NguyenLieuCuaLanNhap,LanNhapHang,NguyenLieu
	WHERE NguyenLieuCuaLanNhap.MaNguyenLieu=NguyenLieu.MaNguyenLieu  AND NguyenLieuCuaLanNhap.SoLo = LanNhapHang.SoLo AND NgayNhap >= @timeA AND NgayNhap <=@timeB
	GROUP BY LanNhapHang.SoLo
	HAVING COUNT(*)>=@num
	ORDER BY Tong DESC

EXEC TopImportGoods '2021-10-10','2021-11-20',3

GO

SELECT * FROM NguyenLieuCuaLanNhap,LanNhapHang,NguyenLieu
	WHERE NguyenLieuCuaLanNhap.MaNguyenLieu=NguyenLieu.MaNguyenLieu  AND NguyenLieuCuaLanNhap.SoLo = LanNhapHang.SoLo
	ORDER BY NgayNhap

GO

--Cau 4a) Select ten nha phan phoi, ma nha phan phoi co cung cap mat hang @mathang và so don vi dan pham cung cap

CREATE or alter function SoDonViMatHangDuocCC 
(
@mathang VARCHAR(15)
)
RETURNS INT
AS
BEGIN 
	DECLARE @COUNT INT
	IF (@mathang NOT IN (SELECT MaNguyenLieu FROM NguyenLieu))
		BEGIN 
			RETURN -1
		END
	ELSE 
		BEGIN
			SET @COUNT = 0
			SET @COUNT = (SELECT SUM(SoLuong) AS TongSoDonViSP 
						FROM NguyenLieuCuaLanNhap ,LanNhapHang
							WHERE   LanNhapHang.SoLo=NguyenLieuCuaLanNhap.SoLo AND MONTH(LanNhapHang.NgayNhap )=MONTH(GETDATE()) AND @mathang  = MaNguyenLieu) 
		END
		IF(ISNULL(@COUNT,0)=0)
		return 0
		RETURN  @COUNT
	
END
GO

SELECT  dbo.SoDonViMatHangDuocCC('NL0002');

--b)So tien phai tra cho @DonViCC moi thang trong nam


CREATE or alter function SoTienTraChoNhaCC 
(
@MaNhaCC VARCHAR(15)
)
RETURNS @Tb TABLE(
	Thang INT,
	TongTien INT
)
AS
BEGIN 
	DECLARE @thang INT
	SET @thang =1
	IF (@MaNhaCC NOT IN (SELECT MaSoNhaPhanPhoi FROM NhaPhanPhoi))
		BEGIN 
			RETURN 
		END
	ELSE 
	BEGIN
	WHILE (@thang <= MONTH(GETDATE()))
		BEGIN
			DECLARE @money INT
			SET @money = (SELECT SUM(SoLuong * DonGia)
						FROM NhaPhanPhoiCuaLanNhap ,LanNhapHang,NguyenLieuCuaLanNhap
						WHERE LanNhapHang.SoLo=NguyenLieuCuaLanNhap.SoLo AND LanNhapHang.SoLo=NhaPhanPhoiCuaLanNhap.SoLo 
						AND MONTH(LanNhapHang.NgayNhap ) = @thang AND YEAR(LanNhapHang.NgayNhap) = YEAR(GETDATE()) AND @MaNhaCC= MaSoNhaPhanPhoi) 
			IF(ISNULL(@money,0)=0) SET @money =0
			INSERT INTO @Tb VALUES(@thang,@money)
			SET @thang =@thang+1
		END
		
	END
		RETURN 
	
END
GO


SELECT * FROM SoTienTraChoNhaCC('NPP0002')




--INSERT DATA

INSERT INTO NhaPhanPhoi(MaSoNhaPhanPhoi,TenNhaPhanPhoi)
VALUES('NPP0001','VINAMILK'),('NPP0002','VEDAN'),('NPP0003','HOAMAI'),('NPP0004','VIETPHAT');

SELECT * FROM NhaPhanPhoi

INSERT INTO LoaiSanPhamNhaPhanPhoi(MaSoNhaPhanPhoi,LoaiSanPham)
VALUES ('NPP0001','Kho'),('NPP0002','Tuoi Song'),('NPP0002','Che Bien San'),('NPP0003','Kho'),('NPP0003','Dong Lanh'),('NPP0004','Tuoi Song')

SELECT * FROM LoaiSanPhamNhaPhanPhoi


INSERT INTO LanNhapHang(SoLo,NgayNhap)
VALUES (1005,'2021-1-20'),
(995,'2021-2-20'),(996,'2021-4-20'),(997,'2021-8-20'),(998,'2021-8-20'),(999,'2021-8-20'),(1004,'2021-10-10'),
(1000,'2021-10-10'),(1001,'2021-10-20'),(1002,'2021-11-10'),(1003,'2021-11-20'),

SELECT * FROM LanNhapHang,NhaPhanPhoiCuaLanNhap WHERE LanNhapHang.SoLo=NhaPhanPhoiCuaLanNhap.SoLo
DELETE FROM NhaPhanPhoiCuaLanNhap WHERE NhaPhanPhoiCuaLanNhap.SoLo=998
INSERT INTO NhaPhanPhoiCuaLanNhap (SoLo,MaSoNhaPhanPhoi)
VALUES 
(998,'NPP0004'),(999,'NPP0001'),(997,'NPP0001'),(997,'NPP0003'),
(1000,'NPP0001'),(1004,'NPP0002'),(1001,'NPP0003'),(1002,'NPP0004'),(1003,'NPP0004'),(995,'NPP0001'),
(995,'NPP0002'),(996,'NPP0003'),(996,'NPP0004'),(996,'NPP0002'),(1005,'NPP0003')

SELECT * FROM NhaPhanPhoiCuaLanNhap

INSERT INTO NguyenLieu(MaNguyenLieu,Ten,Loai)
VALUES ('NL0009','Donut','FastFood'),
('NL0001',N'Bánh mì','FastFood'),
('NL0002',N'Bánh pizza','FastFood'),
('NL0003',N'Kem','ColdFood'),
('NL0004',N'Coca','Drink'),
('NL0005',N'Cà phê','Drink'),
('NL0006',N'Nước ép cam','Drink'),
('NL0007',N'Mỳ tôm','Canning'),
('NL0008',N'Snack','Sweets')

SELECT * FROM NguyenLieu

DELETE NguyenLieu WHeRE MaNguyenLieu='NL0009'
INSERT INTO NguyenLieuCuaLanNhap (SoLo,MaNguyenLieu,SoLuong,DonGia)
VALUES (1000,'NL0008',0,20000),
(1000,'NL0002',10,30000),
(1001,'NL0003',30,30000),
(1002,'NL0006',30,14000),
(1002,'NL0005',15,16000),
(1002,'NL0004',10,20000),
(1003,'NL0007',30,45000),
(1004,'NL0008',30,20000),
(1004,'NL0002',30,25000),
(1004,'NL0006',5,70000)
INSERT INTO NguyenLieuCuaLanNhap (SoLo,MaNguyenLieu,SoLuong,DonGia)
VALUES (995,'NL0008',10,20000),
(996,'NL0002',10,30000),
(996,'NL0003',30,30000),
(996,'NL0006',30,14000),
(997,'NL0005',15,16000),
(997,'NL0004',10,20000),
(998,'NL0007',30,45000),
(999,'NL0008',30,20000),
(999,'NL0002',30,25000),
(999,'NL0006',5,70000)


SELECT * 
FROM LanNhapHang,NguyenLieuCuaKhoHang,
		WHERE LanNhapHang.MaKHo = NguyenLieuCuaKhoHang.MaKho AND LanNhapHang.MaCN=NguyenLieuCuaKhoHang.MaChiNhanh


INSERT INTO NguyenLieuCuaLanNhap (SoLo,MaNguyenLieu,SoLuong,DonGia)
VALUES (996,'NL0001',23,20000)

SELECT * FROM NguyenLieuCuaKhoHang


SELECT * FROM NguyenLieuCuaLanNhap ORDER BY Solo

UPDATE NguyenLieuCuaLanNhap
SET SoLuong = -1
WHERE MaNguyenLieu = 'NL0007' AND SoLo =1000

ALTER TABLE ChiNhanh
DROP CONSTRAINT FK_QuanLy_TO_ChiNhanh

INSERT INTO ChiNhanh
VALUES ('CN01','HCM','NV001'),('CN02','DN','NV002'),('CN03','HN','NV003')


INSERT INTO KhoHang
VALUES('CN01','1',100),('CN01','2',200),('CN02','1',100),('CN02','2',300),('CN03','1',500)

INSERT INTO NguyenLieuCuaKhoHang
VALUES('CN01','1','NL0001',0,'kg'),('CN01','1','NL0002',0,'kg'),('CN01','1','NL0003',0,'kg'),('CN01','1','NL0004',0,'kg'),
('CN01','1','NL0005',0,'kg'),('CN01','1','NL0006',0,'kg'),('CN01','1','NL0007',0,'kg'),('CN01','1','NL0008',0,'kg'),('CN01','1','NL0009',0,'kg'),
('CN01','2','NL0001',0,'kg'),('CN01','2','NL0002',0,'kg'),('CN01','2','NL0003',0,'kg'),('CN01','2','NL0004',0,'kg'),
('CN01','2','NL0005',0,'kg'),('CN01','2','NL0006',0,'kg'),('CN01','2','NL0007',0,'kg'),('CN01','2','NL0008',0,'kg'),('CN01','2','NL0009',0,'kg'),
('CN02','1','NL0001',0,'kg'),('CN02','1','NL0002',0,'kg'),('CN02','1','NL0003',0,'kg'),('CN02','1','NL0004',0,'kg'),
('CN02','1','NL0005',0,'kg'),('CN02','1','NL0006',0,'kg'),('CN02','1','NL0007',0,'kg'),('CN02','1','NL0008',0,'kg'),('CN02','1','NL0009',0,'kg'),
('CN02','2','NL0001',0,'kg'),('CN02','2','NL0002',0,'kg'),('CN02','2','NL0003',0,'kg'),('CN02','2','NL0004',0,'kg'),
('CN02','2','NL0005',0,'kg'),('CN02','2','NL0006',0,'kg'),('CN02','2','NL0007',0,'kg'),('CN02','2','NL0008',0,'kg'),('CN02','2','NL0009',0,'kg'),
('CN03','1','NL0001',0,'kg'),('CN03','1','NL0002',0,'kg'),('CN03','1','NL0003',0,'kg'),('CN03','1','NL0004',0,'kg'),
('CN03','1','NL0005',0,'kg'),('CN03','1','NL0006',0,'kg'),('CN03','1','NL0007',0,'kg'),('CN03','1','NL0008',0,'kg'),('CN03','1','NL0009',0,'kg')
SELECT * FROM NguyenLieuCuaKhoHang

