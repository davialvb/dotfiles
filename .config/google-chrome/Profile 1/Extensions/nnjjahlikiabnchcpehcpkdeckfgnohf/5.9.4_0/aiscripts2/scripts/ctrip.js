function aiparser(e){var c=0;var r=document.querySelectorAll(".m-album-nav-img .m-img ");r.length>0?chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:Array.from(r).map(e=>({src:e.children[0].style.backgroundImage.match('"(.*)"')[1].replace(/.*\/\//,location.protocol+"//").replace(/_R_.*\./,".")}))}):(r=document.querySelectorAll("img")).forEach(function(r){var t,n;t=r.src,new ParsedPItem({src:t,alt:n},c++,e,function(c){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:c})})})}window.aiparser=aiparser,window.extras={downloadMJX:function(){if(window==top){var e=!1;chrome.runtime.sendMessage({cmd:"OPEN-OUTPUT",type:"ftk-tb-review"},function(){setTimeout(function(){chrome.runtime.sendMessage({cmd:"SUPPORT_COLLECT_PAUSE"}),location.href.match("hotels.ctrip.com/hotels/(\\d+.html|detail)")&&(document.querySelector('[data-id="ibu_hotel_review"]').click(),document.querySelectorAll(".m-fastfilter button")[3].click(),c())},2e3)}),chrome.runtime.onMessage.addListener(function(r){"PAUSE_COLLECT"==r.cmd?e=!0:"RESUME_COLLECT"==r.cmd&&(e=!1,c())})}function c(){if(!e)var r=0,t=setInterval(function(){r>10&&clearInterval(t),r++;var e=document.querySelectorAll(".comment .pictures li img"),n=[];if(e.length>0){clearInterval(t),e.forEach(e=>{e.src.match("http://video.c-ctrip.com/videos/.*_cover.jpg")?n.push({type:"VIDEO",src:e.src.replace("_cover.jpg",".mp4")}):n.push({src:e.src})}),chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:n});var o=document.querySelector(".m_num_checked + .m_num");o?(o.click(),c()):chrome.runtime.sendMessage({cmd:"COLLECT_COMPLETED"})}},1e3)}}};