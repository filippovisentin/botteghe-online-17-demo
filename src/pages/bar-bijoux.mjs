// 12 · Bar Bijoux — a small jewel sign: dark velvet, gold double frame, a faceted gem, visit and phone at the centre, questions in drawers.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const gem = `<svg viewBox="0 0 300 260" role="img" aria-labelledby="bj-art"><title id="bj-art">Illustrazione originale: una gemma sfaccettata con una tazzina riflessa al centro</title>
<g stroke="#d4af6a" stroke-width="2.5" stroke-linejoin="round" fill="none">
<path d="M70 20h160l60 70-140 160L10 90z" fill="#241b2f"/><path d="M10 90h280M70 20l30 70 50-70 50 70 30-70M100 90l50 160 50-160"/>
</g><path d="M100 90h100l-50 160z" fill="#2e8b74" opacity=".55"/><path d="M70 20l30 70H10z" fill="#d4af6a" opacity=".25"/>
<g transform="translate(118 110)"><path d="M4 8h52v18c0 16-10 24-26 24S4 42 4 26z" fill="#f5e9d7"/><path d="M56 14h8c10 0 10 18 0 18h-8" fill="none" stroke="#f5e9d7" stroke-width="5"/><ellipse cx="30" cy="54" rx="34" ry="5" fill="#d4af6a"/></g>
<g fill="#f5e9d7"><path d="M250 30l4-10 4 10 10 4-10 4-4 10-4-10-10-4z"/><path d="M40 190l3-7 3 7 7 3-7 3-3 7-3-7-7-3z"/></g></svg>`;

export default {
  icon: ['B', '#15111c', '#d4af6a', 20],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'jewel-head', brand: '<span class="bj-mini">Bijoux</span>', links: [['#visita', 'La visita'], ['#cassetti', 'Le domande'], ['#richiesta', 'Un messaggio']]})}
<main id="main">
<section class="frame" aria-labelledby="bj-title"><div class="frame-in">${k('Bar · Viale Monza 78 · Milano')}<figure class="gem">${gem}<figcaption class="sr-only">Illustrazione originale</figcaption></figure><h1 id="bj-title">Bijoux</h1><p class="sub">Una pausa nel posto giusto.</p><p class="lead">${E(b.intro)}</p></div></section>
<section class="visit" id="visita" aria-labelledby="vi-title"><h2 id="vi-title" class="sr-only">La visita</h2>
 <div class="facet"><p class="label">Telefono</p><a class="big" href="${safeUrl(telHref(b.phone))}">${E(b.phone)}</a></div>
 <div class="facet center"><p class="label">Indirizzo</p><p class="big">Viale Monza 78</p>${c.map}</div>
 <div class="facet"><p class="label">Orari</p><p>Da confermare con il bar: la demo non mostra aperture in tempo reale.</p></div></section>
<section class="drawers" id="cassetti" aria-labelledby="dr-title"><h2 id="dr-title">Prima di entrare.</h2><div>${b.services.map((s, i) => `<details${i === 0 ? ' open' : ''}><summary><span class="knob" aria-hidden="true"></span>${E(s.title)}</summary><div><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Scrivi una domanda<span class="sr-only">: ${E(s.title)}</span></button></div></details>`).join('')}<details><summary><span class="knob" aria-hidden="true"></span>C’è un menu online?</summary><div><p>Non ancora. ${E(b.story)}</p></div></details></div></section>
${requestForm(b, base, {cls: 'velvet', age: true, kicker: 'Un messaggio', title: 'In poche parole.', intro: 'Prepara una domanda da fare al telefono o al banco. Nessuna prenotazione, nessun invio automatico.', occasion: 'Quando vorresti passare', details: ['Una pausa veloce', 'Un appuntamento con amici', 'Una domanda sul locale']})}
</main>`;
    return page(b, base, {themeColor: '#15111c', body});
  },
  poster: () => `<span class="p-gem"></span><strong>Bijoux</strong><span class="p-line">Viale Monza 78</span>`
};
