!function(){if(location.href.match(["www.patreon.com"].join("|"))){var n=document.createElement("script");n.innerText="\n    (function(){\n        window.ftk_fetch_urls = [];\n        var _fetch = fetch;\n        fetch = function(url, options){\n            window.ftk_fetch_urls.push(url);\n            return _fetch.apply(window, arguments);\n        }\n    })();\n    ",document.documentElement.appendChild(n)}}();