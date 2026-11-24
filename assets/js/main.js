/* Daniela portfolio — zero dependencies. Content is editable in content.js. */
(() => {
  'use strict';
  const D = window.SITE;
  if (!D) { console.error('content.js is missing'); return; }
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bySlug = slug => D.projects.find(p => p.slug === slug);
  const title = (n,t,desc='') => `<div class="section-head"><div class="eyebrow">${esc(n)}</div><h2>${esc(t)}</h2>${desc?`<p class="section-description">${esc(desc)}</p>`:''}</div>`;
  const external = (label,url,extraClass='') => `<a class="button ${extraClass}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const tags = arr => `<ul class="skill-list">${arr.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
  const statusKind = p => /ongoing|concept|revis|resubmission/i.test(p.status) ? 'progress' : '';
  const statusShort = p => p.slug === 'damai' ? 'Academic prototype' : p.slug === 'bless' ? 'Independently built · local prototype' : p.slug === 'jejak-baca' ? 'Mobile UI/UX' : p.slug === 'ternax' ? 'Team project' : p.slug === 'techaton' ? '2nd place · Team award' : p.slug === 'aero-co' ? 'Concept / proposal' : 'Manuscript in revision';
  const shortTitle = p => ({'bless':'PT Bless Berkarya Lestari','yolo-review':'YOLO Systematic Review','aero-co':'AERO-CO Smart Air Purifier','jejak-baca':'JEJAK BACA','ternax':'TernaX Livestock Management'}[p.slug] || p.title);
  const safeImage = (src,alt='',loading='lazy') => `<img src="${esc(src)}" alt="${esc(alt)}" loading="${loading}" decoding="async">`;

  // Homepage
  $('#hero-content').innerHTML = `<div class="hero-grid"><div class="hero-copy"><div class="hero-eyebrow"><span class="dot" aria-hidden="true"></span>SELECTED WORK / 2025—2026</div><h1>Daniela Ivanka<br><em>Maydina</em><br>Siringoringo.</h1><p class="hero-lead">${esc(D.profile.headline)}</p><p class="hero-text">${esc(D.profile.intro)}</p><div class="hero-actions"><a class="button primary" href="#projects">View projects <span aria-hidden="true">↗</span></a><a class="button" href="#contact">Contact me <span aria-hidden="true">↗</span></a></div><div class="hero-facts" aria-label="Interests"><span>Data Analytics</span><span>Business Analysis</span><span>AI / Machine Learning</span></div></div><div class="portrait-wrap"><div class="portrait-frame">${safeImage(D.profile.portrait,'Daniela Ivanka Maydina Siringoringo portrait','eager')}</div></div></div>`;
  $('#about-content').innerHTML = `${title('01 / Introduction','About me')}<div class="about-layout"><div class="about-aside">Working across data, design, research and technology.<br>Academic projects, team collaborations and ongoing industry consultation.</div><div class="about-copy">${D.about.map(p=>`<p>${esc(p)}</p>`).join('')}</div></div>`;
  $('#education-content').innerHTML = `${title('02 / Academic background','Education')}<div class="education-card"><div><h3 class="institution">Universitas Pendidikan Indonesia</h3><p class="program">Mechatronics and Artificial Intelligence · Undergraduate</p><p>Purwakarta Campus, West Java, Indonesia</p></div><div class="education-meta"><div><small>Current GPA</small><b>3.87 / 4.00</b></div><div><small>Expected graduation</small><b>2028</b></div></div></div>`;
  $('#skills-content').innerHTML = `${title('03 / Toolkit','Skills','Tools and methods I have used in courses, projects and collaboration work.')}<div class="skills-grid">${D.skills.map((s,i)=>`<article class="skill-card"><div class="skill-no">0${i+1} / 03</div><h3>${esc(s.g)}</h3>${tags(s.items)}<p class="skill-note">${esc(s.where)}</p></article>`).join('')}</div>`;

  // Project cards and filtering
  let filter = 'All';
  const cardCover = p => p.gallery[p.cover] && !p.gallery[p.cover].hold
    ? `<div class="project-cover ${p.phone?'phone-cover':p.slug==='aero-co'?'concept-cover':''}">${safeImage(p.gallery[p.cover].src,p.gallery[p.cover].alt||p.gallery[p.cover].cap)}</div>`
    : `<div class="project-cover research-cover"><div class="research-icon" aria-hidden="true">R.</div><strong>Research<br>in progress.</strong><small>Literature · Review · Synthesis</small></div>`;
  const card = (p,i) => `<li><article class="project-card"><a href="#project-${esc(p.slug)}" class="project-cover-link" aria-label="Read ${esc(p.title)} case study">${cardCover(p)}</a><div class="project-card-body"><div class="meta-row"><span class="project-status ${statusKind(p)}">${esc(statusShort(p))}</span><span class="project-year">${esc(p.year)}</span></div><h3><a href="#project-${esc(p.slug)}">${esc(shortTitle(p))}</a></h3><p>${esc(p.summary)}</p><div class="project-footer"><span>${esc(p.cats.slice(0,2).join(' · '))}</span><a class="project-view" href="#project-${esc(p.slug)}">View case study <span aria-hidden="true">↗</span></a></div></div></article></li>`;
  const projectArea = () => `${title('04 / Selected work','Projects','Each project opens a detailed case study showing the work, my role and supporting evidence.')}<div class="project-header-row"><div class="filter-bar" aria-label="Filter projects by category">${D.filters.map(f=>`<button type="button" data-filter="${esc(f)}" aria-pressed="${f===filter}">${esc(f)}</button>`).join('')}</div><p id="project-count" class="project-count" aria-live="polite"></p></div><ul class="project-grid" id="project-grid"></ul>`;
  $('#projects-content').innerHTML = projectArea();
  function renderProjects() {
    const list=D.projects.filter(p=>filter==='All'||p.cats.includes(filter));
    $('#project-grid').innerHTML=list.map(card).join('');
    $('#project-count').textContent=`${list.length} / ${D.projects.length} works`;
    $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  }
  $('.filter-bar').addEventListener('click', ev => {const btn=ev.target.closest('[data-filter]');if(!btn)return;filter=btn.dataset.filter;renderProjects()});
  renderProjects();

  const research = bySlug('yolo-review');
  $('#research-content').innerHTML = `${title('05 / Academic research','Research')}<div class="research-panel"><div class="research-abstract"><span class="mini-head">FIRST AUTHOR / 2026</span><h3>YOLO-based<br>object detection.</h3><span class="divider-line"></span><span class="mini-head">SYSTEMATIC REVIEW</span></div><div class="research-body"><span class="status-note">Manuscript revision · Not published</span><h3>${esc(research.title)}</h3><p>${esc(research.summary)} The manuscript is being revised for resubmission. It has not been accepted or published.</p><a class="button primary" href="#project-yolo-review">Read research overview <span aria-hidden="true">↗</span></a></div></div>`;

  $('#achievements-content').innerHTML = `${title('06 / Recognition','Achievements')}<div class="achievement-grid">${D.achievements.map((a,i)=>`<article class="achievement-card">${a.photo?safeImage(a.photo,a.photoAlt||a.t).replace('<img','<img class="achievement-photo"'):`<div class="achievement-visual"><span>03</span></div>`}<div class="achievement-info"><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p><p class="footnote">${esc(a.n)}</p></div></article>`).join('')}</div>`;

  // Certifications: actual thumbnails where provided, verify links for IBM
  const credentials = [...D.creds.linked.map(c=>({...c,kind:'verification'})), ...D.creds.filed.map(c=>({...c,kind:'image'}))];
  $('#certifications-content').innerHTML = `${title('07 / Continued learning','Certifications','Documented course completions and verified learning credentials.')}<div class="cert-grid">${credentials.map((c,i)=>`<article class="cert-card"><div class="cert-preview ${c.img?'':'missing'}">${c.img?safeImage(c.img,c.t+' course completion certificate'):c.kind==='verification'?'<span aria-hidden="true">↗</span>':'<span aria-hidden="true">✓</span>'}</div><span class="cert-provider">${esc(c.by)}</span><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p>${c.url?`<a class="cert-action" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Verify certificate <span aria-hidden="true">↗</span></a>`:c.img?`<button type="button" class="cert-action" data-image="${esc(c.img)}" data-caption="${esc(c.t)} — ${esc(c.by)}">View completion certificate <span aria-hidden="true">↗</span></button>`:''}</article>`).join('')}</div><p class="cert-footnote">${esc(D.creds.note)}</p>`;
  $('#contact-content').innerHTML = `<div class="contact-layout"><div>${title('08 / Get in touch','Let’s connect.')}<p class="contact-line">For internship opportunities, collaboration or project conversations.</p></div><div class="contact-actions">${D.profile.email?`<a class="button primary" href="mailto:${esc(D.profile.email)}">Email me <span aria-hidden="true">↗</span></a>`:''}${external('LinkedIn',D.profile.linkedin)}${external('GitHub',D.profile.github)}</div></div>`;
  $('#year').textContent=new Date().getFullYear().toString();

  // Navigation/mobile menu
  const menu=$('.menu-toggle'), nav=$('.primary-nav');
  menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
  $$('.primary-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});

  // Accessible lightbox
  const viewer=$('#image-dialog'), detail=$('#project-dialog');
  let activeGallery=[],activeGalleryIndex=0;
  function drawViewer(){const current=activeGallery[activeGalleryIndex];if(!current)return;viewer.innerHTML=`<div class="image-toolbar"><p>${esc(current.cap)}</p><button type="button" data-viewer-close aria-label="Close image">×</button></div><div class="image-viewer">${safeImage(current.src,current.alt||current.cap,'eager')}</div><div class="image-bottom"><button type="button" data-gallery-prev aria-label="Previous image">← Previous</button><span>${activeGalleryIndex+1} / ${activeGallery.length}</span><button type="button" data-gallery-next aria-label="Next image">Next →</button></div>`;}
  function openGallery(items,index=0){activeGallery=items.filter(x=>x&&!x.hold&&x.src);if(!activeGallery.length)return;activeGalleryIndex=Math.max(0,Math.min(index,activeGallery.length-1));drawViewer();if(!viewer.open)viewer.showModal();}
  viewer.addEventListener('click',ev=>{if(ev.target.closest('[data-viewer-close]')||ev.target===viewer){viewer.close();return;}if(ev.target.closest('[data-gallery-prev]')){activeGalleryIndex=(activeGalleryIndex-1+activeGallery.length)%activeGallery.length;drawViewer();}if(ev.target.closest('[data-gallery-next]')){activeGalleryIndex=(activeGalleryIndex+1)%activeGallery.length;drawViewer();}});
  viewer.addEventListener('keydown',ev=>{if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){activeGalleryIndex=(activeGalleryIndex+(ev.key==='ArrowRight'?1:-1)+activeGallery.length)%activeGallery.length;drawViewer();}});

  // Project case-study rendering
  const listBlock=(heading,items)=>Array.isArray(items)&&items.length?`<section class="detail-content-block"><h3>${esc(heading)}</h3><ul>${items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></section>`:items?`<section class="detail-content-block"><h3>${esc(heading)}</h3><p>${esc(items)}</p></section>`:'';
  const media = item => item&&!item.hold&&item.src ? safeImage(item.src,item.alt||item.cap,'eager') : `<div class="hold-figure"><b>Research / 2026</b><span>Unpublished research images are withheld pending sharing clearance.</span></div>`;
  const statbar = p => `<dl class="detail-statbar"><div><dt>My role</dt><dd>${esc(p.role)}</dd></div><div><dt>Timeline</dt><dd>${esc(p.year)}</dd></div><div><dt>Project status</dt><dd>${esc(p.status)}</dd></div></dl>`;
  const extraTable = p => p.table?`<div class="detail-content-block"><h3>Segment breakdown</h3><p>${esc(p.table.cap)}</p><div class="data-table-wrap"><table><thead><tr>${p.table.head.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${p.table.rows.map(row=>`<tr>${row.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></div>`:'';
  const toolsSidebar = p => `<aside class="detail-side"><h3>Tools & methods</h3>${tags(p.tools)}${p.links.length?`<h3>Project links</h3>${p.links.map(l=>external(l.label,l.url)).join('')}`:'<h3>Project links</h3><p class="note">No public project link is available for this work.</p>'}</aside>`;
  const galleryHTML=(a,slug)=>`<ul class="detail-gallery">${a.map((item,i)=>`<li>${item.hold?`<div class="hold-figure"><b>${esc(item.cap)}</b><span>Image not publicly available pending sharing clearance.</span></div>`:`<button class="gallery-open" type="button" data-project-gallery="${esc(slug)}" data-index="${i}" aria-label="Enlarge: ${esc(item.cap)}">${safeImage(item.src,item.alt||item.cap)}</button>`}<p class="gallery-caption">${esc(item.cap)}</p></li>`).join('')}</ul>`;
  const phoneHTML=(p)=>`<div class="phone-column"><div class="phone-frame"><div id="phone-scroller" class="phone-scroller" tabindex="0" role="region" aria-label="Scrollable JEJAK BACA mobile screens">${p.gallery.map((img,i)=>`<figure class="phone-screen" data-screen="${i}">${safeImage(img.src,img.alt||img.cap,i===0?'eager':'lazy')}</figure>`).join('')}</div></div><div class="phone-controls"><button type="button" data-phone-prev aria-label="Previous mobile screen">↑</button><span id="phone-current" aria-live="polite">1 / ${p.gallery.length}</span><button type="button" data-phone-next aria-label="Next mobile screen">↓</button></div><div class="phone-hint">Scroll inside the phone to browse designs</div><p class="phone-caption" id="phone-caption">${esc(p.gallery[0].cap)}</p><div class="phone-thumbnail-strip" aria-label="Choose mobile screen">${p.gallery.map((img,i)=>`<button type="button" data-phone-index="${i}" aria-label="View ${esc(img.cap)}" aria-current="${i===0}">${safeImage(img.src,img.alt||img.cap)}</button>`).join('')}</div><button class="button" type="button" data-phone-zoom>Enlarge selected screen ↗</button></div>`;
  let phoneIndex=0;
  function initPhone(p){const scroll=$('#phone-scroller',detail),current=$('#phone-current',detail),caption=$('#phone-caption',detail);if(!scroll)return;
    function setIndex(i,move=true){phoneIndex=Math.max(0,Math.min(p.gallery.length-1,i));current.textContent=`${phoneIndex+1} / ${p.gallery.length}`;caption.textContent=p.gallery[phoneIndex].cap;$$('[data-phone-index]',detail).forEach(b=>b.setAttribute('aria-current',String(+b.dataset.phoneIndex===phoneIndex)));if(move)scroll.scrollTo({top:phoneIndex*scroll.clientHeight,behavior:reduced?'auto':'smooth'});}
    $$('[data-phone-index]',detail).forEach(btn=>btn.addEventListener('click',()=>setIndex(Number(btn.dataset.phoneIndex))));
    $('[data-phone-prev]',detail).addEventListener('click',()=>setIndex(phoneIndex-1));
    $('[data-phone-next]',detail).addEventListener('click',()=>setIndex(phoneIndex+1));
    $('[data-phone-zoom]',detail).addEventListener('click',()=>openGallery(p.gallery,phoneIndex));
    scroll.addEventListener('scroll',()=>{const next=Math.round(scroll.scrollTop/scroll.clientHeight);if(next!==phoneIndex)setIndex(next,false)},{passive:true});
    scroll.addEventListener('keydown',ev=>{if(ev.key==='ArrowDown'){ev.preventDefault();setIndex(phoneIndex+1)}else if(ev.key==='ArrowUp'){ev.preventDefault();setIndex(phoneIndex-1)}});
    setIndex(0,false);
  }
  function caseStudyHTML(p){const i=D.projects.indexOf(p)+1;
    const top=`<div class="dialog-top"><div class="shell dialog-top-inner"><a class="dialog-back" href="#projects">← &nbsp; Back to projects</a><button type="button" class="dialog-cross" data-detail-close aria-label="Close case study">×</button></div></div><div class="shell detail-page"><div class="detail-top"><div><div class="detail-label">PROJECT / ${String(i).padStart(2,'0')}</div><h2 id="detail-title" class="detail-title">${esc(p.title)}</h2><p class="detail-desc">${esc(p.summary)}</p></div><div class="detail-number" aria-hidden="true">${String(i).padStart(2,'0')}</div></div>${statbar(p)}`;
    const body=[listBlock('Overview',p.problem),listBlock('My contribution',p.process),listBlock('Deliverables & evidence',p.outcome),extraTable(p),listBlock('Scope & limitations',p.limits)].join('');
    const end='</div>';
    if(p.phone){return top+`<div class="detail-phone-layout"><div>${body}<section class="detail-content-block"><h3>Tools & links</h3>${tags(p.tools)}<div class="hero-actions">${p.links.map(l=>external(l.label,l.url)).join('')}</div></section></div>${phoneHTML(p)}</div><h3 class="detail-section-title">Design process</h3>${galleryHTML(p.extra||[],p.slug)}`+end;}
    return top+`<div class="detail-hero-media ${p.phone?'phone-media':''}">${media(p.gallery[p.cover])}</div><div class="detail-main-grid"><div>${body}</div>${toolsSidebar(p)}</div><h3 class="detail-section-title">${p.slug==='yolo-review'?'Research materials':'Project gallery'}</h3>${galleryHTML(p.gallery,p.slug)}`+end;
  }
  let currentProject=null;
  function showProject(p){currentProject=p;detail.innerHTML=caseStudyHTML(p);detail.scrollTop=0;if(!detail.open)detail.showModal();document.body.classList.add('is-dialog-open');if(p.phone)initPhone(p);}
  function syncHash(){const match=location.hash.match(/^#project-([\w-]+)$/);const project=match&&bySlug(match[1]);if(project){if(!detail.open || !currentProject || currentProject.slug!==project.slug)showProject(project);}else if(detail.open){detail.close();document.body.classList.remove('is-dialog-open');currentProject=null;}}
  window.addEventListener('hashchange',syncHash);
  detail.addEventListener('click',ev=>{if(ev.target.closest('[data-detail-close]')){location.hash='projects';syncHash();}else if(ev.target===detail){location.hash='projects';syncHash();}});
  detail.addEventListener('close',()=>{document.body.classList.remove('is-dialog-open');if(location.hash.startsWith('#project-'))history.replaceState(null,'','#projects');currentProject=null;});
  // Gallery buttons (separate from phone interaction) and certification previews
  document.addEventListener('click',ev=>{
    const b=ev.target.closest('[data-project-gallery]');
    if(b){const p=bySlug(b.dataset.projectGallery);if(!p)return;const shots=p.gallery;const ix=Number(b.dataset.index);const visible=shots.filter(x=>!x.hold);const selected=shots[ix];openGallery(visible,visible.indexOf(selected));return;}
    const c=ev.target.closest('[data-image]');if(c){openGallery([{src:c.dataset.image,cap:c.dataset.caption,alt:c.dataset.caption}],0);}
  });
  syncHash();
})();
