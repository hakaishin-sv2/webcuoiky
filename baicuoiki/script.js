//******************************* */ 
 var o_chat = document.querySelector("#o_chat");
  function sen_log(){
      o_chat.classList.toggle("visible")
  }
    const khungchat = document.getElementById('khungchat');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', sendMessage);
    // tạo hàm viết hoa chữ cái đầu
    function viet_hoa_chu_dau(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    function sendMessage() {
        const x = messageInput.value.trim(); // bỏ cách 2 đầu
        let messageText = viet_hoa_chu_dau(x); // chuyển hoa chữ đầu
      if (messageText !== '') {
        const messageElement = document.createElement('div');  // tạo thêm khối div 
         messageElement.classList.add('message');
        let dau_x =document.createElement('div');
        messageElement.innerHTML = `  
          <span class="user" style="font-weight: bold; color: #22A699;margin-left: 10px">You:</span>
          <div class="text" style="margin-left: 20px; display: inline">${messageText}</div>
          <br>
          <span style="font-weight: bold; color: #F24C3D;margin-left: 10px">AD:</span>
          <div style="margin-left: 20px;display: inline">${"Chúng tôi sẽ kiểm tra, vui lòng chờ."}</div>
          <br><br>
        `;
        khungchat.appendChild(messageElement);  
        messageInput.value = '';  // gán lại biến đó bằng rỗng để cho lnf nhập tiếp theo
        khungchat.scrollTop = khungchat.scrollHeight;   // cuộn  khung chat đến tin nhắn 
      }
    }
    // HÀM ẢN HIỆN BLOCK 
    function an_hien_block(selector){
      if(selector.style.display=="none"){
          selector.style.display="block";
      }
      else {
          selector.style.display = "none";
        }
    }
    var cacmenu=document.querySelector(".cacmenu")
    var tableContainer=document.getElementById("tableContainer")   
    var div_fix_seen_chitiet=document.getElementById("fix_seen_chitiet"); 


//_______________________CÁC BIÊN TOÀN CỤC_______________
    var user_lg= localStorage.getItem("infor_login_now");
    var x = JSON.parse(user_lg);
    //console.log(x);
    var storedUsers = localStorage.getItem("users"); 
    var usersArray = JSON.parse(storedUsers);

//******************** TRANG ĐĂNG KÝ********* */

    //console.log(usersArray);

    //-> Xử lý phàn trùng gamil với trùng tên tài khoản ky đk

    function check_ten_dk(){
        if(usersArray==null) {
            return 0;
        }
        var ten_dk=document.getElementById("ten_dk").value;
        for( var i =0; i<usersArray.length; i++){
            if(usersArray[i].username==ten_dk){
                return 1;
                break;
            }
        }
        return 0;
    }

    function check_gmail_dk(){
        if(usersArray==null) {
            return 0;
        }[]
        var gmail_dk=document.getElementById("gmail_dk").value;
        for( var i =0; i<usersArray.length; i++){
            if(usersArray[i].email==gmail_dk){
                return 1;
                break;
            }
        }
        return 0;
    }

  var ky_tu_dacbiet = ["!", "@", "#", "$", "%", "^", "&", "*" ," "];
  function check_ktdb(username){
    for ( var i = 0; i < username.length; i++){
      if (ky_tu_dacbiet.includes(username[i]) == true){
        return 1 ;
      }
    }
    return 0;
  }
  function add_user(){
    event.preventDefault(); // Ngăn chặn sự kiện submit mặc định
    var admin = {
        username: "admin",
        fullName: "X-Admin",
        email: "admin@gmail.com",
        birthday: "-/-/-",
        password: "123456"
    };

    var arry_user=[]; 
    arry_user.push(admin)   // đẩy thêm user vào key users
    if(localStorage.getItem('users')!=null){
    arry_user=JSON.parse(localStorage.getItem('users'))
    }
        var username    = document.getElementById("ten_dk").value;
        var fullName    = document.getElementById("ho_ten").value;
        var email       = document.getElementById("gmail_dk").value;
        var birthday    = document.getElementById("ngay_sinh").value;
        var password    = document.getElementById("password_dk").value;
        var thong_bao   = document.getElementById("thong_bao")

        // Kiểm tra định dạng Gmail
        if (!email.endsWith("@gmail.com")) {
            thong_bao.style.backgroundColor="#f8d7da";
            thong_bao.innerHTML="Dạng gmail không hợp lệ!";
            return;
        }

        // kiểm tra phần tên đăng nhập không đc chứa dấu trắng
        /* if (username.includes(" ")==true){
            thong_bao.style.backgroundColor="#f8d7da";
            thong_bao.innerHTML="Tên đăng nhập không đc chứa ký tự trắng";
            return;
        } */
        if (check_ktdb(username) == 1){
          alert("Username không được có ký tự đắc biệt");
          return ;
        }
        // kiểm tra tên_tk đk có trùng ko
        if(check_ten_dk()==1){
            alert("Tên đăng nhập đã tồn tại")
            return;
        }

        // kiểm tra nếu có gamil đk chưa 
        if(check_gmail_dk()==1){
            alert("Email đã tồn tại trong hệ thống")
            return;
        }
        var user = {
            username: username,
            fullName: fullName,
            email: email,
            birthday: birthday,
            password: password
        };

        // Đẩy đối tượng user vào mảng
        arry_user.push(user);   
        localStorage.setItem("users", JSON.stringify(arry_user)); 

        
        localStorage.setItem("infor_login_now", JSON.stringify(user));
        // Hiển thị thông báo đăng ký thành công
        thong_bao.style.backgroundColor="#0e8"
        thong_bao.style.opacity=0.8;
        thong_bao.innerHTML="Đăng ký thành công!";
        window.location.href = "index.html";


 }

// ************************ TRANG LOGIN****************

// -> HÀM XỬ LÝ PHẦN Đăng NHẬP

function check_login() {
  event.preventDefault(); // Ngăn chặn sự kiện submit mặc định

  var email       = document.getElementById("gmail_login").value;
  var password    = document.getElementById("password_login").value;
  var thong_bao   = document.getElementById("thong_bao");
 
  // console.log(storedUsers);
  if (storedUsers != null) {
      for (var i = 0; i < usersArray.length; i++) {
          if (usersArray[i].email == email  && usersArray[i].password == password) {
              thong_bao.style.backgroundColor="#0e8"
              thong_bao.style.opacity=0.8;
              thong_bao.innerHTML="Đăng nhập thành thông";
              window.location.href = "index.html";
             localStorage.setItem("infor_login_now", JSON.stringify(usersArray[i]));
             return;
          }
             
          if (usersArray[i].email != email || usersArray[i].password != password){// Xử lý đăng nhập thất bại
              thong_bao.innerHTML="Gmail đăng nhập hoặc mật khẩu không chính xác!";
              thong_bao.style.backgroundColor="#f8d7da"
              
          }

        }
      } 
}       

   // hàm test thứ 2 log in
   /*
   function check_login_2() {
    event.preventDefault(); // Ngăn chặn sự kiện submit mặc định
  
    var usernameOrEmail = document.getElementById("gmail_login").value;
    var password = document.getElementById("password_login").value;
    var thong_bao = document.getElementById("thong_bao");
  
    if (storedUsers != null) {
      for (var i = 0; i < usersArray.length; i++) {
        if (
          (usersArray[i].email === usernameOrEmail ||
            usersArray[i].username === usernameOrEmail) &&
          usersArray[i].password === password
        ) {
          thong_bao.style.backgroundColor = "#0e8";
          thong_bao.style.opacity = 0.8;
          thong_bao.innerHTML = "Đăng nhập thành công";
          window.location.href = "index.html";
          // Lưu thông tin đăng nhập vào local storage để xác định đối tượng đang đăng nhập
          localStorage.setItem("infor_login_now", JSON.stringify(usersArray[i]));
          return;
        }
      }
  
      // Xử lý đăng nhập thất bại
      thong_bao.innerHTML = "Tên đăng nhập hoặc mật khẩu không chính xác!";
      thong_bao.style.backgroundColor = "#f8d7da";
    }
  }    */
  

  //-> HÀM QUÊN MẬT KHẨU
  function hien_block(){ // hàm hiện ra 
    var menu=document.querySelector(".quen_mat_khau");
    if(menu.style.display=="none"){
        menu.style.display="block";
    }
    else {
        menu.style.display = "none";
      }
  }

     // Hàm xử lý quên mẩu khẩu
     function quen_mk(email_reset_pass) {
      var thongtin = null;
    
      for (var i = 0; i < usersArray.length; i++) {
        if (usersArray[i].email == email_reset_pass) {
          var temp_username = usersArray[i].username;
          var temp_fullName = usersArray[i].fullName;
          var temp_email = email_reset_pass;
          var temp_birthday = usersArray[i].birthday;
    
          thongtin = {
            username: temp_username,
            fullName: temp_fullName,
            email: temp_email,
            birthday: temp_birthday,
            password: "hihi"
          };
    
          usersArray[i] = thongtin;
          localStorage.setItem("users", JSON.stringify(usersArray));
          break;
        }
      }
    
      if (thongtin !== null) {
        alert("Mật khẩu mới của bạn là: hihi");
      } else {
        alert("Không tìm thấy email của bạn");
      }
    }
    

 //-> HÀM ĐẶT LẠI MK MẶC ĐỊNH PHẦN LOGINs

  function password_default(){
    var email_quen_mk=document.getElementById("email_qmk").value;
    var password_rs=document.getElementById("password_rs");
  // gọi hàm quen_mk bên xuly js
    quen_mk(email_quen_mk);
  }

// ***************************** Ở TRANG 2

//-> hàm hiện thị tên người đang đăng nhập

function hien_ten_user(){
    var ten_day_du= document.getElementById("ten_day_du");
    ten_day_du.innerHTML=`${x.username}`
}
 
hien_ten_user();  //
var menu=document.querySelector(".trai");    // hiện menu dọc
var doi_mk=document.querySelector(".doi_mk")// HIỆN KHỐI ĐỔI MẬT KHẨU
function xoa_local_diem() {
    if (typeof(Storage) !== "undefined") {
      localStorage.removeItem('diem');
      console.log('Đã xóa khóa "diem" thành công.');
    } else {
      console.log('Trình duyệt của bạn không hỗ trợ local storage.');
    }
  }

// -> HÀM ĐỂ XEM THÔNG TIN KHÍ ẤN VÀO
function get_infor_user(){
  //var hien_infor=document.getElementById("hien_infor");  // khối div

  var x= JSON.parse(user_lg); 

  alert("Tên đăng nhập:               "+x.username+"\n"+"\n"+
  "Họ và tên:                       "+x.fullName+"\n"+"\n"+
  "Email:                             "+x.email+"\n"+"\n"+
  "Ngày sinh:                       "+x.birthday);
}

// -> HÀM ĐỔI MẬT KHẨU USER
function doi_password() {
  var infor_login_now = localStorage.getItem("infor_login_now");
  var x = JSON.parse(infor_login_now);
  var new_password = document.getElementById("new_password").value;
  var old_password = document.getElementById("old_password").value;

  var passwordChanged = false; // Biến kiểm tra xem đã thay đổi mật khẩu thành công hay không

  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].email == x.email && usersArray[i].password == old_password) {
      var temp_username = usersArray[i].username;
      var temp_fullName = usersArray[i].fullName;
      var temp_email = usersArray[i].email;
      var temp_birthday = usersArray[i].birthday;

      var thongtin = {
        username: temp_username,
        fullName: temp_fullName,
        email: temp_email,
        birthday: temp_birthday,
        password: new_password,
      };

      usersArray[i] = thongtin;
      passwordChanged = true; // Đánh dấu đã thay đổi mật khẩu thành công
      break; // Thoát khỏi vòng lặp khi đã tìm thấy tài khoản
    }
  }

  if (passwordChanged==true) {
    localStorage.setItem("users", JSON.stringify(usersArray));
    alert("Đổi password thành công");
  } else {
    alert("Sai mật khẩu cũ");
  }
}


