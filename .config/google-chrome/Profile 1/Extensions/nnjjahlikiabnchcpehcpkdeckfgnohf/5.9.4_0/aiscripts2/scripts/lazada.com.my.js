function aiparser(r){if(top==self){var e=0;chrome.runtime.sendMessage({cmd:"SET_GROUPS",groups:["主图","视频","SKU图片","详情"]});var o=document.createElement("script");o.innerText="localStorage.fatkun___moduleData__ = JSON.stringify(window.__moduleData__);";try{document.body.appendChild(o);var t=JSON.parse(localStorage.fatkun___moduleData__),c=1;try{t.data.root.fields.skuGalleries[0].forEach(r=>{"img"==r.type&&i({src:r.src,alt:"主图-"+d(c++,2),group:"主图",groupIndex:0}),"video"==r.type&&new VItem({src:r.src,group:"视频",groupIndex:1},e++,_tabInfo,function(r){chrome.runtime.sendMessage({cmd:"ADD_VIDEO",tabId:_tabInfo.id,item:r})})&&i({src:r.poster,group:"视频",groupIndex:1,alt:"视频封面"})})}catch(r){}var a=1;try{var s=[];t.data.root.fields.productOption.skuBase.properties.forEach(r=>{r.values.forEach(r=>{r.image&&s.push({src:r.image,group:"SKU图片",groupIndex:2,alt:"SKU-"+d(a,2)+"-"+r.name}),r.hoverImage&&s.push({src:r.hoverImage,group:"SKU图片",groupIndex:2,alt:"SKU-"+d(a,2)+"-HOVER-"+r.name}),a++})}),s.forEach(r=>{r.src.match("^//")&&(r.src=location.protocol+r.src)}),chrome.runtime.sendMessage({tabId:_tabInfo.id,cmd:"ADD_IMG_LIST",list:s})}catch(r){}var n=1;try{t.data.root.fields.product.desc.match(/img.*?src="(.*?)"/g).forEach(r=>{i({src:r.match('src="(.*)"')[1],alt:"详情-"+d(n++,2),group:"详情",groupIndex:3})})}catch(r){}}catch(r){var u=[];document.querySelectorAll(".item-gallery img").forEach((r,e)=>{u.push({src:r.src,alt:`主图-${d(e+1,2)}`,group:"主图",groupIndex:0})}),(s=document.querySelectorAll(".sku-prop-content img")).forEach((r,e)=>{u.push({src:r.src,alt:`SKU图片-${d(e+1,2)}`,group:"SKU图片",groupIndex:2})}),document.querySelectorAll(".detail-content img").forEach((r,e)=>{u.push({src:r.src,alt:`详情-${d(e+1,2)}`,group:"详情",groupIndex:3})}),u.forEach(r=>{r.src=r.src.replace(/_\d+x\d+.*/,"")}),chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:u})}!function(){var r=document.querySelector(".item-gallery__video-icon");if(r){r.click();var e=setInterval(()=>{var r=document.querySelector("video");r&&(clearInterval(e),i({src:r.currentSrc,type:"VIDEO",group:"视频",groupIndex:1}))},1e3)}}()}function d(r,e){return(Array(e).join(0)+r).slice(-e)}function i(r){r.src.match("^//")&&(r.src=location.protocol+r.src),chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",tabId:_tabInfo.id,list:[r]})}}window.aiparser=aiparser;