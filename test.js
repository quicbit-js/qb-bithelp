var test = require('test-kit').tape()
var bh = require('.')

test('utfinfo', function(t) {
    t.tableAssert(
        [
            [ 'p',         'msg',          'exp'                                  ],
            [ 'e',          'the letter e',
                [
                    'e',
                    'code-point :  00.00.00.65 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0101 | the letter e',
                    '',
                ]
            ],
            [ 'é',          null,
                [
                    'é',
                    'code-point :  00.00.00.E9 | 0000 0000 : 0000 0000 : 0000 0000 : 1110 1001',
                    'utf8       :  00.00.C3.A9 | 0000 0000 : 0000 0000 : 1100 0011 : 1010 1001',
                    '',
                ]
            ],
            [ 0x10009,      null,
                [
                    '𐀉',
                    'code-point :  00.01.00.09 | 0000 0000 : 0000 0001 : 0000 0000 : 0000 1001',
                    'utf8       :  F0.90.80.89 | 1111 0000 : 1001 0000 : 1000 0000 : 1000 1001',
                    'utf16      :  D8.00.DC.09 | 1101 1000 : 0000 0000 : 1101 1100 : 0000 1001',
                    '',
                ]
            ],
        ],
        function(v, msg) {
            var hec = t.hector()
            bh.utfinfo(v, msg, {log: hec} ) // collect log messages
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

test('bitinfo', function(t) {
    t.tableAssert([
        [ 'v',                      'exp' ],
        [ 'abc',
            [
                'code-point :  00.00.00.61 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0001 | a',
                'code-point :  00.00.00.62 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0010 | b',
                'code-point :  00.00.00.63 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0011 | c',
            ]
        ],
        [ [ 0x61, 0x62, 0x63 ],
            [
                'code-point :  00.00.00.61 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0001 | a',
                'code-point :  00.00.00.62 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0010 | b',
                'code-point :  00.00.00.63 | 0000 0000 : 0000 0000 : 0000 0000 : 0110 0011 | c',
            ]
        ],
        [ 0x10009,
            [
                'code-point :  00.01.00.09 | 0000 0000 : 0000 0001 : 0000 0000 : 0000 1001 | 𐀉'
            ]
        ],
    ], function(v, msg) {
        var hec = t.hector()
        bh.bitinfo(v, msg, {log: hec})  // collect log messages
        return hec.arg(0)
    })
})