// -> XỬ LÝ FORM BÀI LÀM
var questions = [
  {
      id: "question1",
      inputType: "radio",
      question: "Có những cách nào viết code Javascript để chạy trong trang web?",
      answers: [
          "A) Viết trên một tệp riêng", 
          "B) Không thuộc dạng nào", 
          "C) Viết chung với HTML", 
          "D) Cả hai dạng viết tệp riêng hoặc trong file HTML"
      ],
      correctAnswer: "D"
  },
  {
      id: "question2",
      inputType: "radio",
      question: "Trong javascript hàm sort() để sắp xếp mảng không ?",
      answers: [
          "A) Có", 
          "B) Không"
      ],
      correctAnswer: "A"
  },

  {
      id: "question3",
      inputType: "radio",
      question: "Câu lệnh nào khai báo một biến trong JavaScript ?",
      answers: [
          "A) var carName;", 
          "B) Không thuộc dạng nào", 
          "C) variable carName", 
          "D) int carName"
      ],
      correctAnswer: "A"
  },

  {
      id: "question4",
      inputType: "radio",
      question: "Câu lệnh JavaScript nào để đổi nội dung trong thẻ <p id=”demo”>abc.edu.vn.</p>?",
      answers: [
          "A) document.getElementByName('p').innerHTML = 'Hi abc.edu.vn!';", 
          "B) document.getElement('p').innerHTML = 'Hi abc.edu.vn!';", 
          "C) #demo.innerHTML = 'Hi abc.edu.vn!';", 
          "D) document.getElementById('demo').innerHTML = 'Hi abc.edu.vn!';"
      ],
      correctAnswer: "D"
  },

  {
      id: "question5",
      inputType: "radio",
      question: "JavaScript các các biến dạng nào ?",
      answers: [
          "A) Number, String, Boolean, Null", 
          "B) Number, Interger, char", 
          "C) Number, String, Boolean", 
          "D) Tất cả đáp án trên;"
      ],
      correctAnswer: "D"
  },

  {
      id: "question6",
      inputType: "radio",
      question: "Cách nào được sử dụng để kiểm tra một giá trị có phải là một mảng hay không  ?",
      answers: [
          "A) isNumber()", 
          "B) isObject()", 
          "C) isString()", 
          "D) isArray();"
      ],
      correctAnswer: "D"
  },

  {
      id: "question7",
      inputType: "radio",
      question: "Cách nào tạo một hàm trong JavaScript ?",
      answers: [
          "A) function tinh_tong(a,b)", 
          "B) int = tinh_tong()", 
          "C) function:tinh_tong ()", 
          "D) void tinh_tong();"
      ],
      correctAnswer: "A"
  },

  {
      id: "question8",
      inputType: "radio",
      question: "Câu lệnh nào đúng thực hiện việc gọi một script từ bên ngoài có tên là “test.js”?",
      answers: [
          "A) <script name='test.js>", 
          "B) <script href='test.js>", 
          "C) <script src='test.js>", 
          "D) <script taget='test.js>"
      ],
      correctAnswer: "C"
  },

  {
      id: "question9",
      question: "Cách khai báo mảng nào trong JavaScript là đúng ?",
      inputType: "radio",
      answers: [
          "A) var colors = 'red', 'green', 'blue'", 
          "B) var colors = (1:'red', 2:'green', 3:'blue')", 
          "C) var colors = ['red', 'green', 'blue']", 
          "D) var colors = 1 = ('red'), 2 = ('green'), 3 = (blue')"
      ],
      correctAnswer: "C"
  },

  {
      id: "question10",
      question: "Trong JavaScript hàm parseInt() dùng để làm gì ?",
      inputType: "radio",
      answers: [
          "A) Chuyển một chuỗi thành số thực", 
          "B) Chuyển một chuỗi thành số nguyên", 
          "C) Chuyển một số nguyên thành một chuỗi", 
          "D) Chuyển một chuỗi thành số"
      ],
      correctAnswer: "B"
  },

  {
      id: "question11",
      img: "../img_cau_hoi/cau_11.png",
      inputType: "radio",
      question: "Đoạn mã javascript trên có ý nghĩa gì:",
      answers: [
          "A) Lấy ra phần tử có id  là “box” ", 
          "B) Lấy ra phần tử có class là “box” ", 
          "C) Lấy ra phần tử có id  là “boc” ", 
          "D) Lấy id  là “box” và đổi background  thành màu đỏ"
      ],
      correctAnswer: "D"
  },

  {
      id: "question12",
      img: "../img_cau_hoi/cau_12.png",
      inputType: "radio",
      question: "Đoạn mã javascript trên có ý nghĩa gì:",
      answers: [
          "A) 11 ", 
          "B) 2", 
          "C) 1 ", 
          "D) NaN"
      ],
      correctAnswer: "A"
  },

  {
      id: "question13",
      inputType: "radio",
      img: "../img_cau_hoi/cau_13.png",
      question: "Kết quả sẽ là ",
      answers: [
          "A) 3 ", 
          "B) 9", 
          "C) 0 ", 
          "D) NaN"
      ],
      correctAnswer: "B"
  },

  {
      id: "question14",
      inputType: "radio",
      question: "Cách khai báo biến nào sau đây là đúng trong javascript ?",
      answers: [
          "A) var a=9 ", 
          "B) const b=10", 
          "C) let c=20", 
          "D) Cả 3 đáp án trên"
      ],
      correctAnswer: "D"
  },

  {
      id: "question15",
      img: "../img_cau_hoi/cau_15.png",
      inputType: "radio",
      question: "Đoạn mã trên có ý nghĩa:",
      answers: [
          "A) Lấy ra phần tử HTML có class là “bkjox” ", 
          "B) Lấy ra các phần tử HTML có id là “bkjox” ", 
          "C) Lấy ra các thẻ “bkjox” ", 
          "D) Lấy ra các phần tử có class là “bkjox”"
      ],
      correctAnswer: "D"
  },

  {
      id: "question16",
      img: "../img_cau_hoi/cau_16.png",
      inputType: "radio",
      question: "Đầu ra của đoạn mã Javascript sau đây là gì ?",
      answers: [
          "A) Error ", 
          "B) Sanfoundry Javascriptmcq ", 
          "C) undefined ", 
          "D) Sanfoundry_Javascriptmcq"
      ],
      correctAnswer: "D"
  },

  {
      id: "question17",
      img: "../img_cau_hoi/cau_17.png",
      inputType: "radio",
      question: "Đầu ra của đoạn mã Javascript sau đây là gì ?",
      answers: [
          "A) short ", 
          "B) 123.56 ", 
          "C) tall ", 
          "D) 190"
      ],
      correctAnswer: "A"
  },

  {
      id: "question18",
      question: "Với tham số nambers = 8 thì kết quả là ?",
      img: "../img_cau_hoi/cau_18.png",
      inputType: "radio",
      answers: [
          "A) 10 ", 
          "B) 6 ", 
          "C) 8 ", 
          "D) 9"
      ],
      correctAnswer: "A"
  },

  {
      id: "question19",
      img: "../img_cau_hoi/cau_19.png",
      question: "Với tham số nambers = 8 thì kết quả là ? (Điền vào chỗ trống)",
      inputType: "text",
      correctAnswer: "11"
  },

  {
      id: "question20",
      inputType: "radio",
      img: "../img_cau_hoi/cau_20.png",
      question: "Câu lấy ra giá trị text đã nhập trong username là ?",
      answers: [
          "A) var username= document.getElementById(“username”).value; ", 
          "B) var username= document.getElementById(“username”);", 
          "C) string username= document.getElementById(“username”) ", 
          "D) var username= document.getElementByClass(“username”)"
      ],
      correctAnswer: "A"
  },

  {
      id: "question21",
      img: "../img_cau_hoi/cau_21.png",
      inputType: "radio",
      question: "Đoạn nào sau đây sẽ kiểu tra xem đáp án “Tất cả đáp án trên” có được tích chọn không ? ",
      answers: [
          "A) var answerD= document.getElementByID(“answerD”).value; ", 
          "B) var answerD= document.getElementByID(“answerD”).checked;", 
          "C) var answerD=document.getElementsClassName(“answerD”); ", 
          "D) var answerD= document.getElementsByTagName(“answerd”);"
      ],
      correctAnswer: "B"
  },

  {
      id: "question22",
      img: "../img_cau_hoi/cau_22.png",
      inputType: "radio",
      question: "Cách thay đổi màu chữ thành màu đỏ củ thẻ p như trong hình ? ",
      answers: [
          "A) document.getElementById(“myParagraph”).style.color=”red”; ", 
          "B) document.getElementsClassNmae(“myParagraph”)=”red”;", 
          "C) document.getElementById(“myParagraph”).value(“red”); ", 
          "D) document.getElementById(“myParagraph”).color=”red”;"
      ],
      correctAnswer: "A"
  },

  {
      id: "question24",
      img: "../img_cau_hoi/cau_24.png",
      inputType: "radio",
      question: "Câu nào sau đây lấy rac giá trị đã được chọn ? ",
      answers: [
          "A) var slect_x=document.getElement(“option”).value; ", 
          "B) var slect_x=document.getElementsByClassName(“option”).value;", 
          "C) var slect_x=document.getElementById(“option”).value ", 
          "D) var slect_x=document.getElementById(“option”)#value;"
      ],
      correctAnswer: "C"
  },

  {
      id: "question25",
      img: "../img_cau_hoi/cau_25.png",
      inputType: "radio",
      question: "Thuộc tính onclick để lắng nghe sự kiện khi click vào trong đó được truyền vào 1 hàm xử lý sự kiện đúng hay sai ? ",
      answers: [
          "A) Sai ", 
          "B) Đúng", 
      ],
      correctAnswer: "B"
  },

  {
      id: "question26",
      img: "../img_cau_hoi/cau_26.png",
      inputType: "radio",
      question: "Câu nào sau đây để thêm chữ vào khối div đó ở dòng 13 ? ",
      answers: [
          "A) document.getElementById(“abc”).innerhtml=”hello” ", 
          "B) document.getElementsByTagName(“abc”).innerhtml=”hello”", 
          "C) document.getElementById(“abc”).value=”hello” ", 
          "D) console.log(”hello”)"
      ],
      correctAnswer: "B"
  },

  {
      id: "question27",
      img: "../img_cau_hoi/cau_27.png",
      question: "Kết quả của index sẽ là ",
      inputType: "text",
      correctAnswer: "5"
  },
     
  {
      id: "question28",
      img: "../img_cau_hoi/cau_28.png",
      inputType: "radio",
      question: "Kết quả sẽ là ? ",
      answers: [
          "A) True ", 
          "B) False", 
      ],
      correctAnswer: "A"
  },

  {
      id: "question29",
      img: "../img_cau_hoi/cau_29.png",
      inputType: "radio",
      question: "Câu nào sau đây để thêm chữ vào khối div đó ở dòng 13 ? ",
      answers: [
          "A) [“Hello”, “world,” ,”how”,”are”,”you?”] ", 
          "B) “Hello”, “world,” ,”how”,”are”,”you?", 
          "C) “Hello” “world,” ”how””are””you? ", 
          "D) Helloworld,howareyou?"
      ],
      correctAnswer: "A"
  },

  {
      id: "question30",
      img: "../img_cau_hoi/cau_30.png",
      inputType: "radio",
      question: "Kết quả sẽ là ? ",
      answers: [
          "A) Đúng dạng gmail", 
          "B) “abc123@gmail.com”", 
          "C) Không đúng dạng gmail", 
          "D) Không hiện gì"
      ],
      correctAnswer: "A"
  },

  {
    id: "question31",
    //img: "../img_cau_hoi/cau_30.png",
    inputType: "checkbox",
    question: "con vịt có mấy cánh mấy chân",
    answers: [
        "A) 2 chân", 
        "B) 2 cánh", 
        "C) không có", 
        "D) hi"
    ],
    correctAnswer: "AB"
},

{
  id: "question32",
  //img: "../img_cau_hoi/cau_30.png",
  inputType: "checkbox",
  question: "chọn đáp án c với d ? ",
  answers: [
      "A) mlem ", 
      "B) test ", 
      "C) không", 
      "D) có"
  ],
  correctAnswer: "CD"
},

];

