$(document).ready(function () {
  $(".panel input").blur(function () {

    // 注册验证
    $(this)
      .parent()
      .find(".a2")
      .remove();
    if ($(this).is("#username")) {
      if (this.value == "" || this.value.length < 6) {
        var hdw1 = $("<span class='a2 error'>用户名不得小于6位</span>");
        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");
        $(this)
          .parent()
          .append(hdw1);
      }
    }

    

    if ($(this).is("#password")) {
      if (this.value == "") {
        var hdw1 = $("<span class='a2 error'>密码不得为空</span>");

        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");

        $(this)
          .parent()
          .append(hdw1);
      }
    }

    if ($(this).is("#passwords")) {
      if (this.value == "" || this.value != $("#password").val()) {
        var hdw1 = $("<span class='a2 error'>两次密码不一样</span>");

        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");

        $(this)
          .parent()
          .append(hdw1);
      }
    }

    if ($(this).is("#email")) {
      if (
        this.value == "" ||
        (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))
      ) {
        var hdw1 = $("<span class='a2 error'>邮件格式不正确</span>");

        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");

        $(this)
          .parent()
          .append(hdw1);
      }
    }

    if ($(this).is("#tel")) {
      if (this.value == "" || isNaN($(this).val()) || this.value.length < 11) {
        var hdw1 = $(
          "<span class='a2 error'>手机号不得为空，必须是11位数字</span>"
        );

        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");

        $(this)
          .parent()
          .append(hdw1);
      }
    }

    // 登录验证

    if($(this).is("#userName-login")) {
      if (this.value == "") {
        var hdw1 = $("<span class='a2 error'>用户名不得为空</span>");
        $(this)
          .parent()
          .append(hdw1);
      }
    }
    if($(this).is("#pwd-login")) {
      if (this.value == "") {
        var hdw1 = $("<span class='a2 error'>密码不得为空</span>");
        $(this)
          .parent()
          .append(hdw1);
      }
    }

    if ($(this).is("#yanzhengma")) {
      if ( this.value != checkCode.innerHTML) {
       
        var hdw1 = $(
          "<span class='a2 error'>验证码不正确</span>"
        );
  
        $(this)
          .parent()
          .append(hdw1);
      } else {
        var hdw1 = $("<span class='a2 righta'>正确</span>");
  
        $(this)
          .parent()
          .append(hdw1);
      }
    }

  });

  $("#send").click(function () {
    $(".panel input").trigger("blur");

    var hdw3 = $(".error").length;

    if (hdw3) {
      return false;
    }else{
      alert('注册成功')
    }
  });
  $("#login").click(function () {
    $(".panel input").trigger("blur");

    var hdw3 = $(".error").length;

    if (hdw3) {
      return false;
    }

   
  });

  var checkCode = document.querySelector(".code");
  var change = document.querySelector(".change");
  createCode();
  change.addEventListener('click', createCode);
  var code = "";
  function createCode(){
    code = "";
    var codeLength = 4;
    var random = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];

    for( var i =0; i<codeLength; i++ ){
      var index = Math.floor((Math.random() * 36));
      code += random[index];
      
    }

    checkCode.innerHTML = code;
  }


});
