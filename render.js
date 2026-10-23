/* Shared renderers: news and exchange committee. Announcements are handled by announcements.js */
(function(){
 'use strict';
 const EN=/^en/i.test(document.documentElement.lang),ROOT=EN?'../':'';
 const months=EN?['January','February','March','April','May','June','July','August','September','October','November','December']:['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
 const pick=(o,k)=>EN?(o[k+'_en']||o[k]||''):(o[k]||'');
 const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
 const TITLES=[['Dr. Öğr. Üyesi','Asst. Prof. Dr.'],['Öğr. Gör. Dr.','Lecturer Dr.'],['Arş. Gör. Dr.','Res. Asst. Dr.'],['Prof. Dr.','Prof. Dr.'],['Doç. Dr.','Assoc. Prof. Dr.'],['Öğr. Gör.','Lecturer'],['Arş. Gör.','Res. Asst.']];
 function memberName(name){if(!EN)return name;for(const [tr,en] of TITLES)if(name.startsWith(tr+' '))return en+name.slice(tr.length);return name;}
 function newsCard(n){let p=n.date.split('-').map(Number),card=el('div','n-card');let image=el('div','n-image');
   const raw=String(n.image||'');const src=/^(https?:|data:|\/)/i.test(raw)?raw:ROOT+raw;
   if(!/^javascript:/i.test(src))image.style.backgroundImage=`url(${JSON.stringify(src)})`;
   let body=el('div','n-content'),meta=el('div','n-meta');meta.append(el('span','',`🗓 ${months[p[1]-1]} ${p[0]}`),el('span','',`📍 ${pick(n,'place')}`));
   body.append(meta,el('h3','n-title',pick(n,'title')),el('p','n-desc',pick(n,'desc')));card.append(image,body);return card;}
 document.querySelectorAll('[data-render="news-home"],[data-render="news-archive"]').forEach(root=>{
   let arr=(window.FBU_NEWS||[]).filter(n=>!EN||n.title_en).sort((a,b)=>b.date.localeCompare(a.date));
   if(root.dataset.limit)arr=arr.slice(0,Number(root.dataset.limit));
   if(!arr.length)root.append(el('p','',EN?'No news to show.':'Gösterilecek haber yok.'));
   arr.forEach(n=>root.append(newsCard(n)));
 });
 document.querySelectorAll('[data-render="committee"]').forEach(body=>{
   (window.FBU_COMMITTEE||[]).forEach(g=>(g.members||[]).forEach((name,i)=>{
     let tr=el('tr');if(i===0){let th=el('th','row-head',EN?g.en:g.tr);th.scope='rowgroup';th.rowSpan=g.members.length;if(!EN)th.append(el('span','row-sub',g.en));tr.append(th);}
     tr.append(el('td','',memberName(name)));body.append(tr);
   }));
 });
})();
