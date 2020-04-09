//新建一个数组对象, 用户存放发布的内容
var contentData = [];

//从本地存储获取key为content的数据，获取已发布的内容
var localContent = localStorage.getItem("content");

//如果有已发布的内容，显示内容，没有已发布的内容，则跳过
if( localContent ) {

    var localContentJson = JSON.parse(localContent);

    //处理从本地存储获取的内容，从存储中获取的默认是字符串的数据，而我们希望处理的一组消息内容，也就是数组，所以通过split()方法把字符串分割为数组，并通过forEach来遍历数据呈现已发布的内容
    localContentJson.forEach(function(item, index){
        insertHtml(item, index);
    })

    //把从本地存储获取的内容也放入到之前新建的数据对象中，防止已发布的内容在存储的时候丢失
    contentData = localContentJson;
}

//从document中查找button标签，并赋予一个点击事情的处理
document.querySelector("button").onclick = function(){

    //当点击button按钮的时候，获取textarea内容，也就是获取用户输入的内容
    var title = document.querySelector("input").value;
    var content = document.querySelector("textarea").value;
    var date = new Date();
    var createtime = date.getFullYear() +"年"+ (date.getMonth() + 1) +"月"+ (date.getDate()) + "日 " + date.getHours() +":"+ date.getMinutes();

    //如果用户输入的内容为空的话，聚集光标到textarea输入框，以达到提示用户输入的目的，并终止执行，返回false
    if( title.length == 0 ) {
        document.querySelector("input").focus();
        return false;
    }

    if( content.length == 0 ) {
        document.querySelector("textarea").focus();
        return false;
    }

    var contentItem = {
        "title":title, 
        "content":content, 
        "createtime":createtime
    };

    insertHtml(contentItem);
    
    //将用户输入的内容放入在最开始新建的数组对象中
    contentData.push(contentItem);

    //将存放用户发布内容的数组保存到浏览器本地的存储中
    localStorage.setItem("content", JSON.stringify(contentData));
    
    //发布动作完成后，清空输入框的内容，便于用户下一次的输入
    document.querySelector("textarea").value = "";
}

//当点击发布提交form表单的时候，不做提交的处理，直接终止执行，返回false
document.querySelector("form").onsubmit = function(){
    return false;
}

document.querySelectorAll(".delete").forEach(function(item){
    item.onclick = function(){
        var indexId = item.attributes['data-id'].value;
        document.querySelector('li[data-id="'+indexId+'"]').style.display="none";

        contentData.splice(indexId, 1);
        localStorage.setItem("content", JSON.stringify(contentData));
    }
});

function insertHtml(item, index) {

    //创建一个html元素，这个元素是li，并把用户输入的内容放入到li标签里面    
    let liNode = document.createElement("li");
    var id = document.createAttribute("data-id");
    id.value = index;
    liNode.setAttributeNode(id);
    
    liNode.innerHTML =  
    "<div class=\"title-container\">\
        <div>"+item.title+"</div>\
        <div>"+item.createtime+"</div>\
    </div>\
    <div>\
        "+item.content+"\
    </div>\
    <div class=\"handle-container\">\
        <span>编辑</span><span class=\"delete\" data-id=\""+index+"\">删除</span>\
    </div>";

    //因为希望最新发布的内容显示在最上面，所以要判断如果ul标签里面有li标签的话，就把内容放在li标签前面，否则直接放入到ul标签里即可
    if ( document.querySelector("ul").querySelector("li") ) {
        document.querySelector("ul").insertBefore(liNode, document.querySelector("ul").querySelector("li"));
    } else {
        document.querySelector("ul").appendChild(liNode);
    }
        
}