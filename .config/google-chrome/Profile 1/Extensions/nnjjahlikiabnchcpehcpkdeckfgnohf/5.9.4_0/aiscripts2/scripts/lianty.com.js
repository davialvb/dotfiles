window.aiparser=function(){var e=document.querySelector('#imgbox img, [class^="image-cover-mask"]>img');if(!e)return-1;{let t=document.querySelector(".dbr-info-name").textContent,n=document.querySelector(".dtr-price").textContent,r=document.querySelector(".icon-lays");r=r?r.nextSibling.textContent:"";let o=location.href.match(/details\/(\d+)/)[1];chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:[{src:e.src,alt:`${o}-${t}-${n}`+(r?`-${r}`:"")}]})}};