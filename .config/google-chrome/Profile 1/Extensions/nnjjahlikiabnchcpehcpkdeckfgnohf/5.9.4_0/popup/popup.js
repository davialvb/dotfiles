var validShortKeyReg="[a-zA-z1-9]";chrome.tabs.query({active:!0,windowId:chrome.windows.WINDOW_ID_CURRENT},function(t){var e=t[0],n=utils.getDomainFromUrl(e.url);!utils.checkTabDownloadableByUrl(e.url)&&document.body.classList.add("undownloadable"),appConfig.init(function(t){new Vue({el:"#app",data:{currentPage:"main-1",version:chrome.runtime.getManifest().version,config:t,aiscript:{current:null,newItem:null,status:"normal"},newAiscript:null,currentSite:n,showSwitchOldMsg:!1,multiUrlsInputShow:!1,multiUrls:"",IEMode:!0,qq:gConfig.qq,qqg:gConfig.qqg,mail:gConfig.mail,brand:gConfig.brand,adLink:"http://ad.image-search-assistant.com/ad/stad.html?from=popup-"+gConfig.name+"&"+utils.param(gParams),adDescShowed:!1,adClosed:localStorage.adClosed,userInfo:"",lbWebUrl:gConfig.lbWebServer},mounted:function(){var t=this;chrome.tabs.executeScript(e.id,{code:'console.log("IE-TEST")'},function(){t.IEMode=!1}),aiscripts.init(function(n){t.aiscript.current=aiscripts.getByUrl(e.url),t.aiscript.current.latest&&(t.aiscript.newItem=t.aiscript.current.latest,t.aiscript.status="needUpdate")}),chrome.storage.local.get(["lbToken","userInfo"],t=>{t.userInfo?this.userInfo=t.userInfo:t.lbToken&&fetch(`${gConfig.lbServer}/users/me`,{headers:{Authorization:"Bearer "+t.lbToken}}).then(t=>t.json()).then(t=>{t.error||(this.userInfo=t,chrome.storage.local.set({userInfo:t}))})})},watch:{config:{handler:function(){appConfig.setConfig(this.config)},deep:!0}},computed:{limitedUnlocked:{get:function(){return this.config.needBlobDomains.indexOf(n)>=0},set:function(t){var e=this.config.needBlobDomains;t?e.push(n):e.splice(e.indexOf(n),1)}},concurrent:{get:function(){return this.config.limitConcurrent},set:function(t){this.config.limitConcurrent=t}},autoConvertWebp:{get:function(){return this.config.autoConvertWebp},set:function(t){this.config.autoConvertWebp=t,t&&chrome.tabs.query({url:chrome.extension.getURL("output/output.html*")},function(t){t.forEach(function(t){chrome.tabs.reload(t.id)})})}},shortKeyCurrent:{get:function(){return this.config.shortKeyCurrent.toUpperCase()},set:function(t){(t=(t=t.toUpperCase()).substr(-1,1))==this.config.shortKeyAll&&(t=""),t.match(validShortKeyReg)&&(t=t.toUpperCase()),this.config.shortKeyCurrent=t,t||(this.$refs.shortKeyCurrentEle.value=""),t==this.config.shortKeyCurrent&&(this.$refs.shortKeyCurrentEle.value=t)}},shortKeyAll:{get:function(){return this.config.shortKeyAll.toUpperCase()},set:function(t){(t=(t=t.toUpperCase()).substr(-1,1))==this.config.shortKeyCurrent&&(t=""),t.match(validShortKeyReg)&&(t=t.toUpperCase()),this.config.shortKeyAll=t,t||(this.$refs.shortKeyAllEle.value=""),t==this.config.shortKeyAll&&(this.$refs.shortKeyAllEle.value=t)}},aiscriptEnabled:{get:function(){return"enabled"==this.aiscript.current.status},set:function(){"enabled"==this.aiscript.current.status?aiscripts.disable(this.aiscript.current.id):aiscripts.enable(this.aiscript.current.id),chrome.tabs.reload(e.id)}}},methods:{switchOnOff:function(t,e){},showSettings:function(){this.currentPage="main-2",document.body.classList.add("expand")},hideSettings:function(){this.currentPage="main-1",document.body.classList.remove("expand")},downloadCurrentTab:function(){chrome.runtime.sendMessage({cmd:"GET_CURRENT_TAB_IMAGE",from:"popup"})},downloadAllTabs:function(){chrome.runtime.sendMessage({cmd:"GET_ALL_TAB_IMAGE",from:"popup"})},enabelScript:function(t){aiscripts.enable(aiscript.id,t)},updateScript:function(){var t=this;aiscripts.update(this.aiscript.newItem,function(n){n&&n.success&&(t.aiscript.status="updated",chrome.tabs.reload(e.id))})},checkAiscriptUpdate:function(){aiscripts.checkUpdate(this.aiscript.current.id,function(t){t.needUpdate?(this.aiscript.status="needUpdate",this.aiscript.newItem=t.newItem):this.aiscript.status="latest"}.bind(this))},switchContextmenu:function(){chrome.runtime.sendMessage({cmd:"SWITCH_CONTEXTMENU",enabled:this.config.enableContextmenu})},openMultiPages:function(){var t=this.multiUrls.split("\n");if(!(t.length<1)){var e=[];t.forEach(function(t){if(""!=t)for(var n=utils.translateUrl(t),i=0;i<n.length;i++)e.push(n[i]),chrome.tabs.create({url:n[i]})})}},showAdDesc:function(){this.adDescShowed=!0},closeAd:function(){localStorage.adClosed=this.adClosed=!0},execExtra:function(t){chrome.tabs.sendMessage(e.id,{cmd:"EXEC_EXTRA",extra:t.fun})},getI18n:utils.getI18n}})})}),setTimeout(function(){tj.send("page",{p:"popup"})},2e3);