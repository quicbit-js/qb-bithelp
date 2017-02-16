# qb-bithelp

Functions for viewing and understanding binary encodings.

Install:

    npm install qb-bithelp
    

var bhelp = require('qb-bithelp')


    bhelp.utfinfo('abc')

    > code-point :  00.00.00.61 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0001 | a
    > code-point :  00.00.00.62 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0010 | b
    > code-point :  00.00.00.63 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0011 | c
