// Local-only interactions shared by the 17 demos and the collection index.
// Nothing here stores data (no cookies, localStorage or network requests).
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const press = (group, active) => group.forEach(b => b.setAttribute('aria-pressed', String(b === active)));

  /* Menu: toggle, close on link and on Escape (focus back to the button). */
  const menu = $('.menu'), nav = $('.navlinks');
  const closeMenu = (focus) => { if (!menu) return; menu.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); if (focus) menu.focus(); };
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('open', open); });
  $$('.navlinks a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') closeMenu(true); });

  /* Topic filters (Gambardella index). */
  const filters = $$('[data-filter]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    press(filters, btn);
    let count = 0;
    $$('[data-category]').forEach(card => { card.hidden = btn.dataset.filter !== 'all' && !card.dataset.category.split(',').includes(btn.dataset.filter); if (!card.hidden) count++; });
    const status = $('#filter-status'); if (status) status.textContent = `${count} ${count === 1 ? 'voce visualizzata' : 'voci visualizzate'}`;
  }));

  /* Any "ask" button preselects the topic and moves to the form. */
  const goToForm = () => { const form = $('#richiesta'); if (!form) return; form.scrollIntoView({behavior: reduce() ? 'auto' : 'smooth', block: 'start'}); $('#service')?.focus({preventScroll: true}); };
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-service]'); if (!btn) return;
    const select = $('#service'); if (select && [...select.options].some(o => o.value === btn.dataset.service)) select.value = btn.dataset.service;
    goToForm();
  });

  /* Detail chips: toggle, collected into the draft. Buttons elsewhere on the page can mirror a chip. */
  const setChip = (name, on) => { $$('[data-detail]').filter(c => c.dataset.detail === name).forEach(c => c.setAttribute('aria-pressed', String(on))); $$('[data-mirror]').filter(c => c.dataset.mirror === name).forEach(c => c.setAttribute('aria-pressed', String(on))); };
  $$('[data-detail]').forEach(c => c.addEventListener('click', () => setChip(c.dataset.detail, c.getAttribute('aria-pressed') !== 'true')));
  $$('[data-mirror]').forEach(c => c.addEventListener('click', () => {
    const on = c.getAttribute('aria-pressed') !== 'true'; setChip(c.dataset.mirror, on);
    const note = c.dataset.note && $(c.dataset.noteTarget || '#part-note'); if (note) { note.dataset.default ??= note.textContent; note.textContent = on ? c.dataset.note : note.dataset.default; }
  }));

  /* Single-choice selectors with a live note (moments, materials, garments, rubrics, sides). */
  $$('[data-choice-group]').forEach(group => {
    const buttons = $$('[data-choice]', group);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      press(buttons, btn);
      const target = group.dataset.choiceGroup;
      $$(`[data-panel-of="${target}"]`).forEach(p => { p.hidden = p.dataset.panel !== btn.dataset.choice; });
      document.body.dataset[target] = btn.dataset.choice;
      if (btn.dataset.note) { const note = $(`#${target}-note`); if (note) note.textContent = btn.dataset.note; }
      if (btn.dataset.setService) { const s = $('#service'); if (s) s.value = btn.dataset.setService; }
      if (btn.dataset.occasion) { const o = $('#occasion'); if (o && (!o.value || o.dataset.auto === 'true')) { o.value = btn.dataset.occasion; o.dataset.auto = 'true'; } }
    }));
  });
  $('#occasion')?.addEventListener('input', e => { e.target.dataset.auto = 'false'; });

  /* Draft composition. */
  const form = $('#request-form');
  let draft = '';
  const adult = /tabacc|sigar|svap|nicotin|alcol|birr|\bvin[oi]\b|spritz|aperitiv|amar[oi]\b|grapp|liquor|cocktail|gratta|lotto|scommess|\bslot|giocat|giochi|scommett/i;
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form), status = $('#form-status');
    const msg = String(data.get('message') || '').trim();
    if (!msg) { status.textContent = 'Scrivi la tua domanda per preparare la bozza.'; $('#message').focus(); return; }
    if (form.hasAttribute('data-age-gate') && adult.test(msg + ' ' + (data.get('occasion') || ''))) {
      const gate = $('#age-gate'); gate.hidden = false;
      if (!$('#age-ok').checked) { status.textContent = 'Per domande su alcolici, tabacco o gioco conferma di avere almeno 18 anni.'; $('#age-ok').focus(); return; }
    }
    status.textContent = '';
    const details = $$('[data-detail][aria-pressed="true"]', form).map(c => c.dataset.detail);
    const name = String(data.get('name') || '').trim(), occasion = String(data.get('occasion') || '').trim();
    draft = [`Buongiorno ${document.body.dataset.business},`, '', `vorrei informazioni su: ${data.get('service')}.`,
      occasion ? `Esigenza: ${occasion}.` : null, details.length ? `Dettagli: ${details.join(', ')}.` : null, '', msg, '', name ? `Grazie,\n${name}` : 'Grazie.', '', '(Richiesta da confermare con l’attività.)'].filter(v => v !== null).join('\n');
    $('#draft-text').textContent = draft; $('#draft').hidden = false; $('#draft-status').textContent = '';
    const mail = $('#email-draft'), to = document.body.dataset.email;
    if (mail && to) mail.href = `mailto:${to}?subject=${encodeURIComponent('Richiesta informazioni — ' + data.get('service'))}&body=${encodeURIComponent(draft)}`;
    $('#draft').scrollIntoView({behavior: reduce() ? 'auto' : 'smooth', block: 'nearest'});
    $('#draft-title').focus({preventScroll: true});
  });
  $('#copy-draft')?.addEventListener('click', async () => {
    const s = $('#draft-status');
    try { await navigator.clipboard.writeText(draft); s.textContent = 'Testo copiato. Nessun messaggio è stato inviato.'; }
    catch { s.textContent = 'Copia automatica non disponibile: seleziona il testo della bozza.'; }
  });
  $('#download-draft')?.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([draft], {type: 'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'richiesta-informazioni.txt'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('#draft-status').textContent = 'Bozza scaricata sul tuo dispositivo. Nessun messaggio è stato inviato.';
  });

  /* Collection index: group filter + search. */
  const gFilters = $$('[data-gallery-filter]'), search = $('#search');
  let group = 'all';
  const filterGallery = () => {
    const q = (search?.value || '').toLocaleLowerCase('it').trim(); let n = 0;
    $$('.index-card').forEach(card => { card.hidden = (group !== 'all' && card.dataset.group !== group) || !card.textContent.toLocaleLowerCase('it').includes(q); if (!card.hidden) n++; });
    const st = $('#search-status'); if (st) st.textContent = `${n} ${n === 1 ? 'attività trovata' : 'attività trovate'}`;
    const empty = $('#empty'); if (empty) empty.hidden = n > 0;
  };
  gFilters.forEach(b => b.addEventListener('click', () => { group = b.dataset.galleryFilter; press(gFilters, b); filterGallery(); }));
  search?.addEventListener('input', filterGallery);
})();
