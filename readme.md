# qb-bithelp

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![bitHound Dependencies][proddep-image]][proddep-link]
[![dev dependencies][devdep-image]][devdep-link]
[![code analysis][code-image]][code-link]

[npm-image]:       https://img.shields.io/npm/v/qb-bithelp.svg
[downloads-image]: https://img.shields.io/npm/dm/qb-bithelp.svg
[npm-url]:         https://npmjs.org/package/qb-bithelp
[proddep-image]:   https://www.bithound.io/github/quicbit-js/qb-bithelp/badges/dependencies.svg
[proddep-link]:    https://www.bithound.io/github/quicbit-js/qb-bithelp/master/dependencies/npm
[devdep-image]:    https://www.bithound.io/github/quicbit-js/qb-bithelp/badges/devDependencies.svg
[devdep-link]:     https://www.bithound.io/github/quicbit-js/qb-bithelp/master/dependencies/npm
[code-image]:      https://www.bithound.io/github/quicbit-js/qb-bithelp/badges/code.svg
[code-link]:       https://www.bithound.io/github/quicbit-js/qb-bithelp


Functions for viewing and understanding binary encodings.

**Complies with the 100% test coverage and minimum dependency requirements** of 
[qb-standard](http://github.com/quicbit-js/qb-standard) . 


# Install:

    npm install qb-bithelp
    
# Usage

## utfinfo( string_or_code_points, options )

Print hex/bit information for a raw (code-point), UTF-8, and UTF-16 encodings.  

    string_or_code_points: a single UTF code point (integer), an array of code points, or a string
    options:
        log:   (default is console.log) set this to a function (takes single string input) to provide your own logger to capture output.
             

To highlight special cases, utfinfo only prints the 'interesting' stuff.  That is, 
it will print UTF-8 only if it is different from the code-point (e.g. non-ascii) and will 
print UTF-16 only if it is different from UTF-8 ()has hi/lo surrogates).

Again, utfinfo() takes a variety of inputs - array of code points, single code-point
or string:

    var bhelp = require('qb-bithelp');
    
    bhelp.utfinfo('e',                  'simple ascii');
    bhelp.utfinfo('\u00E6',             'a ligature');
    bhelp.utfinfo([ 0x10009, 0x10010 ], 'large (3-byte) characters' );
    bhelp.utfinfo('做法方。',            'some chinese');
    
... gives the output:

    ==============================================================================
    1 code point for " e ", simple ascii
        -----------
        (1/1) " e ":
        point :  00.00.00.65 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0101
        -----------
    ==============================================================================
    1 code point for " æ ", a ligature
        -----------
        (1/1) " æ ":
        point :  00.00.00.E6 | 0000 0000 : 0000 0000 : 0000 0000 : 1110 0110
        utf8  :  00.00.C3.A6 | 0000 0000 : 0000 0000 : 1100 0011 : 1010 0110
        -----------
    ==============================================================================
    2 code points for " 𐀉𐀐 ", large (3-byte) characters
        -----------
        (1/2) " 𐀉 ":
        point :  00.01.00.09 | 0000 0000 : 0000 0001 : 0000 0000 : 0000 1001
        utf8  :  F0.90.80.89 | 1111 0000 : 1001 0000 : 1000 0000 : 1000 1001
        utf16 :  D8.00.DC.09 | 1101 1000 : 0000 0000 : 1101 1100 : 0000 1001
        -----------
        (2/2) " 𐀐 ":
        point :  00.01.00.10 | 0000 0000 : 0000 0001 : 0000 0000 : 0001 0000
        utf8  :  F0.90.80.90 | 1111 0000 : 1001 0000 : 1000 0000 : 1001 0000
        utf16 :  D8.00.DC.10 | 1101 1000 : 0000 0000 : 1101 1100 : 0001 0000
        -----------
    ==============================================================================
    4 code points for " 做法方。 ", some chinese
        -----------
        (1/4) " 做 ":
        point :  00.00.50.5A | 0000 0000 : 0000 0000 : 0101 0000 : 0101 1010
        utf8  :  00.E5.81.9A | 0000 0000 : 1110 0101 : 1000 0001 : 1001 1010
        -----------
        (2/4) " 法 ":
        point :  00.00.6C.D5 | 0000 0000 : 0000 0000 : 0110 1100 : 1101 0101
        utf8  :  00.E6.B3.95 | 0000 0000 : 1110 0110 : 1011 0011 : 1001 0101
        -----------
        (3/4) " 方 ":
        point :  00.00.65.B9 | 0000 0000 : 0000 0000 : 0110 0101 : 1011 1001
        utf8  :  00.E6.96.B9 | 0000 0000 : 1110 0110 : 1001 0110 : 1011 1001
        -----------
        (4/4) " 。 ":
        point :  00.00.30.02 | 0000 0000 : 0000 0000 : 0011 0000 : 0000 0010
        utf8  :  00.E3.80.82 | 0000 0000 : 1110 0011 : 1000 0000 : 1000 0010
        -----------


**Note that if you see quoted " ????? " or similar output** in your browser or editor, it is because it
doesn't handle those characters correctly.  A viewer that supports encodings will show
characters.
        
## bitinfo( string_or_code_points, options )

Takes same types of input and <code>options</code> as <code>utfinfo()</code> but just prints the raw code-point 
information:

    var bhelp = require('qb-bithelp');

    bhelp.bitinfo( 'abcé',                  'simple string');
    bhelp.bitinfo( '\u00E6',                'a ligature');
    bhelp.bitinfo( [ 0x10009, 0x10010 ],    'large (3-byte) characters' );
    bhelp.bitinfo( '做法方便上手。',          'some chinese' );
    
... gives the output:

    point :  00.00.00.61 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0001 | " a " : simple string
    point :  00.00.00.62 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0010 | " b " : simple string
    point :  00.00.00.63 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0011 | " c " : simple string
    point :  00.00.00.E9 | 0000 0000 : 0000 0000 : 0000 0000 : 1110 1001 | " é " : simple string
    point :  00.00.00.E6 | 0000 0000 : 0000 0000 : 0000 0000 : 1110 0110 | " æ " : a ligature
    point :  00.01.00.09 | 0000 0000 : 0000 0001 : 0000 0000 : 0000 1001 | " 𐀉 " : large (3-byte) characters
    point :  00.01.00.10 | 0000 0000 : 0000 0001 : 0000 0000 : 0001 0000 | " 𐀐 " : large (3-byte) characters
    point :  00.00.50.5A | 0000 0000 : 0000 0000 : 0101 0000 : 0101 1010 | " 做 " : some chinese
    point :  00.00.6C.D5 | 0000 0000 : 0000 0000 : 0110 1100 : 1101 0101 | " 法 " : some chinese
    point :  00.00.65.B9 | 0000 0000 : 0000 0000 : 0110 0101 : 1011 1001 | " 方 " : some chinese
    point :  00.00.4F.BF | 0000 0000 : 0000 0000 : 0100 1111 : 1011 1111 | " 便 " : some chinese
    point :  00.00.4E.0A | 0000 0000 : 0000 0000 : 0100 1110 : 0000 1010 | " 上 " : some chinese
    point :  00.00.62.4B | 0000 0000 : 0000 0000 : 0110 0010 : 0100 1011 | " 手 " : some chinese
    point :  00.00.30.02 | 0000 0000 : 0000 0000 : 0011 0000 : 0000 0010 | " 。 " : some chinese
