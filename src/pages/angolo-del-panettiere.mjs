// 17 · L’Angolo del Panettiere — the geometry of a corner: diagonal split, a tilted sign, the square as protagonist, a visit reminder.
import {E, k, header, requestForm, contactBits, page} from '../lib.mjs';

const art = `<svg viewBox="0 0 520 460" role="img" aria-labelledby="p-art"><title id="p-art">Illustrazione originale: un edificio d’angolo su una piazza, con vetrina e pane in esposizione</title>
<path d="M40 380L260 440 480 380 480 360 260 420 40 360z" fill="#e2572b" opacity=".25"/>
<path d="M60 130L260 70v330L60 340z" fill="#fff7e6" stroke="#2d1b10" stroke-width="4" stroke-linejoin="round"/>
<path d="M260 70l200 60v210l-200 60z" fill="#f3d27a" stroke="#2d1b10" stroke-width="4" stroke-linejoin="round"/>
<path d="M60 130L260 70l200 60-200-40z" fill="#2d1b10"/>
<path d="M90 220l140-36v120l-140 30z" fill="#2d1b10"/><path d="M100 230l120-30v96l-120 26z" fill="#ffd977"/>
<g fill="#c47a2c" stroke="#2d1b10" stroke-width="2.5"><ellipse cx="130" cy="290" rx="22" ry="11"/><ellipse cx="180" cy="278" rx="22" ry="11"/><path d="M118 262c10-16 34-20 46-6"/></g>
<path d="M290 190l140 40v130l-140-40z" fill="#fff7e6" stroke="#2d1b10" stroke-width="3"/><path d="M360 210v130" stroke="#2d1b10" stroke-width="3"/>
<g transform="rotate(-12 260 150)"><rect x="170" y="128" width="180" height="44" rx="8" fill="#e2572b" stroke="#2d1b10" stroke-width="3"/><text x="260" y="158" text-anchor="middle" font-family="Bagel Fat One,Impact,sans-serif" font-size="20" fill="#fff7e6">PANETTIERE</text></g>
<g fill="#2d1b10"><circle cx="440" cy="420" r="6"/><circle cx="80" cy="420" r="6"/></g>
<text x="260" y="455" text-anchor="middle" font-family="Figtree,sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#2d1b10">PIAZZA MORBEGNO · 2</text></svg>`;

export default {
  icon: ['2', '#e2572b', '#fff7e6', 0],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'corner-head', brand: '<span class="tilt">L’Angolo</span><span>del Panettiere</span>', links: [['#piazza', 'La piazza'], ['#domande', 'Le domande'], ['#richiesta', 'Promemoria']]})}
<main id="main">
<section class="corner" aria-labelledby="p-title">
 <div class="sign-wrap">${k('Panificio · Milano')}<h1 id="p-title" class="sign">L’Angolo<br>del<br>Panettiere</h1><p class="lead">${E(b.intro)}</p></div>
 <figure class="corner-art">${art}<figcaption>Illustrazione originale, non la vetrina reale</figcaption></figure>
 <p class="big2" aria-hidden="true">2</p>
</section>
<section class="piazza" id="piazza" aria-labelledby="pz-title"><div class="tri" aria-hidden="true"></div><div>${k('Il punto d’incontro')}<h2 id="pz-title">Ci si ritrova<br>in Piazza Morbegno.</h2><p class="addr">${c.address}</p>${c.map}</div><div class="board"><p class="board-t">Telefono</p><p>${E(b.phoneNote)}</p><p class="board-t">Orari</p><p>Da confermare in negozio.</p></div></section>
<section class="questions" id="domande" aria-labelledby="q-title"><h2 id="q-title">Cosa vorresti<br>trovare in negozio?</h2><ul>${b.services.map((s, i) => `<li class="q${i}"><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Aggiungi al promemoria<span class="sr-only">: ${E(s.title)}</span></button></li>`).join('')}</ul><p class="story">${E(b.story)}</p></section>
${requestForm(b, base, {cls: 'reminder', kicker: 'Promemoria visita', title: 'Appunti da portare<br>in piazza.', intro: 'Segna cosa chiedere quando passi. Finché il recapito non è confermato, il promemoria serve per la visita in negozio.', occasion: 'Quando pensi di passare', detailsLabel: 'Da chiedere in negozio', details: ['Il pane del giorno', 'Prodotti per un’occasione', 'Allergie da segnalare', 'Il numero di telefono giusto']})}
</main>`;
    return page(b, base, {themeColor: '#f6c945', body});
  },
  poster: () => `<span class="p-tri"></span><strong>L’Angolo del<br>Panettiere</strong><span class="p-line">Piazza Morbegno 2</span>`
};
