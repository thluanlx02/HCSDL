USE assignment
GO
-- Cau 1 : Viet 1 thu tuc de insert du lieu vao bang MonAn
CREATE PROCEDURE INSERTFOOD (@TenMonAn VARCHAR(100),
							@GiaNiemYet INT,
							@Soluong INT,
							@DanhMuc VARCHAR(100),
							@HinhAnh VARCHAR(500),
							@MoTa VARCHAR(1000) = NULL)
AS
	IF (ISNULL(@GiaNiemYet, 0) = 0 OR ISNULL(@Soluong, 0) = 0)
		BEGIN
			RAISERROR('Invalid parameter: Parameter cannot be NULL or ZERO', 16, 0)
			RETURN
		END
	IF (@Soluong < 0 OR @GiaNiemYet < 0)
		BEGIN
			RAISERROR('Invalid parameter: Parameter cannot be NEGATIVE NUMBER', 16, 0)
			RETURN
		END
	IF EXISTS (SELECT 1 FROM MonAn WHERE TenMonAn = @TenMonAn )
		BEGIN
			RAISERROR('TenMonAn already exists. Please enter another name', 16, 0)
			RETURN
		END
	BEGIN
		INSERT INTO MonAn (TenMonAn, GiaNiemYet, MoTa, HinhAnh, Soluong, DanhMuc)
			VALUES (@TenMonAn, @GiaNiemYet, @MoTa, @HinhAnh, @Soluong, @DanhMuc)
	END
-- Cau 2 : Viet trigger kiem soat cac hoat dong
GO
CREATE TRIGGER CHECK_PARAMETER ON MonAn
	FOR INSERT, UPDATE
	AS
		BEGIN
			DECLARE @Price INT,
					@Quantity INT;
			SELECT @Price = GiaNiemYet from INSERTED;
			SELECT @Quantity = Soluong from INSERTED;
			IF (@Quantity <= 0 OR @Price <= 0) 
				BEGIN
					RAISERROR('Can not enter a negative number or zero!', 16, 1);
					ROLLBACK;
				END;
		END;

GO


CREATE TRIGGER UPDATE_STOCK ON MonAnCuaDonHang 
	FOR INSERT
	AS
		BEGIN
			DECLARE @id VARCHAR(15),
					@quantity INT;
			SELECT @id = MaSoMonAn FROM inserted;
			SELECT @quantity = Soluong FROM inserted;
			UPDATE MonAn SET MonAn.Soluong = MonAn.Soluong - @quantity
			FROM MonAn WHERE MaSoMonAn = @id
		END
-- Cau 3 : Viet 2 thu tuc de truy xuat du lieu
GO
CREATE PROCEDURE GET_FOOD (@id VARCHAR(15))
AS
	BEGIN
		SELECT M.TenMonAn, D.GiaBan
		FROM MonAn M , MonAnCuaDonHang D
		WHERE D.MaSoDonHang = @id AND D.MaSoMonAn = M.MaSoMonAn
		ORDER BY D.GiaBan
	END

GO
CREATE PROCEDURE GET_ORDER (@idBranch VARCHAR(15), @price INT)
AS
	BEGIN
		SELECT D.MaSoDonHang, SUM(D.Giaban) AS TongTien
		FROM DonHang O, MonAnCuaDonHang D
		WHERE O.ThuocChiNhanh = @idBranch AND O.MaSoDonHang = D.MaSoDonHang
		GROUP BY D.MaSoDonHang
		HAVING SUM(D.GiaBan) > @price
		ORDER BY SUM(D.Giaban)
	END


-- Cau 4 : Viet 2 ham de truy van du lieu
GO
CREATE FUNCTION GET_FOOD_BRANCH(@id VARCHAR(15))
RETURNS INT
AS
BEGIN
 DECLARE @quantity INT
 IF (ISNULL(@id, 0) = 0)
  SET @quantity = -1
 IF NOT EXISTS( SELECT 1 FROM MonAnCuaChiNhanh
  WHERE MaChiNhanh = @id)
  SET @quantity = -1
 ELSE
  SET @quantity = (SELECT COUNT(*) FROM MonAnCuaChiNhanh 
   WHERE MaChiNhanh = @id)
 RETURN @quantity
