CREATE DATABASE assignment
GO
USE assignment;
GO
CREATE TABLE BaoVe
(
  MaChiNhanhLamViec VARCHAR(15),
  MaSo              VARCHAR(15) NOT NULL,
  HoVaTenLot        VARCHAR(40),
  Ten               VARCHAR(10),
  SoDienThoai       VARCHAR(10),
  DiaChi            VARCHAR(40),
  NgaySinh          DATE       ,
  Luong             INT        ,
  NgayBatDauLamViec DATE       ,
  SoTK              VARCHAR(14),
  ChiNhanhNganHang  VARCHAR(30),
  ChungChiBaoVe     VARCHAR(15),
  GiamSat           VARCHAR(15),
  GioiTinh          VARCHAR(5) ,
  SoHuuTaiKhoan     VARCHAR(15),
  CONSTRAINT PK_BaoVe PRIMARY KEY (MaSo)
)
GO

CREATE TABLE ChiNhanh
(
  MaChiNhanh VARCHAR(15) NOT NULL,
  DiaChi     VARCHAR(40),
  MaSoQuanLy VARCHAR(15),
  CONSTRAINT PK_ChiNhanh PRIMARY KEY (MaChiNhanh)
)
GO

CREATE TABLE DauBep
(
  MaChiNhanhLamViec VARCHAR(15),
  MaSo              VARCHAR(15) NOT NULL,
  HoVaTenLot        VARCHAR(40),
  Ten               VARCHAR(10),
  SoDienThoai       VARCHAR(10),
  DiaChi            VARCHAR(40),
  NgaySinh          DATE       ,
  ChiNhanhNganHang  VARCHAR(30),
  Luong             INT        ,
  NgayBatDauLamViec DATE       ,
  SoTK              VARCHAR(14),
  MaChungChiNauAn   VARCHAR(15),
  GiamSat           VARCHAR(15),
  GioiTinh          VARCHAR(5) ,
  SoHuuTaiKhoan     VARCHAR(15),
  CONSTRAINT PK_DauBep PRIMARY KEY (MaSo)
)
GO

CREATE TABLE DonHang
(
  MaSoDonHang   VARCHAR(15) NOT NULL,
  TinhTrang     VARCHAR(10),
  DuocDatBoi    VARCHAR(15),
  ThuocChiNhanh VARCHAR(15),
  CONSTRAINT PK_DonHang PRIMARY KEY (MaSoDonHang)
)
GO

CREATE TABLE EmailChiNhanh
(
  MaChiNhanh VARCHAR(15) NOT NULL,
  Email      VARCHAR(30) NOT NULL,
  CONSTRAINT PK_EmailChiNhanh PRIMARY KEY (MaChiNhanh, Email),
)
GO

CREATE TABLE HoaDon
(
  MaHoaDon                 VARCHAR(15) NOT NULL,
  ThoiGianXuatHoaDon       TIME       ,
  MaDonHang                VARCHAR(15),
  MaSoNhanVienXuat         VARCHAR(15),
  MaSoThue                 VARCHAR(15),
  DuocThanhToanBoiTaiKhoan VARCHAR(15),
  CONSTRAINT PK_HoaDon PRIMARY KEY (MaHoaDon)
)
GO

CREATE TABLE KhachHang
(
  MaSoKhachHang VARCHAR(15) NOT NULL,
  Ten           VARCHAR(40),
  SoDienThoai   VARCHAR(10),
  Email         VARCHAR(30),
  CONSTRAINT PK_KhachHang PRIMARY KEY (MaSoKhachHang),
)
GO

CREATE TABLE KhoHang
(
  MaChiNhanh VARCHAR(15)   NOT NULL,
  MaKho      VARCHAR(15)   NOT NULL,
  DienTich   NUMERIC(10,5),
  CONSTRAINT PK_KhoHang PRIMARY KEY (MaChiNhanh, MaKho)
)
GO

