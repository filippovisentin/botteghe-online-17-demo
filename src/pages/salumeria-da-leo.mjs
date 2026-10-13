// 11 · Salumeria da Leo — a market stall: striped awning, painted sign and chalkboard, how to reach the counter first, a shopping list of questions.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const art = `<svg viewBox="0 0 460 300" role="img" aria-labelledby="l-art"><title id="l-art">Illustrazione originale: un banco con bilancia, tagliere e salumi appesi</title>
<path d="M20 30h420" stroke="#5b3a22" stroke-width="8" stroke-linecap="round"/>
${[[70, 70], [130, 96], [190, 80], [250, 104], [310, 76], [370, 92]].map(([x, h], i) => `<path d="M${x} 30v14" stroke="#5b3a22" stroke-width="3"/><rect x="${x - 15}" y="44" width="30" height="${h}" rx="15" fill="${i % 2 ? '#a3332b' : '#c45a3c'}" stroke="#1f2a24" stroke-width="3"/><path d="M${x - 15} ${54 + h / 3}h30M${x - 15} ${54 + 2 * h / 3}h30" stroke="#f2efe6" stroke-width="2" opacity=".7"/>`).join('')}
<rect x="20" y="200" width="420" height="80" fill="#f2efe6" stroke="#1f2a24" stroke-width="4"/><path d="M20 222h420" stroke="#1f2a24" stroke-width="3"/>
<rect x="60" y="168" width="140" height="32" rx="6" fill="#c9915a" stroke="#1f2a24" stroke-width="3"/><ellipse cx="130" cy="166" rx="34" ry="12" fill="#e7a28c" stroke="#1f2a24" stroke-width="3"/>
<rect x="290" y="150" width="100" height="50" rx="8" fill="#e8b84a" stroke="#1f2a24" stroke-width="3"/><path d="M300 150v-26h80v26" fill="none" stroke="#1f2a24" stroke-width="3"/><circle cx="340" cy="175" r="14" fill="#f2efe6" stroke="#1f2a24" stroke-width="3"/><path d="M340 175l8-8" stroke="#1f2a24" stroke-width="3"/>
</svg>`;

export default {
  icon: ['L', '#c8322b', '#f7f3e8', 6],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'stall-head', brand: '<span class="sign-mini">da Leo</span><span class="stall-sub">Salumeria · Mercato di Viale Monza</span>', links: [['#banco', 'Arrivare al banco'], ['#offerta', 'Il banco'], ['#richiesta', 'La tua lista'], ['#storia', 'Il quartiere']]})}
<div class="awning" aria-hidden="true"></div>
<main id="main">
<section class="stall" aria-labelledby="l-title">
 <div class="board">${k('Mercato di Viale Monza · Milano')}<h1 id="l-title">Salumeria<br><span>da Leo</span></h1><p class="motto">Un mercato. Un incontro. La tua tavola.</p><figure>${art}<figcaption>Illustrazione originale, non una foto del banco</figcaption></figure></div>
 <aside class="chalk" aria-labelledby="ch-title"><h2 id="ch-title">Oggi alla lavagna</h2><ul><li><span>Dove</span>${c.address}</li><li><span>Telefono</span><a href="${safeUrl(telHref(b.phone))}">${E(b.phone)}</a></li><li><span>Orari</span>Da confermare</li><li class="warn"><span>Attenzione</span>${E(b.verify)}</li></ul></aside>
</section>
<section class="route" id="banco" aria-labelledby="r-title"><h2 id="r-title">Arrivare al banco</h2><ol><li><b>1</b><h3>Viale Monza 54</h3><p>L’indirizzo del mercato. ${c.map}</p></li><li><b>2</b><h3>Entra nel mercato</h3><p>Prima di passare telefona per verificare apertura e operatività.</p></li><li><b>3</b><h3>Chiedi di Leo</h3><p>La posizione del banco all’interno del mercato sarà indicata con il titolare.</p></li></ol></section>
<section class="offer" id="offerta" aria-labelledby="o-title"><div>${k('Il banco')}<h2 id="o-title">Che cosa<br>stai cercando?</h2></div><ul>${b.services.map(s => `<li><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Aggiungi alla lista<span class="sr-only">: ${E(s.title)}</span> <span aria-hidden="true">+</span></button></li>`).join('')}</ul></section>
${requestForm(b, base, {cls: 'shopping', kicker: 'Lista della spesa · versione domande', title: 'La tua lista<br>di domande.', intro: 'Spunta cosa vuoi chiedere e aggiungi le tue parole. Disponibilità e quantità le conferma il banco.', occasion: 'Per quante persone', detailsLabel: 'Spunta le domande', details: ['Cosa c’è oggi al banco', 'Una quantità per più persone', 'Un consiglio per un piatto', 'Prodotti per un’occasione']})}
<section class="neighbourhood" id="storia" aria-labelledby="n-title"><h2 id="n-title">Il banco racconta il quartiere.</h2><p>${E(b.story)}</p></section>
</main>`;
    return page(b, base, {themeColor: '#c8322b', body});
  },
  poster: () => `<span class="p-awning"></span><strong>Salumeria<br>da Leo</strong><span class="p-line">Mercato di Viale Monza</span>`
};
