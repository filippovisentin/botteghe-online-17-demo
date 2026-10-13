# Analisi e correzioni — 17 demo «Botteghe online»

Data: 13 ottobre 2026. Versione analizzata: commit `9feddae` (generatore `build.mjs` + `identities.mjs`, script `dist/app.js` e `identities.js`, stile `identities.css`).
I riferimenti «prima» indicano file e riga della versione analizzata; «dopo» indica dove si trova la correzione nel nuovo generatore.

## Riepilogo

| Area | Esito della versione analizzata | Stato dopo le correzioni |
|---|---|---|
| Sicurezza | Escape dei testi presente, ma `href` non sottoposti a escape, link esterni senza `rel` completo, nessuna CSP, nessuna referrer policy | CSP via `<meta>`, `referrer: no-referrer`, filtro degli URL, link esterni `noopener noreferrer` |
| Cookie e archiviazione | Nessun cookie né storage; nessun servizio esterno caricato | Invariato, dichiarato in `privacy.html` (nessun banner necessario) |
| Età | Nessuna conferma nei bar; la fonte di Bar Verdi rimandava a un sito di gioco | Conferma «almeno 18 anni» nei 4 bar; link Sisal rimosso |
| Dati personali | Bozze locali corrette, ma nome obbligatorio, `autocomplete` mancanti e possibile invio dei dati nell’URL senza JavaScript | Nome facoltativo, `autocomplete` corretti, `method="post"` + CSP `form-action 'none'`, avviso privacy in ogni modulo, `privacy.html` |
| Accessibilità | Buona base (salto al contenuto, focus, `aria-pressed`); alcuni bersagli piccoli, titoli dei SVG riutilizzati, animazioni non tutte disattivabili | Verificato automaticamente: un `h1` per pagina, nessun salto di livello, contrasto AA, motion ridotta, tastiera |
| Contenuti | Corretti nel complesso; alcune incongruenze | Corretti i punti elencati sotto; nessun prezzo, orario, recensione o servizio aggiunto |
| Generatore | `dist/app.js` modificato a mano, `dist/style.css` orfano, codice morto in `build.mjs` | `dist/` rigenerato da zero a ogni build; sorgenti in `src/` e `assets/` |

## 1. Sicurezza

1. **URL non sottoposti a escape negli attributi.** `identities.mjs:4` (`n()`) inseriva `href="${a}"` senza escape; usato per fonti, `mailto:` e mappe (`identities.mjs:33`, `:67`). I `tel:` erano costruiti dal dato senza filtro (`identities.mjs:33`) o scritti a mano nelle pagine (`identities.mjs:46`, `:50`, `:52`, `:55`, `:56`, `:59`), con il rischio di numeri non allineati ai dati.
   *Dopo:* `src/lib.mjs` → `safeUrl()` ammette solo `https:`, `mailto:`, `tel:+<cifre>`, ancore e percorsi relativi, con escape; `telHref()` ricava il numero dal dato; nessun numero è più scritto a mano nei template.
2. **Testi non sottoposti a escape.** `build.mjs:45` inseriva `b.hero`, `b.section`, `b.storyTitle`, `b.requestTitle` senza escape (contenevano `<br>`/`<em>`). I dati erano interni, ma il codice era fragile; la funzione `page()` era inoltre in gran parte inutilizzata da `refinePage()`.
   *Dopo:* tutti i campi dei dati passano per `E()`; il markup con `<br>`/`<em>` esiste solo come costante nei moduli delle pagine. Il codice morto (`page()`, `art()`, `head()`, palette) è stato rimosso da `build.mjs`.
3. **Link esterni.** In `build.mjs:45` i link avevano `rel="noopener"` senza `noreferrer`; in `identities.mjs:4` e `:67` le fonti e le mappe non avevano né `target` né `rel`.
   *Dopo:* `ext()` in `src/lib.mjs` produce sempre `target="_blank" rel="noopener noreferrer"` e un avviso per i lettori di schermo; la verifica automatica controlla ogni `a[href^=http]`.
4. **Nessuna CSP né referrer policy** (`identities.mjs:65`, `:70`). Gli stili inline (`style="--ink:…"`, `identities.mjs:67`, `:70`; `build.mjs:45`) avrebbero impedito una CSP rigida.
   *Dopo:* `src/lib.mjs` → `CSP` = `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'` + `<meta name="referrer" content="no-referrer">`. Nessuno stile inline: i colori sono in `assets/sites/<slug>.css` (verificato: 0 attributi `style`).
5. **Terze parti.** Nessuno script o font esterno era caricato (font di sistema). Per differenziare la tipografia ora si usano 33 famiglie di caratteri open source (62 file woff2, 1,3 MB in totale; licenza SIL OFL, da Fontsource; ogni pagina scarica solo i propri) **ospitati nel sito stesso** (`assets/fonts/`); la verifica registra 0 richieste verso altri domini.
6. **Dati sensibili nel repository.** Nessuna chiave, token o password nella cronologia Git (ricerca su `git log --all -p`). `.openai/hosting.json` contiene solo l’ID del progetto, non una credenziale. Gli unici recapiti sono pubblici e già nelle fonti.

## 2. Cookie e archiviazione

Il sito **non usa cookie, `localStorage`, `sessionStorage` né IndexedDB** (verificato in ogni pagina) e non carica mappe, video, widget o statistiche. Google Maps è solo un collegamento in uscita, non un contenuto incorporato. Non serve quindi un banner di consenso. La nota cookie è in `dist/privacy.html` (sorgente `src/privacy.mjs`), collegata dal piè di pagina e da ogni modulo.

