app.controller('cartCrtl' , function ($scope , $http , $routeParams , $rootScope,$location) {
    let header = document.getElementById('header') 
    header.style.display = 'block';
    $scope.themVaoGH = false ;
    let muaHang = document.getElementById("click-buy")
    let listCheck = document.getElementsByName("checkbox")
    let listPrice = [];
    disabele();

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
            $rootScope.soLuongGH = data.data.listSanPham.length
     })
    $rootScope.idTk = $routeParams.idTk
    $scope.idTk = $routeParams.idTk

    $scope.toTal = 0;

    $rootScope.idTk = $routeParams.idTk

    $scope.all = () => {
        listCheck.forEach( (e , index) => {
            e.checked = true;
        })
        Sum();
        unDisabele();
    }

    $scope.delete = () => {
        listCheck.forEach( (e , index) => {
            e.checked = false;
        })
        Sum();
        disabele();
    }




    function disabele () {
        muaHang.disabled = true;
        muaHang.style.cursor ='not-allowed';
        muaHang.style.background = 'rgb(191, 191, 191)';
    }

    function unDisabele () {
        muaHang.disabled = false;
        muaHang.style.cursor ='pointer';
        muaHang.style.background = 'rgb(174, 255, 250)';
    }

    $scope.xuLiChon = function (i) {
        Sum();
    }

    function Sum () {
        let checked = false;
        listPrice = []
        listCheck.forEach( (e , index) => {
            if (e.checked == true) {
                checked = true
                let sp = $scope.SPGioHang[index] ;
                listPrice.push(( sp.gia / 100 * (100 - sp.giamGia ) ) * sp.soLuongSP)
            }
        })
        if (!checked) {
            listPrice = []
        }
        if (listPrice.length != 0) {
            $scope.toTal = 0
            $scope.toTal = listPrice.reduce(function(acc, current) {
                return acc + current;
              }, 0);
            unDisabele();
        }
        else{
            $scope.toTal = 0
            disabele();
        }
    }

    function Price (index) {
        var sp = $scope.SPGioHang[index];
        sp.giaThatSP = (( sp.gia / 100 * (100 - sp.giamGia ) ) * sp.soLuongSP)
    }

    $scope.gioHang = []
    $rootScope.idTk =  $routeParams.idTk;
    $scope.tk = {}
    $scope.SPGioHang = []

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
            $rootScope.soLuongGH = data.data.listSanPham.length
            $scope.gioHang = data.data.listSanPham ;
            $scope.tk = data.data ;
            console.log($scope.tk )
            $scope.gioHang.forEach(element => {
                $http({
                    method : "GET" ,
                    url : "https://armor-json-server.onrender.com/san-pham/" + element.idSanPham ,
                }).then(function(response) {
                    response.data.soLuongSP = element.soLuong;
                    response.data.soLuongBanDau = element.soLuong;
                    response.data.giaThatSP = ( response.data.gia / 100 * (100 - response.data.giamGia ) ) * response.data.soLuongSP
                    $scope.SPGioHang.push(response.data)
                })
            });

     })

     $scope.xuLiMuaHang = () => {
        let arr = []
        let stringInfo = "" ;
        listCheck.forEach( (e , index) => {
            if (e.checked == true) {
                arr.push($scope.SPGioHang[index].id +"_" + $scope.SPGioHang[index].soLuongSP.toString());
            }
        })
        stringInfo = arr.join("-")

        $location.path(`/bill-accept/${stringInfo}/${$routeParams.idTk}`)
     }

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
            $scope.listSanPham = data.data.listSanPham
            if ($routeParams.idSp != "null") {
                $http({
                    method : "GET" ,
                    url : "https://armor-json-server.onrender.com/san-pham/" + $routeParams.idSp,
                }).then(function(response) {
                            $scope.spMuaLuon =  response.data
                            $scope.themVaoGH = true ;
                 })
            }
        })

        $scope.checkNumber = (id) => {
            if (Number($scope.SPGioHang[id].soLuongSP) > $scope.SPGioHang[id].soLuong || $scope.SPGioHang[id].soLuongSP <=0 || isNaN($scope.SPGioHang[id].soLuongSP)) {
                $scope.SPGioHang[id].soLuongSP = $scope.SPGioHang[id].soLuongBanDau
            }
        }

        $scope.plus = (id) => {
            $scope.SPGioHang[id].soLuongSP =Number($scope.SPGioHang[id].soLuongSP) + 1;
            if (Number($scope.SPGioHang[id].soLuongSP) > $scope.SPGioHang[id].soLuong) {
                $scope.SPGioHang[id].soLuongSP = $scope.SPGioHang[id].soLuongBanDau
            }
            Price(id);
            Sum();
        }

    $scope.minus = (id) => {
        $scope.SPGioHang[id].soLuongSP -= 1;
        if ($scope.SPGioHang[id].soLuongSP <=0) {
            $scope.SPGioHang[id].soLuongSP = $scope.SPGioHang[id].soLuongBanDau;
        }
        Sum();
        Price(id);
    }

    let idDC = 0 ;

    $scope.xuLiId = (id) => {
        idDC = id ;
    }

        $scope.xuLiXoa = () => {
            $http({
                method : "GET" ,
                url : "https://armor-json-server.onrender.com/tai-khoan/"+ $routeParams.idTk  ,
            }).then(function(data) {
                let tk = data.data ;
                tk.listSanPham = tk.listSanPham.filter ( (e) => {
                    return e.idSanPham != idDC
                })
                console.log(tk.listSanPham)
                $http({
                    method : "PUT" ,
                    url : "https://armor-json-server.onrender.com/tai-khoan/"+ $routeParams.idTk  ,
                    data : tk 
                })
            }).then(()=> {
                alert("Xóa sản phẩm khỏi giỏ hàng thành công")
            })
        }
    


})