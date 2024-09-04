import{a as g,S as v,i as d}from"./assets/vendor-CRCB-GUD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();g.defaults.baseURL="https://pixabay.com/api/";const y=(s,t)=>{const a={params:{key:"45767028-18ffee8ca72084a8354af7c89",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return g.get("",a)},f=s=>` <li class="gallery-item">
    <a class="gallery-link" href="${s.largeImageURL}">
      <img class="image"
      src="${s.webformatURL}"
      alt="${s.tags}"
      loading="lazy" />
    </a>
    <ul class="gallery-info">
    <div class="text-wraper">
    <div class="text-block">
        <h2>Likes</h2>
        <p>${s.likes}</p>
      </div>
      <div class="text-block">
        <h2>Views</h2>
        <p>${s.views}</p>
      </div>
        <div class="text-block">
        <h2>Comments</h2>
        <p>${s.comments}</p>
      </div>      
        <div class="text-block">
        <h2>Downloads</h2>
        <p>${s.downloads}</p>
      </div>
      </div>
     </ul>
  </li>`,m=document.querySelector(".search-form"),l=document.querySelector(".gallery-list"),b=document.querySelector(".search-input"),i=document.querySelector(".loader"),n=document.querySelector(".load-more");n.insertAdjacentElement("afterend",i);const L=new v(".gallery-list a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let c=1,h="",p=0;const w=async s=>{try{if(s.preventDefault(),h=b.value.trim(),h===""){d.error({position:"topRight",message:"Please fill the input"});return}l.innerHTML="",p=0,i.classList.remove("hidden"),c=1;const t=await y(h,c),a=t.data;if(!a.hits||a.hits.length===0){d.error({position:"bottomRight",message:"Sorry, there are no images matching your search query. Please try again!"}),l.innerHTML="",m.reset(),i.classList.add("hidden"),n.classList.add("hidden");return}const o=a.hits.map(e=>f(e)).join("");l.innerHTML=o,L.refresh(),n.classList.remove("hidden"),m.reset(),p+=t.data.hits.length}catch(t){console.error("Error fetching images:",t.message),console.error("Error stack trace:",t.stack),console.log(t),d.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}finally{i.classList.add("hidden")}},x=async s=>{try{c+=1;const t=await y(h,c),a=t.data;if(!a.hits||a.hits.length===0){n.classList.add("hidden");return}const o=a.hits.map(r=>f(r)).join("");l.insertAdjacentHTML("beforeend",o),L.refresh();const{height:e}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),p+=t.data.hits.length,Math.ceil(a.totalHits/15)===c&&(d.show({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}),i.classList.add("hidden"),n.classList.add("hidden"))}catch(t){console.log(t)}};setTimeout(()=>{i.classList.add("hidden")},300);m.addEventListener("submit",w);n.addEventListener("click",x);
//# sourceMappingURL=index.js.map