END	


GO
CREATE FUNCTION GET_CATEGORY(@category VARCHAR(100)) 
RETURNS @food TABLE(
	DanhMuc VARCHAR(100),
	TongTienMua INT
 )
AS
 BEGIN
  DECLARE @total INT
  IF NOT EXISTS( SELECT 1 FROM MonAn WHERE DanhMuc = @category)
   RETURN
  SET @total = (SELECT SUM(GiaNiemYet * Soluong) 
				 FROM MonAn WHERE @category = DanhMuc)
  INSERT INTO @food VALUES(@category, @total)
  RETURN
 END

-- goi ham va cac thu tuc 

SELECT * FROM dbo.GET_CATEGORY('Drink')
EXEC GET_FOOD 'ORDER_1'
EXEC GET_FOOD 'ORDER_2'
EXEC INSERTFOOD 'Coffee', 10, 10, 'Drink', 'urlimage', 'Drink in morning'
EXEC INSERTFOOD 'Milk', 10, 30, 'Drink', 'urlimage', 'Contains protein and fat'
INSERT INTO MonAn VALUES ('Milktea', 100, 'it is favorite drink nowadays', 'url', 10, 'Drink')
INSERT INTO MonAn VALUES ('Peachtea', 10, 'its so easy to make', 'url', 20, 'Drink')
INSERT INTO MonAn VALUES ('Pizza', 20, 'it is popular in now', 'url', 20, 'Food')
INSERT INTO MonAn VALUES ('Sandwich', 20, 'this is fast food', 'url', 20, 'Food')
INSERT INTO MonAn VALUES ('Friedchicken', 20, 'contains many oil', 'url', 10, 'Food')
INSERT INTO MonAn VALUES ('Fish', 50, 'its good for health', 'url', 15, 'Food')
INSERT INTO MonAn VALUES ('Water', 50, 'bestseller', 'url', 100, 'Drink')
EXEC GET_ORDER 'headquarters',15
DROP TABLE MonAn
SELECT * FROM MonAn
INSERT INTO KhachHang 
VALUES('MKH1','Truong Giang','0234435322','t,giang352001@gmail.com')
SELECT * FROM KhachHang
DROP TABLE MonAn
INSERT INTO TaiKhoanKhachHang 
VALUES('MSTK1','Giang1234','Giang123', 'Giang', 0, 'MKH1')
select * from TaiKhoanKhachHang
INSERT INTO ChiNhanh
VALUES('headquarters', 'New York', null)
INSERT INTO ChiNhanh
VALUES('Branch1', 'LA', null)
INSERT INTO ChiNhanh
VALUES('Branch2', 'Paris', null)
INSERT INTO  MonAnCuaChiNhanh VALUES('Q1','headquarters')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q2','headquarters')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q3','headquarters')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q4','Branch1')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q5','Branch1')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q7','Branch2')
INSERT INTO  MonAnCuaChiNhanh VALUES('Q8','Branch2')
SELECT * FROM ChiNhanh
INSERT INTO DonHang VALUES('ORDER_1', 'Dang xu li','MSTK1','headquarters')
INSERT INTO DonHang VALUES('ORDER_2', 'Dang xu li', 'MSTK1','headquarters')
SELECT * FROM DonHang

SELECT * FROM MonAnCuaDonHang
INSERT INTO MonAnCuaDonHang VALUES('Q1', 'ORDER_1', 10, 3)
INSERT INTO MonAnCuaDonHang VALUES('Q2', 'ORDER_2', 10, 4)
INSERT INTO MonAnCuaDonHang VALUES('Q4', 'ORDER_1', 10, 5)
INSERT INTO MonAnCuaDonHang VALUES('Q5', 'ORDER_2', 10, 2)

CREATE INDEX index_food ON MonAn(TenMonAn)