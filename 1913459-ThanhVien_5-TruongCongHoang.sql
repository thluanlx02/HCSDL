USE assignment;
GO


--\\Thủ tục insert dữ liệu

CREATE OR ALTER PROCEDURE ThemKho(
    @MaChiNhanh_t VARCHAR(15), 
    @MaKho_t VARCHAR(15), 
    @DienTich_t INT)
AS
BEGIN
	IF (SELECT COUNT(ChiNhanh.MaChiNhanh) FROM ChiNhanh
		WHERE ChiNhanh.MaChiNhanh = @MaChiNhanh_t) = 0
			RAISERROR (N'MÃ CHI NHÁNH KHÔNG TỒN TẠI', 16, 1)
	ELSE IF (SELECT COUNT(Makho) FROM KhoHang
		WHERE MaKho = @MaKho_t) = 1
			RAISERROR (N'MÃ KHO ĐÃ TỒN TẠI', 16, 1)
	ELSE IF @DienTich_t <= 0
			RAISERROR (N'DIỆN TÍCH NHẬP VÀO KHÔNG HỢP LỆ', 16, 1)
	ELSE
		INSERT INTO KhoHang(MaChiNhanh, MaKho, DienTich) 
    	VALUES( @MaChiNhanh_t,
        		@MaKho_t, 
        		@DienTich_t)
END;
GO

----Câu lệnh thực thi thủ tục mẫu:
EXEC ThemKho 'Dong Nam A', 'DNA_01', 156.5;
EXEC ThemKho 'Gia Lai', 'GIA_01', 76.23;
EXEC ThemKho 'Ho Chi Minh', 'HCM_01', 125.2;
EXEC ThemKho 'Thanh Hoa', 'THA_01', 80.52;
EXEC ThemKho 'Nghe An', 'NGH_01', 74.50;
EXEC ThemKho 'America', 'AME_01', 135.6;
EXEC ThemKho 'America', 'AME_01', 135.2;
EXEC ThemKho 'America 2', 'AME_01', 132;
EXEC ThemKho 'America', 'AME_02', 0;

GO

--\\Trigger 1

----Tạo bảng log
CREATE TABLE KhoHang_logs
(
  ID INT IDENTITY PRIMARY KEY,
  MaChiNhanh VARCHAR(15) NOT NULL,
  MaKho      VARCHAR(15) NOT NULL,
  DienTich   NUMERIC(10,5),
  Operation CHAR(3) NOT NULL,
  Update_at DATETIME NOT NULL,
)
GO

----Tạo Trigger
CREATE OR ALTER TRIGGER trg_KhoHang
ON KhoHang
AFTER INSERT, DELETE
AS
BEGIN
INSERT INTO KhoHang_logs(
	MaChiNhanh,
	MaKho,
	DienTich,
	Operation,
	Update_at
)
SELECT
i.MaChiNhanh,
i.MaKho,
i.DienTich,
'INS',
GETDATE()
FROM
	inserted AS i
UNION ALL
SELECT
s.MaChiNhanh,
s.MaKho,
s.DienTich,
'DEL',
GETDATE()
FROM
	deleted AS s
END
GO

----Câu lệnh thực thi trigger mẫu:

EXEC ThemKho 'Nghe An', 'NGH_01', 74.50;
EXEC ThemKho 'America', 'AME_01', 135.6;
EXEC ThemKho 'America', 'AME_02', 135.2;
DELETE FROM KhoHang WHERE MaChiNhanh = 'America'
SELECT * FROM KhoHang_logs;

GO

--\\Trigger 2

CREATE OR ALTER TRIGGER trg_KhoHangMax
ON KhoHang
FOR INSERT
AS
BEGIN
	IF (SELECT COUNT(MaKho) FROM KhoHang
	WHERE MaChiNhanh = (SELECT MaChiNhanh FROM INSERTED)) >= 2
	BEGIN
		RAISERROR(N'MỘT CHI NHÁNH CHỈ CÓ THỂ CÓ TỐI ĐA 2 KHO', 16, 1)
		ROLLBACK
	END
END
GO

----Câu lệnh thực thi trigger mẫu:

EXEC ThemKho 'America', 'AME_01', 135.6;
EXEC ThemKho 'America', 'AME_02', 135.2;
EXEC ThemKho 'America', 'AME_03', 132;
GO

--\\Thủ tục 1:

