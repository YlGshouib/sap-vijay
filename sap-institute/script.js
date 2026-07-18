/* ---------------- Year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* ---------------- Student experience data (blank photo slots — add images later) ---------------- */
const testimonials = [
  { name:"Student Name", role:"Placed as SAP PM Consultant", quote:"The scenario-based teaching made SAP EAM finally click for me — I could speak confidently in interviews.", stars:5 },
  { name:"Student Name", role:"Now working on live WCM projects", quote:"Enhanced WCM felt intimidating until we walked through real permit-to-work scenarios step by step.", stars:5 },
  { name:"Student Name", role:"SAP Support Consultant", quote:"Debugging and user exits were the missing piece for me — this course connected the functional and technical sides.", stars:5 },
  { name:"Student Name", role:"Fresh SAP EAM Consultant", quote:"The mock interviews genuinely prepared me — I knew what to expect on the real day.", stars:4 },
  { name:"Student Name", role:"SAP PM Analyst", quote:"Real project scenarios instead of just theory — that's what made the difference for me.", stars:5 },
];

const track = document.getElementById('carTrack');
const dotsWrap = document.getElementById('carDots');
let current = 0;

function starString(n){ return "★".repeat(n) + "☆".repeat(5-n); }

testimonials.forEach((t,i)=>{
  const card = document.createElement('div');
  card.className = 'car-card';
  card.innerHTML = `
    <div class="car-photo">🧑‍🎓 Student photo<br><small style="opacity:.75;">(add assets/students/${i+1}.jpg)</small></div>
    <div class="car-body">
      <div class="car-stars">${starString(t.stars)}</div>
      <p class="car-quote">"${t.quote}"</p>
      <div class="car-name">${t.name}</div>
      <div class="car-role">${t.role}</div>
    </div>`;
  track.appendChild(card);

  const dot = document.createElement('span');
  dot.className = 'car-dot' + (i===0 ? ' active' : '');
  dot.addEventListener('click', ()=> goTo(i));
  dotsWrap.appendChild(dot);
});

const cards = document.querySelectorAll('.car-card');
const dots = document.querySelectorAll('.car-dot');

function layout(){
  const total = cards.length;
  cards.forEach((card,i)=>{
    let offset = i - current;
    // wrap-around for shortest path
    if(offset > total/2) offset -= total;
    if(offset < -total/2) offset += total;

    const abs = Math.abs(offset);
    let transform, opacity, z, blur;
    if(abs === 0){
      transform = `translate(-50%,-50%) translateZ(0px) rotateY(0deg)`;
      opacity = 1; z = 30; blur = 0;
    } else if(abs === 1){
      const dir = offset > 0 ? 1 : -1;
      transform = `translate(calc(-50% + ${dir*260}px), -50%) translateZ(-120px) rotateY(${-dir*28}deg) scale(.86)`;
      opacity = 0.75; z = 20; blur = 1;
    } else if(abs === 2){
      const dir = offset > 0 ? 1 : -1;
      transform = `translate(calc(-50% + ${dir*430}px), -50%) translateZ(-260px) rotateY(${-dir*34}deg) scale(.72)`;
      opacity = 0.35; z = 10; blur = 2;
    } else {
      const dir = offset > 0 ? 1 : -1;
      transform = `translate(calc(-50% + ${dir*520}px), -50%) translateZ(-380px) rotateY(${-dir*34}deg) scale(.6)`;
      opacity = 0; z = 0; blur = 3;
    }
    card.style.transform = transform;
    card.style.opacity = opacity;
    card.style.zIndex = z;
    card.style.filter = `blur(${blur}px)`;
  });
  dots.forEach((d,i)=> d.classList.toggle('active', i===current));
}

function goTo(i){
  const total = cards.length;
  current = (i + total) % total;
  layout();
}

document.getElementById('carNext').addEventListener('click', ()=> goTo(current+1));
document.getElementById('carPrev').addEventListener('click', ()=> goTo(current-1));

let autoplay = setInterval(()=> goTo(current+1), 4500);
document.querySelector('.carousel').addEventListener('mouseenter', ()=> clearInterval(autoplay));
document.querySelector('.carousel').addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(current+1), 4500));

window.addEventListener('resize', layout);
layout();

/* ---------------- FAQ ---------------- */
const faqData = [
  { q:"Who is this SAP EAM (PM) & Enhanced WCM course meant for?", a:"It's designed for freshers, functional consultants moving into SAP, and working professionals in maintenance/asset management who want structured, real-time, industry-oriented SAP training." },
  { q:"Do I need prior SAP experience to join?", a:"No prior SAP experience is required. The course starts from S/4HANA architecture fundamentals before moving into EAM (PM) and Enhanced WCM specifics." },
  { q:"How long is the training and how is it structured?", a:"It's a comprehensive 3-month program, moving from foundations (architecture, Fiori, Gateway/OData) through backend configuration, SAP EAM & WCM deep dives, ABAP concepts for functional consultants, and finally real-time scenarios plus interview preparation." },
  { q:"Will I get hands-on practice, or is it only theory?", a:"Every topic includes hands-on, practical sessions. The program is built around real-time implementation and support scenarios rather than slide-only teaching." },
  { q:"What exactly is covered under 'Enhanced WCM'?", a:"Enhanced Work Clearance Management covers permit-to-work processes, safety documentation, isolation certificates, and multi-level approval workflows as used in live plant/asset environments." },
  { q:"Why does a functional course include ABAP, debugging, and BAdIs?", a:"Functional consultants who understand ABAP basics, debugging, user exits, and BAdIs can communicate far more effectively with technical teams and diagnose issues faster — this is covered specifically for functional consultants, not developers." },
  { q:"Do you help with placements or job referrals?", a:"Yes. The program includes resume building, mock interviews, career mentoring, and resume referral support to hiring companies, based on current openings and profile suitability. Referral does not guarantee a job offer." },
  { q:"Which companies are part of the referral network?", a:"The referral network includes Infosys, PwC, Capgemini, Accenture, Tech Mahindra, TCS, and other MNCs & consulting organizations, subject to available openings and profile fit at the time." },
  { q:"Who will be training me?", a:"The program is led by Akshay, who has 7+ years of overall industry experience, including 6+ years of IT experience specifically in SAP Enterprise Asset Management (SAP EAM / PM)." },
  { q:"Are classes live or recorded?", a:"Classes are conducted live with real-time interaction, doubt-clearing, and hands-on walkthroughs. Message us on WhatsApp for the current batch schedule and timings." },
  { q:"What do I need to attend the sessions?", a:"A laptop with a stable internet connection is sufficient. Access details for practicing on SAP systems will be shared as part of the course." },
  { q:"How do I enroll or ask more questions?", a:"Tap any 'WhatsApp' button on this page, or message +91 63619 60059 directly — we'll walk you through the curriculum, schedule, and fees." },
];

const faqList = document.getElementById('faqList');
faqData.forEach((item,i)=>{
  const el = document.createElement('div');
  el.className = 'faq-item';
  el.innerHTML = `
    <button class="faq-q" aria-expanded="false">
      <span>${item.q}</span>
      <span class="plus">+</span>
    </button>
    <div class="faq-a">${item.a}</div>`;
  faqList.appendChild(el);

  el.querySelector('.faq-q').addEventListener('click', ()=>{
    const isOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      if(o !== el){ o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded','false'); }
    });
    el.classList.toggle('open', !isOpen);
    el.querySelector('.faq-q').setAttribute('aria-expanded', String(!isOpen));
  });
});
