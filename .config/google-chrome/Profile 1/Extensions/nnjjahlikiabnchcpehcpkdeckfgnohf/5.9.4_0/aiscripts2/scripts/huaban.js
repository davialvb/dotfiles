function aiparser(){var a=0;if(!location.href.match(/(meiwu\.co|huaban\.com|huabanpro\.com)\/boards\/\d+/))return-1;{var e="",t=location.href.match(/boards\/(\d+)/)[1];function i(){$.ajax({url:`https://api.huaban.com/boards/${t}/pins?limit=20`+(e?`&max=${e}`:""),success:function(t){var n=t.pins;n.forEach(function(e){var t;t={src:`https://hbimg.huaban.com/${e.file.key}`,smallUrl:`https://hbimg.huaban.com/${e.file.key}_fw236`,width:e.file.width,height:e.file.height,alt:e.raw_text},new ParsedPItem(t,a++,_tabInfo,function(a){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:_tabInfo.id,item:a})})}),n.length>0&&(e=n[n.length-1].pin_id,setTimeout(i,500))}})}setTimeout(function(){i()},1e3)}}chrome.runtime.sendMessage({cmd:"ADD_CROSS_DOMAIN",domain:{requetUrlReg:"hbimg.huaban.com",domain:"https://huaban.com"}}),window.aiparser=aiparser;