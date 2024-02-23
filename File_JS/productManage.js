app.controller('productManageCrtl' , function ($scope , $http , $routeParams , $rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';

    $http({
        method : "GET" ,
        url : "http://localhost:3000/san-pham" ,
    }).then(function(data) {
        $scope.dsSanPham= data.data ;
    })
    $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk

    $http({
        method : "GET" ,
        url : "http://localhost:3000/danh-muc" ,
    }).then(function(data) {
        $scope.dsDanhMuc= data.data ;
    })
    $scope.idTk = $rootScope.idTk
    console.log($scope.idTk)
    const currentDate = new Date();

// Lấy thông tin về ngày, tháng, năm
const day = currentDate.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và đảm bảo có 2 chữ số
const year = currentDate.getFullYear();

// Tạo định dạng "MM/DD/YYYY"
const formattedDate = `${month}/${day}/${year}`;


    $scope.idDuocChon = 0 ;
    $scope.status = true ;
    $scope.sanPham = {
     idDanhMuc : 0 ,
     ten :"",
     hang :"",
     moTa :"",
     gia : 0,
     ngayThem :formattedDate,
     giamGia : 0,
     ma :"",
     daBan : 0,
     anh : [
       `../../Resource/img/item${Math.floor(Math.random() * 8)}.jpg`,
       "",
       "",
       "",
       ""
      ],
      soLuong : 0 
    }



    $http({
        method : "GET" ,
        url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
        console.log(data)
            $rootScope.soLuongGH = data.data.listSanPham.length
     })


    $scope.xuLiId =  function (id) {
        $scope.idDuocChon = id ;
    }
    


    $scope.xuLiThem = () => {
        
        $scope.message = ""
        if ($scope.sanPham.ten == "" ||$scope.sanPham.ten== undefined ) {
            $scope.message = "Không được bỏ trống tên sản phẩm !"
            $scope.status = false ;
            return ;
        }

        if (isNaN($scope.sanPham.gia) || $scope.sanPham.gia == 0) {
            $scope.message = "Chỉ được nhập số và giá phải lớn hơn 0!"
            $scope.status = false ;
            return ;
        }

        if (isNaN($scope.sanPham.soLuong) || $scope.sanPham.soLuong == 0) {
            $scope.message = "Chỉ được nhập số và số lượng phải lớn hơn 0!"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPham.hang == "") {
            $scope.message = "Không được bỏ trống tên hãng !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPham.ma == "") {
            $scope.message = "Không được bỏ trống mã !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPham.idDanhMuc == "") {
            $scope.message = "Hãy chọn danh mục !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPham.moTa == "") {
            $scope.message = "Không được bỏ trống mô tả !"
            $scope.status = false ;
            return ;
        }
        
        $scope.status = true ;

        $http({
            method : "POST" ,
            url : "http://localhost:3000/san-pham" ,
            data : $scope.sanPham
        }).then(function() {
            alert("Thêm thành công sản phẩm mới!")
        })
    }

    $scope.xuLiXoa = () => {
        $http({
            method : "DELETE" ,
            url : "http://localhost:3000/san-pham/"+ $scope.idDuocChon ,
        }).then(function() {
            alert("Xóa thành công sản phẩm!")
        })
    }
})