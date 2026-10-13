// Collection index: each card is a miniature of the demo's own opening, so the differences show at a glance.
import {E, k, head, safeUrl} from './lib.mjs';

export function renderGallery(businesses, pages) {
  const cards = businesses.map((b, i) => `<li class="index-card" data-group="${E(b.group)}"><a href="${safeUrl(b.slug + '/')}"><div class="pv pv-${E(b.slug)}" aria-hidden="true">${pages[b.slug]?.poster(b) || ''}</div><div class="index-copy"><span class="no">${String(i + 1).padStart(2, '0')}</span><h2>${E(b.name)}</h2><p>${E(b.category)} · ${E(b.address)}</p><p class="prio">${E(b.priority)}</p></div></a></li>`).join('');
  return head({title: '17 botteghe, 17 identità — proposte di Filippo Visentin', description: 'Diciassette proposte di sito indipendenti per attività di Viale Monza e dintorni, Milano.', base: '', css: ['assets/base.css', 'assets/collection.css'], themeColor: '#1b1b1b'})
  + `<body class="collection"><a class="skip" href="#main">Vai al contenuto</a><div class="demo-bar"><p>Raccolta privata · proposte indipendenti, non siti ufficiali</p><a href="privacy.html">Privacy e cookie</a></div>
<header class="site-header col-head"><a class="brand" href="#main"><span class="col-mark">FV</span><span>Botteghe online<small>Filippo Antonio Visentin · design e sviluppo web</small></span></a></header>
<main id="main">
<section class="col-cover" aria-labelledby="col-title">${k('Milano · Viale Monza e dintorni · ottobre 2026')}<h1 id="col-title">Un quartiere.<br><em>Diciassette</em> personalità.</h1>
<p class="col-lead">Una cartoleria come una rivista. Una gelateria come un manifesto tropicale. Un’officina come un pannello tecnico. Un bar tabacchi come un giornale di quartiere. Ogni proposta ha struttura, caratteri e percorso propri, perché ogni bottega ha qualcosa di diverso da raccontare.</p>
<p class="col-note">Demo indipendenti: illustrazioni originali, nessun prezzo, orario o servizio inventato. I moduli preparano solo bozze locali.</p></section>
<section class="col-projects" id="progetti" aria-labelledby="proj-title"><h2 id="proj-title" class="sr-only">Le proposte</h2>
<div class="col-controls"><div class="tabs" role="group" aria-label="Filtra le attività"><button type="button" data-gallery-filter="all" aria-pressed="true">Tutte · 17</button><button type="button" data-gallery-filter="botteghe" aria-pressed="false">Botteghe e locali</button><button type="button" data-gallery-filter="artigiani" aria-pressed="false">Artigiani e servizi</button></div>
<div class="search"><label for="search">Cerca per nome o categoria</label><input type="search" id="search" autocomplete="off"></div></div>
<p id="search-status" class="search-status" role="status" aria-live="polite">17 attività trovate</p>
<ol class="index-grid">${cards}</ol><p id="empty" hidden>Nessuna attività trovata. Prova un altro nome o seleziona «Tutte».</p></section>
</main>
<footer class="site-footer"><div class="foot-note"><p>Proposte di Filippo Antonio Visentin, ricerca del 13 ottobre 2026. Non affiliate né approvate dalle attività. Foto, orari e servizi da confermare. Nessun messaggio viene inviato dalle demo.</p></div><nav class="foot-links" aria-label="Informazioni"><a href="privacy.html">Privacy e cookie</a><a href="#main">Torna in alto <span aria-hidden="true">↑</span></a></nav></footer></body></html>`;
}
