// 07 · Grissinificio Ambrosiano — a typographic poster where the I's are breadsticks, an honest product sheet, quantity as a question.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const stick = (i) => `<svg class="stick st${i}" viewBox="0 0 40 400" aria-hidden="true" preserveAspectRatio="none"><rect x="6" y="4" width="28" height="392" rx="14" fill="#e3b26a" stroke="#1d1a17" stroke-width="4"/><g fill="#a86b2c">${Array.from({length: 14}, (_, j) => `<ellipse cx="${j % 2 ? 24 : 16}" cy="${30 + j * 26}" rx="3" ry="6"/>`).join('')}</g></svg>`;
const word = 'GRISSINI'.split('').map((ch, i) => ch === 'I' ? stick(i) : `<span>${ch}</span>`).join('');
const qty = [['casa', 'Per casa', 'Per la tavola di tutti i giorni: chiedi cosa trovi oggi in negozio.'], ['tavolata', 'Per una tavolata', 'Una cena o una festa: indica persone e data, il negozio ti dirà cosa è possibile.'], ['particolare', 'Una quantità particolare', 'Scrivi la quantità indicativa: non implica una fornitura disponibile né un ordine.']];

export default {
  icon: ['GA', '#c0392b', '#f1e2c4', 0],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'kraft', brand: '<span class="stamp">GA</span><span>Grissinificio<br>Ambrosiano</span>', links: [['#scheda', 'Scheda prodotto'], ['#quantita', 'Quante?'], ['#richiesta', 'Domanda'], ['#negozio', 'Negozio']]})}
<main id="main">
<section class="manifesto" aria-labelledby="ga-title">
 <p class="word" aria-hidden="true">${word}</p>
 <div class="mani-row"><h1 id="ga-title">Grissinificio<br>Ambrosiano</h1><p class="motto">Piccoli gesti.<br>Grandi momenti a tavola.</p><div class="mani-contact"><p>${c.address}</p><a class="phone" href="${safeUrl(telHref(b.phone))}">${E(b.phone)}</a></div></div>
 <p class="fine">Illustrazioni originali: i grissini disegnati non rappresentano l’assortimento reale.</p>
</section>
<section class="sheet-product" id="scheda" aria-labelledby="sp-title"><div>${k('Scheda prodotto · versione dimostrativa')}<h2 id="sp-title">Essenziale,<br>come una buona domanda.</h2><p>${E(b.intro)}</p></div>
 <dl><div><dt>Prodotto</dt><dd>Grissini e prodotti da forno del grissinificio</dd></div><div><dt>Ingredienti</dt><dd class="tbc">Da confermare con il negozio</dd></div><div><dt>Formati</dt><dd class="tbc">Da confermare con il negozio</dd></div><div><dt>Disponibilità</dt><dd class="tbc">Da chiedere prima di passare</dd></div><div><dt>Foto</dt><dd class="tbc">Da fornire dall’attività</dd></div><div><dt>Note</dt><dd>${E(b.story)}</dd></div></dl></section>
<section class="qty" id="quantita" aria-labelledby="q-title"><h2 id="q-title">Quanti<br>ne servono?</h2>
 <div class="qty-pick" data-choice-group="qty" role="group" aria-label="Scegli l’occasione">${qty.map(([id, label, note]) => `<button type="button" data-choice="${id}" data-note="${E(note)}" data-occasion="${E(label)}" aria-pressed="false"><span class="bundle b-${id}" aria-hidden="true"></span>${E(label)}</button>`).join('')}</div>
 <p class="qty-note" id="qty-note" role="status" aria-live="polite">Scegli un’opzione: la quantità resta una domanda, non un ordine.</p></section>
${requestForm(b, base, {cls: 'order-slip', kicker: 'Foglio di domanda', title: 'Cosa vorresti<br>chiedere?', intro: 'Prodotto, occasione e quantità indicativa. Il negozio confermerà se e come può gestire la richiesta.', occasion: 'Occasione e quantità indicativa', details: ['Per casa', 'Per una tavolata', 'Una quantità particolare']})}
<section class="shop" id="negozio" aria-labelledby="n-title"><h2 id="n-title">Via Natale<br>Battaglia 2</h2><div><p>${c.map}</p><p>${c.phone}</p><p>${E(c.hours)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#e9d3a7', body});
  },
  poster: () => `<strong>GR<i></i>SS<i></i>N<i></i></strong><span class="p-line">Ambrosiano · Via N. Battaglia 2</span>`
};
