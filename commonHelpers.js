import{a as b,S as v,i as E}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();async function u(s,t){const a="https://pixabay.com/api/",e={key:"42359389-3e7836390f428de58440ba614",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await b.get(a,{params:e})).data}function w(s){const{largeImageURL:t,webformatURL:a,tags:i,likes:e,views:r,comments:n,downloads:L}=s;return`<li class="gallery-item">
          <a class="gallery-link" href="${t}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${i}"
             
            />
          </a>
          <div class="thumb-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="amount">${e}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="amount">${r}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="amount">${n}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="amount">${L}</p>
            </div>
          </div>
        </li>`}function S(s){return s.map(w).join("")}const o={formElem:document.querySelector(".js-search"),imagesElem:document.querySelector(".gallery"),loadElem:document.querySelector(".js-loader"),btnLoadMore:document.querySelector(".btn-loader")},f=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});let c,l,m;o.formElem.addEventListener("submit",M);o.btnLoadMore.addEventListener("click",P);async function M(s){if(s.preventDefault(),c=s.target.elements.search.value.trim(),l=1,!c){d("Please fill in the form");return}g();try{const t=await u(c,l);if(t.totalHits===0){d("Sorry, there are no images matching your search query. Please try again!");return}m=Math.ceil(t.totalHits/15),o.imagesElem.innerHTML="",h(t.hits)}catch(t){d(t),m=0,o.imagesElem.innerHTML=""}f.refresh(),p(),y(),s.target.reset()}async function P(){l+=1,g();const s=await u(c,l);h(s.hits),f.refresh(),p(),y();const t=o.imagesElem.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:t*2})}function h(s){const t=S(s);o.imagesElem.insertAdjacentHTML("beforeend",t)}function k(){o.btnLoadMore.classList.remove("hidden")}function q(){o.btnLoadMore.classList.add("hidden")}function g(){o.loadElem.classList.remove("hidden")}function p(){o.loadElem.classList.add("hidden")}function d(s){E.error({title:"Error",message:s})}function y(){l>=m?(q(),d("We're sorry, but you've reached the end of search results.")):k()}
//# sourceMappingURL=commonHelpers.js.map
