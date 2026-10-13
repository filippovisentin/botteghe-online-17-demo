// 16 · Calzoleria Taormina — an itinerary: civic 120 as a milestone, a footprint route, immediate contact, an object sheet.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const foot = (x, y, r, flip) => `<g transform="translate(${x} ${y}) rotate(${r})${flip ? ' scale(-1 1)' : ''}"><path d="M0 -26c10 0 14 10 13 22s-4 22-12 22-12-8-12-20 2-24 11-24z" fill="#1b2a4a"/><ellipse cx="1" cy="30" rx="8" ry="9" fill="#1b2a4a"/></g>`;
const art = `<svg viewBox="0 0 520 440" role="img" aria-labelledby="t-art"><title id="t-art">Illustrazione originale: impronte di scarpe lungo un percorso fino a un cippo con il numero 120</title>
<path d="M30 400C120 380 120 300 210 290s140 40 200-40" fill="none" stroke="#1b2a4a" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round"/>
${foot(60, 380, 70)}${foot(110, 360, 60, true)}${foot(150, 320, 50)}${foot(200, 300, 80, true)}${foot(255, 290, 95)}${foot(310, 300, 80, true)}${foot(360, 280, 40)}
<path d="M380 250V110a60 60 0 0 1 120 0v140z" fill="#f2b705" stroke="#1b2a4a" stroke-width="5"/><path d="M372 250h136v24H372z" fill="#1b2a4a"/>
<text x="440" y="150" text-anchor="middle" font-family="Big Shoulders Display,Impact,sans-serif" font-weight="800" font-size="62" fill="#1b2a4a">120</text>
<text x="440" y="190" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="13" letter-spacing="2" fill="#1b2a4a">V.LE MONZA</text></svg>`;
const steps = [['Chiama', 'Racconta il problema al telefono e chiedi come portare l’oggetto.'], ['Porta l’oggetto', 'La valutazione si fa guardandolo da vicino, in negozio.'], ['Ascolta la valutazione', 'Lavorazioni possibili, tempi e costi dipendono dal caso concreto.'], ['Decidi', 'Solo dopo il confronto scegli se e come procedere.']];

export default {
  icon: ['120', '#1b2a4a', '#f2b705', 4],
  render(b, base) {
    const c = contactBits(b);
    const body = `<p class="cond"><strong>Proposta condizionata.</strong> ${E(b.verify)}</p>
${header(b, {cls: 'route-head', brand: '<span class="km">KM 120</span><span>Calzoleria Taormina</span>', links: [['#itinerario', 'L’itinerario'], ['#tappe', 'Le tappe'], ['#richiesta', 'Scheda oggetto'], ['#sede', 'La sede']]})}
<main id="main">
<section class="trip" aria-labelledby="t-title">
 <div class="trip-copy">${k('Calzoleria · Viale Monza 120 · Milano')}<h1 id="t-title">Il prossimo<br><span>passo.</span></h1><p class="lead">${E(b.intro)}</p><div class="trip-actions"><a class="submit" href="${safeUrl(telHref(b.phone))}">Chiama ${E(b.phone)}</a><a class="go" href="#itinerario">Guarda l’itinerario <span aria-hidden="true">↓</span></a></div></div>
 <figure class="trip-art">${art}<figcaption>Illustrazione originale</figcaption></figure>
</section>
<section class="itinerary" id="itinerario" aria-labelledby="i-title"><h2 id="i-title">L’itinerario di una valutazione</h2><ol>${steps.map(([t, d], i) => `<li><span class="km-mark">km ${i * 40}</span><h3>${E(t)}</h3><p>${E(d)}</p></li>`).join('')}</ol></section>
<section class="stages" id="tappe" aria-labelledby="ta-title"><div>${k('Le tappe')}<h2 id="ta-title">Prima una domanda.<br>Poi una valutazione.</h2></div><ul>${b.services.map((s, i) => `<li><span class="n">${'ABC'[i]}</span><div><h3>${E(s.title)}</h3><p>${E(s.body)}</p></div><button type="button" class="ask" data-service="${E(s.title)}">Prepara<span class="sr-only">: ${E(s.title)}</span> <span aria-hidden="true">→</span></button></li>`).join('')}</ul></section>
${requestForm(b, base, {cls: 'object-sheet', kicker: 'Scheda oggetto', title: 'Un promemoria<br>per il laboratorio.', intro: 'Che oggetto è, cosa è successo, da quando. La scheda prepara la telefonata o la visita; nessun preventivo viene calcolato.', occasion: 'Tipo di oggetto', details: ['Scarpe', 'Stivali', 'Un altro oggetto']})}
<section class="sede" id="sede" aria-labelledby="s-title"><p class="milestone" aria-hidden="true">120</p><div><h2 id="s-title">La tappa:<br>Viale Monza 120.</h2><p>${c.map}</p><p>${c.phone}</p><p class="small">${E(c.hours)}</p><p class="small">${E(b.story)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#fdf6e3', body});
  },
  poster: () => `<span class="p-cippo">120</span><strong>Il prossimo<br>passo.</strong>`
};
