app.controller('searchCrtl' , function ($scope , $routeParams , $http ,$rootScope) {
    let header = document.getElementById('header') 
    header.style.display = 'block';
    $scope.dsSanpham = []
    $scope.dsDanhMuc = []
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
        url : "https://armor-json-server.onrender.com/danh-muc" ,
    }).then(function(data) {
        $scope.dsDanhMuc = data.data
        
    })

    $scope.idTk = $routeParams.idTk
    $rootScope.idTk = $routeParams.idTk

    $http({
        method : "GET" ,
        url : "https://armor-json-server.onrender.com/tai-khoan/" + $routeParams.idTk,
    }).then(function(data) {
        console.log(data)
            $rootScope.soLuongGH = data.data.listSanPham.length
     })

     let search = document.getElementById("search")

     $scope.find = () => {
        $scope.search =  search.value
     }
     $scope.search = {}

     let select = document.getElementById("select")
     select.onchange = () => {
        $scope.search = {}
        if (select.value == "") {
            $http({
                method : "GET" ,
                url : "https://armor-json-server.onrender.com/san-pham" ,
            }).then(function(data) {
                $scope.dsSanpham = data.data
                $scope.dsSanpham.forEach(item => {
                    item.giaThatSP = item.gia / 100 * (100 - item.giamGia ) ;
                });
            })
        }
        else{
            $http({
                method : "GET" ,
                url : "https://armor-json-server.onrender.com/san-pham" ,
                params : {
                    idDanhMuc : select.value 
                }
            }).then(function(data) {
                $scope.dsSanpham = data.data
                $scope.dsSanpham.forEach(item => {
                    item.giaThatSP = item.gia / 100 * (100 - item.giamGia ) ;
                });
            })
        }
        
     }

})