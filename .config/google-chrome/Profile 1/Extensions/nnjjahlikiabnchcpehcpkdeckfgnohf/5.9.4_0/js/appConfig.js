var appConfig=function(){var e={dirType:"TITLE",fixedDir:"Fatkun",widthRange:null,heightRange:null,needRename:!1,renameRule:"pic_{NO001}.{EXT}",outputTextFormat:'<img src="{LINK}"/>',needBlobDomains:[],singleOutput:!0,autoConvertWebp:!0,enableShortkey:!0,shortKeyCurrent:"Z",shortKeyAll:"A",limitConcurrent:10,dragSelect:!0,dragDownload:!0,showUrl:!1,advancedMode:!0,unique:!0,enableContextmenu:!0,enabledMenus:["batchDownload"],rememberFilter:!0,dragDownloadMode:"drag-to-filter-page",previewSize:"small",filenameAltOrOriginal:"alt",sortType:"default",showMore:!0,pagination:!1,recordPageInfo:!1};try{"nnjjahlikiabnchcpehcpkdeckfgnohf"==chrome.runtime.id&&(e.enableContextmenu=!0)}catch(e){}var n={defaultConfig:e},o="";return{init:function(t,a){chrome.storage.local.get("app_config",function(o){var a=o.app_config||{};for(var r in e)"outputTextFormat"!=r||a[r]?n[r]=void 0!==a[r]?a[r]:e[r]:n[r]=e[r];t(n)}),function(e){chrome.storage.onChanged.addListener(function(t){var a=t.app_config;if(a&&(newConfigStr=JSON.stringify(a.newValue),o!=newConfigStr))for(var r in o=newConfigStr,a.newValue)n[r]!=a.newValue[r]&&(n[r]=a.newValue[r]);e&&e(n)})}(a)},getSyncConfig:function(e){return n},getAsyncConfig:function(){chrome.storage.local.get("app_config",function(e){cb(e.app_config)})},setConfig:function(o,t){for(var a in o)Object.keys(e).indexOf(a)>=0&&(n[a]=o[a]);chrome.storage.local.set({app_config:JSON.parse(JSON.stringify(n))},function(){t&&t(n)})},getDefaultConfig:function(){return e}}}();