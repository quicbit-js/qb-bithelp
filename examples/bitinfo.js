var bhelp = require('..')

bhelp.bitinfo('abcé', 'simple string')
bhelp.bitinfo('\u00E6', 'a ligature')
bhelp.bitinfo([ 0x10009, 0x10010 ], 'large (3-byte) characters')
bhelp.bitinfo('做法方便上手。', 'some chinese')
bhelp.bitinfo([
    0b01000010,
    0b01101001,
    0b01110100,
    0b01100011,
    0b01101111,
    0b01101001,
    0b01101110
], "Erlich's Shirt in Silicon Valley")
