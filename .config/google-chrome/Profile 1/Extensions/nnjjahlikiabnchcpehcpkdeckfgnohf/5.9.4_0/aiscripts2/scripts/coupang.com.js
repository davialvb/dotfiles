function aiparser(){function e(e){return e.replace(/^\/\//,"https://").replace(/thumbnail\d.coupangcdn.com\/thumbnails\/remote\/48x48ex\//,"image7.coupangcdn.com/")}var r=[];if(location.href.match("www.coupang.com/vp/products")){chrome.runtime.sendMessage({cmd:"SET_GROUPS",groups:["Main","Detail"]});var a=1;document.querySelectorAll(".prod-image__items img").forEach(function(c){r.push({src:e(c.dataset.src||c.src),group:"Main",groupIndex:0,alt:"Main-"+a++})});var c=1;document.querySelectorAll("#productDetail img").forEach(function(a){r.push({src:e(a.dataset.original||a.src),group:"Detail",groupIndex:1,alt:"Detail-"+c++})})}else document.querySelectorAll("img").forEach(function(e){r.push({src:e.src})});chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:r})}window.aiparser=aiparser;