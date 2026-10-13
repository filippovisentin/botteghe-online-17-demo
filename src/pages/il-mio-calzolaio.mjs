// 04 · Il Mio Calzolaio — the object is the hero: a large shoe with tappable parts, stitched FAQ, repair-tag form, shoebox address.
import {E, k, ask, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const parts = [
  ['Tacco', 16, 74, 'Tacco: consumato, instabile o rumoroso? Racconta da quando e come cammini.'],
  ['Suola', 56, 90, 'Suola: si è staccata, è liscia o bucata? Una foto aiuta, ma la valutazione si fa dal vivo.'],
  ['Tomaia', 66, 52, 'Tomaia: graffi, pieghe, colore? Descrivi il materiale se lo conosci.'],
  ['Cuciture', 40, 58, 'Cuciture: un punto aperto o una scucitura lunga? Indica dove si trova.'],
  ['Interno', 27, 30, 'Interno: fodera consumata o soletta da rivedere? Descrivi cosa senti indossandola.']
];
const art = `<svg viewBox="0 0 800 420" role="img" aria-labelledby="c-art"><title id="c-art">Illustrazione originale: una scarpa vista di lato, con tacco, suola, tomaia e cuciture</title>
<ellipse cx="410" cy="392" rx="360" ry="18" fill="#34211a" opacity=".12"/>
<path d="M72 300h126v62H72z" fill="#34211a"/>
<path d="M58 344h670c32 0 46 14 46 26v12H58z" fill="#4a2e22"/>
<path d="M82 304C68 206 108 112 190 100l112-6c30 66 80 108 172 126 128 24 246 28 268 80 10 26-6 42-34 44H82z" fill="#c98b52" stroke="#34211a" stroke-width="5" stroke-linejoin="round"/>
<path d="M190 102c34 34 82 34 110-6" fill="#5b3a2b" stroke="#34211a" stroke-width="5"/>
<path d="M100 300C92 214 124 136 196 124M118 318h610M304 112c34 66 86 108 176 124 116 22 226 26 250 72" fill="none" stroke="#f3e9dc" stroke-width="3" stroke-dasharray="9 8" opacity=".9"/>
<g stroke="#34211a" stroke-width="6" stroke-linecap="round"><path d="M318 140l46 -18M338 164l48 -18M360 188l48 -18M384 206l46 -16"/></g>
<path d="M600 250c40 2 80 14 100 34" fill="none" stroke="#a8481f" stroke-width="4" stroke-linecap="round"/>
</svg>`;

export default {
  icon: ['C', '#34211a', '#e7b47c', 20],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'cobbler', brand: '<span class="seal" aria-hidden="true">14</span><span>Il Mio Calzolaio<small>Via delle Leghe 14 · Milano</small></span>', links: [['#oggetto', 'L’oggetto'], ['#domande', 'Prima di sostituire'], ['#richiesta', 'Cartellino di valutazione'], ['#laboratorio', 'Il laboratorio']]})}
<main id="main">
<section class="object" id="oggetto" aria-labelledby="c-title">
 <div class="object-head">${k('Calzolaio · Milano')}<h1 id="c-title">C’è ancora<br><em>strada da fare.</em></h1><p class="lead">${E(b.intro)}</p></div>
 <div class="shoe-stage"><figure class="shoe">${art}<figcaption>Illustrazione originale, non un lavoro del laboratorio</figcaption></figure>
 ${parts.map(([p, x, y, note], i) => `<button type="button" class="hotspot hs-${i}" data-mirror="${E(p)}" data-note="${E(note)}" aria-pressed="false" tabindex="-1" aria-hidden="true" title="${E(p)}">${i + 1}</button>`).join('')}</div>
 <div class="part-box"><p class="kicker">Tocca la parte da far vedere</p><ul class="part-list">${parts.map(([p], i) => `<li><button type="button" data-mirror="${E(p)}" data-note="${E(parts[i][3])}" aria-pressed="false"><span aria-hidden="true">${i + 1}</span> ${E(p)}</button></li>`).join('')}</ul><p class="part-note" id="part-note" role="status" aria-live="polite">Le parti scelte compaiono nel cartellino di valutazione.</p><a class="submit" href="#richiesta">Compila il cartellino <span aria-hidden="true">→</span></a></div>
</section>
<section class="faq" id="domande" aria-labelledby="f-title"><h2 id="f-title">Prima di sostituire,<br><em>chiedi.</em></h2>
 <div class="faq-list">${b.services.map((s, i) => `<details${i === 0 ? ' open' : ''}><summary>${E(s.title)}</summary><div><p>${E(s.body)}</p>${ask(s.title, 'Prepara la domanda')}</div></details>`).join('')}<details><summary>Posso sapere il prezzo da qui?</summary><div><p>No. Costi e tempi dipendono dall’oggetto e dal materiale: li indica il calzolaio dopo averlo visto. La pagina non calcola preventivi.</p></div></details></div></section>
${requestForm(b, base, {cls: 'tag', kicker: 'Cartellino di valutazione', title: 'Da cosa<br><em>ripartiamo?</em>', intro: 'Descrivi l’oggetto e il problema. Il cartellino ti aiuta a preparare la telefonata o la visita: la valutazione si fa dal vivo, in laboratorio.', occasion: 'Tipo di scarpa o oggetto', detailsLabel: 'Parti da far vedere', details: parts.map(p => p[0])})}
<section class="box" id="laboratorio" aria-labelledby="l-title"><div class="lid"><p class="kicker">Il laboratorio</p><h2 id="l-title">Una valutazione<br>si fa da vicino.</h2></div><div class="label"><p class="addr">${c.address}</p>${c.map}<p>${c.phone}</p><p class="small">${E(c.hours)}</p></div><p class="story">${E(b.story)}</p></section>
</main>`;
    return page(b, base, {themeColor: '#f3e9dc', body});
  },
  poster: () => `<span class="p-shoe"></span><strong>C’è ancora<br><em>strada da fare.</em></strong>`
};