if (typeof(Storage) !== "undefined") {
  var get_cauhoi_daduyet = localStorage.getItem("daduyet");  // dạng string
  var temp_question=JSON.parse(get_cauhoi_daduyet) || [];
  var questions = questions.concat(temp_question);
  console.log(questions);
}
// RANDOM RA CHỈ SỐ CÂU HỎI TRONG MẢNG
function ran_dom_Answers(array, count) {
  var shuffledArray = array.slice();  // bản sao array đẻ khi splice không thay đổi bản gốc
  var randomQuestions = [];

  while (randomQuestions.length < count && shuffledArray.length > 0) {
      var randomIndex = Math.floor(Math.random() * shuffledArray.length);
      //console.log(randomIndex);
      var question = shuffledArray[randomIndex]; // gán câu hỏi đó vào biến rồi push nó vào
      randomQuestions.push(question);
      shuffledArray.splice(randomIndex, 1); // Gỡ bỏ phần tử đã được chọn khỏi mảng để ko lấy trùng câu hỏi
  }
  console.log(randomQuestions)
  return randomQuestions;
}

function createQuestionForm(question, index) {
  var form = document.createElement("form");
  form.classList.add("question-form");
  console.log(question.id)
  form.id = question.id; // Thêm ID cho form
  var h2 = document.createElement("h2");
  h2.textContent = `Câu hỏi ${index + 2}: ${question.question}`;
  //h2.id=question.inputType;
  form.appendChild(h2);

  if (question.img) {
    var img = document.createElement("img");
    img.src = question.img;
    form.appendChild(img);
  }

  if (question.inputType=="radio") {
    for (var i = 0; i < question.answers.length; i++) {
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;   // đặt Name của ô input bằng id form luôn
      input.value = question.answers[i].charAt(0); // đặt value là A B C D
      label.appendChild(input);   
      label.appendChild(document.createTextNode(`${question.answers[i]}`));  // thêm đáp án
      form.appendChild(label);
      form.appendChild(document.createElement("br")); 
    }
  } 
  else if (question.inputType === "text") {
    var input = document.createElement("input");
    input.type = "text";
    input.name = question.id; 
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
  }

  else if(question.inputType=="checkbox"){
  for (var i = 0; i < question.answers.length; i++) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = question.id;   
    input.value = question.answers[i].charAt(0); 
    label.appendChild(input);   
    label.appendChild(document.createTextNode(`${question.answers[i]}`));  
    form.appendChild(label); 
    form.appendChild(document.createElement("br")); 
  }
 } 


  return form; 
}



