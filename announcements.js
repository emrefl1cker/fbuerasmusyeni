/* FBU: bilingual announcement archive + single-announcement timeline. No framework/server required. */
(function () {
  'use strict';
  const EN = /^en/i.test(document.documentElement.lang);
  const ROOT = EN ? '../' : '';
  const T = EN ? {
    all:'All calls',open:'Open / upcoming',pending:'Under review / closed',completed:'Completed',
    no:'No calls match your filters.',search:'Search calls',
    openStatus:'Applications Open',closedStatus:'Applications Closed',evaluationStatus:'Under Evaluation',completedStatus:'Completed',
    student:'Student',staff:'Staff',studies:'Studies',traineeship:'Traineeships',teaching:'Teaching',training:'Training',other:'Exchange',
    posted:'Published',deadline:'Application deadline',updated:'Last update',count:'calls found',
    back:'Back to announcements',prev:'Previous',next:'Next',page:'Page',of:'of',
    timeline:'Call and assessment timeline',call:'Call published',exam:'Language examination',pre:'Preliminary assessment',final:'Final assessment',
    appeal:'Appeals',correction:'Correction / update',additional:'Additional announcement',
    files:'Documents and results',file:'View document',notReady:'The detailed call text has not yet been added.',
    noId:'This call could not be found.',note:'Only officially published stages and documents are listed below.',
    event:'Event date',noStage:'No updates have been published yet.',
    archive:'Archived calls',archivedHint:'Completed calls remain available for reference.',news:'News and events',
    allYears:'All academic years',allPrograms:'All programmes',allAudiences:'Student and staff',allMobility:'All mobility types',
    filtered:'Clear filters',results:'Showing',sort:'Most recently updated first',
    upcomingStatus:'Opening Soon',draft:'DRAFT — not published',draftWarning:'This call is a preview. Conflicting dates and eligibility wording in the original PDFs must be confirmed before publication.',
    callOverview:'Call-specific information',schedule:'Application and assessment schedule',projectCode:'Project code',callNumber:'Call number',semester:'Semester',quota:'Funded places',
    examEligible:'Eligible language exam participants',acceptanceDue:'Acceptance letter deadline',start:'Applications open',deadlineUnverified:'Application deadline',examWindow:'Language exam (planned)',preDate:'Preliminary assessment',appealWindow:'Appeals',finalDate:'Final assessment',withdrawalDue:'Withdrawal notice deadline',
    guideTitle:'General studies mobility guide',guideDescription:'Eligibility, application procedure, selection criteria, grants and travel support are explained in the programme guide.',guideLink:'Read the full programme guide ↗',
    sourceTitle:'Original call documents (for internal review)',reviewPending:'The dates shown here are transcribed from the supplied documents and include unresolved inconsistencies.',
    legacyLabel:'Legacy archive',legacyTitle:'Original announcements and results',legacyHelp:'This call was published in the previous website format. The original announcement and available results can be accessed through the links below.',
    legacyLink:'Open original announcement',legacyEmpty:'Links for this archive entry have not been added yet.',
    keyPoints:'Key points for this call',moreInfo:'Additional information',applyOnline:'Application and official details on TurnaPortal',externalNote:'The original page opens in a new tab.',
  } : {
    all:'Tüm İlanlar',open:'Açık / Yaklaşan',pending:'Değerlendirmede / Başvurusu Kapanmış',completed:'Tamamlananlar',
    no:'Filtrelerinize uygun ilan bulunamadı.',search:'İlanlarda ara',
    openStatus:'Başvurular Açık',closedStatus:'Başvurular Kapandı',evaluationStatus:'Değerlendirme Sürüyor',completedStatus:'Tamamlandı',
    student:'Öğrenci',staff:'Personel',studies:'Öğrenim',traineeship:'Staj',teaching:'Ders Verme',training:'Eğitim Alma',other:'Değişim',
    posted:'Yayımlanma',deadline:'Son başvuru',updated:'Son güncelleme',count:'ilan bulundu',
    back:'Duyurulara dön',prev:'Önceki',next:'Sonraki',page:'Sayfa',of:'/',
    timeline:'İlan ve değerlendirme süreci',call:'Başvuru ilanı',exam:'Dil sınavı',pre:'Ön değerlendirme',final:'Nihai değerlendirme',
    appeal:'İtiraz sonuçları',correction:'Düzeltme / güncelleme',additional:'Ek duyuru',
    files:'Belgeler ve sonuçlar',file:'Belgeyi görüntüle',notReady:'İlanın ayrıntılı metni henüz eklenmedi.',
    noId:'Aradığınız ilan bulunamadı.',note:'Yalnızca yayımlanan aşamalar ve belgeler aşağıda listelenir.',
    event:'Etkinlik tarihi',noStage:'Henüz yeni bir duyuru yayımlanmadı.',
    archive:'İlan arşivi',archivedHint:'Tamamlanan ilanlar geçmişe dönük erişim için korunur.',news:'Haberler ve etkinlikler',
    allYears:'Tüm akademik yıllar',allPrograms:'Tüm programlar',allAudiences:'Öğrenci ve personel',allMobility:'Tüm hareketlilikler',
    filtered:'Filtreleri temizle',results:'Gösterilen',sort:'Son güncellenen en üstte',
    upcomingStatus:'Yakında Açılacak',draft:'TASLAK — YAYINDA DEĞİL',draftWarning:'Bu çağrı önizlemedir. Kaynak PDF’lerdeki tarih ve uygunluk koşulu çelişkileri doğrulanmadan yayımlanmamalıdır.',
    callOverview:'Bu çağrıya özel bilgiler',schedule:'Başvuru ve değerlendirme takvimi',projectCode:'Proje kodu',callNumber:'Çağrı numarası',semester:'Dönem',quota:'Hibeli kontenjan',
    examEligible:'Dil sınavına gireceklerin ilanı',acceptanceDue:'Kabul mektubu son teslimi',start:'Başvuru başlangıcı',deadlineUnverified:'Son başvuru',examWindow:'Yabancı dil sınavı (planlanan)',preDate:'Ön değerlendirme',appealWindow:'İtiraz',finalDate:'Nihai değerlendirme',withdrawalDue:'Feragat bildirimi son tarihi',
    guideTitle:'Genel öğrenim hareketliliği rehberi',guideDescription:'Başvuru koşulları, başvuru yöntemi, seçim kriterleri, hibeler ve seyahat desteği genel program rehberinde yer alır.',guideLink:'Program rehberini incele ↗',
    sourceTitle:'Orijinal çağrı belgeleri (iç kontrol)',reviewPending:'Buradaki tarihler gönderilen kaynak belgelerden aktarılmıştır ve henüz giderilmemiş tutarsızlıklar içermektedir.',
    legacyLabel:'Eski ilan arşivi',legacyTitle:'Orijinal ilan ve sonuç bağlantıları',legacyHelp:'Bu ilan önceki web sitesi düzeninde yayımlanmıştır. Orijinal ilan metnine ve mevcut sonuç duyurularına aşağıdaki bağlantılardan ulaşabilirsiniz.',
    legacyLink:'Orijinal ilanı aç',legacyEmpty:'Bu arşiv kaydının bağlantıları henüz eklenmedi.',
    keyPoints:'Bu ilana özel kısa bilgiler',moreInfo:'Ek açıklamalar',applyOnline:'Başvuru ve resmî ayrıntılar için TurnaPortal',externalNote:'Orijinal sayfa yeni sekmede açılır.',
  };
  const allRecords = (Array.isArray(window.FBU_ANNOUNCEMENTS) ? window.FBU_ANNOUNCEMENTS : []).filter(a => a && a.id && a.title);
  const records = allRecords.filter(a => !a.draft); // Drafts never appear in the home page or archive.

  const pick = (o,k) => EN ? (o[k+'_en'] || o[k] || '') : (o[k] || '');
  const fmt = iso => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(iso || ''))) return '';
    const [y,m,d]=iso.split('-').map(Number);
    const date=new Date(y,m-1,d);
    if (date.getFullYear()!==y || date.getMonth()!==m-1 || date.getDate()!==d) return '';
    return new Intl.DateTimeFormat(EN?'en-GB':'tr-TR',{day:'numeric',month:'long',year:'numeric'}).format(date);
  };
  const today = () => {let d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
  const isLegacy = a => a.format === 'legacy';
  const status = a => {
    if (isLegacy(a) || a.status === 'completed') return 'completed';
    if (a.status === 'evaluation') return 'evaluation';
    if(a.callMeta?.applicationStart && a.callMeta.applicationStart > today())return 'upcoming';
    return (a.deadline && a.deadline >= today()) ? 'open' : 'closed';
  };
  const updated = a => [a.posted||'',...(a.stages||[]).map(s=>s.date||'')].sort().pop() || '';
  const sorted = arr => arr.slice().sort((a,b)=>updated(b).localeCompare(updated(a)) || (b.posted||'').localeCompare(a.posted||'') || a.id.localeCompare(b.id));
  const safeURL = url => {
    if (typeof url!=='string' || !url.trim()) return '';
    const v=url.trim();
    if (/^https?:\/\//i.test(v)) return v;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(v) || v.includes('\\') || v.split('/').includes('..') || v.startsWith('#')) return '';
    return ROOT+v.replace(/^\.\//,'');
  };
  function node(tag, cls, text) {
    const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;
  }
  function add(parent,...children){children.forEach(x=>{if(x) parent.append(x);}); return parent;}
  function linkFor(a){return (EN?'':'')+'ilan.html?id='+encodeURIComponent(a.id);}
  function badge(a){let s=status(a), n=s==='open'?T.openStatus:s==='upcoming'?T.upcomingStatus:s==='completed'?T.completedStatus:s==='evaluation'?T.evaluationStatus:T.closedStatus;return node('span','call-state call-state--'+s,n);}
  function label(a){let parts=[a.program,a.audience==='staff'?T.staff:T.student];let move=T[a.mobility]||T.other;if(a.mobility&&a.mobility!=='other')parts.push(move);return parts.join(' · ');}
  function stageLabel(s){return pick(s,'title') || T[s.kind] || T.additional;}
  function card(a){
    let item=node('a','call-card');item.href=linkFor(a);
    const left=node('div','call-card__body');
    add(left,node('div','call-card__eyebrow',label(a)+(a.academicYear?' · '+a.academicYear:'')),node('h3','call-card__title',pick(a,'title')));
    let meta=node('div','call-card__meta');
    add(meta,node('span','',T.posted+': '+(fmt(a.posted)||'—')));
    if(a.deadline)add(meta,node('span','',T.deadline+': '+(fmt(a.deadline)||'—')));
    if(updated(a)!==a.posted)add(meta,node('span','',T.updated+': '+fmt(updated(a))));
    if(isLegacy(a))add(meta,node('span','call-card__archive-label',T.legacyLabel));
    add(left,meta);
    let right=node('div','call-card__right');add(right,badge(a),node('span','call-card__arrow','↗'));
    return add(item,left,right);
  }
  function renderHome(){document.querySelectorAll('[data-render="announcements-program"]').forEach(root=>{
    const program=root.dataset.program, limit=Number(root.dataset.limit)||3;
    const arr=sorted(records.filter(a=>a.program===program && ['open','upcoming','evaluation'].includes(status(a))))
      .sort((a,b)=>{const rank={open:0,upcoming:1,evaluation:2,closed:3,completed:4};return rank[status(a)]-rank[status(b)] || updated(b).localeCompare(updated(a));})
      .slice(0,limit);
    if(!arr.length)root.append(node('p','call-empty',EN?'No current calls.':'Şu anda güncel ilan bulunmuyor.'));
    arr.forEach(a=>root.append(card(a)));
  });}
  function renderArchive(){
    const root=document.getElementById('announcementArchive');if(!root)return;
    const search=document.getElementById('callSearch'), aud=document.getElementById('callAudience'),program=document.getElementById('callProgram'),
      year=document.getElementById('callYear'),mobility=document.getElementById('callMobility'),summary=document.getElementById('callResultCount'),
      cards=document.getElementById('callResults'),pagination=document.getElementById('callPagination'),clear=document.getElementById('callClear');
    let filter='all',page=1;
    [...new Set(records.map(x=>x.academicYear).filter(Boolean))].sort().reverse().forEach(y=>year.append(new Option(y,y)));
    function apply(){
      let q=search.value.trim().toLocaleLowerCase(EN?'en':'tr');
      let items=sorted(records.filter(a=>{
        let s=status(a), matchesStatus=filter==='all'||(filter==='open'&&(s==='open'||s==='upcoming'))||(filter==='pending'&&(s==='evaluation'||s==='closed'))||(filter==='completed'&&s==='completed');
        const hay=[a.title,a.title_en,a.program,a.academicYear,a.summary,a.summary_en,a.body,a.body_en,a.highlights,a.highlights_en,a.id].filter(Boolean).join(' ').toLocaleLowerCase(EN?'en':'tr');
        return matchesStatus && (!q||hay.includes(q)) && (!aud.value||a.audience===aud.value) && (!program.value||a.program===program.value)
          && (!year.value||a.academicYear===year.value) && (!mobility.value||a.mobility===mobility.value);
      }));
      const max=Math.max(1,Math.ceil(items.length/8));page=Math.min(page,max);
      cards.replaceChildren();pagination.replaceChildren();
      summary.textContent=items.length+' '+T.count+' · '+T.sort;
      if(!items.length)cards.append(node('div','call-empty call-empty--large',T.no));
      items.slice((page-1)*8,page*8).forEach(a=>cards.append(card(a)));
      if(max>1){
        function nav(text,target,disabled,current=false){const b=node('button','call-page'+(current?' is-current':''),text);b.type='button';b.disabled=disabled;if(current)b.setAttribute('aria-current','page');b.onclick=()=>{page=target;apply();root.scrollIntoView({behavior:'smooth',block:'start'});};pagination.append(b);}
        nav('‹ '+T.prev,page-1,page<=1);
        for(let k=1;k<=max;k++)nav(String(k),k,false,k===page);
        nav(T.next+' ›',page+1,page>=max);
      }
    }
    document.querySelectorAll('[data-call-status]').forEach(b=>b.addEventListener('click',()=>{
      filter=b.dataset.callStatus;page=1;
      document.querySelectorAll('[data-call-status]').forEach(item=>{const on=item===b;item.classList.toggle('is-active',on);item.setAttribute('aria-pressed',String(on));});apply();
    }));
    [search,aud,program,year,mobility].forEach(input=>input.addEventListener(input===search?'input':'change',()=>{page=1;apply();}));
    clear.onclick=()=>{search.value='';aud.value='';program.value='';year.value='';mobility.value='';document.querySelector('[data-call-status="all"]').click();};
    apply();
    const tabs=[...document.querySelectorAll('[data-ann-tab]')];
    const panels={calls:document.getElementById('announcementArchive'),news:document.getElementById('newsArchive')};
    function setTab(which){tabs.forEach(b=>{const active=b.dataset.annTab===which;b.classList.toggle('is-active',active);b.setAttribute('aria-selected',String(active));});
      Object.entries(panels).forEach(([name,el])=>{el.hidden=name!==which;});
    }
    tabs.forEach(tab=>tab.onclick=()=>{const which=tab.dataset.annTab;setTab(which);const u=new URL(location.href);if(which==='news')u.searchParams.set('tab','news');else u.searchParams.delete('tab');try{history.replaceState(null,'',u.toString());}catch(_err){/* file:// preview restrictions */}});
    setTab(new URLSearchParams(location.search).get('tab')==='news'?'news':'calls');
  }
  function documentBlock(files){let valid=(files||[]).filter(f=>safeURL(f.url));if(!valid.length)return null;
    let wrap=node('div','call-documents');valid.forEach(f=>{const a=node('a','call-document');a.href=safeURL(f.url);a.target='_blank';a.rel='noopener noreferrer';
      add(a,node('span','call-document__icon','↗'),node('span','',pick(f,'label')||T.file));wrap.append(a);});return wrap;
  }
  function paragraphs(text){let box=node('div','call-prose');String(text||'').split(/\n\s*\n/).filter(x=>x.trim()).forEach(line=>{const p=node('p','',line.trim());p.style.whiteSpace='pre-line';box.append(p);});return box;}
  function bulletList(text){
    const list=node('ul','call-bullets');String(text||'').split(/\r?\n/).map(x=>x.replace(/^\s*(?:[•*-]|\d+[.)])\s*/, '').trim()).filter(Boolean).forEach(item=>list.append(node('li','',item)));return list;
  }
  function renderDetail(){const root=document.getElementById('announcementDetail');if(!root)return;
    const params=new URLSearchParams(location.search);
    let id=params.get('id')||'', a=records.find(x=>x.id===id);
    if(!a && params.get('preview')==='1') a=allRecords.find(x=>x.id===id && x.draft);
    if(!a){const err=node('div','call-notfound');add(err,node('h2','',T.noId));const back=node('a','call-back',T.back+' ←');back.href='duyurular-haberler.html';add(err,back);root.append(err);return;}
    document.title=pick(a,'title')+' | '+(EN?'Fenerbahçe University':'Fenerbahçe Üniversitesi');
    let back=node('a','call-back','← '+T.back);back.href='duyurular-haberler.html';root.append(back);
    let hero=node('div','call-detail-hero');
    if(a.draft){let robots=document.querySelector('meta[name="robots"]');if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}robots.content='noindex, nofollow';const note=node('div','call-preview-warning');add(note,node('strong','',T.draft),node('p','',T.draftWarning));root.append(note);}
    add(hero,node('div','call-detail-eyebrow',label(a)+(a.academicYear?' · '+a.academicYear:'')),node('h1','',pick(a,'title')));
    let hdr=node('div','call-detail-status');if(!a.draft)add(hdr,badge(a));
    if(a.posted)add(hdr,node('span','',T.posted+': '+fmt(a.posted)));
    if(a.deadline)add(hdr,node('span','',T.deadline+': '+fmt(a.deadline)));
    if(updated(a) && updated(a)!==a.posted)add(hdr,node('span','',T.updated+': '+fmt(updated(a))));if(hdr.children.length)hero.append(hdr);
    if(pick(a,'summary'))hero.append(node('p','call-intro',pick(a,'summary')));root.append(hero);
    if(isLegacy(a)){
      const archive=node('section','call-content-block call-legacy-block');
      add(archive,node('p','call-legacy-kicker',T.legacyLabel),node('h2','',T.legacyTitle),node('p','call-subtext',T.legacyHelp));
      const links=documentBlock(a.legacyLinks);
      if(links)archive.append(links);else archive.append(node('p','call-empty',T.legacyEmpty));
      root.append(archive);
      return;
    }
    if(a.callMeta){
      const m=a.callMeta, overview=node('section','call-content-block');overview.append(node('h2','',T.callOverview));
      const facts=node('div','call-facts');
      const fact=(label,value)=>{if(!value)return;const div=node('div','call-fact');add(div,node('span','',label),node('strong','',String(value)));facts.append(div);};
      fact(T.projectCode,m.projectCode);fact(T.callNumber,m.callNumber);fact(T.semester,pick(m,'term'));fact(T.quota,m.quota);
      overview.append(facts);overview.append(node('h3','call-schedule-title',T.schedule));
      const sched=node('dl','call-schedule');
      const addDate=(label,val)=>{if(!val)return;add(sched,node('dt','',label),node('dd','',val));};
      addDate(T.start,fmt(m.applicationStart));
      addDate(T.deadlineUnverified,a.deadline?fmt(a.deadline):pick(m,'deadlineNote'));
      addDate(T.examEligible,fmt(m.examEligible));
      addDate(T.examWindow,pick(m,'examWindow'));
      addDate(T.preDate,fmt(m.preliminary));
      addDate(T.appealWindow,pick(m,'appealWindow'));
      addDate(T.finalDate,m.finalDate?fmt(m.finalDate):pick(m,'finalNote'));
      addDate(T.acceptanceDue,m.acceptanceDeadline?fmt(m.acceptanceDeadline):pick(m,'acceptanceDeadlineNote'));
      if(m.withdrawalDeadline)addDate(T.withdrawalDue,fmt(m.withdrawalDeadline)+(m.withdrawalDeadlineTime?' · '+m.withdrawalDeadlineTime:''));
      overview.append(sched);root.append(overview);
    }
    if(pick(a,'highlights')){
      const section=node('section','call-content-block');add(section,node('h2','',T.keyPoints),bulletList(pick(a,'highlights')));root.append(section);
    }
    if(pick(a,'body')){const section=node('section','call-content-block');add(section,node('h2','',pick(a,'highlights')?T.moreInfo:(EN?'About this call':'İlan hakkında')),paragraphs(pick(a,'body')));root.append(section);}
    if(a.applicationUrl && safeURL(a.applicationUrl)){
      const section=node('section','call-content-block call-action-block');
      const l=node('a','call-guide-button',T.applyOnline+' ↗');l.href=safeURL(a.applicationUrl);l.target='_blank';l.rel='noopener noreferrer';section.append(l);root.append(section);
    }
    if(a.audience==='student' && ['studies','traineeship'].includes(a.mobility)){
      const internship=a.mobility==='traineeship';
      const guidesec=node('section','call-content-block call-guide-link');add(guidesec,node('h2','',internship?(EN?'Traineeship mobility guide':'Staj hareketliliği rehberi'):T.guideTitle),node('p','',internship?(EN?'Eligibility, acceptance letters, selection criteria, grants and travel support are covered in the traineeship guide.':'Başvuru koşulları, kabul mektubu, değerlendirme, hibeler ve seyahat desteği staj rehberinde açıklanmıştır.'):T.guideDescription));
      const guide=node('a','call-guide-button',T.guideLink);guide.href=internship?'ogrenci-staj.html':'ogrenci-ogrenim.html';guidesec.append(guide);root.append(guidesec);
    }
    if(a.audience==='staff' && ['teaching','training'].includes(a.mobility)){
      const teaching=a.mobility==='teaching';
      const sec=node('section','call-content-block call-guide-link');
      add(sec,node('h2','',EN?(teaching?'Teaching mobility guide':'Training mobility guide'):(teaching?'Personel Ders Verme Rehberi':'Personel Eğitim Alma Rehberi')),
        node('p','',EN?'Programme eligibility, documents, selection scoring and grant/travel support are explained in the staff guide.':'Programın başvuru şartları, belgeler, seçim kriterleri, hibe ve seyahat tutarları ilgili personel rehberinde açıklanmaktadır.'));
      const aLink=node('a','call-guide-button',T.guideLink);aLink.href=teaching?'personel-dersverme.html':'personel-egitimalma.html';sec.append(aLink);root.append(sec);
    }
    if(a.draft && a.sourceFiles && a.sourceFiles.length){
      const source=node('section','call-content-block');add(source,node('h2','',T.sourceTitle),node('p','call-subtext',T.reviewPending));
      const documents=documentBlock(a.sourceFiles);if(documents)source.append(documents);root.append(source);
    }
    const sec=node('section','call-content-block');add(sec,node('h2','',T.timeline),node('p','call-subtext',T.note));
    const stages=(a.stages||[]).slice().sort((x,y)=>(x.date||'').localeCompare(y.date||''));
    if(!stages.length)sec.append(node('p','',T.noStage));
    const tl=node('ol','call-timeline');stages.forEach((s,i)=>{
      const li=node('li','call-step');const dot=node('span','call-step__dot');dot.setAttribute('aria-hidden','true');
      const main=node('div','call-step__body');let top=node('div','call-step__top');
      add(top,node('span','call-step__date',fmt(s.date)||'—'),node('span','call-step__type',T[s.kind]||T.additional));
      add(main,top,node('h3','',stageLabel(s)));
      if(s.eventDate)main.append(node('p','call-event',T.event+': '+fmt(s.eventDate)));
      if(pick(s,'body'))main.append(paragraphs(pick(s,'body')));
      const documents=documentBlock(s.files);if(documents)main.append(documents);
      tl.append(add(li,dot,main));
    });sec.append(tl);root.append(sec);
  }
  renderHome();renderArchive();renderDetail();
})();
