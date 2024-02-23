app.controller('categoryProductManageCrtl' , function ($scope ,$routeParams , $http , $rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';

    $http({
        method : "GET" ,
        url : "http://localhost:3000/danh-muc" ,
    }).then(function(data) {
        $scope.dsDanhMuc= data.data ;
    })

    console.log($routeParams.idTk)

    $http({
        method : "GET" ,
        url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
            $rootScope.soLuongGH = data.data.listSanPham.length
     })
     
     $scope.idDuocChon = 0 ;
     $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk
    $scope.xuLiId =  function (id) {
        $scope.idDuocChon = id ;
    }
    
    $scope.status = true ;
    $scope.danhMuc = {
        ten : ""
    }


    $scope.xuLiThem = () => {
        $scope.message = ""
        if ($scope.danhMuc.ten == "") {
            $scope.message = "Không được bỏ trống tên danh mục !"
            $scope.status = false ;
            return ;
        }
        $scope.status = true ;
        $http({
            method : "POST" ,
            url : "http://localhost:3000/danh-muc" ,
            data : $scope.danhMuc
        }).then(function() {
            alert("Thêm thành công danh mục!")
        })
    }

    $scope.xuLiXoa = () => {
        $http({
            method : "DELETE" ,
            url : "http://localhost:3000/danh-muc/"+ $scope.idDuocChon ,
        }).then(function() {
            alert("Xóa thành công danh mục!")
        })
    }

    $scope.xuLiSua = () => {
        $scope.message = ""
        if ($scope.danhMuc.ten == "") {
            $scope.message = "Không được bỏ trống tên danh mục !"
            $scope.status = false ;
            return ;
        }
        $scope.status = true ;

        $http({
            method : "PUT" ,
            url : "http://localhost:3000/danh-muc/"+ $scope.idDuocChon ,
            data : $scope.danhMuc 
        }).then(function() {
            alert("Sửa thành công tên danh mục!")
        })
    }


})