function display_Answers(questions) {
  var questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";
  hien_cauhoi_1();
  for (var i = 0; i < questions.length; i++) {
      var questionForm = createQuestionForm(questions[i], i);
      questionContainer.appendChild(questionForm);
  }
  questionContainer.innerHTML+=`
  <div class="submit_score">
    <button id="nop_bai" onclick="submitAnswers()">Nộp bài</button><br>
        <div class="div_kq">
            <div class="infor_diem">Điểm của bạn</div>
                  <div id="result"></div>
                  <div id="score"></div>
            </div>

  </div>
  `
}

function get_Answers() {
  var randomQuestions = ran_dom_Answers(questions, 9); // Chọn ngẫu nhiên 3 câu hỏi
  display_Answers(randomQuestions);   // gọi hàm hiện cau hỏi
  startTimer();                       // gọi hàm tính thời gian
}


// HÀM CHECK DẠNG CÂU HỎI CHECKBOX 

function getSelectedAnswer(name) {
  var arry_selected = [];
  var checkboxes = document.getElementsByName(name);
  
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        arry_selected.push(checkboxes[i].value);
      }
  }
  
  var dap_an_da_chon=arry_selected.join('');
  return dap_an_da_chon;
}


function checkAnswers() {
  var correctCount = 0;
  var forms = document.getElementsByClassName("question-form");
  
  var bg_question1=document.getElementById("question1")
  if(check_cau1()==1){
      correctCount++;
      bg_question1.style.backgroundColor="#DAFFFB"
  }
  if(check_cau1()==0){
      bg_question1.style.backgroundColor="#FAF0E4"
  }

  for (var i = 0; i < forms.length; i++) {
     var questionId = forms[i].getAttribute("id");
     //console.log(questionId)
     var selectedAnswer=undefined;
     var question = questions.find(function(q) {// cái này để lấy ra đối tượng của từng form
       return q.id === questionId;
     });

     //console.log(questions[18].inputType)
     //console.log(question.inputType)
     if(question.inputType=="text"){
       selectedAnswer = forms[i].querySelector(`input[name="${questionId}"][type="text"]`).value;
     }
      
     if (forms[i].querySelector(`input[name="${questionId}"]:checked`)) {
       selectedAnswer = forms[i].querySelector(`input[name="${questionId}"]:checked`).value;
      }   
      if (question.inputType=="checkbox")  {
        selectedAnswer=getSelectedAnswer(questionId)

      }
   //console.log(selectedAnswer+"   "+question.correctAnswer)
       if (selectedAnswer == question.correctAnswer) {          
           correctCount++;
           forms[i].classList.add("correct");
       } else {
           forms[i].classList.add("incorrect");
       }

   }

  var div_result=document.getElementById("result") ;
  var div_score=document.getElementById("score");
  var score = (correctCount / (forms.length +1)) * 100;
  //alert(`Số câu đúng: ${correctCount}/${(forms.length+1)}\nĐiểm số: ${score}%`);
  div_result.innerHTML=`${correctCount}/${(forms.length+1)}`
  div_score.innerHTML=`${score}%`

  // tạo thông đối tượng chứa điểm
        var diem_user= {
            diem: `${correctCount}/${(forms.length+1)}`,
            diem_pt:`${score}%`
        };
        array_diem_so= [];
        var temp_diem=localStorage.getItem("diem")
        if(temp_diem!=null){
            var diem_cu=JSON.parse(temp_diem);
            for(var i=0;i<diem_cu.length;i++){
                array_diem_so.push(diem_cu[i]);
            }
        }
        array_diem_so.push(diem_user);
        //console.log(array_diem_so);
        localStorage.setItem("diem",JSON.stringify(array_diem_so))// lưu vào local
}
 

var timerElement = document.getElementById("timer");
var timerInterval;
var remainingTime = 10 * 60; // 15 phút

function startTimer() {
  timerInterval = setInterval(function() {
      remainingTime--;
      var minutes = Math.floor(remainingTime / 60);
      var seconds = remainingTime % 60;
      timerElement.textContent = `Thời gian còn lại: ${minutes} phút ${seconds} giây`;

      if (remainingTime <= 0) {
          clearInterval(timerInterval);
          timerElement.textContent = "Hết thời gian";
          alert("Hết thời gian");
          submitAnswers();
      }
  }, 1000);
}

function submitAnswers() {
  clearInterval(timerInterval); // Dừng đếm thời gian
  timerElement.textContent = "Đã nộp bài";

  checkAnswers();
}


// HÀM TẠO CÂU HỎI SỐ 1 MẶC ĐỊNH
function hien_cauhoi_1(){
  // Tạo đối tượng câu hỏi
  var question = {
      id: "question1",
      title: "Câu hỏi 1: Sắp xếp các bước của đoạn code sau để tìm được giá trị max trong mảng?",
      steps: [
          "var max = arry[0]",
          "function tim_max() {",
          "for (var i = 0; i < arry.length; i++) {",
          "if (arry[i] > max) {",
          "max = arry[i] }",
          "return max }",
      ],
  };

  var containerDiv = document.createElement("div");
  containerDiv.classList.add("container");
  containerDiv.id = "question1"; // Thêm ID cho khối container
  var titleElement = document.createElement("h2");
  titleElement.textContent = question.title;
  containerDiv.appendChild(titleElement);

  for (var i = 0; i < question.steps.length; i++) {
      var stepDiv = document.createElement("div");
      stepDiv.classList.add("chung_css_select");
      var questionElement = document.createElement("p");
      questionElement.textContent = question.steps[i];
      var selectElement = document.createElement("select");
      selectElement.name = question.id + "_step" + i;
      var blankOptionElement = document.createElement("option");
      blankOptionElement.value = "";
      blankOptionElement.textContent = "";
      selectElement.appendChild(blankOptionElement);
      for (var j = 1; j <= 6; j++) {
         var optionElement = document.createElement("option");
         optionElement.value = j.toString();
         optionElement.textContent = j.toString();
         selectElement.appendChild(optionElement);
     }

     // Thêm sự kiện onchange vào select box
     selectElement.onchange = function () {
         var arry = [];
         var selects = document.getElementsByTagName("select");
         for (var i = 0; i < selects.length; i++) {
             var selectedValue = selects[i].value;
             arry.push(selectedValue);  
         }
         console.log(arry);
         var x = check_cau1();
         //console.log(x);
     };
     stepDiv.appendChild(questionElement);
     stepDiv.appendChild(selectElement);
     containerDiv.appendChild(stepDiv);
 }

 var div_chung=document.getElementById("question-container")
 div_chung.appendChild(containerDiv);
}

