// 01 · Cartoleria Gambardella — a paper magazine: masthead, cover lines, table of contents, family spread, letter, colophon.
import {E, k, ask, header, requestForm, contactBits, page, safeUrl, telHref} from '../lib.mjs';

const lines = (x, y0, y1, w, step = 22) => Array.from({length: Math.floor((y1 - y0) / step) + 1}, (_, i) => `M${x} ${y0 + i * step}h${w}`).join('');
const art = `<svg viewBox="0 0 560 470" role="img" aria-labelledby="g-art"><title id="g-art">Illustrazione originale: quaderno aperto, matita, righello e graffetta su un piano di lavoro</title>
<rect x="34" y="62" width="492" height="330" rx="10" fill="#dce7ef" transform="rotate(-3 280 227)"/>
<g transform="rotate(-6 280 230)">
<path d="M66 104h210v270H66z" fill="#fffdf7" stroke="#13324a" stroke-width="2.5"/><path d="M276 104h210v270H276z" fill="#fffdf7" stroke="#13324a" stroke-width="2.5"/>
<path d="${lines(80, 140, 350, 182)}${lines(290, 140, 350, 182)}" stroke="#13324a" stroke-opacity=".16"/>
<path d="M98 112v254" stroke="#c8442f" stroke-width="1.5"/>
<g fill="#fffdf7" stroke="#13324a" stroke-width="2">${Array.from({length: 11}, (_, i) => `<circle cx="276" cy="${124 + i * 23}" r="5"/>`).join('')}</g>
<text x="110" y="176" font-family="Playfair Display,Georgia,serif" font-style="italic" font-size="34" fill="#13324a">Le idee</text>
<text x="110" y="220" font-family="Playfair Display,Georgia,serif" font-style="italic" font-size="34" fill="#13324a">prendono</text>
<rect x="106" y="236" width="128" height="22" fill="#f4c430" opacity=".85"/><text x="110" y="262" font-family="Playfair Display,Georgia,serif" font-style="italic" font-size="34" fill="#13324a">forma.</text>
<path d="M300 176c18-22 30 8 44-6s28-16 38 2 22 8 40-10M300 220c24-10 40 6 64-4s30 4 58-6" fill="none" stroke="#13324a" stroke-width="2.4" stroke-linecap="round"/>
<g transform="translate(318 254)"><rect width="34" height="34" fill="#c8442f"/><rect x="44" width="34" height="34" fill="#f4c430"/><rect x="88" width="34" height="34" fill="#13324a"/></g>
<text x="300" y="320" font-family="Libre Franklin,Arial,sans-serif" font-size="11" letter-spacing="2" fill="#13324a">SCUOLA · ARTE</text>
</g>
<g transform="rotate(32 440 220)"><rect x="428" y="40" width="24" height="300" fill="#f4c430" stroke="#13324a" stroke-width="2.5"/><path d="M428 40h24v-20h-24z" fill="#c8442f" stroke="#13324a" stroke-width="2.5"/><path d="M428 340l12 40 12-40z" fill="#f1d8b0" stroke="#13324a" stroke-width="2.5"/><path d="M436 366l4 14 4-14z" fill="#13324a"/><path d="M440 50v280" stroke="#13324a" stroke-opacity=".35"/></g>
<g transform="rotate(-14 150 410)"><rect x="40" y="392" width="260" height="38" fill="#fffdf7" stroke="#13324a" stroke-width="2.5"/><path d="${Array.from({length: 26}, (_, i) => `M${50 + i * 10} 392v${i % 5 ? 9 : 17}`).join('')}" stroke="#13324a" stroke-width="1.6"/></g>
<path d="M470 400c0-16 22-16 22 0v40c0 22-32 22-32 0v-34" fill="none" stroke="#13324a" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export default {
  icon: ['G', '#13324a', '#f4c430', 4],
  render(b, base) {
    const c = contactBits(b);
    const body = `<div class="mast-top"><span>N. 61/A</span><span>Milano · Viale Monza</span><span>Una storia di famiglia dal 1952</span></div>