CREATE TABLE LanNhapHang
(
  SoLo      INT        NOT NULL,
  MaChiNhanh VARCHAR(15)   NOT NULL,
  MaKho      VARCHAR(15)   NOT NULL,
  NgayNhap  DATE      ,
  CONSTRAINT PK_LanNhapHang PRIMARY KEY (SoLo)
)
GO

CREATE TABLE MaSoNhaPhanPhoi
(
  MaSoNhaPhanPhoi VARCHAR(15) NOT NULL,
  LoaiSanPham     VARCHAR(20) NOT NULL,
  CONSTRAINT PK_MaSoNhaPhanPhoi PRIMARY KEY (MaSoNhaPhanPhoi, LoaiSanPham)
)
GO

CREATE TABLE MonAn
(
  ID INT IDENTITY NOT NULL,
  MaSoMonAn  AS 'Q'+ CAST(ID as VARCHAR(14)) PERSISTED NOT NULL,
  TenMonAn   VARCHAR(100) NOT NULL UNIQUE,
  GiaNiemYet INT NOT NULL,
  MoTa       VARCHAR(1000),
  HinhAnh	 VARCHAR(500) NOT NULL,
  Soluong	 INT NOT NULL,
  DanhMuc	 VARCHAR(100) NOT NULL,
  CONSTRAINT PK_MonAn PRIMARY KEY (MaSoMonAn)
)
GO

CREATE TABLE MonAnCuaChiNhanh
(
  MaSoMonAn  VARCHAR(15) NOT NULL,
  MaChiNhanh VARCHAR(15) NOT NULL,
  CONSTRAINT PK_MonAnCuaChiNhanh PRIMARY KEY (MaSoMonAn, MaChiNhanh)
)
GO

CREATE TABLE MonAnCuaDonHang
(
  MaSoMonAn   VARCHAR(15) NOT NULL,
  MaSoDonHang VARCHAR(15) NOT NULL,
  GiaBan      INT        ,
  SoLuong     INT        ,
  CONSTRAINT PK_MonAnCuaDonHang PRIMARY KEY (MaSoMonAn, MaSoDonHang)
)
GO

CREATE TABLE NguyenLieu
(
  MaNguyenLieu VARCHAR(15) NOT NULL,
  Ten          VARCHAR(10),
  Loai         VARCHAR(20),
  CONSTRAINT PK_NguyenLieu PRIMARY KEY (MaNguyenLieu)
)
GO

CREATE TABLE NguyenLieuCuaKhoHang
(
  MaChiNhanh   VARCHAR(15) NOT NULL,
  MaKho        VARCHAR(15) NOT NULL,
  MaNguyenLieu VARCHAR(15) NOT NULL,
  SoLuong      INT        ,
  DonViTinh    VARCHAR(5) ,
  CONSTRAINT PK_NguyenLieuCuaKhoHang PRIMARY KEY (MaChiNhanh, MaKho, MaNguyenLieu)
)
GO

CREATE TABLE NguyenLieuCuaLanNhap
(
  MaNguyenLieu	VARCHAR(15) NOT NULL,
  SoLo			INT         NOT NULL,
  DonGia		INT			NOT NULL,
  SoLuong		INT			NOT NULL,
  CONSTRAINT PK_NguyenLieuCuaLanNhap PRIMARY KEY (MaNguyenLieu, SoLo)
)
GO

CREATE TABLE NhanVienBanHang
(
  MaChiNhanhLamViec VARCHAR(15),
  MaSo              VARCHAR(15) NOT NULL,
  HoVaTenLot        VARCHAR(40),
  Ten               VARCHAR(10),
  SoDienThoai       VARCHAR(10),
  DiaChi            VARCHAR(40),
  NgaySinh          DATE       ,
  Luong             INT        ,
  NgayBatDauLamViec DATE       ,
  SoTK              VARCHAR(14),
  ChiNhanhNganHang  VARCHAR(30),
  GiamSat           VARCHAR(15),
  GioiTinh          VARCHAR(5) ,
  SoHuuTaiKhoan     VARCHAR(15),
  CONSTRAINT PK_NhanVienBanHang PRIMARY KEY (MaSo)
)
GO

