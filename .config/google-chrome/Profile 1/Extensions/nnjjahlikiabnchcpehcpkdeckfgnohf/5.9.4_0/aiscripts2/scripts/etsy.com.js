window.aiparser=function(){let e=document.querySelectorAll("li[data-carousel-pagination-item] img"),r=Array.from(e).map(e=>({src:e.src})),c=document.querySelector("video");c&&r.push({src:c.currentSrc,type:"VIDEO"}),chrome.runtime.sendMessage({cmd:"ADD_IMG_LIST",list:r})};