CREATE OR ALTER PROCEDURE KiemTraKho(
@MaChiNhanh_t VARCHAR(15), 
@MaKho_t VARCHAR(15))
AS
BEGIN
	SELECT Ten, Loai, Soluong, DonViTinh, MaKho, NguyenLieu.MaNguyenLieu
	FROM NguyenLieu
	INNER JOIN NguyenLieuCuaKhoHang 
	ON NguyenLieu.MaNguyenLieu = NguyenLieuCuaKhoHang.MaNguyenLieu
		WHERE MaChiNhanh = @MaChiNhanh_t AND MaKho = @MaKho_t
		ORDER BY NguyenLieuCuaKhoHang.MaNguyenLieu
END
GO

----Câu lệnh thực thi thủ tục:

--insert into NguyenLieu VALUES('NL0001', 'Rice', 'Ingredient')
--insert into NguyenLieu VALUES('NL0002', 'Noodle', 'Ingredient')
--insert into NguyenLieu VALUES('NL0003', 'Sausage', 'Ingredient')
--insert into NguyenLieu VALUES('NL0004', 'Bread', 'Ingredient')
--insert into NguyenLieuCuaKhoHang VALUES('America', 'AME_01', 'NL0001', 15, 'kg')
--insert into NguyenLieuCuaKhoHang VALUES('America', 'AME_01', 'NL0002', 10, 'kg')
--insert into NguyenLieuCuaKhoHang VALUES('America', 'AME_02', 'NL0003', 20, 'unit')
--insert into NguyenLieuCuaKhoHang VALUES('America', 'AME_02', 'NL0004', 35, 'unit')

EXEC KiemTraKho 'America', 'AME_01';
GO
--\\Thủ tục 2:

CREATE OR ALTER PROCEDURE SoKhoCuaChiNhanh(@MaChiNhanh VARCHAR(15))
AS
BEGIN
	SELECT 
	    ChiNhanh.MaChiNhanh, ChiNhanh.DiaChi, ChiNhanh.MaSoQuanLy, 
	    t.TongKho, t.TongDienTich
	FROM ChiNhanh
	INNER JOIN(
	        SELECT 
    		    MaChiNhanh, COUNT(MaKho) AS 'TongKho',
    	    	SUM(DienTich) AS 'TongDienTich'
    		FROM KhoHang
    		GROUP BY MaChiNhanh
    		HAVING COUNT(MaKho) > 0) as t
	ON ChiNhanh.MaChiNhanh = t.MaChiNhanh
END
GO
----Câu lệnh thực thi thủ tục:

EXEC SoKhoCuaChiNhanh 'America';
GO
--\\Hàm 1:

CREATE OR ALTER FUNCTION KiemTraSoLuongNguyenLieu(@MaNguyenLieu VARCHAR(15), 
	@MaKho VARCHAR(15), @MaChiNhanh VARCHAR(15))
RETURNS INT
AS
BEGIN
	DECLARE @Result INT
	IF ISNULL(@MaNguyenLieu, NULL) = NULL OR ISNULL(@MaKho, NULL) = NULL 
	OR ISNULL(@MaChiNhanh, NULL) = NULL
		SET @Result = 0
	ELSE IF NOT EXISTS(SELECT SoLuong FROM NguyenLieuCuaKhoHang 
		WHERE MaNguyenLieu = @MaNguyenLieu AND MaKho = @MaKho 
		AND MaChiNhanh = @MaChiNhanh)
			SET @Result = 0
	ELSE
		SET @Result = (SELECT SoLuong FROM NguyenLieuCuaKhoHang
			WHERE MaNguyenLieu = @MaNguyenLieu 
			AND MaKho = @MaKho AND MaChiNhanh = @MaChiNhanh)
	RETURN @Result
END
GO

----Câu lệnh thực thi hàm mẫu:

SELECT dbo.KiemTraSoLuongNguyenLieu('NL0002', 'AME_01', 'America');
GO

--\\Hàm 2:

CREATE OR ALTER FUNCTION KiemTraThongTinNguyenLieu(@MaNguyenLieu VARCHAR(15))
RETURNS @Result TABLE(
	[Ten] VARCHAR(10),
	[Loai] VARCHAR(20),
	[MaNguyenLieu] VARCHAR(15)
)
AS
BEGIN
	IF ISNULL(@MaNguyenLieu, NULL) = NULL
		BEGIN
			RETURN
		END
	DECLARE @Ten VARCHAR(10)
	DECLARE @Loai VARCHAR(20)
	SET @Ten = (SELECT Ten FROM NguyenLieu 
	    WHERE MaNguyenLieu = @MaNguyenLieu)
	SET @Loai = (SELECT Loai FROM NguyenLieu 
	    WHERE MaNguyenLieu = @MaNguyenLieu)
	INSERT INTO @Result VALUES(@Ten, @Loai, @MaNguyenLieu)
	RETURN;
END
GO

----Câu lệnh thực thi hàm mẫu:

SELECT * FROM KiemTraThongTinNguyenLieu('NL0002')
GO
