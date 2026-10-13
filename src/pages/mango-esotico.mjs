// 02 · Mango Esotico — a tropical poster: sun, rotating badge, moment switch, unknown-flavour scoops, cake planner ticket.
import {E, k, ask, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const art = `<svg viewBox="0 0 520 500" role="img" aria-labelledby="m-art"><title id="m-art">Illustrazione originale: un mango con foglie tropicali e un cono gelato</title>
<g fill="#1d5e3b"><path d="M262 150C200 58 92 62 52 120c74 26 150 46 210 30z"/><path d="M270 146c26-92 120-128 186-98-30 64-104 104-186 98z"/><path d="M258 160c-70-20-150 20-170 90 70 6 136-30 170-90z"/></g>
<g fill="none" stroke="#9fd17b" stroke-width="3" stroke-linecap="round"><path d="M250 146C190 110 120 104 70 120"/><path d="M276 140c50-40 110-70 166-86"/><path d="M250 166c-50 10-104 40-148 78"/></g>
<path d="M124 318c-6-110 112-176 212-140 104 38 118 176 30 236-96 66-236 26-242-96z" fill="#ff6f91" stroke="#2b1608" stroke-width="5"/>
<path d="M150 312c4-80 88-130 160-108" fill="none" stroke="#ffd23f" stroke-width="18" stroke-linecap="round" opacity=".9"/>
<ellipse cx="300" cy="230" rx="22" ry="12" fill="#fff6e5" opacity=".8" transform="rotate(-30 300 230)"/>
<path d="M262 170c4-22 14-36 30-46" fill="none" stroke="#2b1608" stroke-width="7" stroke-linecap="round"/>
<g transform="rotate(16 420 360)"><path d="M380 330l40 140 40-140z" fill="#ffd23f" stroke="#2b1608" stroke-width="5" stroke-linejoin="round"/><path d="M392 360l50 50M386 340l70 66M440 336l-38 108" stroke="#2b1608" stroke-width="3" opacity=".5"/><circle cx="420" cy="312" r="40" fill="#fff6e5" stroke="#2b1608" stroke-width="5"/><path d="M386 300c16 10 50 12 70-4" fill="none" stroke="#ff6f91" stroke-width="7" stroke-linecap="round"/></g>
<g fill="#2b1608"><path d="M70 380l8-20 8 20 20 8-20 8-8 20-8-20-20-8z"/><path d="M460 120l6-14 6 14 14 6-14 6-6 14-6-14-14-6z"/></g>
</svg>`;
const badge = `<svg class="badge" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="m-ring" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0"/></defs><circle cx="100" cy="100" r="96" fill="#2b1608"/><text font-family="Nunito,sans-serif" font-weight="800" font-size="17" letter-spacing="3.3" fill="#ffd23f"><textPath href="#m-ring">GELATERIA DI FAMIGLIA · VIALE MONZA 68 ·</textPath></text><text x="100" y="116" text-anchor="middle" font-family="Shrikhand,serif" font-size="46" fill="#ff8a3d">68</text></svg>`;
const scoop = (c, i) => `<li><svg viewBox="0 0 120 150" aria-hidden="true"><path d="M30 70l30 76 30-76z" fill="#ffd23f" stroke="#2b1608" stroke-width="4"/><path d="M18 74c-8-44 20-66 42-66s50 22 42 66z" fill="${c}" stroke="#2b1608" stroke-width="4"/><text x="60" y="62" text-anchor="middle" font-family="Shrikhand,serif" font-size="34" fill="#2b1608">?</text></svg><span>Gusto ${i + 1}<br><small>da scoprire al banco</small></span></li>`;

export default {
  icon: ['M', '#ff8a3d', '#2b1608', 20],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'pills', brand: '<span class="logo-dot" aria-hidden="true">M</span><span>Mango Esotico</span>', links: [['#momento', 'Che momento è?'], ['#richiesta', 'Pensa a una torta'], ['#famiglia', 'La famiglia'], ['#visita', 'Vieni al 68']]})}
<main id="main">
<section class="poster" aria-labelledby="m-title">
 <div class="sun" aria-hidden="true"></div>${badge}
 <div class="poster-copy">${k('Gelateria · Milano, Viale Monza')}<h1 id="m-title">Mango<br>Esotico</h1><p class="slogan">Una pausa. Un viaggio. <strong>Un altro gusto.</strong></p><p class="lead">${E(b.intro)}</p>
 <div class="poster-actions"><a class="submit" href="#momento">Scegli il tuo momento <span aria-hidden="true">→</span></a><a class="phone-pill" href="${safeUrl(telHref(b.phone))}">Chiama ${E(b.phone)}</a></div></div>
 <figure class="poster-art">${art}<figcaption>Illustrazione originale, non una foto dei prodotti</figcaption></figure>
</section>
<section class="momento" id="momento" aria-labelledby="mom-title">
 <h2 id="mom-title">Oggi, che momento è?</h2>
 <div class="switch" data-choice-group="moment" role="group" aria-label="Scegli il momento"><button type="button" data-choice="pausa" aria-pressed="true">Una pausa gelato</button><button type="button" data-choice="festa" aria-pressed="false" data-set-service="Torte semifredde" data-occasion="Una festa">Un’occasione da festeggiare</button></div>
 <div class="mom-panel" data-panel-of="moment" data-panel="pausa"><p class="giant" aria-hidden="true">Pausa!</p><div><h3>Il banco cambia: chiedi cosa c’è oggi.</h3><p>${E(b.services[0].body)} Questa pagina non è il banco del giorno: nessun gusto viene dato per disponibile.</p><ol class="scoops" aria-label="Gusti da scoprire in gelateria">${['#ff6f91', '#9fd17b', '#fff6e5'].map(scoop).join('')}</ol>${ask(b.services[0].title, 'Chiedi i gusti di oggi')}</div></div>
 <div class="mom-panel" data-panel-of="moment" data-panel="festa" hidden><p class="giant" aria-hidden="true">Festa!</p><div><h3>Torte semifredde per la tua occasione.</h3><p>${E(b.services[2].body)}</p><a class="submit" href="#richiesta">Prepara la richiesta della torta <span aria-hidden="true">→</span></a></div></div>
</section>
${requestForm(b, base, {cls: 'ticket', kicker: 'Planner della torta', title: 'La festa comincia<br>da una domanda.', intro: 'Racconta occasione, persone e preferenze. La bozza non è un ordine: composizione, allergeni, prezzo e ritiro si confermano al telefono o in gelateria.', occasion: 'Data indicativa e occasione', detailsLabel: 'Per quante persone? E cosa segnalare?', details: ['Fino a 6 persone', 'Da 6 a 12 persone', 'Più di 12 persone', 'Allergie o intolleranze da segnalare']})}
<section class="famiglia" id="famiglia" aria-labelledby="fam-title"><div>${k('La famiglia')}<h2 id="fam-title">Un’anima tropicale.<br>Una storia di famiglia.</h2></div><p>${E(b.story)}</p><p class="small">Foto dei prodotti, gusti e ingredienti saranno inseriti solo se forniti e confermati dalla gelateria.</p></section>
<section class="visita" id="visita" aria-labelledby="vis-title"><p class="num" aria-hidden="true">68</p><div>${k('Vieni a trovarci')}<h2 id="vis-title">Ci vediamo al 68.</h2><p class="addr">${c.address}</p>${c.map}<p>${c.phone}</p><p class="small">${E(c.hours)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#ff8a3d', body});
  },
  poster: () => `<span class="p-sun"></span><strong>Mango<br>Esotico</strong><span class="p-line">Una pausa. Un viaggio.</span>`
};
