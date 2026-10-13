// 15 · Sartoria Arnaldo Marsilii — a tailoring dossier: monogram, case file with a "to verify" stamp, two candidate addresses, consultation sheets.
import {E, k, header, requestForm, page} from '../lib.mjs';

const lapel = `<svg viewBox="0 0 300 360" role="img" aria-labelledby="ma-art"><title id="ma-art">Illustrazione originale a tratto: il revers di una giacca con bottoni</title>
<g fill="none" stroke="#111" stroke-width="2.5" stroke-linejoin="round"><path d="M60 20l60 120-40 60 70 140M240 20l-60 120 40 60-70 140"/><path d="M120 140l30-36 30 36"/><path d="M80 200l-50 140M220 200l50 140"/></g>
<g fill="#7a1f2b"><circle cx="150" cy="250" r="8"/><circle cx="150" cy="300" r="8"/></g><path d="M196 150l30 6" stroke="#7a1f2b" stroke-width="5" stroke-linecap="round"/></svg>`;

export default {
  icon: ['AM', '#fbfaf7', '#7a1f2b', 20],
  render(b, base) {
    const body = `${header(b, {cls: 'folder-head', brand: '<span class="tab-label">Fascicolo n. 15</span><span class="brand-name">Arnaldo Marsilii</span>', links: [['#sede', 'I. La sede'], ['#fogli', 'II. I fogli'], ['#richiesta', 'III. Gli appunti']]})}
<main id="main">
<section class="dossier" aria-labelledby="am-title">
 <aside class="mono-col"><p class="monogram" aria-hidden="true">AM</p><figure>${lapel}<figcaption>Illustrazione originale</figcaption></figure></aside>
 <div class="file">${k('Dossier sartoriale · Milano')}<h1 id="am-title">Sartoria<br>Arnaldo Marsilii</h1><p class="stamp" aria-hidden="true">Sede da<br>confermare</p>
 <dl class="fields"><div><dt>Oggetto</dt><dd>Proposta di sito indipendente</dd></div><div><dt>Settore</dt><dd>Sartoria</dd></div><div><dt>Sede</dt><dd>Da confermare (vedi foglio I)</dd></div><div><dt>Recapito</dt><dd>${E(b.phoneNote)}</dd></div></dl>
 <p class="lead">${E(b.intro)} Il dettaglio fa la differenza.</p></div>
</section>
<section class="sede" id="sede" aria-labelledby="se-title"><h2 id="se-title"><span>I.</span> Prima, verifichiamo la sede.</h2><p>${E(b.verify)}</p><div class="addresses">${b.addresses.map((a, i) => `<div class="addr-card"><p class="lab">Indirizzo ${'AB'[i]} · riportato dalle fonti</p><p class="addr">${E(a)}</p><p class="tbc">Da confermare prima della visita</p></div>`).join('')}</div></section>
<section class="fogli" id="fogli" aria-labelledby="fo-title"><h2 id="fo-title"><span>II.</span> Tre fogli da completare.</h2>${b.services.map((s, i) => `<details${i === 0 ? ' open' : ''}><summary><span class="num">Foglio 0${i + 1}</span>${E(s.title)}</summary><div><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Annota negli appunti<span class="sr-only">: ${E(s.title)}</span></button></div></details>`).join('')}<p class="story">${E(b.story)}</p></section>
${requestForm(b, base, {cls: 'appunti', kicker: 'III. Appunti', title: 'Appunti per un<br>confronto sartoriale.', intro: 'Il capo, l’esigenza, ciò che conta per te. Gli appunti restano qui: portali al primo incontro, una volta confermata la sede.', occasion: 'Il capo in questione', detailsLabel: 'Di che si tratta?', details: ['Un capo da far valutare', 'Una modifica', 'Un’idea da discutere']})}
</main>`;
    return page(b, base, {themeColor: '#fbfaf7', body});
  },
  poster: () => `<span class="p-mono">AM</span><strong>Arnaldo Marsilii</strong><span class="p-stamp">Sede da confermare</span>`
};
