var _config;appConfig.init(function(e){_config=e,downloader.init(e,()=>{}),bigImgParser.init(function(){})});var app=new Vue({el:"#app",data:{imgSrcs:"",pageUrlsText:"",tabId:-1,pageUrls:[],currentPageUrlIndex:-1,times:{},secondsPerPage:5,marksForSenconds:{10:"10S",30:"30S",60:"60S"},activeTab:"page"},mounted:function(){chrome.storage.local.get("secondsPerPage",e=>{this.secondsPerPage=e.secondsPerPage||5}),chrome.runtime.onMessage.addListener((e,t)=>{t.tab.url===this.pageUrls[this.currentPageUrlIndex]&&("ADD_IMG_LIST"==e.cmd?(e.list.forEach(e=>{"VIDEO"==e.type?new VItem(e,-1,t.tab,t.frameId,e=>{e.docTitle=this.getDocTitle(e,t.tab.url),downloader.downloadSingle(e)}):new ParsedPItem(e,-1,t.tab,t.frameId,e=>{e.docTitle=this.getDocTitle(e,t.tab.url),downloader.downloadSingle(e)})}),t.tab.url==this.pageUrls[this.currentPageUrlIndex]&&this.currentPageUrlIndex<this.pageUrls.length-1&&setTimeout(this.downloadPage,1e3*this.secondsPerPage)):"ADD_IMG"!=e.cmd&&"ADD_VIDEO"!=e.cmd||(e.item.docTitle=this.getDocTitle(e.item,t.tab.url),downloader.downloadSingle(e.item),this.currentPageUrlIndex<this.pageUrls.length-1&&setTimeout(this.downloadPage,1e3*this.secondsPerPage)))})},methods:{getDocTitle(e,t){return`${this.times[t].Format("yyyyMMddHHmmss")}-${this.pageUrls.indexOf(t)+1}-${e.docTitle}`},downloadPageTip(){return 0==this.pageUrls.length?"":this.pageUrls.length==this.currentPageUrlIndex+1?utils.getI18n("completeTipForMore"):`${utils.getI18n("processing")}：（${this.currentPageUrlIndex+1}/${this.pageUrls.length}） ${this.pageUrls[this.currentPageUrlIndex]}`},download(){this.imgSrcs.split("\n").forEach(e=>{if(""!=e)for(var t=utils.translateUrl(e),s=0;s<t.length;s++)chrome.downloads.download({url:t[s]})})},downloadPages(){this.pageUrls=[],this.currentPageUrlIndex=-1,this.times={},this.pageUrlsText.split("\n").forEach(e=>{""!=e&&(this.pageUrls=this.pageUrls.concat(utils.translateUrl(e)))}),-1==this.tabId?chrome.windows.create({focused:!1},e=>{chrome.tabs.create({windowId:e.id},e=>{this.tabId=e.id,this.downloadPage()})}):chrome.tabs.get(this.tabId,e=>{e?this.downloadPage():chrome.windows.create({focused:!1},e=>{chrome.tabs.create({windowId:e.id},e=>{this.tabId=e.id,this.downloadPage()})})})},downloadPage(){this.currentPageUrlIndex++;var e=this.pageUrls[this.currentPageUrlIndex];chrome.tabs.update(this.tabId,{url:e}),setTimeout(()=>{this.times[e]=new Date,chrome.tabs.sendMessage(this.tabId,{cmd:"GET_IMAGE_FROM_BG3",tabInfo:{id:this.tabId,url:e}},{frameId:0})},1e3*this.secondsPerPage)},secondsPerPageChange(e){chrome.storage.local.set({secondsPerPage:e})},getI18n:utils.getI18n}});