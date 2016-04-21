/**
 * Created by Vizards on 16/4/10.
 */

// factory
var formMaker = function (){};

// factory-构建页面
formMaker.prototype.addGroup = function(){
    var lf ='',
        rt ='',
        obj = this.conditions;
    lf += '<div class="gp-lf">';
    lf += "<label for='"+obj.id+"'>"+obj.label+"</label>";
    lf += '</div>';
    rt += '<div class="gp-rt">';
    rt += "<input id='"+obj.id+"' class='input-text' type='"+obj.type+"' />";
    rt += '<p id="check_'+obj.id+'" class="alert-info">'+obj.rules+'</p>';
    rt += '</div>';
    form_ctrl_innerHTML += lf;
    form_ctrl_innerHTML += rt;
};
// factory-外部接口-验证用
formMaker.prototype.validator = function(callback){
    var obj = this.conditions;
    document.getElementById("check_"+obj.id).style.display = "block"
    validator(obj,function(result){
        callback(result);
    });
};

//3.3 factory-事件监听器
formMaker.prototype.addEvent = function(){
    var obj = this.conditions;
    document.getElementById(obj.id).addEventListener("focus",function(){
        document.getElementById("check_"+obj.id).style.display = "block"
    });
    document.getElementById(obj.id).addEventListener("blur",function(){
        validator(obj,function(result){});
    })
};

//3.4 factory-工厂定义
formMaker.factory = function(type){
    var constr = type,
        newGroup;
    if(typeof formMaker[constr] !== 'function') {
        throw{
            name:"Error",
            message:constr + "doesn't exist"
        }
    }
    if(typeof formMaker[constr].prototype.drive!=="function"){
        formMaker[constr].prototype = new formMaker();
    }
    newGroup = new formMaker[constr]();
    return newGroup;
};

//4 初始化参数
formMaker.username = function(){
    this.conditions = {
        id:'name',
        label: '名称',
        type: 'text',
        rules: '必填，长度为4-16个字符',
        success: '格式正确',
        fail: '名称不能为空',
        validator:function(input_value,callback){
            var textlength  = get_str_len(input_value);
            if(textlength ===0){
                callback("rules");
            }
            else if(textlength < 4 || textlength >16){
                callback("fail");
            }
            else if(textlength >= 4 && textlength <= 16 ){
                callback("success");
            }
        }
    }
};

formMaker.pwd = function(){
    this.conditions = {
        id:'pwd',
        label: '密码',
        type: 'password',
        rules: '必填，长度为4-16个字符',
        success: '格式正确',
        fail: '密码格式不正确' ,
        validator:function(input_value,callback){
            var textlength  = get_str_len(input_value);
            if(textlength ===0){
                callback("rules");
            }
            else if(textlength < 4 || textlength >16){
                callback("fail");
            }
            else if(textlength >= 4 && textlength <= 16 ){
                callback("success");
            }
        }
    }
};

formMaker.pwd2 = function(){
    this.conditions = {
        id:'pwd2',
        label: '确认密码',
        type: 'password',
        rules: '再次输入密码',
        success: '正确',
        fail: '两次密码输入不匹配，请重新检查',
        validator:function(input_value,callback){
            var textlength  = get_str_len(input_value);
            if(input_value!=document.getElementById("pwd").value){
                callback("fail");
            }
            else if(textlength ===0){
                callback("rules");
            }
            else if(textlength < 4 || textlength >16){
                callback("fail");
            }
            else if(textlength >= 4 && textlength <= 16 ){
                callback("success");
            }
        }
    }
};

formMaker.email = function(){
    this.conditions = {
        id:'email',
        label: '邮箱',
        type: 'text',
        rules: '请输入正确的邮箱',
        success: '正确',
        fail: '邮箱格式错误'   ,
        validator:function(input_value,callback){
            var textlength  = get_str_len(input_value);
            if(textlength ===0){
                callback("rules");
            }
            else if(patt_email.test(input_value) === true){
                callback("success");
            }
            else {
                callback("fail");
            }
        }
    }
};

formMaker.phone = function(){
    this.conditions = {
        id:'phone',
        label: '电话',
        type: 'text',
        rules: '请输入13、15和18开头的11位手机号码',
        success: '手机号格式正确',
        fail: '手机号格式错误，请输入13、15和18开头的11位手机号码' ,
        validator:function(input_value,callback){
            var textlength  = get_str_len(input_value);
            if(textlength ===0){
                callback("rules");
            }
            else if(patt_phone.test(input_value) === true){
                callback("success");
            }
            else{
                callback("fail");
            }
        }
    }
};