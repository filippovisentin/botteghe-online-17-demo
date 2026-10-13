// 06 · Alby — two halves: bread (daily) and pastry (occasions), a side switch, visit before contact, tall shelf labels.
import {E, k, ask, header, requestForm, contactBits, page} from '../lib.mjs';

const bread = `<svg viewBox="0 0 360 260" role="img" aria-labelledby="a-bread"><title id="a-bread">Illustrazione originale: una pagnotta con tagli sulla crosta</title>
<ellipse cx="180" cy="226" rx="150" ry="14" fill="#3d1d12" opacity=".15"/>
<path d="M40 190c-10-90 70-150 150-150s150 50 140 140c-2 22-20 38-44 40H84c-24 0-42-12-44-30z" fill="#d99a4e" stroke="#3d1d12" stroke-width="5"/>
<path d="M100 92c22 18 36 44 40 76M168 70c22 22 34 56 34 96M236 78c20 22 30 54 28 88" fill="none" stroke="#fff3df" stroke-width="10" stroke-linecap="round"/>
<path d="M60 186c60 14 180 14 250-4" fill="none" stroke="#3d1d12" stroke-width="3" opacity=".35"/></svg>`;
const cake = `<svg viewBox="0 0 360 260" role="img" aria-labelledby="a-cake"><title id="a-cake">Illustrazione originale: una fetta di torta a strati</title>
<ellipse cx="180" cy="230" rx="150" ry="14" fill="#000" opacity=".2"/>
<path d="M60 130l220-70v150H60z" fill="#fff3df" stroke="#fff3df" stroke-width="4" stroke-linejoin="round"/>
<path d="M60 130l220-70v24L60 156z" fill="#f6a5b8"/><path d="M60 178h220v14H60z" fill="#f6a5b8"/>
<path d="M60 130v80h220V60" fill="none" stroke="#3d1d12" stroke-width="5" stroke-linejoin="round"/>
<circle cx="236" cy="56" r="18" fill="#e23a4f" stroke="#3d1d12" stroke-width="4"/><path d="M236 38c4-12 12-18 22-20" stroke="#3d1d12" stroke-width="4" fill="none"/>
<path d="M70 126c20-10 36 4 52-6s30 2 48-8 34 0 52-10 30-2 50-12" fill="none" stroke="#fff3df" stroke-width="10" stroke-linecap="round"/></svg>`;

export default {
  icon: ['A', '#3d1d12', '#f6a5b8', 20],
  render(b, base) {
    const c = contactBits(b);
    const body = `${header(b, {cls: 'duet-head', brand: '<span class="alby-logo">Alby</span><span class="alby-sub">Panificio <span aria-hidden="true">&amp;</span><span class="sr-only">e</span> Pasticceria</span>', links: [['#meta', 'Pane o dolce?'], ['#visita', 'Passa al 44'], ['#vetrina', 'La vetrina'], ['#richiesta', 'Una domanda']]})}
<main id="main">
<section class="duet" id="meta" aria-labelledby="a-title">
 <h1 id="a-title" class="sr-only">Alby Panificio e Pasticceria, Viale Monza 44</h1>
 <div class="half pane"><p class="kicker">Ogni giorno</p><p class="half-title">Il pane.</p>${bread}<p>Il quotidiano del quartiere: una vetrina per raccontare il forno con foto e disponibilità confermate dal negozio.</p></div>
 <div class="seal" aria-hidden="true"><span>Alby</span><small>Viale Monza 44</small></div>
 <div class="half dolce"><p class="kicker">Le occasioni</p><p class="half-title">Il dolce.</p>${cake}<p>La pasticceria, con i prodotti reali del negozio. Le richieste per feste si attivano solo se il negozio lo desidera.</p></div>
 <div class="side-switch" data-choice-group="side" role="group" aria-label="Da che parte vuoi cominciare?"><button type="button" data-choice="pane" aria-pressed="false" data-set-service="Pane e forno">Comincia dal pane</button><button type="button" data-choice="dolce" aria-pressed="false" data-set-service="Pasticceria">Comincia dal dolce</button></div>
</section>
<section class="visit-first" id="visita" aria-labelledby="v-title"><div>${k('Prima di tutto, passa a trovarci')}<h2 id="v-title">Il primo passo:<br>il civico 44.</h2><p class="lead">${E(b.intro)}</p></div><div class="visit-card"><p class="addr">${c.address}</p>${c.map}<div class="phone-warn"><strong>Telefono da verificare.</strong> ${E(b.phoneNote)}</div><p class="small">${E(c.hours)}</p></div></section>
<section class="shelf" id="vetrina" aria-labelledby="sh-title"><h2 id="sh-title">La vetrina,<br><em>senza listino.</em></h2><ul>${b.services.map((s, i) => `<li class="label l${i}"><span class="hole" aria-hidden="true"></span><p class="cat">${E(s.category)}</p><h3>${E(s.title)}</h3><p>${E(s.body)}</p><p class="noprice">Prezzo e disponibilità: in negozio</p>${ask(s.title, 'Una domanda')}</li>`).join('')}</ul><p class="story">${E(b.story)}</p></section>
${requestForm(b, base, {cls: 'counter', kicker: 'Da portare al banco', title: 'Porta con te<br>la tua domanda.', intro: 'Prepara un promemoria da usare in negozio. Finché il telefono non è confermato, il modo più sicuro è passare al 44.', occasion: 'Per quando e per quante persone', details: ['Pane', 'Pasticceria', 'Un’occasione', 'Allergie da segnalare']})}
</main>`;
    return page(b, base, {themeColor: '#fff3df', body});
  },
  poster: () => `<span class="p-half"></span><strong>Alby</strong><span class="p-line">pane · dolce</span>`
};