// HÀM CHECK CÂU HỎI SỐ 1
function check_cau1() {
  var arry = [];
  var selects = document.getElementsByTagName("select");
  for (var i = 0; i < selects.length; i++) {
      var selectedValue = selects[i].value;
      arry.push(selectedValue);  
  }
  
  if (arry.join("") == "123456") { 
      return 1;
  }
  return 0;
}

// TẠO BẢNG XEM LỊCH SỬ ĐIỂM
/*
function createTable() {
  var temp_diem = localStorage.getItem("diem");
  //console.log(temp_diem); 
  if (temp_diem == null) {
    alert("Bạn chưa làm bài lần nào");
    return;
  }
  // Nếu xl cái này
  
  if(temp_diem !=null){

  } 

  var diem = JSON.parse(temp_diem);
  //console.log(diem);
  var table = document.createElement('table');
  table.classList.add('table_diem');
  //var th_x=document.createElement("th")
  var headerRow = document.createElement('tr');
  var headers = ['Lần thứ', 'Điểm thang 10', 'Điểm %'];

  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
  }

  table.appendChild(headerRow);

  for (var i = 0; i < diem.length; i++) {
    var row = document.createElement('tr');

    var cell1 = document.createElement('td');
    cell1.textContent = i + 1;
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.textContent = diem[i].diem;
    row.appendChild(cell2);

    var cell3 = document.createElement('td');
    cell3.textContent = diem[i].diem_pt;
    row.appendChild(cell3);

    table.appendChild(row);
  }

  return table;
}
*/
function createTable() {
  var temp_diem = localStorage.getItem("diem");
  //console.log(temp_diem); 
  if (temp_diem == null) {
    alert("Bạn chưa làm bài lần nào");
    return;
  }
  // Nếu xl cái này
  
  if(temp_diem !=null){
    var tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML="";
    var h3=document.createElement("h3");
    h3.textContent="Điểm của bạn";
    tableContainer.appendChild(h3)
    var closeButton = document.createElement("i");
    closeButton.classList.add("fa", "fa-times");
    closeButton.setAttribute("aria-hidden", "true");
    closeButton.style.marginLeft = "96%";
    closeButton.style.marginTop = "0.5%";
    closeButton.style.marginBottom = "0.5%";
    closeButton.onclick = function() {
      close_table_seen_diem();
    };
    tableContainer.appendChild(closeButton);
  } 

  var diem = JSON.parse(temp_diem);
  //console.log(diem);
  var table = document.createElement('table');
  table.classList.add('table_diem');
  //var th_x=document.createElement("th")
  var headerRow = document.createElement('tr');
  var headers = ['Lần thứ', 'Điểm thang 10', 'Điểm %'];

  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
  }

  table.appendChild(headerRow);

  for (var i = 0; i < diem.length; i++) {
    var row = document.createElement('tr');

    var cell1 = document.createElement('td');
    cell1.textContent = i + 1;
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.textContent = diem[i].diem;
    row.appendChild(cell2);

    var cell3 = document.createElement('td');
    cell3.textContent = diem[i].diem_pt;
    row.appendChild(cell3);

    table.appendChild(row);
  }

  return table;
}

function close_table_seen_diem() {
  var tableContainer = document.getElementById("tableContainer");
  tableContainer.style.display="none";
}
function hien_bang_diem(){
  // đua lên hàm createTable
  var tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML="";
  
  
  var bang_diem_i=createTable();
  tableContainer.appendChild(bang_diem_i);
}
//hien_bang_diem();   // gọi hàm hiện bảng điểm ra luôn

// HÀM Ở TRANG TYPE_RADIO

function xem_chitiet(id_btn_xct, arry_cauhoi) {
  for (var i = 0; i < arry_cauhoi.length; i++) {
      if (id_btn_xct == arry_cauhoi[i].id) {
          var div_fix_seen_chitiet = document.getElementById("fix_seen_chitiet");
          div_fix_seen_chitiet.innerHTML = "";

          var closeButton = document.createElement("i");
          closeButton.classList.add("fa", "fa-times");
          closeButton.setAttribute("aria-hidden", "true");
          closeButton.style.marginLeft = "97%";
          closeButton.style.marginTop = "0.5%";
          closeButton.style.marginBottom = "0.5%";
          closeButton.onclick = function() {
              close();
          };
          div_fix_seen_chitiet.appendChild(closeButton);
          let hr=document.createElement("hr");
          hr.style.backgroundColor="#000000";
          div_fix_seen_chitiet.appendChild(hr);
          var h2=document.createElement("h2");
          h2.textContent="Tên câu hỏi :";
          h2.style.color="#F31559";
          div_fix_seen_chitiet.appendChild(h2);
          var input_question = document.createElement("input");
          input_question.type = "text";
          input_question.style.width="80%";
          input_question.style.display="block";
          input_question.style.marginLeft="5%";
          input_question.value = arry_cauhoi[i].question;
          input_question.readOnly = true;
          div_fix_seen_chitiet.appendChild(input_question);
          
          //____ XEM CHI TIẾT INPUT DẠNG TEXT____________

          if(arry_cauhoi[i].inputType =="text"){      
            var h2_3 = document.createElement("h2");
            h2_3.textContent = "Đáp án:";
            h2_3.style.color = "#38E54D";
            div_fix_seen_chitiet.appendChild(h2_3);

            var input_type_text = document.createElement("input");
            input_type_text.type = "text";
            input_type_text.style.marginLeft="5%"
            input_type_text.value = arry_cauhoi[i].correctAnswer;
            input_type_text.readOnly=true;
            div_fix_seen_chitiet.appendChild(input_type_text);
            var br = document.createElement("br");
            div_fix_seen_chitiet.appendChild(br);
            //break;
            return
          }
          var h2=document.createElement("h2");
          h2.textContent="Các đáp án :";
          h2.style.color="#090580";
          div_fix_seen_chitiet.appendChild(h2);

          //___________ XEM CHI TIẾT CÂU HỎI RADIO____________
          if(arry_cauhoi[i].inputType=="radio"){
            for (let j = 0; j < arry_cauhoi[i].answers.length; j++) {
              var input_radio = document.createElement("input");
              input_radio.type = "radio";
              input_radio.name = "radio_inp";
              if(arry_cauhoi[i].answers[j].charAt(0)==arry_cauhoi[i].correctAnswer){
                input_radio.checked=true;
              }
              var input_text = document.createElement("input");
              input_text.type = "text";
              input_text.value = arry_cauhoi[i].answers[j];
              input_text.readOnly = true;
              div_fix_seen_chitiet.appendChild(input_radio);
              div_fix_seen_chitiet.appendChild(input_text);
              var br = document.createElement("br");
              div_fix_seen_chitiet.appendChild(br);
            }
            
          }
          // __________ XEM CHO TIẾT CÂU HỎI CHECKBOX___________

          if(arry_cauhoi[i].inputType =="checkbox"){      
            for (let j = 0; j < arry_cauhoi[i].answers.length; j++) {
              var input_check = document.createElement("input");
              input_check.type = "checkbox";

              //console.log(arry_cauhoi[i].correctAnswer);

              //console.log(arry_cauhoi[i].answers[j].charAt(0))

              if(arry_cauhoi[i].correctAnswer.includes(arry_cauhoi[i].answers[j].charAt(0))){
                input_check.checked=true;
              }              
              var input_text = document.createElement("input");
              input_text.type = "text";
              input_text.value = arry_cauhoi[i].answers[j];
              input_text.readOnly = true;

              div_fix_seen_chitiet.appendChild(input_check);
              div_fix_seen_chitiet.appendChild(input_text);

              // Thêm thẻ <br> sau mỗi input_text
              var br = document.createElement("br");
              div_fix_seen_chitiet.appendChild(br);
            }
            
          }
          //--------------
          var h2_3 = document.createElement("h2");
          h2_3.textContent = "Đáp án :";
          h2_3.style.color = "#38E54D";
          div_fix_seen_chitiet.appendChild(h2_3);
          var input_dapan = document.createElement("input");
          input_dapan.type = "text";
          input_dapan.readOnly = true;
          input_dapan.value = arry_cauhoi[i].correctAnswer;
          div_fix_seen_chitiet.appendChild(input_dapan);
      }
  }
}
// JavaScript ẩn hiện block

