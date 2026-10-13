// 08 · Bar Rondò — circular composition: a rotating ring around the name, the family story first, a round table of topics, a coaster form.
import {E, k, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const ring = `<svg class="ring" viewBox="0 0 400 400" aria-hidden="true"><defs><path id="r-ring" d="M200 200m-178 0a178 178 0 1 1 356 0a178 178 0 1 1-356 0"/></defs><text font-family="Comfortaa,sans-serif" font-weight="700" font-size="19" letter-spacing="5" fill="#ffc857"><textPath href="#r-ring">BAR DI QUARTIERE · GESTIONE FAMILIARE · VIA MARTIRI OSCURI 15 · MILANO ·</textPath></text></svg>`;
const table = `<svg viewBox="0 0 420 420" role="img" aria-labelledby="r-art"><title id="r-art">Illustrazione originale: un tavolino rotondo visto dall’alto con tre tazzine</title>
<circle cx="210" cy="210" r="190" fill="#0b3a46"/><circle cx="210" cy="210" r="150" fill="#ff7a59"/><circle cx="210" cy="210" r="150" fill="none" stroke="#fdf3e7" stroke-width="4" stroke-dasharray="2 12"/>
${[[210, 120], [130, 260], [290, 260]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="44" fill="#fdf3e7"/><circle cx="${x}" cy="${y}" r="28" fill="#fdf3e7" stroke="#0f4c5c" stroke-width="4"/><circle cx="${x}" cy="${y}" r="18" fill="#6b3a24"/><path d="M${x + 28} ${y - 6}h14v12h-14" fill="none" stroke="#0f4c5c" stroke-width="4"/></g>`).join('')}
<circle cx="210" cy="210" r="14" fill="#ffc857"/></svg>`;

export default {
  icon: ['R', '#0f4c5c', '#ffc857', 20],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'round-head', brand: '<span class="dot" aria-hidden="true"></span><span>Bar Rondò</span>', links: [['#famiglia', 'La famiglia'], ['#tavolo', 'Intorno al tavolo'], ['#visita', 'Passa a trovarci'], ['#richiesta', 'Chiedi al bar']]})}
<main id="main">
<section class="orbit" aria-labelledby="r-title">
 <div class="circle">${ring}<div class="circle-in">${k('Bar · Milano')}<h1 id="r-title">Rondò.</h1><p>Il bello di fermarsi.</p></div></div>
 <a class="moon m1" href="${safeUrl(telHref(b.phone))}"><span>Chiama</span>${E(b.phone)}</a>
 <a class="moon m2" href="#visita"><span>Dove</span>Via Martiri Oscuri 15</a>
 <a class="moon m3" href="#famiglia"><span>Chi</span>Una famiglia</a>
</section>
<section class="famiglia" id="famiglia" aria-labelledby="f-title"><figure class="table-art">${table}<figcaption>Illustrazione originale</figcaption></figure><div>${k('Prima del caffè, le persone')}<h2 id="f-title">Un bar.<br>Le persone.<br>Il quartiere.</h2><p class="lead">${E(b.intro)}</p><p>${E(b.story)}</p></div></section>
<section class="tavolo" id="tavolo" aria-labelledby="t-title"><h2 id="t-title">Intorno a un incontro.</h2><ul>${b.services.map((s, i) => `<li><span class="seat" aria-hidden="true">${i + 1}</span><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Chiedi al bar<span class="sr-only">: ${E(s.title)}</span> <span aria-hidden="true">↻</span></button></li>`).join('')}</ul></section>
<section class="visita" id="visita" aria-labelledby="v-title"><div class="pin" aria-hidden="true">15</div><div>${k('Passa a trovarci')}<h2 id="v-title">Via Martiri Oscuri 15</h2><p>${c.map}</p><p>${c.phone}</p><p class="small">${E(c.hours)}</p></div></section>
${requestForm(b, base, {cls: 'coaster', age: true, kicker: 'Una domanda prima di passare', title: 'Chiedi al bar,<br>con calma.', intro: 'Una domanda sulla visita o sul locale. Nessuna prenotazione automatica: la bozza serve per telefonare o passare.', occasion: 'Quando vorresti passare', details: ['Per una pausa', 'Con amici', 'Una domanda sul locale']})}
</main>`;
    return page(b, base, {themeColor: '#0f4c5c', body});
  },
  poster: () => `<span class="p-ring"></span><strong>Rondò.</strong><span class="p-line">Il bello di fermarsi</span>`
};
