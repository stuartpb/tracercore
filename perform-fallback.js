// fallback recovery script
(function(){
"use strict";

var scripts, i;
if (!window.noFallbackNeeded) {
  scripts = document.getElementsByTagName('script');
  for (i = 0; i < scripts.length; ++i) {
    if (scripts[i].attributes['data-fallback'].specified) {
      scripts[i].src = '/es5/' + scripts[i].src;
    }
  }
}
})();
