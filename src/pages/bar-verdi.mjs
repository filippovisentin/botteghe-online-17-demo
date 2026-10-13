// 13 · Bar Verdi — urban wayfinding: street plate and civic number first, direction signs, a short vertical route, no gaming promotion.
import {E, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

export default {
  icon: ['35', '#0b6e4f', '#ffffff', 4],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'sign-head', brand: '<span class="arrow-sign">Bar Verdi <span aria-hidden="true">→</span></span>', links: [['#info', 'Informazioni'], ['#percorso', 'Percorso'], ['#richiesta', 'Domanda']]})}
<main id="main">
<section class="street" aria-labelledby="vd-title">
 <div class="plates"><p class="plate"><small>Via</small>Giulio e Corrado Venini</p><p class="civic" aria-hidden="true">35</p></div>
 <div class="signpost"><h1 id="vd-title" class="sign main-sign">Bar Verdi <span aria-hidden="true">↗</span></h1>
  <a class="sign s-left" href="${safeUrl(telHref(b.phone))}"><span aria-hidden="true">←</span> Chiama ${E(b.phone)}</a>
  <a class="sign s-right" href="#info">Informazioni per la visita <span aria-hidden="true">→</span></a>
  <a class="sign s-down" href="#percorso"><span aria-hidden="true">↓</span> Prima di passare</a>
  <span class="pole" aria-hidden="true"></span></div>
 <p class="lead">${E(b.intro)}</p>
</section>
<section class="info" id="info" aria-labelledby="in-title"><h2 id="in-title" class="sr-only">Informazioni per la visita</h2>
 <div class="panel"><p class="pl">Indirizzo</p><p class="pv">${c.address}</p>${c.map}</div>
 <div class="panel"><p class="pl">Telefono</p>${c.phone}</div>
 <div class="panel temp"><p class="pl">Orari</p><p class="pv">Da confermare</p><p>Chiedi al bar: nessun orario non verificato è pubblicato.</p></div></section>
<section class="route" id="percorso" aria-labelledby="pe-title"><h2 id="pe-title">Percorso breve.</h2><ol>${b.services.map((s, i) => `<li><span class="stop" aria-hidden="true"></span><p class="km">Fermata ${i + 1}</p><h3>${E(s.title)}</h3><p>${E(s.body)}</p><button type="button" class="ask" data-service="${E(s.title)}">Prepara la domanda<span class="sr-only">: ${E(s.title)}</span> <span aria-hidden="true">→</span></button></li>`).join('')}<li class="end"><span class="stop" aria-hidden="true"></span><p class="km">Arrivo</p><h3>Via Venini 35</h3><p>${E(b.story)}</p></li></ol></section>
${requestForm(b, base, {cls: 'roadsheet', age: true, kicker: 'Una domanda', title: 'Una domanda<br>al Bar Verdi.', intro: 'Orari, visita, informazioni sul locale. La bozza resta qui: usala per telefonare. Nessuna prenotazione e nessun servizio di gioco.', occasion: 'Quando vorresti passare', details: ['Orari', 'Come arrivare', 'Una domanda sul locale']})}
</main>`;
    return page(b, base, {themeColor: '#0b6e4f', body});
  },
  poster: () => `<span class="p-plate">Via Venini</span><strong>35</strong><span class="p-arrow">Bar Verdi →</span>`
};
