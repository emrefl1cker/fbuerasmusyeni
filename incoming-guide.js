/* Shared incoming guide behaviour (TR/EN). No third-party libraries required. */
(function(){
  'use strict';
  function showTab(id,writeHash){
    var pane=document.getElementById(id);
    if(!pane || !pane.classList.contains('tab-pane')) return;
    document.querySelectorAll('.tab-pane').forEach(function(el){el.classList.toggle('active',el===pane)});
    document.querySelectorAll('.sidebar-menu .tab-btn').forEach(function(b){
      var active=b.dataset.tab===id;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;
    });
    if(writeHash){try{history.replaceState(null,'','#'+encodeURIComponent(id))}catch(e){location.hash=id}}
  }
  function renderCatalogues(){
    var host=document.getElementById('incoming-catalogue-grid');if(!host)return;
    var entries=window.FBU_INCOMING_CATALOGUES||[];
    var en=document.documentElement.lang.toLowerCase().startsWith('en');
    var folder=(host.dataset.prefix||'')+'assets/course-catalogs/';
    host.replaceChildren();
    entries.forEach(function(row){
      var card=document.createElement('article');card.className='catalogue-card';
      var heading=document.createElement('h3');heading.className='catalogue-card__title';heading.textContent=en?row.en:row.tr;
      var desc=document.createElement('span');desc.className='catalogue-card__label';desc.textContent=en?'English-taught courses · Excel (.xlsx)':'İngilizce verilen dersler · Excel (.xlsx)';
      var status=document.createElement('span');status.className='catalogue-card__status';status.textContent=en?'Being prepared':'Hazırlanıyor';
      card.append(heading,desc,status);host.append(card);
      if(typeof fetch!=='function')return;
      var url=folder+row.file;
      // Only present a download link if a real file exists. A normal static host supports HEAD.
      fetch(url,{method:'HEAD',cache:'no-store'}).then(function(res){
        if(!res.ok)return;
        var anchor=document.createElement('a');anchor.className='catalogue-card__link';
        anchor.href=url;anchor.download=row.file;anchor.textContent=en?'↓ Download Excel catalogue':'↓ Excel kataloğunu indir';
        anchor.setAttribute('aria-label',(en?'Download English course list: ':'İngilizce ders listesini indir: ')+(en?row.en:row.tr));
        status.replaceWith(anchor);
      }).catch(function(){ /* Local file preview or unavailable web host: keep safe placeholder. */ });
    });
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.sidebar-menu .tab-btn').forEach(function(button,index,buttons){
      button.addEventListener('click',function(){showTab(button.dataset.tab,true)});
      button.addEventListener('keydown',function(event){
        if(event.key!=='ArrowDown'&&event.key!=='ArrowUp'&&event.key!=='Home'&&event.key!=='End')return;
        event.preventDefault();var target=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
        buttons[target].focus();showTab(buttons[target].dataset.tab,true);
      });
    });
    // Keep in-page links in sync with the tab interface, including hidden panels.
    document.querySelectorAll('.incoming-hero a[href^="#"], .incoming-staff-option[href^="#"]').forEach(function(link){
      link.addEventListener('click',function(event){
        var id=decodeURIComponent(link.getAttribute('href').slice(1));
        var target=document.getElementById(id);
        if(target && target.classList.contains('tab-pane')){
          event.preventDefault();showTab(id,true);
        }
      });
    });
    var hash=decodeURIComponent((location.hash||'').slice(1));
    var firstTab=document.querySelector('.sidebar-menu .tab-btn');
    showTab(document.getElementById(hash)?hash:(firstTab?firstTab.dataset.tab:''),false);
    window.addEventListener('hashchange',function(){var id=decodeURIComponent((location.hash||'').slice(1));showTab(id,false)});
    renderCatalogues();
  });
})();
