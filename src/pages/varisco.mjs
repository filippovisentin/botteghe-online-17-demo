// 09 · Bar Tabacchi Varisco — a neighbourhood newspaper: blackletter masthead, front page columns, the story still to be written, letters to the bar.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const hatch = (x, y, w, h, step = 7) => Array.from({length: Math.floor(w / step)}, (_, i) => `M${x + i * step} ${y}l${-h * .4} ${h}`).join('');
const art = `<svg viewBox="0 0 400 360" role="img" aria-labelledby="v-art"><title id="v-art">Illustrazione originale in stile incisione: la facciata di un bar con tenda e vetrina</title>
<rect x="20" y="20" width="360" height="320" fill="#f4f1ea" stroke="#111" stroke-width="3"/>
<path d="${hatch(30, 30, 340, 80, 9)}" stroke="#111" stroke-width="1" opacity=".5"/>
<rect x="40" y="70" width="70" height="60" fill="#f4f1ea" stroke="#111" stroke-width="2.5"/><rect x="165" y="70" width="70" height="60" fill="#f4f1ea" stroke="#111" stroke-width="2.5"/><rect x="290" y="70" width="70" height="60" fill="#f4f1ea" stroke="#111" stroke-width="2.5"/>
<path d="M75 70v60M40 100h70M200 70v60M165 100h70M325 70v60M290 100h70" stroke="#111" stroke-width="1.5"/>
<rect x="40" y="150" width="320" height="34" fill="#111"/><text x="200" y="174" text-anchor="middle" font-family="Old Standard TT,Georgia,serif" font-size="20" font-weight="700" letter-spacing="10" fill="#f4f1ea">BAR · CAFFÈ</text>
<path d="M30 190h340l-20 34H50z" fill="#8b1e1e" stroke="#111" stroke-width="2.5"/><path d="${Array.from({length: 10}, (_, i) => `M${62 + i * 32} 190l-6 34`).join('')}" stroke="#f4f1ea" stroke-width="5"/>
<rect x="56" y="230" width="170" height="104" fill="#f4f1ea" stroke="#111" stroke-width="2.5"/><path d="${hatch(60, 234, 162, 96, 8)}" stroke="#111" stroke-width=".8" opacity=".35"/>
<circle cx="140" cy="300" r="14" fill="none" stroke="#111" stroke-width="2"/><path d="M126 300h28" stroke="#111" stroke-width="2"/>
<rect x="250" y="230" width="90" height="110" fill="#111"/><rect x="262" y="242" width="66" height="54" fill="#f4f1ea"/><circle cx="318" cy="290" r="4" fill="#f4f1ea"/>
<text x="295" y="226" text-anchor="middle" font-family="Old Standard TT,Georgia,serif" font-size="13" fill="#111">N. 13</text></svg>`;

export default {
  icon: ['V', '#f4f1ea', '#111111', 0],
  render(b, base) {
    const c = contactBits(b);
    const body = `<div class="dateline"><span>Milano · Via Pietro Crespi 13</span><span>Edizione dimostrativa · copia unica</span><a href="${safeUrl(telHref(b.phone))}">Tel. ${E(b.phone)}</a></div>
${header(b, {cls: 'masthead', brand: '<span class="gothic">Varisco</span><span class="motto">Gazzetta di un bar di quartiere · proposta indipendente</span>', links: [['#prima', 'Prima pagina'], ['#storia', 'La storia da scrivere'], ['#rubriche', 'Rubriche'], ['#richiesta', 'Lettere al locale']]})}
<main id="main">
<section class="front" id="prima" aria-labelledby="v-title">
 <article class="lead-article"><p class="section-label">Cronaca di quartiere</p><h1 id="v-title">Le abitudini hanno un luogo.</h1><p class="standfirst">${E(b.intro)}</p><div class="cols"><p class="dropcap">Un bar di quartiere vive di ritorni: il saluto al banco, il giornale, la pausa sempre alla stessa ora. Il sito proposto vuole raccogliere in un unico posto le informazioni che servono prima di passare, accanto ai canali social già esistenti.</p><p>${E(b.story)}</p></div></article>
 <figure class="engraving">${art}<figcaption>Illustrazione originale. Non è una fotografia del locale.</figcaption></figure>
 <aside class="info-box" aria-labelledby="ib-title"><h2 id="ib-title">Informazioni utili</h2><dl><dt>Indirizzo</dt><dd>${c.address}</dd><dt>Telefono</dt><dd>${c.phone}</dd><dt>Orari</dt><dd>${E(c.hours)}</dd></dl>${c.map}</aside>
</section>
<section class="to-write" id="storia" aria-labelledby="w-title"><h2 id="w-title">La storia da scrivere</h2><p class="standfirst">Le fonti confermano il locale e i suoi canali social; la sua storia va raccolta con chi lo gestisce. Nessuna data o nome è dato per certo.</p>
 <ol><li><span>I.</span>Da quanto tempo il bar è in Via Pietro Crespi?</li><li><span>II.</span>Chi lo gestisce oggi, e chi c’era prima?</li><li><span>III.</span>Quali ricordi ha il quartiere di questo bancone?</li></ol></section>
<section class="rubrics" id="rubriche" aria-labelledby="ru-title"><h2 id="ru-title" class="section-label">Rubriche</h2><div>${b.services.map(s => `<article><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Scrivi al locale<span class="sr-only">: ${E(s.title)}</span></button></article>`).join('')}</div></section>
<aside class="notice" aria-labelledby="no-title"><h2 id="no-title">Avviso ai lettori</h2><p>Questa pagina non promuove né vende tabacco, alcolici o giochi e non elenca servizi non confermati dal locale. Domande su prodotti riservati ai maggiorenni richiedono la conferma di avere almeno 18 anni.</p></aside>
${requestForm(b, base, {cls: 'letters', age: true, kicker: 'Lettere al locale', title: 'Due righe<br>per il locale.', intro: 'Una domanda sulla visita o sul locale. La lettera resta nel tuo browser: puoi copiarla o scaricarla, poi usarla al telefono o al banco.', occasion: 'Argomento della lettera', details: ['Informazioni sulla visita', 'Un ricordo da condividere', 'Una domanda ai gestori']})}
</main>`;
    return page(b, base, {themeColor: '#f4f1ea', body});
  },
  poster: () => `<span class="p-rule">Milano · Via Pietro Crespi 13</span><strong>Varisco</strong><span class="p-rule">Le abitudini hanno un luogo.</span>`
};
