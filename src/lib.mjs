// Shared, content-agnostic helpers. Every value coming from data passes through E() or safeUrl().
export const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Only allow the URL schemes the demos actually need; anything else becomes a harmless anchor.
export function safeUrl(u) {
  const s = String(u ?? '').trim();
  if (/^(https:\/\/|mailto:|tel:\+?[0-9]+$|#[\w-]*$)/i.test(s) || /^(\.\.\/)?[\w./-]*$/.test(s)) return E(s);
  return '#';
}
export const telHref = phone => 'tel:+39' + String(phone).replace(/\D/g, '');

// Static pages: everything is first-party, nothing can be posted, nothing leaves via the referrer.
export const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'; manifest-src 'self'";

export function head({title, description, base, css = [], themeColor = '#ffffff', icon}) {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${CSP}"><meta name="referrer" content="no-referrer"><meta name="robots" content="noindex, nofollow"><meta name="description" content="${E(description)}"><meta name="theme-color" content="${E(themeColor)}"><title>${E(title)}</title><link rel="icon" href="${safeUrl(base + (icon || 'favicon.svg'))}" type="image/svg+xml">${css.map(c => `<link rel="stylesheet" href="${safeUrl(base + c)}">`).join('')}<script defer src="${safeUrl(base + 'assets/site.js')}"></script></head>`;
}

export const k = t => `<p class="kicker">${E(t)}</p>`;
// External links always open a new tab without opener or referrer.
export const ext = (href, text, cls = '') => `<a class="${E(cls)}" href="${safeUrl(href)}" target="_blank" rel="noopener noreferrer">${E(text)}<span class="sr-only"> (si apre in una nuova scheda)</span> <span aria-hidden="true">↗</span></a>`;
export const arrow = (href, text, cls = 'go') => `<a class="${E(cls)}" href="${safeUrl(href)}">${E(text)} <span aria-hidden="true">→</span></a>`;
export const ask = (service, text = 'Chiedi informazioni', cls = 'ask') => `<button type="button" class="${E(cls)}" data-service="${E(service)}">${E(text)}<span class="sr-only">: ${E(service)}</span> <span aria-hidden="true">↘</span></button>`;

export function contactBits(b) {
  const uncertainAddress = /da confermare/i.test(b.address);
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.name + ' ' + b.address);
  return {
    address: E(b.address),
    map: uncertainAddress ? '' : ext(mapUrl, 'Apri le indicazioni (Google Maps)', 'map-link'),
    phone: b.phone ? `<a class="phone" href="${safeUrl(telHref(b.phone))}">${E(b.phone)}</a>` : `<p class="phone-missing">${E(b.phoneNote || 'Recapito telefonico da verificare in negozio.')}</p>`,
    email: b.email ? `<a class="mail" href="${safeUrl('mailto:' + b.email)}">${E(b.email)}</a>` : '',
    hours: 'Orari e aperture da confermare con l’attività: la demo non li indica.',
    verify: b.verify ? `<p class="verify"><strong>Da verificare.</strong> ${E(b.verify)}</p>` : ''
  };
}

export function header(b, {brand, links, cls = ''}) {
  return `<header class="site-header ${E(cls)}"><a class="brand" href="#main">${brand}</a><button type="button" class="menu" aria-expanded="false" aria-controls="navigation">Menu<span class="sr-only"> di navigazione</span></button><nav class="navlinks" id="navigation" aria-label="Menu principale">${links.map(([href, text]) => `<a href="${safeUrl(href)}">${E(text)}</a>`).join('')}</nav></header>`;
}

export function demoBar(b, base) {
  return `<div class="demo-bar"><p>Demo indipendente · non è il sito ufficiale di ${E(b.name)}</p><a href="${safeUrl(base + 'proposte.html')}">Tutte le 17 proposte</a></div>`;
}

/* The request form only composes a local draft. Options:
   title (trusted markup), intro, occasion label, chip details, age gate for bars. */
export function requestForm(b, base, o = {}) {
  const details = o.details?.length ? `<fieldset class="chips" data-details><legend>${E(o.detailsLabel || 'Aggiungi un dettaglio (facoltativo)')}</legend><div>${o.details.map(d => `<button type="button" data-detail="${E(d)}" aria-pressed="false">${E(d)}</button>`).join('')}</div></fieldset>` : '';
  const age = o.age ? `<div class="age-gate" id="age-gate" hidden><p><strong>Prodotti riservati ai maggiorenni.</strong> La tua domanda sembra riguardare alcolici, tabacco o gioco: la demo non li promuove né li vende. Per preparare comunque la bozza conferma la tua età.</p><label class="check"><input type="checkbox" id="age-ok" name="age-ok"> Confermo di avere almeno 18 anni</label></div>` : '';
  return `<section class="brief ${E(o.cls || '')}" id="richiesta" aria-labelledby="richiesta-title"><div class="brief-head">${k(o.kicker || 'Prepara la tua domanda')}<h2 id="richiesta-title">${o.title || 'Una domanda, scritta bene.'}</h2><p>${E(o.intro || 'Componi un messaggio da usare al telefono, in negozio o via email. La pagina non invia nulla e non prenota nulla.')}</p></div><div class="brief-sheet"><form id="request-form" method="post" action="#"${o.age ? ' data-age-gate' : ''}><div class="field"><label for="service">Di cosa vuoi parlare?</label><select id="service" name="service"><option value="Una domanda generale">Una domanda generale</option>${b.services.map(s => `<option value="${E(s.title)}">${E(s.title)}</option>`).join('')}</select></div>${details}<div class="field-row"><div class="field"><label for="name">Il tuo nome <span class="opt">(facoltativo)</span></label><input id="name" name="name" maxlength="60" autocomplete="given-name"></div><div class="field"><label for="occasion">${E(o.occasion || 'Occasione o esigenza')} <span class="opt">(facoltativo)</span></label><input id="occasion" name="occasion" maxlength="120" autocomplete="off"></div></div><div class="field"><label for="message">La tua domanda</label><textarea id="message" name="message" required maxlength="1200" autocomplete="off" aria-describedby="privacy-note"></textarea></div>${age}<div class="privacy-note" id="privacy-note"><p><strong>I tuoi dati restano qui.</strong> La bozza usa solo ciò che scrivi (nome facoltativo, argomento e domanda) e viene composta nel tuo browser: nulla viene inviato, salvato o tracciato e tutto sparisce alla chiusura della pagina. Sei tu a decidere se copiarla, scaricarla${b.email ? ' o spedirla dal tuo programma di posta' : ''}. Non inserire dati sensibili. <a href="${safeUrl(base + 'privacy.html')}">Nota privacy della demo</a></p></div><button class="submit" type="submit">Prepara la bozza <span aria-hidden="true">→</span></button><p class="form-status" id="form-status" role="status" aria-live="polite"></p></form><div class="draft" id="draft" hidden><h3 id="draft-title" tabindex="-1">La tua bozza è pronta.</h3><pre id="draft-text"></pre><div class="draft-actions">${b.email ? '<a class="submit" id="email-draft" href="#">Apri nella tua email</a>' : ''}<button type="button" id="copy-draft">Copia il testo</button><button type="button" id="download-draft">Scarica .txt</button></div><p class="fine">Nessun messaggio è stato inviato. ${b.email ? 'Se apri l’email, controllala e inviala tu.' : 'Usa il testo per chiamare o passare in negozio.'} Disponibilità, costi e tempi si concordano con l’attività.</p><p id="draft-status" role="status" aria-live="polite"></p></div></div></section>`;
}

export function footer(b, base, cls = '') {
  const sources = (b.sources || []).map(s => ext(s.href, s.label)).join('');
  return `<footer class="site-footer ${E(cls)}"><div class="foot-note"><p><strong>${E(b.name)} — proposta indipendente</strong> di Filippo Antonio Visentin. Non è il sito ufficiale e non è affiliata né approvata dall’attività. Le illustrazioni sono originali e dimostrative, non fotografie del negozio o dei suoi prodotti. Recapiti tratti da fonti pubbliche; prezzi, orari, disponibilità e servizi non sono indicati e vanno confermati.</p>${b.sourceNote ? `<p>${E(b.sourceNote)}</p>` : ''}</div><nav class="foot-links" aria-label="Fonti e informazioni">${sources}<a href="${safeUrl(base + 'privacy.html')}">Privacy e cookie</a><a href="${safeUrl(base + 'proposte.html')}">Tutte le proposte</a><a href="#main">Torna in alto <span aria-hidden="true">↑</span></a></nav></footer>`;
}

export function page(b, base, {title, themeColor, body, cls = ''}) {
  return head({title: title || `${b.name} — proposta di sito`, description: b.intro, base, css: ['assets/base.css', `assets/sites/${b.slug}.css`], themeColor, icon: `assets/icons/${b.slug}.svg`})
    + `<body class="site s-${E(b.slug)} ${E(cls)}" data-business="${E(b.name)}" data-email="${E(b.email || '')}"><a class="skip" href="#main">Vai al contenuto</a>${demoBar(b, base)}${body}${footer(b, base)}</body></html>`;
}
