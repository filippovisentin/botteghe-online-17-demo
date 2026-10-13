// Generates the 17 static demos, the collection index and the privacy note into dist/.
// Run: node build.mjs  — dist/ is rebuilt from scratch; never edit files in dist/ by hand.
import fs from 'node:fs';
import path from 'node:path';
import {pages} from './src/pages.mjs';
import {renderGallery} from './src/gallery.mjs';
import {renderPrivacy} from './src/privacy.mjs';
import {fonts, fontFaces} from './src/fonts.mjs';

const root = import.meta.dirname, out = path.join(root, 'dist');
const s = (title, body, category) => ({title, body, category});

/* Data. Only facts found in public sources (see `sources`); anything uncertain is stated as such.
   Never add prices, opening hours, reviews, products available today or affiliations. */
export const businesses = [
 {slug:'gambardella',name:'Cartoleria Gambardella',short:'Gambardella',category:'Cartoleria',group:'botteghe',address:'Viale Monza 61/A, Milano',phone:'02 26145923',email:'gambacarto@gmail.com',priority:'Prima proposta',
  intro:'Scuola, scrittura e creatività, insieme ai piccoli servizi che semplificano la giornata. Una cartoleria di famiglia in Viale Monza dal 1952.',
  filters:['Per la scuola','Per creare','Servizi pratici'],
  services:[s('Scuola e studio','Articoli per appunti, esercizi e nuove idee. Chiedi dei materiali che stai cercando.','Per la scuola'),s('Belle arti e hobbistica','Disegno e creatività, a livello scolastico e hobbistico.','Per creare'),s('Fotocopie e stampe','Fotocopie e stampa di email: descrivi il lavoro per conoscere modalità e costi.','Servizi pratici'),s('Rilegatura testi','Dai ordine alle tue pagine: chiedi quali soluzioni sono disponibili.','Servizi pratici,Per la scuola'),s('Scansioni e timbri','Documenti da digitalizzare e timbri da richiedere: parti da una domanda semplice.','Servizi pratici'),s('Scrittura e ufficio','Materiali per scrivere e organizzare la scrivania. Disponibilità da verificare in negozio.','Per creare,Servizi pratici')],
  story:'Fondata da Antonio Gambardella e Angioletta Daniotti, la cartoleria è cresciuta con il quartiere. Oggi la porta avanti Raffaele, figlio dei fondatori, con la nuova generazione della famiglia.',
  sources:[{href:'https://pentel.it/pentel-premium-shop/cartoleria-gambardella',label:'Scheda Pentel'},{href:'https://commercioday.it/gambardella-cartoleria-bottega-storica/',label:'Intervista CommercioDay'}]},
 {slug:'mango-esotico',name:'Mango Esotico',short:'Mango Esotico',category:'Gelateria',group:'botteghe',address:'Viale Monza 68, Milano',phone:'389 7830944',priority:'Alta priorità',
  intro:'Una gelateria di famiglia con un’anima tropicale, nel cuore di Viale Monza. Gusti da scoprire e torte semifredde per le occasioni da ricordare.',
  services:[s('Gusti tropicali','L’ispirazione esotica è il filo conduttore: chiedi quali gusti trovi oggi in gelateria.','Una pausa'),s('La tua pausa gelato','Parti da ciò che ti piace e scopri l’assortimento del giorno direttamente al banco.','Una pausa'),s('Torte semifredde','Un’idea per festeggiare. Dimensioni, composizione, allergeni e preavviso si concordano con la gelateria.','Un’occasione')],
  story:'Le fonti raccontano una conduzione familiare e un’identità esotica riconoscibile. Il sito può dare spazio a questa personalità, invece di limitarsi a una scheda con indirizzo e telefono.',
  sources:[{href:'https://www.ilgiorno.it/speciali/sport/lombardia-ecco-mango-esotico-un-7a4ee4c0',label:'Articolo Il Giorno'}]},
 {slug:'autofficina-giacosa',name:'Autofficina Giacosa',short:'Giacosa',category:'Autofficina',group:'artigiani',address:'Via Giuseppe Giacosa 51, Milano',phone:'02 2822866',priority:'Alta priorità',
  intro:'Un percorso semplice per trovare l’officina e spiegare di cosa ha bisogno la tua auto, prima di concordare un appuntamento.',
  services:[s('Chiedere un controllo','Descrivi il problema, quando si presenta e il modello dell’auto. L’officina valuterà il passo successivo.','La tua auto'),s('Informazioni sulla manutenzione','Hai una scadenza o una domanda? Prepara i dati del veicolo per parlarne con l’officina.','La tua auto'),s('Concordare una visita','Telefono e indicazioni. Giorno e orario si concordano direttamente, senza prenotazioni automatiche.','La tua visita')],
  story:'Per un’officina di quartiere il sito deve aiutare a fare il primo passo: capire dove andare, chi chiamare e quali informazioni preparare. Personale, specializzazioni, marchi e affiliazioni saranno inseriti solo dopo conferma.',
  sources:[{href:'https://www.tuttamilano.it/autofficina-giacosa-snc-milano-29160',label:'Scheda TuttaMilano'}]},
 {slug:'il-mio-calzolaio',name:'Il Mio Calzolaio',short:'Il Mio Calzolaio',category:'Calzolaio',group:'artigiani',address:'Via delle Leghe 14, Milano',phone:'334 1306153',priority:'Alta priorità',
  intro:'Una domanda sulle tue scarpe comincia in Via delle Leghe. Un contatto semplice per chiedere una valutazione, senza preventivi alla cieca.',
  services:[s('Valutare una riparazione','Racconta il problema e porta l’oggetto: la possibilità di intervenire la valuta il calzolaio.','Una valutazione'),s('Chiedere tempi e costi','Materiali e condizioni cambiano da caso a caso. Chiedi un parere diretto prima di decidere.','Una valutazione'),s('Trovare il laboratorio','Telefono e indicazioni in un unico punto, per organizzare la visita.','Una visita')],
  story:'Una riparazione si capisce guardando l’oggetto. Il sito accompagna verso un confronto diretto, senza promettere risultati o prezzi automatici. Una futura galleria potrà mostrare lavori reali, con foto autorizzate.',
  sources:[{href:'https://www.tuttamilano.it/calzolaio-milano-33041',label:'Scheda TuttaMilano'}]},
 {slug:'sergio-stagnoli',name:'Sergio Stagnoli',short:'Stagnoli',category:'Tappezzeria',group:'artigiani',address:'Via delle Leghe 16, Milano',phone:'02 2822594',priority:'Apertura da verificare',
  verify:'Prima di presentare il sito è necessario verificare che il laboratorio sia operativo: una scheda pubblica riporta la dicitura «attività cessata».',
  intro:'Una proposta per raccontare la tappezzeria in stoffa e pelle riportata dalle fonti. Il primo passo è un confronto sul tuo arredo.',
  services:[s('Un arredo da valutare','Descrivi l’arredo e l’intervento che hai in mente. Le lavorazioni possibili le conferma il laboratorio.','Il tuo progetto'),s('Stoffa o pelle','Un modo per organizzare il confronto su materiali e finiture, senza un catalogo non verificato.','Il tuo progetto'),s('Parlare con il laboratorio','Telefona prima di passare e verifica l’apertura.','Una visita')],
  story:'Il sito mette in primo piano il progetto e il dialogo sui materiali. Foto di lavori reali e descrizione del processo richiedono la collaborazione del laboratorio.',
  sources:[{href:'https://www.impresaitalia.info/kk05716306/stagnoli-sergio/milano.aspx',label:'Scheda ImpresaItalia'}]},
 {slug:'alby',name:'Alby Panificio & Pasticceria',short:'Alby',category:'Panificio e pasticceria',group:'botteghe',address:'Viale Monza 44, Milano',priority:'Recapito da verificare',
  phoneNote:'Le fonti riportano due cellulari diversi: il numero va confermato in negozio.',
  verify:'Le fonti pubbliche riportano telefoni discordanti: il recapito va confermato in negozio prima di pubblicarlo.',
  intro:'Pane e pasticceria in Viale Monza: una vetrina essenziale per scoprire il negozio e chiedere informazioni prima di passare.',
  services:[s('Pane e forno','Una vetrina per raccontare l’assortimento, con foto e disponibilità confermate dal negozio.','Ogni giorno'),s('Pasticceria','Uno spazio per presentare i prodotti reali e chiedere informazioni prima di passare.','Un’occasione'),s('Richieste per occasioni','Un percorso da attivare solo se il negozio desidera gestire richieste per feste o ritiri.','Un’occasione')],
  story:'L’identità del negozio può vivere attraverso foto dei suoi prodotti e informazioni chiare. Questa proposta usa illustrazioni e non introduce listini o servizi d’ordine.',
  sources:[{href:'https://www.tuttamilano.it/alby-panificio-pasticceria-milano-47750',label:'Scheda TuttaMilano'}]},
 {slug:'grissinificio-ambrosiano',name:'Grissinificio Ambrosiano',short:'Ambrosiano',category:'Grissinificio',group:'botteghe',address:'Via Natale Battaglia 2, Milano',phone:'02 2619937',priority:'Media priorità',
  intro:'Una vetrina per il Grissinificio Ambrosiano: il prodotto al centro, informazioni essenziali e un contatto diretto.',
  services:[s('Conoscere i prodotti','Chiedi quali prodotti trovi. Foto, ingredienti e assortimento si inseriscono dopo conferma.','I prodotti'),s('Una quantità particolare','Indica quantità e occasione: è il negozio a dire se può gestire la richiesta.','Una richiesta'),s('Passare in negozio','Indicazioni e telefono per verificare l’apertura prima della visita.','Una visita')],
  story:'Una presentazione curata e il dialogo diretto. Forniture per eventi o vendita all’ingrosso non vengono date per disponibili.',
  sources:[{href:'https://www.prontoimprese.it/impresa/milano/alimentari-vendita-al-dettaglio/grissinificio-ambrosiano',label:'Scheda ProntoImprese'}]},
 {slug:'bar-rondo',name:'Bar Rondò',short:'Rondò',category:'Bar',group:'botteghe',address:'Via Martiri Oscuri 15, Milano',phone:'02 2846394',priority:'Media priorità',age:true,
  intro:'Un bar di quartiere a gestione familiare, in Via Martiri Oscuri: le persone, le informazioni utili e il piacere di fermarsi.',
  services:[s('Scoprire il locale','Uno spazio per immagini e racconto del bar, con contenuti forniti dai gestori.','Il locale'),s('Informazioni per la visita','Telefono e indirizzo subito accessibili. Orari e offerta li conferma il locale.','Una visita'),s('Chiedere al bar','Un contatto diretto per domande sulla visita, senza prenotazioni automatiche.','Una visita')],
  story:'La gestione familiare è l’elemento raccontato dalle fonti. Il sito può affiancare i canali social esistenti con informazioni ordinate e facili da trovare.',
  sources:[{href:'https://zero.eu/it/luoghi/199178-bar-rondo,milano/',label:'Scheda Zero'}]},
 {slug:'varisco',name:'Bar Tabacchi Varisco',short:'Varisco',category:'Bar tabacchi',group:'botteghe',address:'Via Pietro Crespi 13, Milano',phone:'02 2847533',priority:'Media priorità',age:true,
  intro:'Un indirizzo di quartiere in Via Pietro Crespi: informazioni essenziali, un accesso diretto ai contatti e una storia da raccogliere con chi gestisce il locale.',
  services:[s('Il locale','Un racconto da completare con la storia e le foto confermate dai gestori.','Il locale'),s('Informazioni pratiche','Raccogliere in un unico luogo orari e recapiti aggiornati è il primo obiettivo.','Una visita'),s('Una domanda prima di passare','Chiedi direttamente al locale. I servizi specifici non sono elencati senza conferma.','Una visita')],
  story:'La proposta dà spazio alla storia del locale e alle informazioni utili. Non include vendita o promozione di prodotti del tabacco, né servizi non verificati.',
  sources:[{href:'https://zero.eu/it/luoghi/199167-bar-tabacchi-varisco,milano/',label:'Scheda Zero'}]},
 {slug:'bottega-delle-carni',name:'La Bottega delle Carni',short:'Bottega delle Carni',category:'Macelleria',group:'botteghe',address:'Via Venini 61, Milano',priority:'Telefono da chiarire',
  phoneNote:'Le fonti riportano due numeri diversi: il telefono va chiarito con la bottega.',
  verify:'Le fonti pubbliche riportano telefoni diversi: il contatto deve essere confermato prima di pubblicarlo.',
  intro:'Un modo semplice per conoscere la bottega e preparare una domanda prima della visita.',
  services:[s('Chiedere disponibilità','Racconta cosa cerchi. L’assortimento non viene dato per disponibile nella demo.','Una richiesta'),s('Una quantità particolare','Indica quantità e occasione: ogni richiesta si concorda in bottega.','Una richiesta'),s('Conoscere la bottega','Uno spazio futuro per foto reali, orari aggiornati e informazioni fornite dall’attività.','La bottega')],
  story:'Provenienze, prodotti, lavorazioni e servizi si raccontano soltanto dopo conferma della bottega.',
  sources:[{href:'https://www.tuttamilano.it/la-bottega-delle-carni-milano-38490',label:'Scheda TuttaMilano'}]},
 {slug:'salumeria-da-leo',name:'Salumeria da Leo',short:'Da Leo',category:'Salumeria',group:'botteghe',address:'Viale Monza 54, Milano · Mercato',phone:'02 2840150',priority:'Operatività da verificare',
  verify:'L’operatività dell’attività va verificata prima di presentare la demo.',
  intro:'Salumeria da Leo nel mercato di Viale Monza: una vetrina dedicata e le informazioni per arrivare al banco.',
  services:[s('Conoscere l’offerta','Una vetrina da completare con l’assortimento reale e le foto del banco.','I prodotti'),s('Preparare una domanda','Indica cosa cerchi. Disponibilità e quantità richiedono una conferma diretta.','Una richiesta'),s('Trovare il mercato','Telefono e indicazioni in primo piano. Verifica l’apertura prima di passare.','Una visita')],
  story:'Il rapporto con il quartiere al centro. Offerta, racconto e foto vanno raccolti con il titolare.',
  sources:[{href:'https://www.tuttamilano.it/salumeria-da-leo-milano-27366',label:'Scheda TuttaMilano'}]},
 {slug:'bar-bijoux',name:'Bar Bijoux',short:'Bijoux',category:'Bar',group:'botteghe',address:'Viale Monza 78, Milano',phone:'02 26140118',priority:'Media priorità',age:true,
  intro:'Una vetrina propria per il Bar Bijoux: il locale, le informazioni utili e un modo immediato per contattarlo.',
  services:[s('Il bar','Uno spazio da completare con foto e racconto reali del locale.','Il locale'),s('Organizzare la visita','Chiedi orari e informazioni: la demo non mostra aperture in tempo reale.','Una visita'),s('Un contatto diretto','Telefono e indicazioni a portata di mano, anche sullo schermo più piccolo.','Una visita')],
  story:'Menu, servizi e storia del bar si definiscono insieme ai gestori.',
  sources:[{href:'https://www.tuttamilano.it/bar-bijoux-milano-44003',label:'Scheda TuttaMilano'}]},
 {slug:'bar-verdi',name:'Bar Verdi',short:'Verdi',category:'Bar',group:'botteghe',address:'Via Venini 35, Milano',phone:'02 2846611',priority:'Media priorità',age:true,
  intro:'Bar Verdi in Via Venini 35: indirizzo e telefono subito, poi un percorso breve per organizzare la visita.',
  services:[s('Conoscere il bar','Una vetrina da riempire con foto reali e una descrizione approvata dai gestori.','Il locale'),s('Chiedere gli orari','Contatta il locale per sapere quando passare: nessun orario non verificato è pubblicato.','Una visita'),s('Trovare la strada','Indirizzo e contatto in un percorso semplice, pensato per il telefono.','Una visita')],
  story:'Il bar e la sua posizione, senza servizi non confermati. Nessuna promozione o prenotazione di attività di gioco.',
  sourceNote:'Fonte del recapito: elenco pubblico dei punti vendita di un concessionario e associazione di quartiere NoiZona2. Il link non è riportato per non promuovere servizi di gioco.',
  sources:[{href:'https://www.noizona2.it/chi-siamo/',label:'Associazione NoiZona2'}]},
 {slug:'sartoria-il-dragone',name:'Sartoria Il Dragone',short:'Il Dragone',category:'Sartoria',group:'artigiani',address:'Via Rovereto 5, Milano',priority:'Visita esplorativa',
  phoneNote:'Nessun recapito affidabile reperito: il primo contatto è una visita.',
  verify:'Recapiti, apertura e lavorazioni vanno raccolti direttamente con l’attività.',
  intro:'Una proposta esplorativa per Sartoria Il Dragone: dare spazio al lavoro sartoriale con un percorso per descrivere il proprio capo.',
  services:[s('Raccontare il capo','Descrivi il capo e cosa vorresti ottenere. Le lavorazioni effettive sono da confermare.','Il tuo progetto'),s('Parlare di una modifica','Un modo per organizzare la richiesta, senza promettere interventi specifici.','Il tuo progetto'),s('Conoscere la sartoria','La sede indicata dalle fonti è il punto di partenza per una verifica sul posto.','Una visita')],
  story:'Una sartoria si racconta con materiali, processo e capi reali. Questa è una bozza esplorativa da completare dopo un confronto con il laboratorio.',
  sources:[{href:'https://www.reteimprese.it/sartorie-forniture/milano/azienda/2212660',label:'Scheda ReteImprese'}]},
 {slug:'sartoria-marsilii',name:'Sartoria Arnaldo Marsilii',short:'Marsilii',category:'Sartoria',group:'artigiani',address:'Milano · sede da confermare',priority:'Sede da confermare',
  phoneNote:'Recapito da confermare insieme alla sede.',
  verify:'Le fonti indicano Via privata dei Cybo 1 e Via Venini 34: sede e apertura vanno confermate.',
  addresses:['Via privata dei Cybo 1, Milano','Via Venini 34, Milano'],
  intro:'Una proposta per presentare la Sartoria Arnaldo Marsilii e rendere più semplice il primo confronto su un capo.',
  services:[s('Il tuo capo','Prepara una descrizione del capo per parlarne con il laboratorio.','Il tuo progetto'),s('Una richiesta sartoriale','Spiega l’esigenza: fattibilità, tempi e costi richiedono una valutazione diretta.','Il tuo progetto'),s('Verificare la sede','Prima di una visita bisogna confermare indirizzo e apertura.','Una visita')],
  story:'L’identità della sartoria può emergere dal racconto del laboratorio e dai suoi lavori. La proposta non attribuisce specializzazioni o servizi non verificati.',
  sources:[{href:'https://www.overplace.com/lombardia/mi/milano/sartorie-per-uomo/sartoria-arnaldo-marsilii-di-maria-cristina-capuani.html',label:'Scheda Overplace'},{href:'https://sartist.it/sartoria-arnaldo-marsilii-di-maria-cristina-capuani-via-giulio-e-corrado-venini-milano/',label:'Scheda Sartist'}]},
 {slug:'calzoleria-taormina',name:'Calzoleria Taormina',short:'Taormina',category:'Calzoleria',group:'artigiani',address:'Viale Monza 120, Milano',phone:'342 6785366',priority:'Proposta condizionata',
  verify:'Va chiarito il rapporto con la presenza online di L’Antico Calzolaio prima di proporre un nuovo sito.',
  intro:'Una proposta dedicata alla sede di Viale Monza: informazioni utili e un contatto per chiedere una valutazione.',
  services:[s('Una valutazione','Racconta il problema e chiedi come portare l’oggetto in negozio.','Una valutazione'),s('Tempi e possibilità','Lavorazioni e costi si valutano sul caso concreto.','Una valutazione'),s('La sede di Viale Monza','Telefono e indirizzo facili da trovare.','Una visita')],
  story:'La proposta presenta la singola sede. Prima di usarla occorre chiarire la presenza online esistente e raccogliere foto e informazioni del negozio.',
  sources:[{href:'https://www.tuttamilano.it/calzoleria-taormina-milano-33052',label:'Scheda TuttaMilano'}]},
 {slug:'angolo-del-panettiere',name:'L’Angolo del Panettiere',short:'L’Angolo del Panettiere',category:'Panificio',group:'botteghe',address:'Piazza Morbegno 2, Milano',priority:'Recapito da verificare',
  phoneNote:'I telefoni pubblicati nel tempo non coincidono: il numero va confermato in negozio.',
  verify:'I telefoni pubblicati nel tempo non coincidono: il recapito va confermato in negozio.',
  intro:'L’Angolo del Panettiere, in Piazza Morbegno: una presenza semplice per raccontare il negozio e aiutare chi vuole passare.',
  services:[s('Conoscere i prodotti','Uno spazio da completare con l’assortimento reale e le foto del panificio.','I prodotti'),s('Chiedere informazioni','Prepara una domanda su ciò che cerchi, senza presumere disponibilità o servizi d’ordine.','Una richiesta'),s('Passare in piazza','L’indirizzo come punto di partenza. Recapiti e orari vanno aggiornati con il negozio.','Una visita')],
  story:'Prodotti, storia e servizi si definiscono con l’attività, senza informazioni aggiunte per riempire la pagina.',
  sources:[{href:'https://www.tuttiaffari.com/langolo-del-panettiere-340-648-2921',label:'Scheda TuttiAffari'}]}
];

