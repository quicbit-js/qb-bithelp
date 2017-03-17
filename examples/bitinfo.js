var bhelp = require('..')

bhelp.bitinfo('abcé', 'simple string')
bhelp.bitinfo('\u00E6', 'a ligature')
bhelp.bitinfo([ 0x10009, 0x10010 ], 'large (4-byte) characters')
bhelp.bitinfo('做法方便上手。', 'some chinese')
