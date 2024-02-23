app.controller('billManageCrtl' , function ($scope ,$routeParams , $http , $rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';

    $http({
        method : "GET" ,
        url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
        console.log(data)
            $rootScope.soLuongGH = data.data.listSanPham.length
     })

     $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk

    $scope.message = "";
    $scope.status = true ;
    $scope.tongGiaTri = 0 ;
    $scope.idDuocChon = 0 ;
    $scope.donHang = {
       id: 1 ,
       tenKH:"Đặng Thai Mai",
       sanPham: [
          {
           ten:"Đồng hồ Catier 59HJF0",
           gia:3800000 
          }
        ],
       diaChi:"làng Sen , xã Kim Liên , huyện Nam Đàn , tỉnh Nghệ An",
       sdt:"0978040960",
       ghiChu: "dgiap540@gmail.com"
      }
    $http({
        method : "GET" ,
        url : "http://localhost:3000/don-hang" ,
    }).then(function(data) {
        $scope.dsDonHang= data.data ;
    })



    $scope.xuLiId = function (id) {
        $scope.idDuocChon = id ;
        $scope.tongGiaTri = 0 ;

        $http({
            method : "GET" ,
            url : "http://localhost:3000/don-hang/" + $scope.idDuocChon
        }).then(function(data) {
            $scope.donHang= data.data ;
            $scope.tongGiaTri = data.data.tongTien
        })

        
    }

    $scope.xuLiSua = () => {
        $scope.message = ""
        if ($scope.donHang.tenKH == "") {
            $scope.message = "Không được bỏ trống tên khách hàng !"
            $scope.status = false ;
            return ;
        }

        let regex = /^0[0-9]{9}$/; 

        if (isNaN($scope.donHang.sdt) || !regex.test($scope.donHang.sdt)) {
            $scope.message = "Chỉ được nhập số và đúng định dạng số điện thoại"
            $scope.status = false ;
            return ;
        }

        if ($scope.donHang.diaChi == "") {
            $scope.message = "Không được bỏ trống địa chỉ !"
            $scope.status = false ;
            return ;
        }

        if ($scope.donHang.ghiChu == "") {
            $scope.message = "Không được bỏ trống email và phải đúng định dạng email !"
            $scope.status = false ;
            return ;
        }
        
        $scope.status = true ;
        
        $http({
            method : "PUT" ,
            url : "http://localhost:3000/don-hang/" + $scope.idDuocChon,
            data : $scope.donHang
        }).then(function() {
            alert("Sửa thành công thông tin đơn hàng!")
        })
    }

})