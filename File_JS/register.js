app.controller('registerCtrl' , function ($scope , $http , $location) {
    let header = document.getElementById('header') 
    header.style.display = 'none';

    let process = document.getElementsByName("process");
        let gender = document.getElementsByClassName("gender");
        let submit = document.getElementById('submit');
        let checkGender = true;
        let noTice = document.querySelector('.notice');
        let email = document.getElementById('email');
        let select = document.getElementById("option")
        let checkEmail = false;
        let checkTk = true ;
        let nhapLaiTaiKhoan = false;
        let gioiTinh1 = 0 ;
        console.log(email)
        window.onload = function (){
                submit.disabled = true;
                submit.style.cursor ='not-allowed';
                submit.value = "Nhập đủ thông tin";
                submit.style.background = 'linear-gradient(to right, #ff53fc, #3e4258)'
            }
        for (let index = 0; index < gender.length; index++) {
            gender[index].onclick = ()=>{
                gioiTinh1 = Number(index);
                checkGender = true;
                disabled();
            }
        }
        for (let index = 0; index < process.length; index++) {
            
            process[index].onblur = function (){
            if(!process[index].value){
                process[index].style.backgroundColor = '#ffff44';
                process[index].style.borderTopRightRadius = '5px';
                process[index].style.borderTopLeftRadius = '5px';
                process[index].placeholder  = "Vui lòng không bỏ trống!";
                disabled();
            }
            else{
                disabled();
            }
        }
            process[index].onfocus = function (){
                if (process[index].type != 'radio') {
                    process[index].style.color = 'black';
                    process[index].placeholder  = "";
                    process[index].style.backgroundColor = '#fff';
                }
                if (index == 1 && nhapLaiTaiKhoan) {
                    process[index].value = ""
                }
            }
            process[index].oninput = function (){
                if(!process[index].value){
                    process[index].style.backgroundColor = '#ffff44';
                    process[index].style.borderTopRightRadius = '5px';
                    process[index].style.borderTopLeftRadius = '5px';
                    process[index].placeholder  = "Vui lòng không bỏ trống!";
                    disabled();
                }
                else{
                    process[index].style.backgroundColor = '#fff';
                    disabled();
                }
        }
        }
        function check (){
            for (let index = 0; index < process.length; index++) {
                if (!process[index].value ) {
                    return false;
                }
            }
            return true;
        }
        function disabled(){
            if (check() && checkGender && checkEmail && checkTk) {
                submit.disabled = false;
                submit.style.cursor ='pointer';
                submit.style.background = 'linear-gradient(to right, #00f2ff, #01ff67)'
                submit.value = "Đăng Ký";
            }
            else {
                submit.disabled = true;
                submit.style.cursor ='not-allowed';
                submit.value = "Nhập đủ thông tin";
                submit.style.background = 'linear-gradient(to right, #ff53fc, #3e4258)';
            }
        }
        function isEmail(email){
            let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            return emailPattern.test(email);
        }
    
        email.oninput = (e) => {
            if (!isEmail(email.value)) {
                checkEmail = false;
                noTice.style.display = 'block';
                disabled();
            }
            else{
                checkEmail = true;
                disabled();
                noTice.style.display = 'none';
            }
        }

        
    
        console.log()

        $scope.dangKy = () => {
            $http({
            method : "GET" ,
            url : "https://armor-json-server.onrender.com/tai-khoan" ,
        }).then(function(data) {
            $scope.dsTK = data.data ;
            if ($scope.dsTK.some((tk) => {
                return tk.id == process[1].value 
            })) {
                process[1].value = "! Tài khoản đã tồn tại " ;
                process[1].style.color = "red";
                checkTk = false ;
                disabled();
                checkTk = true;
                nhapLaiTaiKhoan = true;
                return;
            }

            nhapLaiTaiKhoan = false;
            $scope.taiKhoan = {
                hoTen : process[0].value ,
                id : process[1].value,
                matKhau :process[2].value ,
                email : process[3].value ,
                gioiTinh : gioiTinh1,
                loaiTaiKhoan : select.value ,
                listSanPham : []
            }
            $http({
                method : "POST" ,
                url : "https://armor-json-server.onrender.com/tai-khoan" ,
                data : $scope.taiKhoan
            }).then(function() {
                alert("Đăng ký thành công!")
                if ($scope.taiKhoan.loaiTaiKhoan == "kh") {
                    $location.path(`/home/1/${$scope.taiKhoan.id}`) ;
                }
                else{
                    $location.path(`admin/home/1/${$scope.taiKhoan.id}`) ;
                }
            })
        })

            
        }
})