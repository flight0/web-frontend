let contentData = new Array;
let localContent = localStorage.getItem('content');

if( localContent ) {
    console.log(localContent.split(','));

    localContent.split(',').forEach(function(item){
        console.log(item);
        let liNode = document.createElement("li");
        liNode.innerHTML = item;

        if ( document.querySelector('ul').querySelector('li') ) {
            document.querySelector('ul').insertBefore(liNode, document.querySelector('ul').querySelector('li'));
        } else {
            document.querySelector('ul').appendChild(liNode);
        }
    })

    if( localContent ) {
        contentData = localContent.split(',');
    }
}

document.querySelector('button').onclick = function(){
    let content = document.querySelector('textarea').value;
    let liNode = document.createElement("li");
    liNode.innerHTML = content;

    if ( document.querySelector('ul').querySelector('li') ) {
        document.querySelector('ul').insertBefore(liNode, document.querySelector('ul').querySelector('li'));
    } else {
        document.querySelector('ul').appendChild(liNode);
    }

    contentData.push(content);
    console.log(contentData);
    localStorage.setItem('content', contentData);
}

document.querySelector('form').onsubmit = function(){
    return false;
}