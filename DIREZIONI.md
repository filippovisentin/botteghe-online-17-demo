# Diciassette identità, diciassette percorsi

Ogni attività ha un proprio modulo (`src/pages/<slug>.mjs`) con composizione, illustrazione SVG originale, favicon e locandina per l’indice, e un proprio foglio di stile (`assets/sites/<slug>.css`) con caratteri, colori e griglia. Le pagine condividono solo la meccanica: barra «demo indipendente», menu, modulo per la bozza locale, piè di pagina con fonti e privacy (`src/lib.mjs`, `assets/base.css`, `assets/site.js`).

| N. | Attività | Linguaggio visivo | Caratteri | Ordine del percorso | Interazione propria |
|---|---|---|---|---|---|
| 01 | Gambardella | Rivista di carta: testata, strilli di copertina, sommario con numeri di pagina, doppia pagina blu «1952» | Playfair Display + Libre Franklin | Copertina → sommario → racconto di famiglia → lettera → colophon | Filtri del sommario, evidenziatore animato, email precompilata |
| 02 | Mango Esotico | Manifesto tropicale arancio, sole a raggi, bollino rotante, forme ad adesivo | Shrikhand + Nunito | Manifesto → «che momento è?» → planner torta (biglietto) → famiglia → «ci vediamo al 68» | Selettore pausa/festa, coni «gusto da scoprire» |
| 03 | Giacosa | Cruscotto scuro, verde lime e ambra, griglia tecnica | Barlow Condensed + IBM Plex Mono | Telefono subito → problema → spie → percorsi P-01… → scheda veicolo → tre passaggi → «51» | Spie del cruscotto selezionabili che compilano la scheda |
| 04 | Il Mio Calzolaio | Oggetto protagonista: grande scarpa, cuciture tratteggiate, cartellino, scatola | DM Serif Display + DM Sans | Scarpa → «prima di sostituire, chiedi» → cartellino di valutazione → etichetta della scatola | Punti sulla scarpa (tacco, suola, tomaia…) collegati al cartellino |
| 05 | Stagnoli | Studio d’interni: lino, oliva, terracotta, tessere da moodboard | Cormorant Garamond + Jost | Verifica apertura → poltrona → campionario → moodboard → brief arredo → telefonata | La poltrona cambia rivestimento (stoffa, pelle, neutro) |
| 06 | Alby | Pagina divisa: metà pane chiara, metà dolce cioccolato e rosa, sigillo centrale | Yeseva One + Karla | Pane/dolce → visita al 44 (telefono da verificare) → cartellini senza listino → promemoria | Selettore che allarga la metà scelta |
| 07 | Ambrosiano | Manifesto tipografico su carta kraft: le «I» di GRISSINI sono grissini | Anton + Work Sans | Manifesto → scheda prodotto onesta («da confermare») → «quanti ne servono?» → foglio di domanda → negozio | Scelta della quantità come domanda |
| 08 | Rondò | Composizione circolare: anello di testo rotante, lune, tavolino visto dall’alto | Comfortaa + Nunito Sans | Cerchio → famiglia prima del caffè → «intorno a un incontro» → indirizzo → sottobicchiere | Anello rotante, conferma 18+ |
| 09 | Varisco | Giornale di quartiere: testata gotica, colonne, incisione della facciata | UnifrakturMaguntia + Old Standard TT | Prima pagina → «la storia da scrivere» → rubriche → avviso ai lettori → lettere al locale | Conferma 18+, nessuna promozione del tabacco |
| 10 | Bottega delle Carni | Quaderno di cucina a righe, margine rosso, penna blu, post-it, schede con nastro | Caveat + Courier Prime | Appunti → modulo subito (esigenza prima della vetrina) → schede → bottega | Elenco di cose da chiedere che diventa dettaglio della bozza |
| 11 | Da Leo | Banco del mercato: tenda a strisce, insegna in legno, lavagna | Alfa Slab One + Rubik | Insegna e lavagna (operatività da verificare) → arrivare al banco → il banco → lista della spesa → quartiere | Lista di domande con caselle |
| 12 | Bijoux | Scrigno: velluto scuro, cornice dorata doppia, gemma sfaccettata | Bodoni Moda + Mulish | Insegna → visita e telefono al centro → cassetti → messaggio | Cassetti apribili, conferma 18+ |
| 13 | Verdi | Segnaletica urbana: targa della via, civico 35, cartelli direzionali, cartello giallo «orari da confermare» | Overpass | Targa e cartelli → informazioni → percorso a fermate → domanda | Cartelli-link, conferma 18+, nessun gioco |
| 14 | Il Dragone | Cartamodello: carta puntinata, righelli, drittofilo, tacche, coordinate | Space Mono + Space Grotesk | Pezzo A-01 → scheda del capo B-02 → progetto C-03 → visita esplorativa D-04 | Punto di partenza selezionabile, cucitura animata |
| 15 | Marsilii | Fascicolo sartoriale: cartoncino avorio, monogramma, timbro «sede da confermare» | Cinzel + EB Garamond | Fascicolo → I. sede (due indirizzi da confermare) → II. fogli → III. appunti | Fogli apribili |
| 16 | Taormina | Itinerario: cippo «120», impronte sul percorso, bordo a maiolica | Big Shoulders Display + Archivo | Proposta condizionata → «il prossimo passo» → itinerario in 4 tappe → scheda oggetto → la sede | Impronte animate |
| 17 | L’Angolo del Panettiere | Geometria dell’angolo: taglio a 45°, insegna inclinata, edificio d’angolo, triangoli | Bagel Fat One + Figtree | Insegna → la piazza (recapito da verificare) → domande → promemoria visita | Promemoria con le cose da chiedere |

Indice `proposte.html`: ogni scheda è una locandina in miniatura dell’apertura della demo (stesso carattere, colori e motivo), con filtri e ricerca.

Immagini: illustrazioni originali dimostrative. Nessun prezzo, orario, recensione o servizio nuovo attribuito. Recapiti incerti e stato operativo restano espliciti. I moduli producono bozze locali, senza invii o prenotazioni. Analisi di sicurezza, privacy e accessibilità in `ANALISI.md`.
