// Self-hosted open-source typefaces (SIL Open Font License, files from Fontsource).
// No font is requested from third-party servers. First entry = display face (used by the index too).
const f = (family, file, variants) => ({family, file, variants});
export const fonts = {
  gambardella: [f('Playfair Display', 'playfair-display', ['400-normal', '700-normal', '400-italic']), f('Libre Franklin', 'libre-franklin', ['400-normal', '600-normal'])],
  'mango-esotico': [f('Shrikhand', 'shrikhand', ['400-normal']), f('Nunito', 'nunito', ['400-normal', '800-normal'])],
  'autofficina-giacosa': [f('Barlow Condensed', 'barlow-condensed', ['600-normal', '800-normal']), f('IBM Plex Mono', 'ibm-plex-mono', ['400-normal', '600-normal'])],
  'il-mio-calzolaio': [f('DM Serif Display', 'dm-serif-display', ['400-normal', '400-italic']), f('DM Sans', 'dm-sans', ['400-normal', '700-normal'])],
  'sergio-stagnoli': [f('Cormorant Garamond', 'cormorant-garamond', ['500-normal', '500-italic']), f('Jost', 'jost', ['400-normal', '500-normal'])],
  alby: [f('Yeseva One', 'yeseva-one', ['400-normal']), f('Karla', 'karla', ['400-normal', '700-normal'])],
  'grissinificio-ambrosiano': [f('Anton', 'anton', ['400-normal']), f('Work Sans', 'work-sans', ['400-normal', '600-normal'])],
  'bar-rondo': [f('Comfortaa', 'comfortaa', ['700-normal']), f('Nunito Sans', 'nunito-sans', ['400-normal', '700-normal'])],
  varisco: [f('UnifrakturMaguntia', 'unifrakturmaguntia', ['400-normal']), f('Old Standard TT', 'old-standard-tt', ['400-normal', '700-normal', '400-italic'])],
  'bottega-delle-carni': [f('Caveat', 'caveat', ['500-normal', '700-normal']), f('Courier Prime', 'courier-prime', ['400-normal', '700-normal'])],
  'salumeria-da-leo': [f('Alfa Slab One', 'alfa-slab-one', ['400-normal']), f('Rubik', 'rubik', ['400-normal', '600-normal'])],
  'bar-bijoux': [f('Bodoni Moda', 'bodoni-moda', ['400-normal', '600-normal', '400-italic']), f('Mulish', 'mulish', ['400-normal', '700-normal'])],
  'bar-verdi': [f('Overpass', 'overpass', ['400-normal', '800-normal'])],
  'sartoria-il-dragone': [f('Space Mono', 'space-mono', ['400-normal', '700-normal']), f('Space Grotesk', 'space-grotesk', ['400-normal', '600-normal'])],
  'sartoria-marsilii': [f('Cinzel', 'cinzel', ['400-normal', '600-normal']), f('EB Garamond', 'eb-garamond', ['400-normal', '400-italic'])],
  'calzoleria-taormina': [f('Big Shoulders Display', 'big-shoulders-display', ['600-normal', '800-normal']), f('Archivo', 'archivo', ['400-normal', '700-normal'])],
  'angolo-del-panettiere': [f('Bagel Fat One', 'bagel-fat-one', ['400-normal']), f('Figtree', 'figtree', ['400-normal', '700-normal'])]
};
export function fontFaces(list, prefix = '../fonts/') {
  return list.flatMap(({family, file, variants}) => variants.map(v => {
    const [weight, style] = v.split('-');
    return `@font-face{font-family:"${family}";src:url("${prefix}${file}-latin-${v}.woff2") format("woff2");font-weight:${weight};font-style:${style};font-display:swap}`;
  })).join('\n') + '\n';
}
