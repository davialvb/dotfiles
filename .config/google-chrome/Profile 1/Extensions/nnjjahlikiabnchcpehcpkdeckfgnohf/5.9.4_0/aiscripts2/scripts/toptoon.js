function aiparser(e){var t=0;function r(r){new ParsedPItem(r,t++,e,function(t){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:t})})}if(location.href.match(/episode_view|epView/)){imgs2=document.querySelectorAll("#viewer_body img, .epContent img");var a=[],i="";imgs2.forEach(e=>{if(e.id){var t=e.id.split("_")[1];i!=t?(a.push([e]),i=t):a[a.length-1].push(e)}else a.push([e])}),invert=function(e){for(var t=e.data,r=0;r<t.length;r+=4)t[r]=255-t[r],t[r+1]=255-t[r+1],t[r+2]=255-t[r+2];return e},a.forEach(e=>{if(e.length>1){var t=document.createElement("canvas");t.width=e[0].naturalWidth*e.length,t.height=e[0].naturalHeight;var a=t.getContext("2d");e.forEach((e,t)=>{a.drawImage(e,e.naturalWidth*t,0)});var i=a.getImageData(0,0,t.width,t.height);a.putImageData(invert(i),0,0);var n=t.toDataURL("image/png");r({src:n,bigUrl:n,width:t.width,height:t.height})}else{var c=e[0];(c.src.match("ep_content|ep_thumb1")||"show_nav4();"==c.getAttribute("onclick"))&&r({src:c.src,bigUrl:c.src,width:c.naturalWidth,height:c.naturalHeight})}})}else{document.querySelectorAll(".swiper-slide-active img").forEach(function(e){e.src.match("ep_content|ep_thumb1")&&r(e)})}}bigImgParser.parse=function(src){if(src.match(/^data/))return src;for(var rules=this.getEnabledRules(),i=0;i<rules.length;i++){var rule=rules[i],srcPattern=new RegExp(rule.srcPattern),replaceRule=rule.replaceRule;if(srcPattern&&srcPattern.test(src)){var ret=src;try{return ret=eval(replaceRule.replace(/@/g,src)),ret}catch(e){}}}return src},window.aiparser=aiparser;