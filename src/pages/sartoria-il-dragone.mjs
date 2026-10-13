// 14 · Sartoria Il Dragone — a paper pattern: rulers, grainline, notches and coordinates, a garment sheet, an exploratory visit.
import {E, header, requestForm, contactBits, page} from '../lib.mjs';

const art = `<svg viewBox="0 0 520 560" role="img" aria-labelledby="d-art"><title id="d-art">Illustrazione originale: un pezzo di cartamodello per il davanti di una giacca, con tacche, linea del drittofilo e cuciture</title>
<path d="M120 40l120-10 40 70 120 10 50 120-30 40 20 230-330 20-20-250 40-40z" fill="#f7f0dc" stroke="#1e2a44" stroke-width="3"/>
<path d="M134 56l100-8 36 64 120 10 40 104-26 36 18 214-302 18-18-234 36-36z" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="10 7"/>
<path d="M250 170v300" stroke="#1e2a44" stroke-width="2.5"/><path d="M250 170l-10 20h20zM250 470l-10-20h20z" fill="#1e2a44"/>
<text x="262" y="330" font-family="Space Mono,monospace" font-size="13" fill="#1e2a44" transform="rotate(90 262 330)">DRITTOFILO</text>
<g stroke="#1e2a44" stroke-width="3"><path d="M118 300h18M408 260h18M230 520v-18M300 32l-4 18"/></g>
<g fill="#c0392b"><circle cx="180" cy="230" r="5"/><circle cx="180" cy="300" r="5"/><circle cx="180" cy="370" r="5"/></g>
<path d="M340 380h60v36h-60z" fill="none" stroke="#2f5fa7" stroke-width="2.5"/>
<text x="150" y="140" font-family="Space Mono,monospace" font-size="16" font-weight="700" fill="#1e2a44">A—01 · DAVANTI</text>
<text x="150" y="160" font-family="Space Mono,monospace" font-size="12" fill="#1e2a44">TAGLIARE 2 · TAGLIA: LA TUA</text>
<path d="M60 520c40-30 60 10 100-14s50-40 90-20 60 30 100 6 70-30 110-6" fill="none" stroke="#2f5fa7" stroke-width="3" stroke-linecap="round"/>
</svg>`;
const starts = [['capo', 'Raccontare il capo', 'Che capo è, come lo usi, cosa vorresti ottenere. Le lavorazioni effettive vanno confermate dalla sartoria.'], ['modifica', 'Parlare di una modifica', 'Descrivi il punto da rivedere: lunghezza, vestibilità, un dettaglio. Nessun intervento è promesso dalla pagina.'], ['visita', 'Conoscere la sartoria', 'Nessun recapito affidabile: il primo passo è una visita in Via Rovereto 5 per conoscere il laboratorio.']];

export default {
  icon: ['D', '#efe6cf', '#c0392b', 0],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'pattern-head', brand: '<span class="code">PEZZO A—01</span><span>Sartoria Il Dragone</span>', links: [['#scheda', 'B—02 Scheda del capo'], ['#richiesta', 'C—03 Il progetto'], ['#visita', 'D—04 Visita']]})}
<main id="main">
<section class="cut" aria-labelledby="d-title"><div class="ruler-x" aria-hidden="true"></div><div class="ruler-y" aria-hidden="true"></div>
 <div class="cut-copy"><p class="coords">Via Rovereto 5 · Milano · proposta esplorativa</p><h1 id="d-title">Un filo.<br>Una forma.<br><em>La tua idea.</em></h1><p class="lead">${E(b.intro)}</p><p class="note">${E(b.verify)}</p></div>
 <figure class="piece">${art}<figcaption>Illustrazione originale · cartamodello dimostrativo</figcaption></figure>
</section>
<section class="garment" id="scheda" aria-labelledby="g-title"><div class="tape" aria-hidden="true"></div><p class="coords">B—02</p><h2 id="g-title">La scheda del capo.</h2><p>Scegli il punto di partenza: è un promemoria della richiesta, non un elenco di lavorazioni confermate.</p>
 <div class="starts" data-choice-group="garment" role="group" aria-label="Punto di partenza">${starts.map(([id, label, note], i) => `<button type="button" data-choice="${id}" data-note="${E(note)}" data-set-service="${E(b.services[i].title)}" aria-pressed="${i === 0}"><span class="pin" aria-hidden="true">${'ABC'[i]}</span>${E(label)}</button>`).join('')}</div>
 <p class="garment-note" id="garment-note" role="status" aria-live="polite">${E(starts[0][2])}</p></section>
${requestForm(b, base, {cls: 'project', kicker: 'C—03 · Il progetto', title: 'Il progetto,<br>punto per punto.', intro: 'Capo, dettaglio, risultato desiderato. Porta la scheda alla visita: misure, fattibilità, tempi e costi si definiscono in sartoria.', occasion: 'Capo e dettaglio', detailsLabel: 'Che capo è?', details: ['Giacca', 'Pantaloni', 'Abito', 'Camicia', 'Altro capo']})}
<section class="visit" id="visita" aria-labelledby="v-title"><p class="coords">D—04</p><h2 id="v-title">Il primo incontro<br>è esplorativo.</h2><div class="visit-grid"><div><p class="addr">${c.address}</p>${c.map}</div><div>${c.phone}<p>${E(c.hours)}</p></div><p class="story">${E(b.story)}</p></div></section>
</main>`;
    return page(b, base, {themeColor: '#efe6cf', body});
  },
  poster: () => `<span class="p-coords">A—01 · DAVANTI</span><strong>Un filo.<br>Una forma.</strong><span class="p-dash"></span>`
};
