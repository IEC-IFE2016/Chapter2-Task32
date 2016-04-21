/**
 * Created by Vizards on 16/4/10.
 */
function onload(){
    // 通过工厂进行生产
    var username  = new formMaker.factory("username");
    var pwd   = new formMaker.factory("pwd");
    var pwd2  = new formMaker.factory("pwd2");
    var email  = new formMaker.factory("email");
    var phone  = new formMaker.factory("phone");

    var arr = [
        {
            param:"名称",
            factory:username
        },
        {
            param:"密码",
            factory:pwd
        },
        {
            param:"验证密码",
            factory:pwd2
        },
        {
            param:"邮箱",
            factory:email
        },
        {
            param:"手机",
            factory:phone
        }
    ];
    // 构造页面
    for(var i in arr){
        arr[i].factory.addGroup();
    }
    addBtns();
    document.getElementById("formCtrl").innerHTML = form_ctrl_innerHTML;
    // 增加事件监听
    for(var i in arr){
        arr[i].factory.addEvent();
    }
    addBtnEvent(arr);
}