app.controller('updateProductCrtl' , function ($scope , $http , $routeParams , $rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';

    $scope.status = true ;
    $scope.sanPhamUpdate = {
        idDanhMuc : 0 ,
        ten :"",
        hang :"",
        moTa :"",
        gia : 0,
        ngayThem :"",
        giamGia : 0,
        ma :"",
        daBan : 0,
        anh : [
        "../../Resource/img/item4.jpg",
        "",
        "",
        "",
        ""
        ],
        soLuong : 0 
       }

       $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
        console.log(data)
            $rootScope.soLuongGH = data.data.listSanPham.length
     })


    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/san-pham/" + $routeParams.id ,
    }).then(function(data) {
        $scope.sanPhamUpdate = data.data;
        console.log($scope.sanPhamUpdate)
    })

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/danh-muc" ,
    }).then(function(data) {
        $scope.dsDanhMuc= data.data ;
    })

    $scope.xuLiSua = () => {
        $scope.message = ""
        if ($scope.sanPhamUpdate.ten == "") {
            $scope.message = "Không được bỏ trống tên sản phẩm !"
            $scope.status = false ;
            return ;
        }

        if (isNaN($scope.sanPhamUpdate.gia) || $scope.sanPhamUpdate.gia == 0) {
            $scope.message = "Chỉ được nhập số và giá phải lớn hơn 0!"
            $scope.status = false ;
            return ;
        }

        if (isNaN($scope.sanPhamUpdate.soLuong) || $scope.sanPhamUpdate.soLuong == 0) {
            $scope.message = "Chỉ được nhập số và số lượng phải lớn hơn 0!"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPhamUpdate.hang == "") {
            $scope.message = "Không được bỏ trống tên hãng !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPhamUpdate.ma == "") {
            $scope.message = "Không được bỏ trống mã !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPhamUpdate.idDanhMuc == "") {
            $scope.message = "Hãy chọn danh mục !"
            $scope.status = false ;
            return ;
        }

        if ($scope.sanPhamUpdate.moTa == "") {
            $scope.message = "Không được bỏ trống mô tả !"
            $scope.status = false ;
            return ;
        }
        if (isNaN($scope.sanPhamUpdate.giamGia) || Number($scope.sanPhamUpdate.giamGia)> 99 || Number($scope.sanPhamUpdate.giamGia) < 1) {
            $scope.message = "Chỉ được nhập số và không giảm giá vô lí !"
            $scope.status = false ;
            return ;
        }
        
        $scope.status = true ;
        

        
        
        $http({
            method : "PUT" ,
            url : "https://armor-json-server.onrender.com/san-pham/" + $routeParams.id ,
            data : $scope.sanPhamUpdate
        }).then(function() {
            alert("Sửa thành công thông tin sản phẩm!")
        })
    }
})