## 3. Età dell’utente

- **Bar Rondò, Bar Tabacchi Varisco, Bar Bijoux, Bar Verdi**: i moduli hanno ora una conferma «Confermo di avere almeno 18 anni» (`requestForm(..., {age: true})` in `src/lib.mjs`). Compare e blocca la bozza solo se la domanda riguarda alcolici, tabacco o gioco (`assets/site.js`, espressione `adult`); la conferma non viene registrata.
- **Nessuna promozione**: Varisco ha un «Avviso ai lettori» esplicito; Verdi dichiara l’assenza di servizi di gioco. **La fonte di Bar Verdi** (`build.mjs:20`, `negozi.sisal.com`) è un sito di un concessionario di giochi: il link è stato rimosso e sostituito da una nota e dalla fonte NoiZona2, che conferma il telefono.

## 4. Dati personali e moduli

- Nessun invio: le bozze sono composte in memoria (`assets/site.js`), nessuna richiesta di rete (CSP `connect-src 'none'`). Copia, download `.txt` ed email (solo Gambardella) sono azioni dell’utente.
- **Dati nell’URL**: senza JavaScript i moduli senza `method` (`identities.mjs:36`) avrebbero inviato i campi come parametri dell’indirizzo. *Dopo:* `method="post" action="#"` e CSP `form-action 'none'`: il modulo non può essere inviato da nessuna parte (verificato: l’URL resta privo di parametri).
- **Campi obbligatori non necessari**: nome e argomento erano `required` (`identities.mjs:36`). *Dopo:* obbligatoria solo la domanda; nome facoltativo, argomento con valore predefinito «Una domanda generale».
- **`autocomplete`**: nome `given-name`, campi liberi `off`; aggiunta la `maxlength` coerente.
- **Avviso privacy** in ogni modulo (quali dati, che restano nel browser, chi decide l’invio, nessun dato sensibile) + `privacy.html`.

## 5. Accessibilità

Controlli automatici a 1440, 390 e 320 px su 17 demo, indice, privacy e `index.html` (script Playwright, Chrome):
- nessuno scorrimento orizzontale; nessun errore o avviso in console; nessuna risorsa mancante (la vecchia favicon mancante dell’indice dava un 404);
- un solo `h1` per pagina e nessun salto nei livelli dei titoli (Alby ha un `h1` visivamente nascosto, perché la composizione mostra «Il pane / Il dolce»);
- ogni SVG con `role="img"` ha un `<title>` univoco; le illustrazioni decorative sono `aria-hidden`;
- contrasto AA del testo su sfondi pieni misurato elemento per elemento in tutte le pagine (nessun valore sotto 4,5:1, o 3:1 per i testi grandi);
- il primo Tab raggiunge «Vai al contenuto»; menu apribile, chiudibile con Escape e focus restituito al pulsante; controlli con nome accessibile ed etichette;
- `prefers-reduced-motion`: nessuna animazione continua (sole, anelli, cartamodello, ago del cruscotto, grissini) e scorrimenti senza effetto morbido;
- i punti cliccabili sulla scarpa di Il Mio Calzolaio sono duplicati da una lista di pulsanti accessibile da tastiera.

## 6. Correttezza dei contenuti

Confrontati con `outputs/viale-monza-2026-10-13/attivita-senza-sito.md`:
- **Gambardella**: servizi (fotocopie, stampa email, rilegatura, scansioni, timbri) e storia (fondatori, Raffaele figlio dei fondatori, nuova generazione) coerenti con Pentel e CommercioDay. Precisato «Raffaele, figlio dei fondatori».
- **Stagnoli**: l’avviso ora spiega il motivo della verifica (dicitura «attività cessata» in una scheda).
- **Alby, Bottega delle Carni, L’Angolo del Panettiere**: nessun numero pubblicato; le pagine spiegano che i numeri pubblici non coincidono.
- **Marsilii**: entrambe le sedi documentate (Via privata dei Cybo 1, Via Venini 34) mostrate come «da confermare», senza mappa.
- **Il Dragone**: «nessun recapito affidabile», primo contatto come visita esplorativa.
- **Taormina**: avviso sul rapporto con L’Antico Calzolaio in testa alla pagina.
- **Mango Esotico**: email di directory non usata; nessun gusto elencato (i coni con «?» rimandano al banco).
- **Grissinificio**: scheda prodotto con campi esplicitamente «da confermare»; nessuna vendita all’ingrosso o fornitura.
- Nessun prezzo, orario, recensione, affiliazione o prodotto disponibile oggi; ogni pagina mantiene l’avviso «demo indipendente» (barra superiore e piè di pagina) e le illustrazioni sono dichiarate originali.

## 7. Generatore e file

- `dist/app.js` era modificato a mano e non generato; `dist/style.css` non era più usato; `identities.mjs` copiava asset dentro `dist/` durante l’import. *Dopo:* `node build.mjs` cancella e ricrea `dist/` da `src/` e `assets/`.
- Struttura: `build.mjs` (dati e orchestrazione), `src/lib.mjs` (componenti condivisi e sicurezza), `src/pages/<slug>.mjs` (composizione, illustrazione, favicon e locandina dell’indice di ogni attività), `src/gallery.mjs`, `src/privacy.mjs`, `src/fonts.mjs`, `assets/base.css` (solo meccanica condivisa), `assets/sites/<slug>.css`, `assets/collection.css`, `assets/site.js`.
- `design.mjs` resta come bozza storica non usata; `identities.mjs/.css/.js` sono stati sostituiti.
