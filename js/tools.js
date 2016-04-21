/**
 * Created by Vizards on 16/4/15.
 */

// 变量声明
var patt_email = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
    patt_phone = new RegExp("^[1][358][0-9]{9}$"),
    form_ctrl_innerHTML = '';    // 生成页面用

// 汉字长度计算
var get_str_len = function(str){
    var strlen = 0;
    for(var i = 0;i < str.length; i++){
        if(str.charCodeAt(i) > 255){
            // 如果是汉字，则字符串长度加2
            strlen += 2;
        }else{
            strlen++;
        }
    }
    return  strlen;
};

// 验证器
var validator = function(conditions,cb){
    var obj = conditions;
    var operationID = obj.id,
        input_value = document.getElementById(operationID).value,
        MSG,
        color;
    obj.validator(input_value,function(result){
        MSG = obj[result];
        if(result ==="fail"){
            color = "F11010";
        }
        if(result ==="success"){
            color = "75b86b"
        }
        if(result ==="rules"){
            color = "999";
        }
        document.getElementById("check_"+operationID).innerHTML =MSG;
        document.getElementById("check_"+operationID).style.color= color;
        document.getElementById(operationID).style.borderColor= color;
        cb(result);
    })

};

// 按钮生成器
var addBtns = function(){
    form_ctrl_innerHTML += '<input id="check" type="button" class="test-btn" value="验证"/>';
};

var addBtnEvent = function(arr){
    document.getElementById("check").addEventListener("click",function(){
        var result_list = "";
        for (var i in arr){
            result_list += arr[i].param;
            arr[i].factory.validator(function(result){
                //console.log(result)
                if(result ==='rules'){
                    result_list += "：校验未通过\n"
                }
                else if(result ==='fail'){
                    result_list += "：校验未通过\n"
                }
                else if(result ==='success'){
                    result_list += "：校验通过\n"
                }
                else{
                    result_list += "发生错误\n"
                }
            })
        }
        //console.log(result_list)
        alert(result_list)
    })
};