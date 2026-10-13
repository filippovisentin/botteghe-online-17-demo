(()=>{
const choose=(buttons,active)=>buttons.forEach(button=>button.setAttribute('aria-pressed',String(button===active)));
const moments=[...document.querySelectorAll('[data-moment]')];
moments.forEach(button=>button.addEventListener('click',()=>{
 choose(moments,button);
 document.querySelectorAll('[data-moment-panel]').forEach(panel=>panel.hidden=panel.dataset.momentPanel!==button.dataset.moment);
}));
const materials=[...document.querySelectorAll('[data-material]')];
materials.forEach(button=>button.addEventListener('click',()=>{
 choose(materials,button);
 document.querySelector('#material-note').textContent=button.dataset.material==='Pelle'?'Pelle: descrivi l’arredo e il risultato che cerchi. Materiali e lavorazioni da verificare.':'Stoffa: descrivi trama, colore e sensazione che cerchi. Disponibilità da verificare.';
 const occasion=document.querySelector('#occasion');
 if(occasion && (!occasion.value || ['Stoffa','Pelle'].includes(occasion.value)))occasion.value=button.dataset.material;
}));
const garments=[...document.querySelectorAll('[data-garment]')];
garments.forEach(button=>button.addEventListener('click',()=>{
 choose(garments,button);
 const index=Number(button.dataset.garment),options=document.querySelector('#service').options;
 document.querySelector('#garment-note').textContent=`${button.textContent}: descrivi il capo e il risultato desiderato. Le lavorazioni si verificano con la sartoria.`;
 document.querySelector('.garment-file [data-service]').dataset.service=options[index+1].value;
}));
const galleryFilters=[...document.querySelectorAll('[data-gallery-filter]')];
let galleryGroup='all';
const search=document.querySelector('.collection #search');
function filterGallery(){
 const query=(search?.value||'').toLocaleLowerCase('it').trim();let count=0;
 document.querySelectorAll('.index-card').forEach(card=>{card.hidden=(galleryGroup!=='all'&&card.dataset.group!==galleryGroup)||!card.textContent.toLocaleLowerCase('it').includes(query);if(!card.hidden)count++;});
 const status=document.querySelector('#search-status');if(status)status.textContent=`${count} attività trovate`;
 const empty=document.querySelector('#empty');if(empty)empty.hidden=count>0;
}
galleryFilters.forEach(button=>button.addEventListener('click',()=>{galleryGroup=button.dataset.galleryFilter;choose(galleryFilters,button);filterGallery();}));
search?.addEventListener('input',filterGallery);
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const menu=document.querySelector('.menu');if(menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');document.querySelector('.navlinks').classList.remove('open');menu.focus();}}});
})();
