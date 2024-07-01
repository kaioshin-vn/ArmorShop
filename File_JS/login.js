app.controller('loginCrtl' , function ($scope , $http , $location) {
    let header = document.getElementById('header') 
    header.style.display = 'none';

    $scope.status = true;
    $scope.taiKhoan = "";
    $scope.matKhau = "";
    

    $scope.xuLiDN = () => {
        if ($scope.taiKhoan === "" || $scope.matKhau === "") {
            $scope.status = false;
            $scope.message = "Không bỏ trống tài khoản và mật khẩu !"
            return ;
        }

        $http({
            method : "GET" ,
            url : "https://armor-json-server.onrender.com/tai-khoan" ,
        }).then(function(data) {
            $scope.dsTK = data.data ;
            $scope.dsTK = $scope.dsTK.filter((tk) => {
                return tk.id == $scope.taiKhoan && tk.matKhau == $scope.matKhau
            })
            if ($scope.dsTK.length != 0 ) {
                if ($scope.dsTK[0].loaiTaiKhoan == "kh") {
                    $location.path(`/home/1/${$scope.taiKhoan}`) ;
                }
                else{
                    $location.path(`/admin/home/1/${$scope.taiKhoan}`) ;
                }
            }
            else{
                $scope.message = "Tài khoản hoặc mật khẩu bạn vừa nhập không chính xác"
                $scope.status = false;
            }
        })


    }
    
})