// Rebuild dist/ from scratch so no stale hand-made file survives.
fs.rmSync(out, {recursive: true, force: true});
const write = (rel, content) => { const f = path.join(out, rel); fs.mkdirSync(path.dirname(f), {recursive: true}); fs.writeFileSync(f, content); };
const copyDir = (from, to) => fs.cpSync(path.join(root, from), path.join(out, to), {recursive: true});

copyDir('assets/fonts', 'assets/fonts');
write('assets/base.css', fs.readFileSync(path.join(root, 'assets/base.css'), 'utf8'));
write('assets/site.js', fs.readFileSync(path.join(root, 'assets/site.js'), 'utf8'));
for (const b of businesses) {
  if (!pages[b.slug]) { console.error('Pagina mancante: ' + b.slug); process.exitCode = 1; continue; }
  write(`assets/sites/${b.slug}.css`, fontFaces(fonts[b.slug]) + fs.readFileSync(path.join(root, 'assets/sites', b.slug + '.css'), 'utf8'));
  const p = pages[b.slug];
  write(`assets/icons/${b.slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="${p.icon[3] ?? 8}" fill="${p.icon[1]}"/><text x="20" y="28" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="700" fill="${p.icon[2]}">${p.icon[0]}</text></svg>`);
  write(`${b.slug}/index.html`, p.render(b, '../'));
}
write('index.html', pages.gambardella.render(businesses[0], ''));
write('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#1b1b1b"/><text x="20" y="28" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#f4c430">17</text></svg>');
write('assets/collection.css', fontFaces(Object.values(fonts).map(f => f[0]).filter((f, i, a) => a.findIndex(x => x.file === f.file) === i), 'fonts/') + fs.readFileSync(path.join(root, 'assets/collection.css'), 'utf8'));
write('proposte.html', renderGallery(businesses, pages));
write('privacy.html', renderPrivacy());
write('demo-manifest.json', JSON.stringify(businesses.map(({slug, name, category, priority}) => ({slug, name, category, priority})), null, 2));

const manifestPath = path.join(root, '.openai', 'hosting.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.static?.directory !== 'dist') { manifest.static = {directory: 'dist'}; fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n'); }
console.log(`Generati ${businesses.length} siti demo, l’indice proposte.html e privacy.html in dist/.`);
