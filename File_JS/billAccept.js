app.controller('billAcceptCtrl' , function ($scope,$routeParams , $http , $rootScope , $location ) {
    let header = document.getElementById('header') 
    header.style.display = 'block';
    $scope.toTal = 0 ;

    $rootScope.idTk = $routeParams.idTk;
    $scope.id = $routeParams.idTk;
    $scope.ttDonHang = {
        tenKH:"",
        sanPham: [
          {
           ten:"",
           soLuong:0 
          }
        ],
        diaChi:"",
        sdt:"",
        ghiChu: "",
        tongTien : 0
    }
    $scope.donHang = []
    let info = $routeParams.idSp ;
    $scope.status = true;

    $scope.sp = []
    info.split("-").forEach(element => {
        let spString = element.split("_")
        $scope.sp.push({
            idSp : spString[0],
            soLuong : spString[1]
        })
    });


    $http({
        method : "GET" ,
        url : "http://localhost:3000/tai-khoan/" + $rootScope.idTk,
    }).then(function(data) {
            $rootScope.soLuongGH = data.data.listSanPham.length
     })

     $scope.sp.forEach((e) => {
        $http({
            method : "GET" ,
            url : "http://localhost:3000/san-pham/" + e.idSp
        }).then(function(data){
            let sp = data.data
            $scope.donHang.push({
                id : sp.id,
                ten : sp.ten,
                anh : sp.anh,
                gia :  sp.gia / 100 * (100 - sp.giamGia ) ,
                soLuong : Number(e.soLuong)
            })
        }).then(()=> {
            console.log($scope.donHang)
            $scope.donHang.forEach((e) => {
                $scope.toTal += e.gia*e.soLuong
            })
        })
     })

     $scope.xuLiDatHang = () => {
    

        $scope.message = ""
        if ($scope.ttDonHang.tenKH == "" ||$scope.ttDonHang.tenKH== undefined ) {
            $scope.message = "Không được bỏ trống tên !"
            $scope.status = false ;
            return ;
        }

        let regex = /^0[0-9]{9}$/; 

        if (isNaN($scope.ttDonHang.sdt) || !regex.test($scope.ttDonHang.sdt)) {
            $scope.message = "Chỉ được nhập số và đúng định dạng số điện thoại"
            $scope.status = false ;
            return ;
        }

        if ( $scope.ttDonHang.diaChi == "" || $scope.ttDonHang.diaChi== undefined) {
            $scope.message = "Không bỏ trống địa chỉ!"
            $scope.status = false ;
            return ;
        }

        let arrSp = [];
        $scope.donHang.forEach( (e ) => {
            arrSp.push({
                ten: e.ten,
                soLuong: e.soLuong
            })
        })



        $scope.ttDonHang.sanPham = arrSp;
        $scope.ttDonHang.tongTien = $scope.toTal + 160000

        $http({
            method : "POST" ,
            url : "http://localhost:3000/don-hang",
            data : $scope.ttDonHang
        }).then(function(response) {
            

            $http({
                method : "GET" ,
                url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk,
            }).then(function(response) {
                let tk = response.data ;
                $scope.sp.forEach((e) => {
                        tk.listSanPham.forEach ( (it,index) => {
                        if (it.idSanPham == e.idSp) {
                            tk.listSanPham.splice(index,1)
                        }
                    })
                })
                $http({
                    method : "PUT" ,
                    url : "http://localhost:3000/tai-khoan/"+ $routeParams.idTk  ,
                    data : tk 
                }).then((rp) => {
                    alert("Đặt hàng thành công !")
                    if (rp.data.loaiTaiKhoan == "ad") {
                        $location.path(`/admin/home/1/${$routeParams.idTk}`)
                    }
                    else{
                        $location.path(`/home/1/${$routeParams.idTk}`)
                    }
                })
            })
            
         })
    }

    

})