function chinh_sua(id_btn_fix, arry_cauhoi) {
  for (var i = 0; i < arry_cauhoi.length; i++) {
      if (id_btn_fix == arry_cauhoi[i].id) {
          var div_fix_seen_chitiet = document.getElementById("fix_seen_chitiet");
          div_fix_seen_chitiet.innerHTML = "";

          var closeButton = document.createElement("i");
          closeButton.classList.add("fa", "fa-times");
          closeButton.setAttribute("aria-hidden", "true");
          closeButton.style.marginLeft = "97%";
          closeButton.style.marginTop = "0.5%";
          closeButton.style.marginBottom = "0.5%";
          closeButton.onclick = function() {
              close();
          };
          div_fix_seen_chitiet.appendChild(closeButton);
          let hr=document.createElement("hr");
          hr.style.backgroundColor="#000000";
          div_fix_seen_chitiet.appendChild(hr);
          var h2 = document.createElement("h2");
          h2.textContent = "Tên câu hỏi :";
          h2.style.color = "#F31559";
          div_fix_seen_chitiet.appendChild(h2);

          var input_question = document.createElement("input");
          input_question.type = "text";
          input_question.id = "question_sua";
          input_question.value = arry_cauhoi[i].question;
          div_fix_seen_chitiet.appendChild(input_question);

          // Tạo tiêu đề "Các đáp án"
          var h2_2 = document.createElement("h2");
          h2_2.textContent = "Các đáp án :";
          h2_2.style.color = "#525FE1";
          div_fix_seen_chitiet.appendChild(h2_2);
          //____________ CHỈNH SỬA CÂU HỎI RADIO_______________
          if(arry_cauhoi[i].inputType=="radio"){
            for (let j = 0; j < arry_cauhoi[i].answers.length; j++) {
              var input_radio = document.createElement("input");
              input_radio.type = "radio";
              input_radio.name = "radio_inp";
              if(arry_cauhoi[i].answers[j].charAt(0)==arry_cauhoi[i].correctAnswer){
                input_radio.checked=true;
              }
              var input_text = document.createElement("input");
              input_text.type = "text";
              input_text.value = arry_cauhoi[i].answers[j];
              input_text.name= "input_fix_new"
              div_fix_seen_chitiet.appendChild(input_radio);
              div_fix_seen_chitiet.appendChild(input_text);
              var br = document.createElement("br");
              div_fix_seen_chitiet.appendChild(br);

            }
          }
          //__________ CHỈNH SỬA CÂU HỎI CHECBOX____________________

          if(arry_cauhoi[i].inputType=="checkbox"){
            for (let j = 0; j < arry_cauhoi[i].answers.length; j++) {
              var input_radio = document.createElement("input");
              input_radio.type = "checkbox";
              
              if(arry_cauhoi[i].correctAnswer.includes(arry_cauhoi[i].answers[j].charAt(0))){
                input_radio.checked=true;
              }
              var input_text = document.createElement("input");
              input_text.type = "text";
              input_text.value = arry_cauhoi[i].answers[j];
              input_text.name= "input_fix_new"
              div_fix_seen_chitiet.appendChild(input_radio);
              div_fix_seen_chitiet.appendChild(input_text);

              var br = document.createElement("br");
              div_fix_seen_chitiet.appendChild(br);

            }

          }
          var h2_3 = document.createElement("h2");
          h2_3.textContent = "Đáp án mới :";
          h2_3.style.color = "#38E54D";
          div_fix_seen_chitiet.appendChild(h2_3);
          var input_dapan = document.createElement("input");
          input_dapan.type = "text";
          input_dapan.name="input_fix_new";
          input_dapan.value = arry_cauhoi[i].correctAnswer;
          div_fix_seen_chitiet.appendChild(input_dapan);
          var button_fix = document.createElement("button");
          button_fix.textContent = "Xác nhận";
          button_fix.classList.add("button_fix_ch")
          button_fix.addEventListener('click', function() {
              var question_sua=document.getElementById("question_sua").value;
              arry_cauhoi[i].question=question_sua;
              //console.log(question_sua);
              arry_cauhoi[i].user_fix = x.username;
              arry_cauhoi[i].time_fix = get_date_time();
              var node_list_input_fix = document.getElementsByName("input_fix_new");
              var arry_input_fix = [];
              for (var j = 0; j < node_list_input_fix.length; j++) {
                  arry_input_fix.push(node_list_input_fix[j].value);
              }
               //console.log( arry_cauhoi[i].answers)
              arry_cauhoi[i].answers = arry_input_fix.slice(0,arry_input_fix.length-1);
              arry_cauhoi[i].correctAnswer=arry_input_fix[arry_input_fix.length-1];
              //console.log( arry_cauhoi[i])
              localStorage.setItem("cauhoi_chuaduyet", JSON.stringify(arry_cauhoi));
              hien_bang_them_cauhoi();
              alert("Sửa thành công!");
          });

          div_fix_seen_chitiet.appendChild(button_fix);
          break;
      }
  }
}




  function display_khoi_ch(){
      var div_fix_seen_chitiet = document.getElementById("fix_seen_chitiet");
      if(div_fix_seen_chitiet.style.display=="none"){
          div_fix_seen_chitiet.style.display="block";
      }
  }
  function close() {
      var div_fix_seen_chitiet = document.getElementById("fix_seen_chitiet");
      div_fix_seen_chitiet.style.display="none";
  }

var arry_dapan=["A) ","B) ","C) ","D) ","E) ","G) ","H) "]

function show_quantity_answers_radio(){
  let quantity_answer=document.getElementById("quantity_answer").value;
  let form = document.createElement("form");
  form.classList.add("form_user_add_question");
  form.id="form_macdinh";
  form.autocomplete="off"
  let h3 = document.createElement("h3");
  h3.textContent="Thêm nội dung đáp án";
  let p1 = document.createElement("p");
  p1.textContent="Lưu ý: Không xóa phần A) B) C)"
  form.appendChild(h3)
  form.appendChild(p1)
  for(let i=0;i<quantity_answer;i++){
      let input_radio = document.createElement("input");
      input_radio.type = "radio";
      input_radio.name = "is_checked_radio";
      input_radio.value=arry_dapan[i];
      let input_text=document.createElement("input");
      input_text.type="text";
      input_text.name="input_text"; 
      input_text.style.fontSize="16px";
      input_text.value=arry_dapan[i];
      form.appendChild(input_radio);
      form.appendChild(input_text);
      form.appendChild(document.createElement("br")); // xuống dòng 
  }

  let h4_y=document.createElement("h4")
  h4_y.classList.add("h3_green")
  h4_y.textContent="Nhập đáp án của bạn";
  form.appendChild(h4_y)
  let nhap_correct_answer=document.createElement("input");
  nhap_correct_answer.id="dapan_user";
  form.appendChild(nhap_correct_answer);
  return form;
}

function create_add_cauhoi(){
  let class_show_answer=document.getElementById("show_answer");
  class_show_answer.innerHTML = "";
  var x_form=show_quantity_answers_radio();
  class_show_answer.appendChild(x_form);
}

function resetForm() {
  document.getElementById("form_add_cauhoi").reset();
  document.getElementById("form_macdinh").reset();

}