CREATE TABLE NhaPhanPhoi
(
  MaSoNhaPhanPhoi VARCHAR(15) NOT NULL,
  TenNhaPhanPhoi  VARCHAR(20) NOT NULL,
  CONSTRAINT PK_NhaPhanPhoi PRIMARY KEY (MaSoNhaPhanPhoi)
)
GO

CREATE TABLE NhaPhanPhoiCuaLanNhap
(
  SoLo            INT         NOT NULL,
  MaSoNhaPhanPhoi VARCHAR(15) NOT NULL,
  CONSTRAINT PK_NhaPhanPhoiCuaLanNhap PRIMARY KEY (SoLo, MaSoNhaPhanPhoi)
)
GO

CREATE TABLE QuanLy
(
  MaChiNhanhLamViec VARCHAR(15),
  MaSo              VARCHAR(15) NOT NULL,
  HoVaTenLot        VARCHAR(40),
  Ten               VARCHAR(10),
  SoDienThoai       VARCHAR(10),
  DiaChi            VARCHAR(40),
  NgaySinh          DATE       ,
  Luong             INT        ,
  NgayBatDauLamViec DATE       ,
  SoTK              VARCHAR(14),
  ChiNhanhNganHang  VARCHAR(30),
  KinhNghiem        VARCHAR(15),
  GiamSat           VARCHAR(15),
  GioiTinh          CHAR,
  SoHuuTaiKhoan     VARCHAR(15) NOT NULL,
  CONSTRAINT PK_QuanLy PRIMARY KEY (MaSo)
)
GO

CREATE TABLE SoDienThoaiChiNhanh
(
  MaChiNhanh  VARCHAR(15) NOT NULL,
  SoDienThoai VARCHAR(10) NOT NULL,
  CONSTRAINT PK_SoDienThoaiChiNhanh PRIMARY KEY (MaChiNhanh, SoDienThoai)
)
GO

CREATE TABLE TaiKhoanKhachHang
(
  MaSoTaiKhoan   VARCHAR(15) NOT NULL,
  TenTaiKhoan    VARCHAR(20),
  MatKhau        VARCHAR(15),
  TenNguoiSuDung VARCHAR(10),
  DiemThuong     INT        ,
  SoHuuBoi       VARCHAR(15),
  CONSTRAINT PK_TaiKhoanKhachHang PRIMARY KEY (MaSoTaiKhoan),
)
GO

CREATE TABLE TaiKhoanNhanVien
(
  MaSoTaiKhoan   VARCHAR(15) NOT NULL,
  TenTaiKhoan    VARCHAR(20),
  MatKhau        VARCHAR(15),
  TenNguoiSuDung VARCHAR(10),
  SoNgayLamViec  INT        ,
  CONSTRAINT PK_TaiKhoanNhanVien PRIMARY KEY (MaSoTaiKhoan),
)
GO

ALTER TABLE BaoVe
  ADD CONSTRAINT FK_TaiKhoanNhanVien_TO_BaoVe
    FOREIGN KEY (SoHuuTaiKhoan)
    REFERENCES TaiKhoanNhanVien (MaSoTaiKhoan)
GO

ALTER TABLE BaoVe
  ADD CONSTRAINT FK_BaoVe_TO_BaoVe
    FOREIGN KEY (GiamSat)
    REFERENCES BaoVe (MaSo)
GO

