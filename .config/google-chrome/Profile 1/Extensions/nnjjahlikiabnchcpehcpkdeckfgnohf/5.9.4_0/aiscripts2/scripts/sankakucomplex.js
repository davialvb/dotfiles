function aiparser(t){$("#ftk-btn-start")[0].click()}window.aiparser=aiparser,function(){var t=1,e=0,n="",s=location.href.match(/tags=(.*?)(&|$)/);s=s?s[1]:encodeURIComponent("threshold:1+hide_posts_in_books:in-larger-tags");var i=document.createElement("div");function o(){"in-process"==n&&($("#ftk-btn-start").prop("disabled",!0),$("#ftk-btn-stop").prop("disabled",!1),$("#ftk-btn-stop").text("停止采集"),$("#ftk-status").text("采集中...")),"stop"==n&&($("#ftk-btn-start").prop("disabled",!1),$("#ftk-btn-start").text("重新采集"),$("#ftk-btn-stop").prop("disabled",!1),$("#ftk-btn-stop").text("继续采集"),$("#ftk-status").text("已停止")),"complete"==n&&($("#ftk-btn-start").prop("disabled",!1),$("#ftk-btn-stop").prop("disabled",!0),$("#ftk-status").text("已完成"))}function r(){var i;fetch(`https://capi-v2.sankakucomplex.com/posts?lang=english&page=${t++}&limit=100&tags=${s}`).then(t=>t.json()).then(t=>{t.length>0?(t.forEach(t=>{t.file_url&&t.preview_url&&(t={src:t.file_url,smallUrl:t.preview_url,width:t.width,height:t.height},new ParsedPItem(t,e++,_tabInfo,function(t){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:_tabInfo.id,item:t})}))}),"in-process"==n&&r()):(n="complete",o())})}i.id="ftk-ai-insert",$(i).css({position:"fixed",top:"10px",right:"50px",zIndex:999999}),document.body.appendChild(i),i.innerHTML='\n            <button id="ftk-btn-start">采集</button>\n            <button id="ftk-btn-stop" disabled>停止采集</button>\n            <span id="ftk-status">未开始</span>\n    ',i.querySelector("#ftk-btn-start").addEventListener("click",function(){t=1,n="in-process",o(),chrome.runtime.sendMessage({cmd:"GET_CURRENT_TAB_IMAGE",from:"ct-ai"},function(){r()})}),i.querySelector("#ftk-btn-stop").addEventListener("click",function(){"in-process"==n?(n="stop",o()):(n="in-process",o(),r())})}();