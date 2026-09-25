const photos = [
  ["https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85","One of my favorite memories ❤️"],
  ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85","That smile."],
  ["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85","A moment I'll never forget."],
  ["https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=85","Us."],
  ["https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=85","Just a beautiful memory."],
  ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=85","Always worth remembering."]
];

const gallery = document.getElementById("gallery");
gallery.innerHTML = photos.map(([src, caption]) =>
  `<figure class="polaroid"><img src="${src}" alt="Memory placeholder" loading="lazy"><figcaption class="caption">${caption}</figcaption></figure>`
).join("");

const stars = document.getElementById("stars");
for(let i=0;i<80;i++){
  const s=document.createElement("span");
  s.className="star";
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  s.style.animationDelay=(Math.random()*4)+"s";
  stars.appendChild(s);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const player = document.getElementById("ytPlayer");
const musicBtn = document.getElementById("musicBtn");
const musicState = document.getElementById("musicState");
let musicReady = false, playing = false;

function startMusic(){
  if(!musicReady){
    // Official YouTube embed; playback starts only after the user's click.
    player.src = "https://www.youtube.com/embed/XSzMpmmmf9o?autoplay=1&enablejsapi=1&playsinline=1";
    musicReady = true;
  } else {
    player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
  }
  playing = true;
  musicState.textContent = "Playing";
}

musicBtn.addEventListener("click",()=>{
  if(!musicReady){ startMusic(); return; }
  if(playing){
    player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");
    playing=false; musicState.textContent="Paused";
  }else startMusic();
});

document.getElementById("openBtn").addEventListener("click",()=>{
  startMusic();
  document.getElementById("home").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>document.querySelector(".note").scrollIntoView({behavior:"smooth"}),450);
});

const overlay=document.getElementById("overlay");
document.getElementById("surpriseBtn").addEventListener("click",()=>{
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden","false");
  burst();
});
document.getElementById("closeBtn").addEventListener("click",()=>{
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden","true");
});

function burst(){
  for(let i=0;i<100;i++){
    const el=document.createElement("span");
    el.textContent=Math.random()>.5?"❤️":"✦";
    el.style.position="fixed";
    el.style.left="50%"; el.style.top="50%";
    el.style.zIndex="60"; el.style.pointerEvents="none";
    el.style.fontSize=(10+Math.random()*18)+"px";
    el.style.transition=`transform ${1.2+Math.random()*1.3}s cubic-bezier(.2,.8,.2,1), opacity 1.5s`;
    document.body.appendChild(el);
    requestAnimationFrame(()=>{
      const x=(Math.random()-.5)*window.innerWidth*1.3;
      const y=(Math.random()-.5)*window.innerHeight*1.3;
      el.style.transform=`translate(${x}px,${y}px) rotate(${Math.random()*360}deg)`;
      el.style.opacity="0";
    });
    setTimeout(()=>el.remove(),2800);
  }
}
