var imgFromXhr=[];!function(){var e;window.addEventListener("message",function(e){"img-from-xhr"==e.data.topic&&(imgFromXhr=imgFromXhr.concat(e.data.data))});var n=0,t=setInterval(()=>{if(n>10&&clearInterval(t),n++,e=document.querySelector("noscript")){e=e.innerText.match('nonce="(.*?)"')[1];var a=document.createElement("script");a.setAttribute("nonce",e),a.innerText="\n    var open = window.XMLHttpRequest.prototype.open,\n    send = window.XMLHttpRequest.prototype.send,\n    onReadyStateChange;\n\nfunction openReplacement(method, url, async, user, password) {\n    var syncMode = async !== false ? 'async' : 'sync';\n    return open.apply(this, arguments);\n}\n\nfunction sendReplacement(data) {\n\n    if(this.onreadystatechange) {\n        this._onreadystatechange = this.onreadystatechange;\n    }\n    this.onreadystatechange = onReadyStateChangeReplacement;\n\n    return send.apply(this, arguments);\n}\n\nfunction onReadyStateChangeReplacement() {\n    if(this.readyState == 4){\n        try{\n            var dd = this.responseText.match('\\\\[\\\\[\"wrb.*');\n            if(dd){\n                window.postMessage({\n                    topic: 'img-from-xhr',\n                    data: [JSON.parse(dd[0])[0][2]]\n                });\n            }\n        }catch(e){\n\n        }\n    }\n    if(this._onreadystatechange) {\n        return this._onreadystatechange.apply(this, arguments);\n    }\n}\n\nwindow.XMLHttpRequest.prototype.open = openReplacement;\nwindow.XMLHttpRequest.prototype.send = sendReplacement;\n    ",document.body.appendChild(a),clearInterval(t)}},1e3)}(),window.aiparser=function(e){var n=0;document.querySelectorAll(".rg_meta").forEach(function(t){try{var a=JSON.parse(t.innerText);r={src:a.ou,smallUrl:a.tu,width:a.ow,height:a.oh},n++,new ParsedPItem(r,n++,e,function(n){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:n})})}catch(e){}var r}),document.querySelectorAll("script").forEach(function(e){try{var n=e.innerText.match("AF_initDataCallback\\({key: 'ds:1'"),t=[].concat(imgFromXhr);n&&t.unshift(e.innerText.match("\\[[\\s\\S]*\\]")[0]);var a=[];t.forEach(function(e){(e=(e=JSON.parse(e))[31][0][12][2]).forEach(function(e){try{var n=e[1][3];a.push({src:n[0],smallUrl:n[0],width:n[2],height:n[1],alt:e[1][9][2008][1]})}catch(e){}}),chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:a}),chrome.runtime.sendMessage({cmd:"SET_PAGE_INFO",pageInfo:"###每一行由图片地址和图片标题组成，地址和标题由Tab键分隔\r\n"+a.map(e=>`${e.src}\t${e.alt}`).join("\r\n")})})}catch(e){}})};