// 05 · Sergio Stagnoli — an interiors studio: verification first, an armchair whose upholstery follows the chosen sample, moodboard steps, furniture brief.
import {E, k, header, requestForm, contactBits, page} from '../lib.mjs';

const art = `<svg viewBox="0 0 520 520" role="img" aria-labelledby="s-art"><title id="s-art">Illustrazione originale: poltrona con rivestimento che cambia in base al campione scelto</title>
<defs>
<pattern id="stoffa" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#b9a27a"/><path d="M0 4.5h18M0 13.5h18" stroke="#a48c62" stroke-width="3"/><path d="M4.5 0v18M13.5 0v18" stroke="#cbb790" stroke-width="2"/></pattern>
<pattern id="pelle" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#6e3b22"/><circle cx="30" cy="30" r="4" fill="#3d1f12"/><path d="M30 30L0 0M30 30L60 0M30 30L0 60M30 30L60 60" stroke="#5a2f1b" stroke-width="2"/></pattern>
<pattern id="neutro" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#e2dccd"/><path d="M0 12L12 0" stroke="#c9c0ab" stroke-width="2"/></pattern>
</defs>
<ellipse cx="260" cy="486" rx="200" ry="16" fill="#2d3226" opacity=".15"/>
<path class="uph" d="M138 120c0-52 34-74 122-74s122 22 122 74v170H138z" stroke="#2d3226" stroke-width="5"/>
<path class="uph" d="M70 220c0-36 64-36 68 0v160H70z M382 220c4-36 68-36 68 0v160h-68z" stroke="#2d3226" stroke-width="5"/>
<rect class="uph" x="122" y="280" width="276" height="86" rx="26" stroke="#2d3226" stroke-width="5"/>
<path d="M70 380h380v34H70z" fill="#5d6b3f" stroke="#2d3226" stroke-width="5"/>
<path d="M96 414l-10 64M424 414l10 64M200 414l-4 50M320 414l4 50" stroke="#2d3226" stroke-width="10" stroke-linecap="round"/>
<path d="M150 296h220" stroke="#2d3226" stroke-opacity=".35" stroke-width="3" stroke-dasharray="8 8"/>
</svg>`;
const swatches = [['stoffa', 'Stoffa', 'Stoffa: descrivi trama, colore e sensazione che cerchi. Il campione è un grafico dimostrativo, non un catalogo.'], ['pelle', 'Pelle', 'Pelle: descrivi l’arredo e il risultato che cerchi. Materiali e lavorazioni li conferma il laboratorio.'], ['neutro', 'Non so ancora', 'Nessun problema: il materiale si sceglie insieme, dopo aver visto l’arredo.']];

export default {
  icon: ['S', '#5d6b3f', '#ebe4d6', 0],
  render(b, base) {
    const c = contactBits(b);
    const body = `<p class="verify-strip"><strong>Apertura da verificare.</strong> ${E(b.verify)}</p>
${header(b, {cls: 'studio', brand: '<span>Sergio Stagnoli</span><small>Tappezzeria · stoffa e pelle</small>', links: [['#campioni', 'Campionario'], ['#progetto', 'Il progetto'], ['#richiesta', 'Scheda arredo'], ['#studio', 'Via delle Leghe 16']]})}
<main id="main">
<section class="room" aria-labelledby="s-title">
 <p class="vertical" aria-hidden="true">Via delle Leghe 16 · Milano</p>
 <figure class="chair">${art}<figcaption>Illustrazione originale · rivestimento dimostrativo</figcaption></figure>
 <div class="room-copy">${k('Tappezzeria')}<h1 id="s-title">Materia.<br>Forma.<br><em>Carattere.</em></h1><p class="lead">${E(b.intro)}</p></div>
</section>
<section class="samples" id="campioni" aria-labelledby="sa-title"><div class="samples-head">${k('Campionario dimostrativo')}<h2 id="sa-title">Da quale materia comincia l’idea?</h2><p>Scegli un campione: la poltrona cambia rivestimento e la scelta passa nella scheda. Sono grafici, non stoffe o pelli disponibili.</p></div>
 <div class="swatches" data-choice-group="material" role="group" aria-label="Scegli il materiale">${swatches.map(([id, label, note], i) => `<button type="button" data-choice="${id}" data-note="${E(note)}" data-occasion="Materiale: ${E(label.toLowerCase())}" aria-pressed="${i === 0}"><span class="sw sw-${id}" aria-hidden="true"></span>${E(label)}</button>`).join('')}</div>
 <p class="material-note" id="material-note" role="status" aria-live="polite">${E(swatches[0][2])}</p></section>
<section class="mood" id="progetto" aria-labelledby="mo-title"><h2 id="mo-title">Il progetto vive<br><em>nei dettagli.</em></h2>
 <ol><li class="t1"><span>01</span><h3>Guarda l’arredo</h3><p>Forma, struttura, imbottitura: annota cosa vuoi cambiare e cosa conservare.</p></li><li class="t2"><span>02</span><h3>Descrivi l’intervento</h3><p>${E(b.services[0].body)}</p></li><li class="t3"><span>03</span><h3>Telefona prima</h3><p>${E(b.services[2].body)}</p></li><li class="t4"><p>${E(b.story)}</p></li></ol></section>
${requestForm(b, base, {cls: 'atelier', kicker: 'Scheda arredo', title: 'Un brief per<br><em>il tuo arredo.</em>', intro: 'Tipo di arredo, materiale e risultato desiderato. La scheda prepara la telefonata: lavorazioni e tempi li valuta il laboratorio.', occasion: 'Materiale e finitura desiderati', detailsLabel: 'Che arredo è?', details: ['Poltrona', 'Divano', 'Sedie', 'Testiera', 'Altro arredo']})}
<section class="studio-info" id="studio" aria-labelledby="st-title"><div>${k('Lo studio')}<h2 id="st-title">Prima, una telefonata.</h2></div><div><p class="addr">${c.address}</p>${c.map}<p>${c.phone}</p><p class="small">${E(c.hours)}</p>${c.verify}</div></section>
</main>`;
    return page(b, base, {themeColor: '#ebe4d6', body});
  },
  poster: () => `<span class="p-sw"><i></i><i></i></span><strong>Materia.<br>Forma.<br><em>Carattere.</em></strong>`
};