function them_cauhoi_vao(){
  let name_question=document.getElementById("name_question").value;
  let dapan_user=document.getElementById("dapan_user").value;

  let node_list_radio =document.getElementsByName("is_checked_radio");
  let node_list=document.getElementsByName("input_text");
  let arry_radio_user=[];
  for( var i=0;i<node_list_radio.length;i++){
      if(node_list_radio[i].checked==true){
        arry_radio_user.push(node_list_radio[i].value.charAt(0));
      }
  }

  let cac_dap_an=[]
  for(let i=0;i<node_list.length;i++){
      cac_dap_an.push(node_list[i].value)
  }


  // nếu chưa nhaaph thông tin câu hỏi
  /*
  if(name_question==""){
    alert("Nhập thông tin câu hỏi đã");
    return ;
  }  

  //console.log(arry_checkbox_user);
  // Nếu chưa tích chọn đáp án
  
  if(arry_radio_user.length == 0 ){
    alert("hãy tích chọn đáp án của bạn mới được gửi");
    return ;
  }   
  
  for (var i = 0;i<cac_dap_an.length; i++){
    if(cac_dap_an[i].charAt(3)==""){
      alert("Chưa nhập thông tin đáp án");
      return ;
    }
  }  

  if(dapan_user == ""){
    alert("Nhập thong tin cho đáp án này đi đã");
    return ;
  }  */
  var cau_hoi_user=JSON.parse(localStorage.getItem("cauhoi_chuaduyet"));
  var id_ques=0
  if(cau_hoi_user != null){
      var index_id_end=cau_hoi_user.length-1
      id_ques=cau_hoi_user[index_id_end].id+1;
  }
  // ĐỐI TƯỢNG CHỨA CÁC ĐÁP ÁN
  var obj_question={
      email_nguoi_them :           x.email,
      id               :           id_ques+"",
      inputType        :           "radio",
      get_date_time    :           get_date_time(),
      user_add         :           x.username,
      question         :           name_question,
      answers          :           cac_dap_an,
      correctAnswer    :           dapan_user,
      trang_thai       :           "chưa duyệt",
      time_fix         :           "",
      user_fix         :           "",
      id_btn_xct       :           id_ques,
      id_btn_fix       :           id_ques
  } 
  var arry_save_question_user=[];
  
  if(localStorage.getItem('cauhoi_chuaduyet')!=null){
      arry_save_question_user=JSON.parse(localStorage.getItem('cauhoi_chuaduyet'))
  }
  arry_save_question_user.push(obj_question);
 
  
  localStorage.setItem("cauhoi_chuaduyet", JSON.stringify(arry_save_question_user)); 
  alert("Đã thêm câu hỏi của bạn")
 
}

// HÀM LẤY RA THỜI GIAN 
function get_date_time() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