ALTER TABLE BaoVe
  ADD CONSTRAINT FK_ChiNhanh_TO_BaoVe
    FOREIGN KEY (MaChiNhanhLamViec)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE DauBep
  ADD CONSTRAINT FK_ChiNhanh_TO_DauBep
    FOREIGN KEY (MaChiNhanhLamViec)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE DauBep
  ADD CONSTRAINT FK_DauBep_TO_DauBep
    FOREIGN KEY (GiamSat)
    REFERENCES DauBep (MaSo)
GO

ALTER TABLE DauBep
  ADD CONSTRAINT FK_TaiKhoanNhanVien_TO_DauBep
    FOREIGN KEY (SoHuuTaiKhoan)
    REFERENCES TaiKhoanNhanVien (MaSoTaiKhoan)
GO

ALTER TABLE QuanLy
  ADD CONSTRAINT FK_ChiNhanh_TO_QuanLy
    FOREIGN KEY (MaChiNhanhLamViec)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE QuanLy
  ADD CONSTRAINT FK_TaiKhoanNhanVien_TO_QuanLy
    FOREIGN KEY (SoHuuTaiKhoan)
    REFERENCES TaiKhoanNhanVien (MaSoTaiKhoan)
GO

ALTER TABLE QuanLy
  ADD CONSTRAINT FK_QuanLy_TO_QuanLy
    FOREIGN KEY (GiamSat)
    REFERENCES QuanLy (MaSo)
GO

ALTER TABLE ChiNhanh
  ADD CONSTRAINT FK_QuanLy_TO_ChiNhanh
    FOREIGN KEY (MaSoQuanLy)
    REFERENCES QuanLy (MaSo)
GO

ALTER TABLE SoDienThoaiChiNhanh
  ADD CONSTRAINT FK_ChiNhanh_TO_SoDienThoaiChiNhanh
    FOREIGN KEY (MaChiNhanh)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE EmailChiNhanh
  ADD CONSTRAINT FK_ChiNhanh_TO_EmailChiNhanh
    FOREIGN KEY (MaChiNhanh)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE KhoHang
  ADD CONSTRAINT FK_ChiNhanh_TO_KhoHang
    FOREIGN KEY (MaChiNhanh)
    REFERENCES ChiNhanh (MaChiNhanh)
GO
ALTER TABLE LanNhapHang
  ADD CONSTRAINT FK_LanNhapHang_TO_KhoHang
    FOREIGN KEY (MaChiNhanh, MaKho)
    REFERENCES KhoHang (MaChiNhanh, MaKho)
GO
ALTER TABLE NguyenLieuCuaKhoHang
  ADD CONSTRAINT FK_KhoHang_TO_NguyenLieuCuaKhoHang
    FOREIGN KEY (MaChiNhanh, MaKho)
    REFERENCES KhoHang (MaChiNhanh, MaKho)
GO

ALTER TABLE NguyenLieuCuaKhoHang
  ADD CONSTRAINT FK_NguyenLieu_TO_NguyenLieuCuaKhoHang
    FOREIGN KEY (MaNguyenLieu)
    REFERENCES NguyenLieu (MaNguyenLieu)
GO

ALTER TABLE NguyenLieuCuaLanNhap
  ADD CONSTRAINT FK_NguyenLieu_TO_NguyenLieuCuaLanNhap
    FOREIGN KEY (MaNguyenLieu)
    REFERENCES NguyenLieu (MaNguyenLieu)
GO

ALTER TABLE NguyenLieuCuaLanNhap
  ADD CONSTRAINT FK_LanNhapHang_TO_NguyenLieuCuaLanNhap
    FOREIGN KEY (SoLo)
    REFERENCES LanNhapHang (SoLo)
GO

ALTER TABLE NhaPhanPhoiCuaLanNhap
  ADD CONSTRAINT FK_LanNhapHang_TO_NhaPhanPhoiCuaLanNhap
    FOREIGN KEY (SoLo)
    REFERENCES LanNhapHang (SoLo)
GO

