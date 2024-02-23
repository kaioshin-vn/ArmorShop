app.controller('productDetailCrtl' , function ($scope , $http , $routeParams ,$rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';

    $scope.sanPham = {} ;
    $scope.status = true ;
    $scope.statusAdd = true ;
    $scope.message = "" ;
    $scope.sl = 1

    let id = $routeParams.idTk

    $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk
    $scope.id = $routeParams.id

    $scope.soLuongGH = 0;

    console.log($routeParams)

    let soLuong = document.getElementById("soLuong")
    $http({
        method : "GET" ,
        url : "http://localhost:3000/san-pham/" +  $routeParams.id,
    }).then(function(data) {
        $scope.sanPham= data.data ;
        $scope.sanPham.giaThatSP = $scope.sanPham.gia / 100 * (100 - $scope.sanPham.giamGia ) ;
    })
   
    $http({
        method : "GET" ,
        url : "http://localhost:3000/tai-khoan/" + id,
    }).then(function(data) {
        console.log(data)
            $rootScope.soLuongGH = data.data.listSanPham.length
     })

    $http({
        method : "GET" ,
        url : "http://localhost:3000/san-pham" ,
    }).then(function(data) {
        $scope.dsSanPham= data.data ;
        let arrNumber = [];
        $scope.dsSanPhamNN = [];

        for (let index = 0; index < 4 ; index++) {
            let stop = true;
            while(stop){
                let numberRamdom = Math.floor(Math.random() * 8);
                if ( !arrNumber.some((nb) => {
                    return nb == numberRamdom ;
                }) ) {
                    arrNumber.push(numberRamdom) ;
                    stop = false ;
                }
                else{
                    stop = true ;
                }
            }
            $scope.dsSanPhamNN.push($scope.dsSanPham[arrNumber[index]]);
        }
        $scope.dsSanPhamNN.forEach(item => {
            item.giaThatSP = item.gia / 100 * (100 - item.giamGia ) ;
        });
    })


    $scope.minus = () => {
        soLuong.value -=1 ;
        $scope.checkNumber()
    }

    $scope.plus = () => {
        $scope.checkNumber()
        soLuong.value = Number(soLuong.value) + 1  ;
    }

    $scope.checkNumber = () => {
        if (isNaN(soLuong.value) || Number(soLuong.value) > $scope.sanPham.soLuong ||Number(soLuong.value) <= 0 ) {
            soLuong.value = 1;
            $scope.status = false ;
            $scope.message = "Hãy nhập số và ít hơn số lượng hàng đang có !"
        }
        else{
            $scope.status = true ;
        }
    }

    $scope.xuLiThemGioHang = (e) => {
        $http({
            method : "GET" ,
            url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk ,
        }).then( function(data){
            let trungSp = false ;
            $scope.tk = data.data ;
            $scope.tk.listSanPham.forEach ( (e , index) => {
                if ( e.idSanPham == $routeParams.id) {
                    $scope.tk.listSanPham[index].soLuong = Number($scope.tk.listSanPham[index].soLuong) + Number(soLuong.value)
                    trungSp = true ;
                }
            })

            
            if (!trungSp) {
                $scope.tk.listSanPham.push({
                    idSanPham : $routeParams.id ,
                    soLuong : soLuong.value.toString()
                })
            }

            
            $http({
                method : "PUT" ,
                url : "http://localhost:3000/tai-khoan/" + $routeParams.idTk ,
                data : $scope.tk
            }).then( function(data){
                
                $scope.statusAdd = true ;
                $scope.message = "Đã thêm thành công vào giỏ hàng !"
                alert("Đã thêm thành công vào giỏ hàng!")
            })
        })
    }

})