function tao_bang_thongtin_cauhoi() {
  var cauhoi_chuaduyet = JSON.parse(localStorage.getItem("cauhoi_chuaduyet"));
  var arry_cauhoi = cauhoi_chuaduyet || [];

  var table = document.createElement('table');
  table.classList.add('table_question_user');
  var headers = ['STT', 'Câu hỏi', 'Loại câu hỏi', 'Người thêm', 'Thời gian thêm', 'Người chỉnh sửa', 'Thời gian chỉnh sửa gần đây', 'Trạng thái', 'Chỉnh sửa', 'Xem chi tiết', 'admin'];
  var headerRow = document.createElement('tr');
  for (var i = 0; i < headers.length; i++) {
      var headerCell = document.createElement('th');
      headerCell.textContent = headers[i];
      headerCell.style.fontSize = "18px";
      headerCell.style.color = "#482121";
      headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  for (var i = 0; i < arry_cauhoi.length; i++) {
      var row = document.createElement('tr');
      
      var cell1 = document.createElement('th');
      cell1.textContent = i + 1;
      row.appendChild(cell1);

      var cell2 = document.createElement('th');
      cell2.textContent = arry_cauhoi[i].question;
      row.appendChild(cell2);

      var cell3 = document.createElement('th');
      cell3.textContent = arry_cauhoi[i].inputType;
      row.appendChild(cell3);

      var cell4 = document.createElement('th');
      cell4.textContent = arry_cauhoi[i].user_add;
      row.appendChild(cell4);

      var cell5 = document.createElement('th');
      cell5.textContent = arry_cauhoi[i].get_date_time;
      row.appendChild(cell5);

      var cell6 = document.createElement('th');
      cell6.textContent = arry_cauhoi[i].user_fix;
      row.appendChild(cell6);

      var cell7 = document.createElement('th');
      cell7.textContent = arry_cauhoi[i].time_fix;
      row.appendChild(cell7);

      if (arry_cauhoi[i].trang_thai == "chưa duyệt") {
          var cell8 = document.createElement('th');
          cell8.textContent = arry_cauhoi[i].trang_thai;
          row.appendChild(cell8);
      }
      
      if (arry_cauhoi[i].trang_thai == "đã duyệt") {
          var cell8 = document.createElement('th');
          cell8.textContent = arry_cauhoi[i].trang_thai;
          cell8.style.color = "#FCFFB2";
          row.appendChild(cell8);
      }
      
      var check_fix = 0;
      
      if (arry_cauhoi[i].email_nguoi_them == x.email || x.email == "admin@gmail.com" || x.username == "admin") {
          check_fix = 1;
      }

      if (check_fix == 1 && arry_cauhoi[i].trang_thai == "chưa duyệt") {
          var cell9 = document.createElement('th');
          var tag_a_fix = document.createElement("a");
          //tag_a_fix.id=i+"a";
          tag_a_fix.textContent = "chỉnh sửa";
          tag_a_fix.style.color = "#B70404";
          tag_a_fix.style.cursor ="pointer";
      
          (function(id_fix) {
              tag_a_fix.addEventListener('click', function() {
                  display_khoi_ch();
                  //console.log(arry_cauhoi[index].id_btn_xct)
                  chinh_sua(arry_cauhoi[id_fix].id_btn_fix,arry_cauhoi) 
                  hien_bang_them_cauhoi();
              });
          })(i);  
          cell9.appendChild(tag_a_fix);
          row.appendChild(cell9);
      }
      if(check_fix == 1 && arry_cauhoi[i].trang_thai == "đã duyệt"){
          let cell9 = document.createElement('th');
          cell9.textContent="#";
          row.appendChild(cell9);
      }
      if(check_fix==0){
          let cell9 = document.createElement('th');
          cell9.textContent="#";
          row.appendChild(cell9);
      }
      var cell10 = document.createElement('th');
      var tag_a_seen = document.createElement("a");
      tag_a_seen.id=arry_cauhoi[i].id_btn_xct;
      tag_a_seen.textContent = "xem chi tiết";
      tag_a_seen.style.color = "#ffffff";
      tag_a_seen.style.cursor="pointer";
    
      (function(id_seen) {
          tag_a_seen.addEventListener('click', function() {
              display_khoi_ch();
              //console.log(arry_cauhoi[index].id_btn_xct)
              xem_chitiet(arry_cauhoi[id_seen].id_btn_xct,arry_cauhoi) 
          });
      })(i);  
      cell10.appendChild(tag_a_seen);
      row.appendChild(cell10);
      var check_admin = 0;
      if (x.email == "admin@gmail.com" || x.username == "admin") {
          check_admin = 1;
      }
      if (check_admin == 0) {
          var cell11 = document.createElement("th");
          cell11.textContent = "#";
          row.appendChild(cell11);
      }
      if (check_admin == 1) {

        var cell11 = document.createElement("th");
         if(arry_cauhoi[i].trang_thai == "chưa duyệt"){
            var duyet = document.createElement("button");
            duyet.classList.add("btn_admin");
            duyet.textContent = "duyệt";
            duyet.style.border = "none";
            duyet.style.backgroundColor = "#A2FF86";
            duyet.style.padding = "3px 4px";
            duyet.style.fontWeight = "500";
            duyet.style.marginBottom = "5px";
            duyet.style.marginLeft = "4px";
            duyet.style.display="block";
            // Sử dụng IIFE để giữ giá trị của biến i vào hàm xử lý sự kiện
            (function(index) {
                duyet.addEventListener('click', function() {
                    //console.log(index); 
                    //console.log(arry_cauhoi[index]); 
                    duyet_cauhoi(arry_cauhoi[index].id, arry_cauhoi);
                    hien_bang_them_cauhoi(); 
                });
            })(i); // Truyền giá trị của i vào IIFE

            cell11.appendChild(duyet);
         }
         

          // Nút "Xóa"
          var xoa = document.createElement("button");
          xoa.classList.add("btn_admin");
          //xoa.id = i + "b";
          xoa.textContent = "xóa";
          xoa.style.border = "none";
          xoa.style.backgroundColor = "#FF7171";
          xoa.style.padding = "3px 5px";
          xoa.style.fontWeight = "500";
          xoa.style.marginBottom = "5px";
          xoa.style.marginLeft = "4px";
          // Sử dụng IIFE để giữ giá trị của biến i vào hàm xử lý sự kiện
          (function(index) {
              xoa.addEventListener('click', function() {
                  xoa_cauhoi(arry_cauhoi[index].id, arry_cauhoi);
                  hien_bang_them_cauhoi();
              });

          })(i); // Truyền giá trị của i vào IIFE  

          cell11.appendChild(xoa);
          row.appendChild(cell11);
          }
      table.appendChild(row);
      }
      return table;
      }
function hien_bang_them_cauhoi(){
  var table_question_add = document.getElementById('table_question_add');
  var bien_y=localStorage.getItem("cauhoi_chuaduyet")
  if(bien_y==null){
      table_question_add.innerHTML = "";
  }
  if(bien_y!=null){
      table_question_add.innerHTML = "";
      table_question_add.appendChild(tao_bang_thongtin_cauhoi());
  }
}
hien_bang_them_cauhoi();
var daduyet = JSON.parse(localStorage.getItem("daduyet")) || []; 
function duyet_cauhoi(id, arry_cauhoi) {
  for (var i = 0; i < arry_cauhoi.length; i++) {
      if (id == arry_cauhoi[i].id) {
          arry_cauhoi[i].trang_thai = "đã duyệt";
          localStorage.setItem("cauhoi_chuaduyet", JSON.stringify(arry_cauhoi));

          daduyet.push(arry_cauhoi[i]);
          localStorage.setItem("daduyet", JSON.stringify(daduyet));
          break;
      }
  }

  alert("Đã duyệt thành công");
}
function xoa_cauhoi(id, arry_cauhoi){
  for (var i=0;i<arry_cauhoi.length;i++){
      if(id==arry_cauhoi[i].id){
          arry_cauhoi.splice(i,1)  ;
          //console.log(arry_cauhoi) ; 
          localStorage.setItem("cauhoi_chuaduyet",JSON.stringify(arry_cauhoi));
          break;
      }
  }
  alert("Đã xóa")
  if(arry_cauhoi.length==0){
      xoa_local_cauhoi_chuaduyet();
  }
} 
function xoa_local_cauhoi_chuaduyet() {  
  if (typeof(Storage) !== "undefined") {
    localStorage.removeItem('cauhoi_chuaduyet');
  } else {
    console.log('Trình duyệt của bạn không hỗ trợ local storage.');
  }
}
//______ TRANG THÊM CÂU HỎI CHECKBOK___________
function show_quantity_answers_checkbox(){
  let quantity_answer=document.getElementById("quantity_answer").value;
  let form = document.createElement("form");
  form.classList.add("form_user_add_question");
  form.id="form_macdinh"; 
  form.autocomplete="off"
  let h3 = document.createElement("h3");
  h3.textContent="Thêm nội dung đáp án";
  let p1 = document.createElement("p");
  p1.textContent="Lưu ý: Không xóa phần A) B) C)"
  let p2 = document.createElement("p");
  p2.textContent="Hãy tích chọn các đáp án của bạn";
  p2.style.color="#19c22A";
  p2.style.fontWeight="500";
  form.appendChild(h3)
  form.appendChild(p1)
  form.appendChild(p2)
  for(let i=0;i<quantity_answer;i++){
      let input_checkbox = document.createElement("input");
      input_checkbox.type = "checkbox";
      input_checkbox.name ="is_checked";
      input_checkbox.value=arry_dapan[i];
      let input_text=document.createElement("input");
      input_text.type="text";
      input_text.name="input_text"; 
      input_text.style.fontSize="16px";
      input_text.value=arry_dapan[i];
      form.appendChild(input_checkbox);
      form.appendChild(input_text);
      form.appendChild(document.createElement("br")); // xuống dòng 
  }

  return form;  
}

function create_add_cauhoi_checkbox(){
  let class_show_answer=document.getElementById("show_answer");
  class_show_answer.innerHTML = "";
  var x_form=show_quantity_answers_checkbox();
  class_show_answer.appendChild(x_form);
}

function them_cauhoi_checkbok_vao(){
  let name_question=document.getElementById("name_question").value;
  var arry_checkbox_user = [];
  var node_list_checkbox = document.getElementsByName("is_checked");
  for( var i=0;i<node_list_checkbox.length;i++){
      if(node_list_checkbox[i].checked==true){
          arry_checkbox_user.push(node_list_checkbox[i].value.charAt(0));
      }
  }
  /*
  if(name_question==""){
    alert("hãy check đáp án mới được gửi");
    return ;
  }  
  if(arry_checkbox_user.length == 0 ){
    alert("hãy check đáp án mới được gửi");
    return ;
  }   */
  var join_arry_checkbox_user=arry_checkbox_user.join("");
  
  let node_list=document.getElementsByName("input_text");
  let cac_dap_an=[]
  for(let i=0;i<node_list.length;i++){
      cac_dap_an.push(node_list[i].value)
  }
  /*
  console.log(cac_dap_an);
  for (var i = 0;i<cac_dap_an.length; i++){
    if(cac_dap_an[i].charAt(3)==""){
      alert("Chưa nhập thông tin đáp án");
      return ;
    }
  }   */
  var cau_hoi_user=JSON.parse(localStorage.getItem("cauhoi_chuaduyet"));
  var id_ques=0
  if(cau_hoi_user != null){
      var index_id_end=cau_hoi_user.length-1
      id_ques=cau_hoi_user[index_id_end].id+1;
  }
  var obj_question={
      email_nguoi_them :           x.email,
      id               :           id_ques+"",
      inputType        :           "checkbox",
      get_date_time    :           get_date_time(),
      user_add         :           x.username,
      question         :           name_question,
      answers          :           cac_dap_an,
      correctAnswer    :           join_arry_checkbox_user,
      trang_thai       :           "chưa duyệt",
      time_fix         :           "",
      user_fix         :           "",
      id_btn_xct       :           id_ques,
      id_btn_fix       :           id_ques
  } 
  var arry_save_question_user=[];
  if(localStorage.getItem('cauhoi_chuaduyet')!=null){
      arry_save_question_user=JSON.parse(localStorage.getItem('cauhoi_chuaduyet'))
  }
  arry_save_question_user.push(obj_question);
  localStorage.setItem("cauhoi_chuaduyet", JSON.stringify(arry_save_question_user)); 
  alert("Đã thêm câu hỏi của bạn")
}
//_______________ TRANG DẠNG CÂU HỎI TEXT__________________
function them_cauhoi_text_vao(){
  var name_question_text  = document.getElementById("name_question_text").value;
  var answer_text         = document.getElementById("answer_text").value;
 /*
  if(name_question_text == ""){
   alert("Chưa nhập tên câu hỏi")
   return
 }
 if(answer_text == ""){
  alert("Chưa nhập đáp án ")
  return
}  */
  var cau_hoi_user=JSON.parse(localStorage.getItem("cauhoi_chuaduyet"));
  var id_ques=0
  if(cau_hoi_user != null){
      var index_id_end=cau_hoi_user.length-1
      id_ques=cau_hoi_user[index_id_end].id+1;
  }
  var obj_question={
      email_nguoi_them :           x.email,
      id               :           id_ques+"",
      inputType        :           "text",
      get_date_time    :           get_date_time(),
      user_add         :           x.username,
      question         :           name_question_text,
      correctAnswer    :           answer_text,
      trang_thai       :           "chưa duyệt",
      time_fix         :           "",
      user_fix         :           "",
      id_btn_xct       :           id_ques,
      id_btn_fix       :           id_ques
  } 
  var arry_save_question_user=[];
  if(localStorage.getItem('cauhoi_chuaduyet')!=null){
      arry_save_question_user=JSON.parse(localStorage.getItem('cauhoi_chuaduyet'))
  }
  arry_save_question_user.push(obj_question);       
  localStorage.setItem("cauhoi_chuaduyet", JSON.stringify(arry_save_question_user)); 
  alert("Đã thêm câu hỏi của bạn")
 
} 