ALTER TABLE NhaPhanPhoiCuaLanNhap
  ADD CONSTRAINT FK_NhaPhanPhoi_TO_NhaPhanPhoiCuaLanNhap
    FOREIGN KEY (MaSoNhaPhanPhoi)
    REFERENCES NhaPhanPhoi (MaSoNhaPhanPhoi)
GO

ALTER TABLE MaSoNhaPhanPhoi
  ADD CONSTRAINT FK_NhaPhanPhoi_TO_MaSoNhaPhanPhoi
    FOREIGN KEY (MaSoNhaPhanPhoi)
    REFERENCES NhaPhanPhoi (MaSoNhaPhanPhoi)
GO

ALTER TABLE TaiKhoanKhachHang
  ADD CONSTRAINT FK_KhachHang_TO_TaiKhoanKhachHang
    FOREIGN KEY (SoHuuBoi)
    REFERENCES KhachHang (MaSoKhachHang)
GO

ALTER TABLE DonHang
  ADD CONSTRAINT FK_TaiKhoanKhachHang_TO_DonHang
    FOREIGN KEY (DuocDatBoi)
    REFERENCES TaiKhoanKhachHang (MaSoTaiKhoan)
GO

ALTER TABLE DonHang
  ADD CONSTRAINT FK_ChiNhanh_TO_DonHang
    FOREIGN KEY (ThuocChiNhanh)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE HoaDon
  ADD CONSTRAINT FK_DonHang_TO_HoaDon
    FOREIGN KEY (MaDonHang)
    REFERENCES DonHang (MaSoDonHang)
GO

ALTER TABLE HoaDon
  ADD CONSTRAINT FK_TaiKhoanKhachHang_TO_HoaDon
    FOREIGN KEY (DuocThanhToanBoiTaiKhoan)
    REFERENCES TaiKhoanKhachHang (MaSoTaiKhoan)
GO

ALTER TABLE NhanVienBanHang
  ADD CONSTRAINT FK_ChiNhanh_TO_NhanVienBanHang
    FOREIGN KEY (MaChiNhanhLamViec)
    REFERENCES ChiNhanh (MaChiNhanh)
GO

ALTER TABLE NhanVienBanHang
  ADD CONSTRAINT FK_NhanVienBanHang_TO_NhanVienBanHang
    FOREIGN KEY (GiamSat)
    REFERENCES NhanVienBanHang (MaSo)
GO

ALTER TABLE NhanVienBanHang
  ADD CONSTRAINT FK_TaiKhoanNhanVien_TO_NhanVienBanHang
    FOREIGN KEY (SoHuuTaiKhoan)
    REFERENCES TaiKhoanNhanVien (MaSoTaiKhoan)
GO

ALTER TABLE HoaDon
  ADD CONSTRAINT FK_NhanVienBanHang_TO_HoaDon
    FOREIGN KEY (MaSoNhanVienXuat)
    REFERENCES NhanVienBanHang (MaSo)
GO

ALTER TABLE MonAnCuaDonHang
  ADD CONSTRAINT FK_MonAn_TO_MonAnCuaDonHang
    FOREIGN KEY (MaSoMonAn)
    REFERENCES MonAn (MaSoMonAn)
GO

ALTER TABLE MonAnCuaDonHang
  ADD CONSTRAINT FK_DonHang_TO_MonAnCuaDonHang
    FOREIGN KEY (MaSoDonHang)
    REFERENCES DonHang (MaSoDonHang)
GO

ALTER TABLE MonAnCuaChiNhanh
  ADD CONSTRAINT FK_MonAn_TO_MonAnCuaChiNhanh
    FOREIGN KEY (MaSoMonAn)
    REFERENCES MonAn (MaSoMonAn)
GO

ALTER TABLE MonAnCuaChiNhanh
  ADD CONSTRAINT FK_ChiNhanh_TO_MonAnCuaChiNhanh
    FOREIGN KEY (MaChiNhanh)
    REFERENCES ChiNhanh (MaChiNhanh)
GO