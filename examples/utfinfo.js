var bhelp = require('..')

bhelp.utfinfo('e',                  'simple ascii');
bhelp.utfinfo('\u00E6',             'a ligature');
bhelp.utfinfo([ 0x10009, 0x10010 ], 'large (4-byte) characters' );
bhelp.utfinfo('做法方。',            'some chinese');
