var test = require('test-kit').tape()
var bh = require('.')

test('binfo', function(t) {
    t.tableAssert(
        [
            [ 'p',         'msg',          'exp'                                  ],
            [ 0x10009,      null,
                [
                    '𐀉',
                    'code-point :  00.01.00.09 | 0000 0000 : 0000 0001 : 0000 0000 : 0000 1001',
                    'utf8       :  F0.90.80.89 | 1111 0000 : 1001 0000 : 1000 0000 : 1000 1001',
                    'utf16      :  D8.00.DC.09 | 1101 1000 : 0000 0000 : 1101 1100 : 0000 1001',
                    '',
                ]
            ],
            [ 'e',          'the letter e',
                [
                    'e',
                    'code-point :  00.00.00.65 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0101 | the letter e',
                    '',
                ]
            ],
        ],
        function(p, msg) {
            var hec = t.hector()
            bh.binfo(p, msg, {log: hec} )
            return hec.arg(0)
        }
    )
})

test('code_points', function(t) {
    t.tableAssert([
        [ 'v',              'exp' ],
        [ '𐀉',              [0x10009] ],
        [ 'abc',            [0x61, 0x62, 0x63] ],
    ], bh.code_points )
})

