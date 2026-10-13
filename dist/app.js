const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); document.querySelector('.navlinks').classList.toggle('open', open); });
document.querySelectorAll('.navlinks a').forEach(a => a.addEventListener('click', () => { menu?.setAttribute('aria-expanded', 'false'); document.querySelector('.navlinks').classList.remove('open'); }));
document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
 document.querySelectorAll('[data-category]').forEach(card => { card.hidden = btn.dataset.filter !== 'all' && !card.dataset.category.split(',').includes(btn.dataset.filter); });
 const count = [...document.querySelectorAll('[data-category]')].filter(c => !c.hidden).length;
 const status = document.querySelector('#filter-status'); if (status) status.textContent = `${count} proposte visualizzate`;
}));
document.querySelectorAll('[data-service]').forEach(btn => btn.addEventListener('click', () => { const select = document.querySelector('#service'); if(select) select.value = btn.dataset.service; document.querySelector('#richiesta').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); select?.focus({preventScroll:true}); }));
let currentDraft = '';
document.querySelector('#request-form')?.addEventListener('submit', e => {
 e.preventDefault(); const data = new FormData(e.target); const business = document.body.dataset.business;
 currentDraft = `Buongiorno ${business},\n\nvorrei informazioni su: ${data.get('service')}.\n${data.get('occasion') ? `Occasione / esigenza: ${data.get('occasion')}.\n` : ''}\n${String(data.get('message')).trim()}\n\nGrazie,\n${String(data.get('name')).trim()}\n\nRichiesta da confermare con l'attività.`;
 document.querySelector('#draft-text').textContent = currentDraft; document.querySelector('#draft').hidden = false;
 const email = document.body.dataset.email; const mail = document.querySelector('#email-draft');
 if (mail && email) mail.href = `mailto:${email}?subject=${encodeURIComponent('Richiesta informazioni — ' + data.get('service'))}&body=${encodeURIComponent(currentDraft)}`;
 document.querySelector('#draft').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'nearest'}); document.querySelector('#draft-title').focus({preventScroll:true});
});
document.querySelector('#copy-draft')?.addEventListener('click', async () => { const status = document.querySelector('#draft-status'); try { await navigator.clipboard.writeText(currentDraft); status.textContent = 'Testo copiato. Puoi incollarlo nel tuo messaggio.'; } catch { status.textContent = 'La copia automatica non è disponibile: seleziona il testo della bozza per copiarlo.'; } });
document.querySelector('#download-draft')?.addEventListener('click', () => { const url = URL.createObjectURL(new Blob([currentDraft],{type:'text/plain;charset=utf-8'})); const a = document.createElement('a'); a.href=url; a.download='richiesta-informazioni.txt'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); document.querySelector('#draft-status').textContent='Bozza scaricata. Nessun messaggio è stato inviato.'; });
const search = document.querySelector('#search');
search?.addEventListener('input', () => { const value=search.value.toLocaleLowerCase('it').trim(); let count=0; document.querySelectorAll('.index-card').forEach(card=>{card.hidden=!card.textContent.toLocaleLowerCase('it').includes(value); if(!card.hidden)count++;}); document.querySelector('#search-status').textContent = `${count} attività trovate`; document.querySelector('#empty').hidden=count>0; });
