// The examples and comments here were taken from mozilla.org's description of
// the String.prototype.normalize() function:
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
//
// We apply bithelp to print out the information in more detail.
//
// The forms shown are:
//
//     NFC — Normalization Form Canonical Composition.
//     NFD — Normalization Form Canonical Decomposition.
//     NFKC — Normalization Form Compatibility Composition.
//     NFKD — Normalization Form Compatibility Decomposition.
//

var info = require('.').utfinfo

function normalize (s, form) {
  info(s.normalize(form), 'form: ' + form)
}

// Initial string

// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
var s = '\u1E9B\u0323'

// Canonically-composed form (NFC)

// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
normalize(s, 'NFC')
normalize(s)

// Canonically-decomposed form (NFD)

// U+017F: LATIN SMALL LETTER LONG S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
normalize(s, 'NFD')

// Compatibly-composed (NFKC)

// U+1E69: LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE
normalize(s, 'NFKC')

// Compatibly-decomposed (NFKD)

// U+0073: LATIN SMALL LETTER S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
normalize(s, 'NFKD')

// OUTPUT (special characters (quotes below) may or may not display well depending on the
// applicaiton used).
//
// ==============================================================================
// 2 code points for " ẛ̣ ", form: NFC
// -----------
//     (1/2) " ẛ ":
// code-point :  00.00.1E.9B | 0000 0000 : 0000 0000 : 0001 1110 : 1001 1011
// utf8       :  00.E1.BA.9B | 0000 0000 : 1110 0001 : 1011 1010 : 1001 1011
// -----------
//     (2/2) " ̣ ":
// code-point :  00.00.03.23 | 0000 0000 : 0000 0000 : 0000 0011 : 0010 0011
// utf8       :  00.00.CC.A3 | 0000 0000 : 0000 0000 : 1100 1100 : 1010 0011
// -----------
// ==============================================================================
// 2 code points for " ẛ̣ ", form: undefined
// -----------
//     (1/2) " ẛ ":
// code-point :  00.00.1E.9B | 0000 0000 : 0000 0000 : 0001 1110 : 1001 1011
// utf8       :  00.E1.BA.9B | 0000 0000 : 1110 0001 : 1011 1010 : 1001 1011
// -----------
//     (2/2) " ̣ ":
// code-point :  00.00.03.23 | 0000 0000 : 0000 0000 : 0000 0011 : 0010 0011
// utf8       :  00.00.CC.A3 | 0000 0000 : 0000 0000 : 1100 1100 : 1010 0011
// -----------
// ==============================================================================
// 3 code points for " ẛ̣ ", form: NFD
// -----------
//     (1/3) " ſ ":
// code-point :  00.00.01.7F | 0000 0000 : 0000 0000 : 0000 0001 : 0111 1111
// utf8       :  00.00.C5.BF | 0000 0000 : 0000 0000 : 1100 0101 : 1011 1111
// -----------
//     (2/3) " ̣ ":
// code-point :  00.00.03.23 | 0000 0000 : 0000 0000 : 0000 0011 : 0010 0011
// utf8       :  00.00.CC.A3 | 0000 0000 : 0000 0000 : 1100 1100 : 1010 0011
// -----------
//     (3/3) " ̇ ":
// code-point :  00.00.03.07 | 0000 0000 : 0000 0000 : 0000 0011 : 0000 0111
// utf8       :  00.00.CC.87 | 0000 0000 : 0000 0000 : 1100 1100 : 1000 0111
// -----------
// ==============================================================================
// 1 code points for " ṩ ", form: NFKC
// -----------
//     (1/1) " ṩ ":
// code-point :  00.00.1E.69 | 0000 0000 : 0000 0000 : 0001 1110 : 0110 1001
// utf8       :  00.E1.B9.A9 | 0000 0000 : 1110 0001 : 1011 1001 : 1010 1001
// -----------
// ==============================================================================
// 3 code points for " ṩ ", form: NFKD
// -----------
//     (1/3) " s ":
// code-point :  00.00.00.73 | 0000 0000 : 0000 0000 : 0000 0000 : 0111 0011
// -----------
//     (2/3) " ̣ ":
// code-point :  00.00.03.23 | 0000 0000 : 0000 0000 : 0000 0011 : 0010 0011
// utf8       :  00.00.CC.A3 | 0000 0000 : 0000 0000 : 1100 1100 : 1010 0011
// -----------
//     (3/3) " ̇ ":
// code-point :  00.00.03.07 | 0000 0000 : 0000 0000 : 0000 0011 : 0000 0111
// utf8       :  00.00.CC.87 | 0000 0000 : 0000 0000 : 1100 1100 : 1000 0111
// -----------
