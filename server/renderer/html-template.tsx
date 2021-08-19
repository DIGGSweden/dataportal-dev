import { html } from 'common-tags';
import serialize from 'serialize-javascript';

const createScriptTag = (src: string, nonceKey: string) => {
  const module = !src.includes('legacy');

  return `<script nonce="${nonceKey}" ${
    module ? 'type="module" crossorigin="use-credentials"' : 'nomodule defer'
  } src="${src}" ></script>`;
};

const createScriptNoMod = (src: string, nonceKey: string) => {
  return `<script nonce="${nonceKey}" src="${src}" crossorigin="use-credentials"></script>`;
};

const createScriptPreload = (src: string, nonceKey: string) => {
  if (src.includes('legacy')) return '';

  return `<link nonce="${nonceKey}" rel="modulepreload" href="${src}" crossorigin="use-credentials" />`;
};

const createStyleTag = (src: string, nonceKey: string) => {
  return `<link nonce="${nonceKey}" rel="stylesheet" href="${src}" type="text/css" />`;  
};

export type FooterData = {  
  ids: any;
  bundles: string[];  
  nonceKey: string;
};

export type HeaderData = {
  metaTags: string;
  bundles: string[];  
  styleBundles: string[];  
  htmlAttributes: string;
  nonceKey: string;
};

export const getHeader = ({
  metaTags,
  bundles,
  styleBundles,  
  htmlAttributes,  
  nonceKey
}: HeaderData) => {
  return html`
      <!DOCTYPE html>
      <html ${htmlAttributes} class="no-focus-outline" prefix="og: https://ogp.me/ns#">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="theme-color" content="#171A21">         
          <meta name="referrer" content="no-referrer">   
          <meta http-equiv="Content-Security-Policy" 
            content="
                script-src 'self' 'nonce-${nonceKey}' dataportal.azureedge.net *.dataportal.se
                *.googleapis.com *.gstatic.com digg-test-graphproxy.azurewebsites.net digg-prod-graphproxy.azurewebsites.net
                https://webbanalys.digg.se/;
                default-src 'none';
                base-uri 'self';
                manifest-src 'self';
                img-src 'self' data: *;
                style-src 'self' 'unsafe-inline' dataportal.azureedge.net *.googleapis.com *.dataportal.se;                
                form-action 'self';
                font-src 'self' data: dataportal.azureedge.net fonts.gstatic.com *.dataportal.se;    
                connect-src *;            
             ">        
          <link rel="stylesheet" href="/dist/client/js/font-awesome.min.css" media="print" onload="this.media='all'" type="text/css">                                 
          <link href="https://fonts.googleapis.com" rel="preconnect" crossorigin>   
          <link href="https://fonts.googleapis.com" rel="dns-prefetch" crossorigin>                          
          <link rel="manifest" href="/dist/client/js/manifest.json" crossorigin="use-credentials">
          <link rel="icon" type="image/png" href="/dist/client/js/svdp-favicon-16.png" sizes="16x16">
          <link rel="icon" type="image/png" href="/dist/client/js/svdp-favicon-32.png" sizes="32x32">
          <link rel="icon" type="image/png" href="/dist/client/js/svdp-favicon-64.png" sizes="64x64">
          <link rel="apple-touch-icon" href="/dist/client/js/svdp-favicon-150.png">
          <link rel="apple-touch-icon" sizes="180x180" href="/dist/client/js/svdp-favicon.png">
          <link rel="apple-touch-icon" sizes="152x152" href="/dist/client/js/svdp-favicon.png">
          <link rel="apple-touch-icon" sizes="167x167" href="/dist/client/js/svdp-favicon.png">
          <link rel="mask-icon" href="/dist/client/js/safari-pinned-tab.svg" color="black">  
          <script nonce="${nonceKey}">            
            function loadFont(url) {              
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  var css = xhr.responseText;
                  css = css.replace(/}/g, 'font-display: swap; }');
                  var head = document.getElementsByTagName('head')[0];
                  var style = document.createElement('style');
                  style.appendChild(document.createTextNode(css));
                  head.appendChild(style);
                }
              };
              xhr.send();
            }
            loadFont('https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap');
          </script>
          <meta name="og:type" content="website">
          <meta name="og:site_name" content="Sveriges utvecklarportal">                   
          ${styleBundles.map(src => createStyleTag(src,nonceKey))}              
          ${metaTags}                                                                                         
          ${bundles.map(src => createScriptPreload(src,nonceKey))}                                                  
        `;
};

export const getFooter = ({ bundles, ids, nonceKey }: FooterData) => {
  return html`<div id="popup"></div>            
      <script nonce="${nonceKey}">window.__EMOTION_IDS__ = ${serialize(ids)};</script>         
      <script nonce=${nonceKey}>
        if (window.appInsights) {
          var aiScript = document.querySelector('script[src="https://az416426.vo.msecnd.net/scripts/a/ai.0.js"]');
          if (aiScript) {
            aiScript.integrity = 'sha384-5No6tpIIf+EesEaiL7XZ15x5q5SpWiiVNvjQw8kZU38+G0UZf/xX52L4mhrBHvy7';
          }
        }        
      </script>                            
      ${bundles.map(src => createScriptTag(src,nonceKey))}           
      <script nonce=${nonceKey}>                      
        document.addEventListener("DOMContentLoaded", function() {          
          var matScript = document.querySelector('script[src="https://webbanalys.digg.se/matomo.js"]');
          if (matScript) {
            matScript.integrity = 'sha384-4fKmFD1F5P1mFydTu6egYnDPAI9aIR7CfvjWNlL9zMZ+Kn5DwUyZypqVE+iclsbP';
          }                  
        });
      </script>              
    </body>
    </html>
  `;
};
