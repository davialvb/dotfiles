function aiparser(e){if(top==self){var t=0,a="";if(location.href.match("goods\\d?.html|goods.html"))try{var o=document.createElement("script");o.innerText="localStorage.fatkun_rawData = JSON.stringify(window.rawData);",document.body.appendChild(o);var r=JSON.parse(localStorage.fatkun_rawData),n=r.store.initDataObj.goods;a=n.goodsName;var i=1;n.topGallery.forEach(function(e){var t=e.url||e;t.match("^http")||(t=location.protocol+t),v({src:t,group:"主图",alt:"主图-"+_(i++,2),groupIndex:0})}),n.videoGallery.forEach(function(a){var o=a.videoUrl;o.match("^http")||(o=location.protocol+o),new VItem({src:o,group:"视频",groupIndex:1,alt:n.goodsID+""},t++,e,function(t){chrome.runtime.sendMessage({cmd:"ADD_VIDEO",tabId:e.id,item:t})})});var c=1,s={specs:{},price:{}};n.skus.forEach(function(e){var t=e.thumbUrl;t.match("^http")||(t=location.protocol+t),v({src:t,alt:"SKU-"+_(c++,2)+"-"+(e.specs||[]).map(e=>e.spec_value).join("-"),group:"SKU图片",groupIndex:2}),e.specs&&(e.specs.forEach(e=>{s.specs[e.spec_key]||(s.specs[e.spec_key]=[]),-1==s.specs[e.spec_key].indexOf(e.spec_value)&&s.specs[e.spec_key].push(e.spec_value)}),s.price[e.specs.map(e=>e.spec_value).join(" ")]={groupPrice:e.groupPrice,groupTip:e.groupTip,marketPrice:e.marketPrice,normalPrice:e.normalPrice,normalSavePrice:e.normalSavePrice,oldGroupPrice:e.oldGroupPrice,skuExpansionPrice:e.skuExpansionPrice})}),chrome.runtime.sendMessage({cmd:"SET_PAGE_INFO",pageInfo:JSON.stringify(s,null,2).replace(/[{},"]/g,"")});var d=1,p=r.store.initDataObj.oakData;p&&p.goods&&p.goods.decoration?p.goods.decoration.forEach(e=>{e.contents.forEach(e=>{v({src:e.imgUrl,alt:"详情-"+_(d++,2),group:"详情",groupIndex:3})})}):n.detailGallery.forEach(function(e){var t=e.url;t.match("^http")||(t=location.protocol+t),v({src:t,alt:"详情-"+_(d++,2),group:"详情",groupIndex:3})})}catch(a){var l=document.cookie.match("pdd_user_id=(\\d+)")[1],u=document.cookie.match("PDDAccessToken=(.*?)(;|$)")[1],m={};location.search.substr(1).split("&").forEach(e=>{var t=e.split("=");m[t[0]]=t[1]}),fetch(`https://mobile.yangkeduo.com/proxy/api/api/oak/integration/render?pdduid=${l}&is_back=1`,{method:"POST",headers:{accept:"application/json, text/plain, */*","content-type":"application/json;charset=UTF-8",accesstoken:u},body:JSON.stringify({client_time:Date.now(),extend_map:{},goods_id:parseInt(m.goods_id),hostname:"mobile.yangkeduo.com",page_from:parseInt(m.page_from),page_version:7,refer_page_sn:m.refer_page_sn})}).then(e=>e.json()).then(a=>{var o=a.goods.gallery,r=o.filter(e=>1==e.type);r.sort((e,t)=>e.priority-t.priority);var n=o.filter(e=>2==e.type);n.sort((e,t)=>e.priority-t.priority);var i=o.filter(e=>6==e.type),c=o.filter(e=>-1==[1,2,6].indexOf(e.type)),s=1;r.forEach(function(e){v({src:e.url,width:e.width,height:e.height,group:"主图",alt:"主图-"+_(s++,2),groupIndex:0})});var d=1;n.forEach(function(e){v({src:e.url,width:e.width,height:e.height,group:"详情",alt:"详情-"+_(d++,2),groupIndex:3})});a.sku&&a.sku.sort((e,t)=>e.priority-t.priority).forEach(e=>{v({src:e.thumb_url+"?"+Date.now(),alt:"SKU-"+e.specs.map(e=>e.spec_value).join("-"),group:"SKU",groupIndex:1})}),i.forEach(function(a){new VItem({src:a.url,group:"视频",groupIndex:2,alt:m.goods_id+""},t++,e,function(t){chrome.runtime.sendMessage({cmd:"ADD_VIDEO",tabId:e.id,item:t})})});var p=1;c.forEach(function(a){a.video_url&&new VItem({src:a.video_url,group:"其他",groupIndex:4},t++,e,function(t){chrome.runtime.sendMessage({cmd:"ADD_VIDEO",tabId:e.id,item:t})}),a.url&&v({src:a.url,width:a.width,height:a.height,group:"其他",alt:"其他-"+_(p++,2),groupIndex:2})})})}else if(location.href.match("goods_comments.html")){(f=document.querySelectorAll("#goods-comments-list .oimage")).length>0&&f.forEach(function(e){var t=e.style.backgroundImage.match('url\\("(.*)"\\)');t&&((t=t[1].replace(/\?imageMogr2\/thumbnail.*/,"").replace(/\?imageView.*/,"")).match(/^http/)||(t=location.protocol+t),v({src:t}))}),(f=document.querySelectorAll("#goods-comments-list .pdd-lazy-image")).length>0&&f.forEach(e=>{v({src:e.dataset.src||e.src})});var h=document.querySelectorAll(".pdd-list-view div[data-uniqid");if(h.length>0){var g=[];h.forEach(e=>g.push(e.innerText.replace(/\n/g,"\r\n"))),chrome.runtime.sendMessage({cmd:"SET_PAGE_INFO",pageInfo:"###评论文字:\r\n"+g.join("\r\n")})}}else if(location.href.match("mall_certificates.html")){var f;(f=document.querySelectorAll("div[style]")).length>0&&f.forEach(function(e){var t=e.style.backgroundImage.match('url\\("(.*)"\\)');t&&((t=t[1].replace(/\?imageView.*/,"")).match(/^http/)||(t=location.protocol+t),v({src:t}))})}}function _(e,t){return(Array(t).join(0)+e).slice(-t)}function v(o){new ParsedPItem(o,t++,e,function(t){a&&(t.docTitle=a),chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:t})})}}window.aiparser=aiparser,function(){let e,t,a=!1;window.extras={downloadMJX:function(){var o=document.createElement("script");o.innerText="",document.body.appendChild(o);var r=0,n=!1;function i(e,a){var o;e.pictures&&chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:e.pictures.map((a,r)=>({docTitle:t,src:(o=a.url,o.match(/^http/)||(o=location.protocol+o),o),alt:`${e.review_id}-${r+1}`}))}),e.video&&chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:[{docTitle:t,src:e.video.url,alt:`${e.review_id}`,type:"VIDEO"}]})}function c(e){e&&e.data&&e.data.length>0?(e.data.forEach((e,t)=>{i(e)}),n||setTimeout(s.bind(this,r),2e3)):chrome.runtime.sendMessage({cmd:"COLLECT_COMPLETED"})}function s(t){r++,window.postMessage({topic:"ftk-fetch",p:"review-list",url:`https://mobile.yangkeduo.com/proxy/api/reviews/${e}/list?pdduid=${e}&is_back=1&page=${r}&size=20&enable_video=1&enable_group_review=1&label_id=0`,headers:{accept:"application/json, text/plain, */*","accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",accesstoken:localStorage.AccessToken,"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-origin",verifyauthtoken:localStorage.VerifyAuthToken}})}a||(a=!0,function(){e=location.href.match("goods_id=(\\d+)")[1];var a=document.createElement("script");a.innerText="\n                localStorage.fatkun_rawData = JSON.stringify(window.rawData);\n                window.addEventListener('message', function(e){\n                    if(e.data.topic == 'ftk-fetch'){\n                        fetch(e.data.url, {headers: e.data.headers || {}})\n                        .then(res => res.json())\n                        .then(data => {\n                            window.postMessage({\n                                topic: 'ftk-fetch-data',\n                                p: e.data.p,\n                                data: data\n                            });\n                        })\n                    }\n                });\n            ",document.body.append(a);var o=JSON.parse(localStorage.fatkun_rawData).store.initDataObj.goods;t=o.goodsName,window.addEventListener("message",function(e){"fatkun-tbview"==e.data.topic?c(e.data.data):"ftk-fetch-data"==e.data.topic?"review-list"==e.data.p&&c(e.data.data):"fatkun-tbview-image"==e.data.topic&&processOnePageImage(e.data.data)})}()),chrome.runtime.sendMessage({cmd:"OPEN-OUTPUT",type:"ftk-tb-review"},function(){setTimeout(function(){chrome.runtime.sendMessage({cmd:"SUPPORT_COLLECT_PAUSE"}),s()},2e3)}),chrome.runtime.onMessage.addListener(function(e){"PAUSE_COLLECT"==e.cmd?n=!0:"RESUME_COLLECT"==e.cmd&&(n=!1,s())})}}}();