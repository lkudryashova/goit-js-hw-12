import{a as g,S as v,i as c}from"./assets/vendor-CRCB-GUD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();g.defaults.baseURL="https://pixabay.com/api/";const y=(r,t)=>{const a={params:{key:"45767028-18ffee8ca72084a8354af7c89",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return g.get("",a)},f=r=>` <li class="gallery-item">
    <a class="gallery-link" href="${r.largeImageURL}">
      <img class="image"
      src="${r.webformatURL}"
      alt="${r.tags}"
      loading="lazy" />
    </a>
    <ul class="gallery-info">
    <div class="text-wraper">
    <div class="text-block">
        <h2>Likes</h2>
        <p>${r.likes}</p>
      </div>
      <div class="text-block">
        <h2>Views</h2>
        <p>${r.views}</p>
      </div>
        <div class="text-block">
        <h2>Comments</h2>
        <p>${r.comments}</p>
      </div>      
        <div class="text-block">
        <h2>Downloads</h2>
        <p>${r.downloads}</p>
      </div>
      </div>
     </ul>
  </li>`,p=document.querySelector(".search-form"),d=document.querySelector(".gallery-list"),b=document.querySelector(".search-input"),i=document.querySelector(".loader"),n=document.querySelector(".load-more");n.insertAdjacentElement("afterend",i);const L=new v(".gallery-list a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let l=1,h="",m=0;const w=async r=>{try{if(r.preventDefault(),h=b.value.trim(),h===""){c.error({position:"topRight",message:"Please fill the input"});return}d.innerHTML="",m=0,i.classList.remove("hidden"),l=1;const t=await y(h,l),a=t.data;if(a.total===0){c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d.innerHTML="",p.reset(),i.classList.add("hidden"),n.classList.add("hidden");return}const o=a.hits.map(e=>f(e)).join("");d.innerHTML=o,L.refresh(),n.classList.remove("hidden"),p.reset(),m+=t.data.hits.length}catch(t){console.error("Error fetching images:",t.message),console.error("Error stack trace:",t.stack),console.log(t),c.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}finally{i.classList.add("hidden")}},x=async r=>{try{l+=1;const t=await y(h,l),a=t.data;if(!a.hits||a.hits.length===0){n.classList.add("hidden");return}const o=a.hits.map(s=>f(s)).join("");d.insertAdjacentHTML("beforeend",o),L.refresh();const{height:e}=galleryElement.getBoundingClientRect();scrollBy({top:e*2,behavior:"smooth"}),m+=t.data.hits.length,Math.ceil(a.totalHits/15)===l&&(c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.classList.add("hidden"),n.classList.add("hidden"))}catch(t){console.log(t)}};setTimeout(()=>{i.classList.add("hidden")},300);p.addEventListener("submit",w);n.addEventListener("click",x);
//# sourceMappingURL=index.js.map
