// Privacy and cookie note shared by the whole collection.
import {head} from './lib.mjs';

export function renderPrivacy() {
  return head({title: 'Privacy e cookie delle demo', description: 'Come le 17 demo trattano i dati: nessun cookie, nessun invio, nessun servizio esterno.', base: '', css: ['assets/base.css', 'assets/collection.css'], themeColor: '#1b1b1b'})
  + `<body class="collection privacy"><a class="skip" href="#main">Vai al contenuto</a><div class="demo-bar"><p>Raccolta privata · proposte indipendenti, non siti ufficiali</p><a href="proposte.html">Tutte le proposte</a></div>
<main id="main" class="privacy-main">
<p class="kicker">Nota privacy e cookie · ultimo aggiornamento 13 ottobre 2026</p>
<h1>Le demo non raccolgono dati.</h1>
<p class="col-lead">Queste pagine sono proposte grafiche statiche preparate da Filippo Antonio Visentin. Non sono i siti ufficiali delle attività e non trattano dati per loro conto.</p>
<h2>Cosa succede quando compili un modulo</h2>
<ul><li>Il modulo usa soltanto ciò che scrivi: argomento, domanda, eventualmente nome (facoltativo), un’esigenza e i dettagli che selezioni.</li><li>Il testo viene composto <strong>solo nel tuo browser</strong>, in memoria. Non viene inviato a nessun server, non viene salvato e non finisce nell’indirizzo della pagina. Chiudendo o ricaricando la pagina sparisce.</li><li>Sei tu a decidere cosa farne: copiarlo, scaricarlo come file di testo o, dove è indicato un indirizzo, aprirlo nel tuo programma di posta per controllarlo e inviarlo personalmente.</li><li>Non inserire dati sensibili (salute, documenti, dati di pagamento). Nessuna demo conferma ordini, prenotazioni o appuntamenti.</li></ul>
<h2>Cookie e archiviazione</h2>
<p>Le demo <strong>non usano cookie</strong>, né <code>localStorage</code>, <code>sessionStorage</code> o altri archivi del browser, né strumenti di statistica. Non serve quindi alcun banner di consenso.</p>
<h2>Servizi di terze parti</h2>
<p>Caratteri, script, stili e illustrazioni sono serviti dallo stesso sito: nessun font, mappa, video o widget viene caricato da altri server. Una regola di sicurezza (Content Security Policy) impedisce alle pagine di contattare servizi esterni.</p>
<p>Alcuni collegamenti portano fuori dalla demo (fonti delle informazioni, indicazioni stradali su Google Maps): si aprono in una nuova scheda solo se li scegli, senza trasmettere l’indirizzo della pagina di provenienza. Da quel momento valgono le informative di quei siti.</p>
<h2>Età</h2>
<p>Le demo non promuovono né vendono tabacco, alcolici o gioco. Nelle pagine dei bar, se una domanda riguarda prodotti riservati ai maggiorenni, viene chiesto di confermare di avere almeno 18 anni prima di preparare la bozza; la conferma non viene registrata.</p>
<h2>Contenuti</h2>
<p>Indirizzi e telefoni provengono da fonti pubbliche indicate in ogni pagina e possono non essere aggiornati. Prezzi, orari, disponibilità e servizi non sono riportati e vanno confermati con le attività.</p>
<p><a class="go" href="proposte.html">Torna alle proposte <span aria-hidden="true">→</span></a></p>
</main></body></html>`;
}
