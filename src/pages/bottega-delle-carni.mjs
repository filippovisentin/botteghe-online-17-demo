// 10 · La Bottega delle Carni — a kitchen notebook: the need before the shop window, notes first, recipe index cards, address last.
import {E, header, requestForm, contactBits, page} from '../lib.mjs';

const sketch = `<svg viewBox="0 0 420 320" role="img" aria-labelledby="b-art"><title id="b-art">Illustrazione originale a penna: una pentola sul fuoco con un mestolo e un tagliere</title>
<g fill="none" stroke="#23324a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
<path d="M90 150h200v90c0 28-22 40-50 40H140c-28 0-50-12-50-40z"/><path d="M80 150h220"/><path d="M90 170c-22 0-30 18-14 28M290 170c22 0 30 18 14 28"/>
<path d="M150 150c4-30 76-30 80 0"/><circle cx="190" cy="118" r="6"/>
<path d="M140 110c-12-18 12-26 0-44M190 96c-12-18 12-26 0-44M240 110c-12-18 12-26 0-44" stroke-dasharray="2 9"/>
<path d="M120 296h140M140 296l-10 12M240 296l10 12"/>
<path d="M300 120l70-70M352 60c10-10 26 4 14 16"/>
<path d="M310 220h90v54h-90z"/><path d="M322 236c20 6 46 6 66 0" stroke-dasharray="4 6"/>
</g><path d="M96 200h188" stroke="#9e1b24" stroke-width="10" opacity=".25"/></svg>`;

export default {
  icon: ['BC', '#fdfcf8', '#9e1b24', 6],
  render(b, base) {
    const c = contactBits(b);
    const body = `<div class="spiral" aria-hidden="true"></div>
${header(b, {cls: 'note-head', brand: '<span class="hand">La Bottega delle Carni</span><span class="where">Via Venini 61 · Milano</span>', links: [['#appunti', 'Gli appunti'], ['#richiesta', 'La tua domanda'], ['#schede', 'Le schede'], ['#bottega', 'La bottega']]})}
<main id="main">
<section class="page-one" id="appunti" aria-labelledby="b-title">
 <div class="margin" aria-hidden="true"><span>lun</span><span>mar</span><span>mer</span><span>gio</span><span>ven</span><span>sab</span></div>
 <div class="notes"><p class="date">Appunti per la settimana</p><h1 id="b-title">Cosa cucini<br><span class="scribble">questa settimana?</span></h1><p class="lead">${E(b.intro)} Prima l’esigenza, poi la vetrina: scrivi cosa hai in mente e porta la domanda in bottega.</p>
 <ul class="todo"><li>Per quante persone?</li><li>Per quale occasione?</li><li>Una ricetta in particolare?</li><li>Cosa chiedere al banco?</li></ul></div>
 <figure class="sketch">${sketch}<figcaption>Schizzo originale, non una foto</figcaption></figure>
 <p class="postit"><strong>Nota:</strong> ${E(b.phoneNote)}</p>
</section>
${requestForm(b, base, {cls: 'notebook', kicker: 'Appunti per la bottega', title: 'L’idea del piatto.<br>Le domande giuste.', intro: 'Persone, occasione e ricetta: la bottega ti dirà cosa è possibile. Nessuna disponibilità o quantità è garantita dalla pagina.', occasion: 'Per quante persone e per quando', detailsLabel: 'Che pasto è?', details: ['Pranzo in famiglia', 'Cena con ospiti', 'Una ricetta da preparare', 'Una quantità particolare']})}
<section class="cards" id="schede" aria-labelledby="sc-title"><h2 id="sc-title">Prima di andare al banco</h2><ul>${b.services.map((s, i) => `<li class="card c${i}"><span class="tape" aria-hidden="true"></span><p class="cat">Scheda ${String.fromCharCode(65 + i)} · ${E(s.category)}</p><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Annota la domanda<span class="sr-only">: ${E(s.title)}</span></button></li>`).join('')}</ul><p class="story">${E(b.story)}</p></section>
<section class="shop" id="bottega" aria-labelledby="sh-title"><h2 id="sh-title">La bottega<br>in Via Venini 61</h2><div><p class="addr">${c.address}</p>${c.map}${c.phone}<p class="small">${E(c.hours)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#fdfcf8', body});
  },
  poster: () => `<strong>Cosa cucini<br>questa settimana?</strong><span class="p-line">La Bottega delle Carni · Via Venini 61</span>`
};
