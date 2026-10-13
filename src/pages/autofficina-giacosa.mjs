// 03 · Autofficina Giacosa — a technical panel: phone first, warning-light symptom picker, vehicle sheet, visit checklist.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const lights = [
  ['Spia accesa sul cruscotto', 'Annota colore e simbolo della spia, e se è comparsa a motore caldo o freddo.', '<path d="M8 30h6l4-8h12l4 4h6v12H14l-6-4z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M22 18v4m8-4v4" stroke="currentColor" stroke-width="3"/>'],
  ['Rumore insolito', 'Indica quando lo senti: in partenza, in curva, in frenata o a una certa velocità.', '<path d="M8 22v12h8l10 8V14l-10 8z" fill="currentColor"/><path d="M32 20q6 8 0 16M38 14q10 14 0 28" fill="none" stroke="currentColor" stroke-width="3"/>'],
  ['Frenata diversa dal solito', 'Descrivi la sensazione al pedale e se ci sono rumori. In caso di dubbio non metterti in viaggio.', '<circle cx="28" cy="28" r="11" fill="none" stroke="currentColor" stroke-width="3"/><path d="M12 16q-6 12 0 24M44 16q6 12 0 24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M28 21v8m0 4v2" stroke="currentColor" stroke-width="3"/>'],
  ['Vibrazioni', 'Volante, sedile o tutta l’auto? A quale velocità compaiono?', '<path d="M6 28l6-10 6 20 6-20 6 20 6-20 6 20 6-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'],
  ['Scadenza di manutenzione', 'Tieni a portata di mano chilometri e data dell’ultimo intervento, se li conosci.', '<rect x="12" y="14" width="32" height="30" fill="none" stroke="currentColor" stroke-width="3"/><path d="M12 22h32M20 10v8m16-8v8M20 30h6v6h-6z" stroke="currentColor" stroke-width="3" fill="none"/>'],
  ['Altro / non so', 'Va benissimo: descrivi con parole tue cosa noti. Sarà l’officina a capire il prossimo passo.', '<path d="M20 22a8 8 0 1 1 12 7c-3 2-4 3-4 7" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="28" cy="43" r="2.5" fill="currentColor"/>']
];
const gauge = `<svg class="gauge" viewBox="0 0 300 180" role="img" aria-labelledby="g-gauge"><title id="g-gauge">Illustrazione originale: quadrante di un cruscotto con lancetta</title>
<path d="M30 160a120 120 0 0 1 240 0" fill="none" stroke="#2f3a35" stroke-width="22"/><path d="M30 160a120 120 0 0 1 150-116" fill="none" stroke="#c6f432" stroke-width="22"/>
<g stroke="#e8eee9" stroke-width="3">${Array.from({length: 11}, (_, i) => { const a = Math.PI - i * Math.PI / 10, x1 = 150 + Math.cos(a) * 96, y1 = 160 - Math.sin(a) * 96, x2 = 150 + Math.cos(a) * (i % 5 ? 86 : 78), y2 = 160 - Math.sin(a) * (i % 5 ? 86 : 78); return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; }).join('')}</g>
<g class="needle"><path d="M150 160L92 74" stroke="#ffb000" stroke-width="6" stroke-linecap="round"/><circle cx="150" cy="160" r="12" fill="#e8eee9"/></g>
<text x="150" y="132" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="13" fill="#e8eee9" letter-spacing="2">STATO: DA CAPIRE</text></svg>`;

export default {
  icon: ['51', '#111513', '#c6f432', 2],
  render(b, base) {
    const c = contactBits(b);
    const body = `<div class="callbar"><span class="mono">AUTOFFICINA · VIA GIACOSA 51 · MILANO</span><a class="call" href="${safeUrl(telHref(b.phone))}"><span aria-hidden="true">☎</span> Chiama ${E(b.phone)}</a></div>
${header(b, {cls: 'tech', brand: '<span class="tag">51</span><span>Autofficina Giacosa</span>', links: [['#cruscotto', '01 · Cosa succede'], ['#richiesta', '02 · Scheda veicolo'], ['#visita', '03 · Visita'], ['#officina', '04 · Dove siamo']]})}
<main id="main">
<section class="dash" aria-labelledby="g-title">
 <div class="dash-copy">${k('Autofficina di quartiere · Milano')}<h1 id="g-title">Prima il problema.<br><span>Poi il prossimo passo.</span></h1><p class="lead">${E(b.intro)}</p><p class="mono small">Appuntamenti, interventi e costi si confermano solo con l’officina.</p></div>
 <div class="panel" id="cruscotto" aria-labelledby="cr-title">${gauge}<h2 id="cr-title" class="panel-title">Cosa noti sulla tua auto?</h2><p class="mono small">Seleziona una o più voci: le ritrovi nella scheda.</p>
 <div class="lights">${lights.map(([t, note, icon]) => `<button type="button" data-mirror="${E(t)}" data-note="${E(note)}" aria-pressed="false"><svg viewBox="0 0 56 56" aria-hidden="true">${icon}</svg><span>${E(t)}</span></button>`).join('')}</div>
 <p class="part-note mono" id="part-note" role="status" aria-live="polite">Seleziona una voce per leggere cosa annotare.</p></div>
</section>
<section class="routes" aria-labelledby="rt-title"><h2 id="rt-title" class="sr-only">Percorsi</h2>${b.services.map((s, i) => `<article><p class="mono code">P-0${i + 1}</p><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Compila la scheda<span class="sr-only">: ${E(s.title)}</span> <span aria-hidden="true">→</span></button></article>`).join('')}</section>
${requestForm(b, base, {cls: 'sheet', kicker: '02 · Scheda di primo contatto', title: 'Compila la scheda<br><span>del veicolo.</span>', intro: 'Modello, sintomo e quando compare: con questi dati la telefonata è più rapida. La scheda non fissa appuntamenti e non viene inviata.', occasion: 'Modello e anno del veicolo', detailsLabel: 'Sintomi selezionati', details: lights.map(l => l[0])})}
<section class="visit-steps" id="visita" aria-labelledby="vs-title">${k('03 · Prima della visita')}<h2 id="vs-title">Tre passaggi. Nessuna sorpresa.</h2>
<ol><li><span class="mono">01</span><h3>Descrivi</h3><p>Prepara modello e sintomo con la scheda.</p></li><li><span class="mono">02</span><h3>Chiama</h3><p>Parla con l’officina al ${E(b.phone)}: valutazione e intervento spettano al personale.</p></li><li><span class="mono">03</span><h3>Conferma</h3><p>Un appuntamento esiste solo dopo conferma diretta.</p></li></ol></section>
<section class="officina" id="officina" aria-labelledby="of-title"><p class="big51" aria-hidden="true">51</p><div>${k('04 · Dove siamo')}<h2 id="of-title">Via Giuseppe Giacosa 51</h2><p>${c.map}</p><p>${c.phone}</p><p class="mono small">${E(c.hours)}</p><p class="small">${E(b.story)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#111513', body});
  },
  poster: () => `<span class="p-call">☎ 02 2822866</span><strong>PRIMA IL<br>PROBLEMA.</strong><span class="p-lights"><i></i><i></i><i></i></span>`
};
