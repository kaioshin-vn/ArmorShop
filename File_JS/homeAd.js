app.controller('homeCtrlAd' , function ($scope , $http , $routeParams ,$rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'none';


    $scope.id = $routeParams.id
    let dangNhap = $routeParams.dangNhap ;
    $rootScope.soLuongGH = 0 ;
    $rootScope.idTk = $routeParams.id
    $rootScope.idTk = $routeParams.id
    $scope.idTk = $routeParams.id


    let save = document.getElementById("save");
    save.value = dangNhap ;

    let cart = document.getElementById('cart');
    let login = document.getElementById('login');
    let register = document.getElementById('register');
    let account = document.getElementById('account');

    let idCart = document.getElementById('idCart');
    let idLogin = document.getElementById('idLogin');
    let idRegister = document.getElementById('idRegister');
    let idAccount = document.getElementById('idAccount');

    
    if (dangNhap === "0" || $rootScope.idTk == "null") {
        cart.style.display = "none"
        login.style.display = "inline-block"
        register.style.display = "inline-block"
        account.style.display = "none"

        idCart.style.display = "none"
        idLogin.style.display = "inline-block"
        idRegister.style.display = "inline-block"
        idAccount.style.display = "none"
    }
    else{
        cart.style.display = "inline-block"
        login.style.display = "none"
        account.style.display = "inline-block"
        register.style.display = "none"

        idCart.style.display = "inline-block"
        idLogin.style.display = "none"
        idAccount.style.display = "inline-block"
        idRegister.style.display = "none"
    }

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/san-pham" ,
    }).then(function(data) {
        $scope.dsSanpham = data.data
        $scope.dsSanpham.forEach(item => {
            item.giaThatSP = item.gia / 100 * (100 - item.giamGia ) ;
        });
        
    })

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.id ,
    }).then(function(data) {
        console.log(data)
            $scope.soLuongGH = data.data.listSanPham.length
        })

        if (dangNhap != 0) {
            $http({
                method : "GET" ,
                url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.id ,
            }).then(function(data) {
                console.log(data)
                    $scope.soLuongGH = data.data.listSanPham.length
                })
        }

    $scope.xuLiMoiNhat = () => {
        for (let i = 0; i < $scope.dsSanpham.length; i++) {
            for (let f = i+1; f < $scope.dsSanpham.length; f++) {
                if (Date.parse($scope.dsSanpham[i].ngayThem) < Date.parse($scope.dsSanpham[f].ngayThem)) {
                    var temp = $scope.dsSanpham[i] ;
                    $scope.dsSanpham[i] = $scope.dsSanpham[f] ;
                    $scope.dsSanpham[f] = temp ;
                }
            }
        }
    }

    $scope.xuLiBanChay = () => {
        for (let i = 0; i < $scope.dsSanpham.length; i++) {
            for (let f = i+1; f < $scope.dsSanpham.length; f++) {
                if ($scope.dsSanpham[i].daBan < $scope.dsSanpham[f].daBan) {
                    var temp = $scope.dsSanpham[i] ;
                    $scope.dsSanpham[i] = $scope.dsSanpham[f] ;
                    $scope.dsSanpham[f] = temp ;
                }
            }
        }
    }

})