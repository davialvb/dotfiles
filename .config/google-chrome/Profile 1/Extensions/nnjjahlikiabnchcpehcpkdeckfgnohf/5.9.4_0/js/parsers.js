var parsers={instagram:function(s,t){var r=$(s).closest("a");if(r.length>0&&r.attr("href").match("^/p/"))$.ajax({url:r[0].href,success:function(r){var e,c=r.match('<meta property="og:image" content="(.*?)"');c?e=c[1]:(e=s.src,s.srcset&&(e=s.srcset.split(",").splice(-1,1)[0].split(" ")[0])),t(e)}});else{var e=s.src;s.srcset&&(e=s.srcset.split(",").splice(-1,1)[0].split(" ")[0]),t(e)}}};