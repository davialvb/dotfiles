chrome.storage.local.get("app_config",o=>{var g=o.app_config&&o.app_config.needBlobDomains||[];-1==g.indexOf("www.bigbigwork.com")&&(g.push("www.bigbigwork.com"),chrome.storage.local.set({app_config:o.app_config}))});