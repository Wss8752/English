(function () {
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
        // in case the input is already filled..
        if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
        }

        // events:
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }
})();

$(function () {
    $('#login #login-password').focus(function () {
        $('.login-owl').addClass('password');
    }).blur(function () {
        $('.login-owl').removeClass('password');
    });
    $('#login #register-password').focus(function () {
        $('.register-owl').addClass('password');
    }).blur(function () {
        $('.register-owl').removeClass('password');
    });
    $('#login #register-repassword').focus(function () {
        $('.register-owl').addClass('password');
    }).blur(function () {
        $('.register-owl').removeClass('password');
    });
    $('#login #forget-password').focus(function () {
        $('.forget-owl').addClass('password');
    }).blur(function () {
        $('.forget-owl').removeClass('password');
    });
});

function goto_register() {
    $("#register-username").val("");
    $("#register-password").val("");
    $("#register-repassword").val("");
    $("#register-code").val("");
    $("#tab-2").prop("checked", true);
}

function goto_login() {
    $("#login-username").val("");
    $("#login-password").val("");
    $("#tab-1").prop("checked", true);
}

function goto_forget() {
    $("#forget-username").val("");
    $("#forget-password").val("");
    $("#forget-code").val("");
    $("#tab-3").prop("checked", true);
}

function login() {
    //??????
    var name = $("#login-username").val(),
        password = $("#login-password").val(),
        validatecode = $("#login-valiad").val(),
        flag = false;
    //?????????????????????????????????
    if (name == "") {
        $.pt({
            target: $("#login-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "?????????????????????"
        });
        flag = true;
    }
    if (password == "") {
        $.pt({
            target: $("#login-password"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????"
        });
        flag = true;
    }
    //???????????????????????????
    if (validatecode == "") {
        $.pt({
            target: $("#login-valiad"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????"
        });
        flag = true;
    }
    //??????????????????15???????????????????????????
    var regExp = new RegExp("^[a-zA-Z0-9_]{1,15}$");
    if (!regExp.test(name)) {
        $.pt({
            target: $("#login-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????15???????????????????????????"
        });
        flag = true;
    }

    if (flag) {
        return false;
    } else {//??????
        //?????????????????????????????????
        $.post(
            "CheckLogin",
            {name: name, password: password, code: validatecode},
            function (data) {
                if (data.msg == "????????????") {

                    if (data.data.r_id == 1)
                        window.location.href = "managerIndex"
                    else
                        window.location.href = "UserIndex"
                } else {
                    alert(data.msg)
                }

            },
            "json"
        )
        return false;
    }
}

//??????
function register() {
    var name = $("#register-username").val(),
        password = $("#register-password").val(),
        repassword = $("#register-repassword").val(),
        code = $("#register-code").val(),
        Valiadcode = $("#login-valiad").val(),
        flag = false;
    //?????????????????????????????????
    if (name == "") {
        $.pt({
            target: $("#register-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "?????????????????????"
        });
        flag = true;
    }
    if (password == "") {
        $.pt({
            target: $("#register-password"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????"
        });
        flag = true;
    } else {
        if (password != repassword) {
            $.pt({
                target: $("#register-repassword"),
                position: 'r',
                align: 't',
                width: 'auto',
                height: 'auto',
                content: "??????????????????????????????"
            });
            flag = true;
        }
    }
    //?????????????????????????????????
    //???????????????????????????????????????????????????
    $("#register-username").blur(function () {

    })
    //??????????????????15???????????????????????????
    var regExp = new RegExp("^[a-zA-Z0-9_]{1,15}$");
    if (!regExp.test(name)) {
        $.pt({
            target: $("#register-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????15???????????????????????????"
        });
        flag = true;
    }
    if (flag) {
        return false;
    } else {
        $.ajax({
            url: "isExist",
            data: {name: name},
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (data.code == "203") {
                    $.pt({
                        target: $("#register-username"),
                        position: 'r',
                        align: 't',
                        width: 'auto',
                        height: 'auto',
                        content: "????????????????????????????????????"
                    });
                    flag = true;
                } else {
                    //??????
                    $.ajax({
                        url: "regist",
                        data: {name: name, password: password, Valiadcode: Valiadcode, registCode: code},
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            spop({
                                template: '<h4 class="spop-title">????????????</h4>?????????3??????????????????',
                                position: 'top-center',
                                style: 'success',
                                autoclose: 3000,
                                onOpen: function () {
                                    var second = 2;
                                    var showPop = setInterval(function () {
                                        if (second == 0) {
                                            clearInterval(showPop);
                                        }
                                        $('.spop-body').html('<h4 class="spop-title">????????????</h4>?????????' + second + '??????????????????');
                                        second--;
                                    }, 1000);
                                },
                                onClose: function () {
                                    goto_login();
                                }
                            });
                        }
                    });
                }
            }
        });
        return false;
    }
}

//????????????
function forget() {
    var username = $("#forget-username").val(),
        password = $("#forget-password").val(),
        code = $("#forget-code").val(),
        flag = false,
        validatecode = null;
    //?????????????????????????????????
    if (username == "") {
        $.pt({
            target: $("#forget-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "?????????????????????"
        });
        flag = true;
    }
    if (password == "") {
        $.pt({
            target: $("#forget-password"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????"
        });
        flag = true;
    }
    //??????????????????15???????????????????????????
    var regExp = new RegExp("^[a-zA-Z0-9_]{1,15}$");
    if (!regExp.test(username)) {
        $.pt({
            target: $("#forget-username"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????15???????????????????????????"
        });
        flag = true;
    }
    //???????????????????????????
    //???????????????

    //???????????????????????????
    if (code != '11111111') {
        $.pt({
            target: $("#forget-code"),
            position: 'r',
            align: 't',
            width: 'auto',
            height: 'auto',
            content: "??????????????????"
        });
        flag = true;
    }


    if (flag) {
        return false;
    } else {//????????????
        spop({
            template: '<h4 class="spop-title">??????????????????</h4>?????????3??????????????????',
            position: 'top-center',
            style: 'success',
            autoclose: 3000,
            onOpen: function () {
                var second = 2;
                var showPop = setInterval(function () {
                    if (second == 0) {
                        clearInterval(showPop);
                    }
                    $('.spop-body').html('<h4 class="spop-title">??????????????????</h4>?????????' + second + '??????????????????');
                    second--;
                }, 1000);
            },
            onClose: function () {
                goto_login();
            }
        });
        return false;
    }
}


//????????????????????????????????????
function changeCode() {
    var img = document.getElementById("codeImg");
    img.src = "getCaptchaCode?time=" + new Date().getTime();
}