${header(b, {cls: 'mast', brand: '<span class="mast-name">Gambardella</span><span class="mast-sub">Cartoleria · Scuola · Ufficio · Belle arti</span>', links: [['#sommario', 'Sommario'], ['#racconto', 'Il racconto'], ['#richiesta', 'Scrivi alla cartoleria'], ['#colophon', 'Dove siamo']]})}
<main id="main">
<section class="cover" aria-labelledby="cover-title">
 <div class="cover-copy"><p class="issue">In questo numero · <em>scuola, scrittura, creatività</em></p><h1 id="cover-title">Le idee<br>prendono <mark>forma.</mark></h1><p class="lead">${E(b.intro)}</p>
 <div class="cover-actions"><a class="submit" href="#sommario">Sfoglia il sommario <span aria-hidden="true">→</span></a><a class="phone" href="${safeUrl(telHref(b.phone))}">Chiama ${E(b.phone)}</a></div></div>
 <figure class="cover-art">${art}<figcaption>Illustrazione originale · non è una fotografia del negozio</figcaption></figure>
 <ol class="cover-lines" aria-label="In questo numero">
  <li><a href="#sommario"><span>p. 02</span>Scuola e studio</a></li><li><a href="#sommario"><span>p. 03</span>Belle arti e hobbistica</a></li><li><a href="#sommario"><span>p. 04</span>Fotocopie, rilegature, timbri</a></li><li><a href="#racconto"><span>p. 08</span>Una famiglia dal 1952</a></li>
 </ol>
</section>
<section class="sommario" id="sommario" aria-labelledby="som-title">
 <div class="som-head">${k('Sommario')}<h2 id="som-title">Cosa hai<br><em>in mente?</em></h2><p>Parti da ciò che vuoi fare, non da un catalogo infinito. Prodotti e servizi si confermano in negozio.</p>
 <div class="tabs" role="group" aria-label="Filtra le voci del sommario"><button type="button" data-filter="all" aria-pressed="true">Tutto</button>${b.filters.map(f => `<button type="button" data-filter="${E(f)}" aria-pressed="false">${E(f)}</button>`).join('')}</div>
 <p id="filter-status" class="filter-status" role="status" aria-live="polite">${b.services.length} voci visualizzate</p></div>
 <ol class="toc">${b.services.map((s, i) => `<li data-category="${E(s.category)}"><span class="pg" aria-hidden="true">${String(i + 2).padStart(2, '0')}</span><div><h3>${E(s.title)}</h3><p>${E(s.body)}</p></div>${ask(s.title, 'Chiedi')}</li>`).join('')}</ol>
</section>
<section class="racconto" id="racconto" aria-labelledby="rac-title">
 <p class="year" aria-hidden="true">1952</p>
 <div class="rac-copy">${k('Il racconto · p. 08')}<h2 id="rac-title">Una famiglia.<br>Un quartiere.<br><em>Tante nuove idee.</em></h2>
 <div class="cols"><p class="dropcap">${E(b.story)}</p><p>Scuola, ufficio e belle arti convivono nello stesso negozio: è questa varietà, insieme alla continuità familiare, il punto forte da portare online.</p></div>
 <ol class="timeline"><li><strong>1952 · Le origini</strong>Antonio Gambardella e Angioletta Daniotti aprono la cartoleria.</li><li><strong>Oggi · La continuità</strong>Raffaele e la nuova generazione portano avanti l’attività di famiglia.</li><li><strong>Domani · La rivista online</strong>Una presenza propria, accanto alla scheda del fornitore.</li></ol></div>
</section>
${requestForm(b, base, {cls: 'letter', kicker: 'Lettera alla cartoleria', title: 'Metti la tua idea<br><em>nero su bianco.</em>', intro: 'Scegli un argomento e prepara il messaggio: potrai aprirlo nella tua email, controllarlo e inviarlo tu. Prezzi, materiali e tempi si confermano con il negozio.', occasion: 'Formato, quantità o materiale', details: ['Per la scuola', 'Per l’ufficio', 'Per un lavoro creativo', 'Mi serve in tempi brevi']})}
<section class="colophon" id="colophon" aria-labelledby="col-title">
 ${k('Colophon')}<h2 id="col-title">La prossima pagina?<br><em>Viale Monza 61/A.</em></h2>
 <dl><div><dt>Indirizzo</dt><dd>${c.address}<br>${c.map}</dd></div><div><dt>Telefono</dt><dd>${c.phone}</dd></div><div><dt>Email</dt><dd>${c.email}</dd></div><div><dt>Orari</dt><dd>${E(c.hours)}</dd></div></dl>
</section>
</main>`;
    return page(b, base, {themeColor: '#fbf8f1', body});
  },
  poster: b => `<span class="p-top">N. 61/A · dal 1952</span><strong>Gambardella</strong><span class="p-line">Le idee prendono <mark>forma.</mark></span>`
};
