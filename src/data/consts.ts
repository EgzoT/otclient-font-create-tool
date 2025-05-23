const cp1252: number[][] = [
    [  32,   33,   34,   35,   36,   37,   38,   39,   40,   41,   42,   43,   44,   45,   46,   47],
    [  48,   49,   50,   51,   52,   53,   54,   55,   56,   57,   58,   59,   60,   61,   62,   63],
    [  64,   65,   66,   67,   68,   69,   70,   71,   72,   73,   74,   75,   76,   77,   78,   79],
    [  80,   81,   82,   83,   84,   85,   86,   87,   88,   89,   90,   91,   92,   93,   94,   95],
    [  96,   97,   98,   99,  100,  101,  102,  103,  104,  105,  106,  107,  108,  109,  110,  111],
    [ 112,  113,  114,  115,  116,  117,  118,  119,  120,  121,  122,  123,  124,  125,  126, 9633],
    [8364, 9633, 8218,  402, 8222, 8230, 8224,  225,  710, 8240,  352, 8249,  338, 9633,  381, 9633],
    [9633, 8216, 8217, 8220, 8221, 8226, 8211, 8212,  732, 8482,  353, 8250,  339, 9633,  382,  376],
    [  32,  161,  162,  163,  164,  165,  166,  167,  168,  169,  170,  171,  172,   32,  174,  175],
    [ 176,  177,  178,  179,  180,  181,  182,  183,  184,  185,  186,  187,  188,  189,  190,  191],
    [ 192,  193,  194,  195,  196,  197,  198,  199,  200,  201,  202,  203,  204,  205,  206,  207],
    [ 208,  209,  210,  211,  212,  213,  214,  215,  216,  217,  218,  219,  220,  221,  222,  223],
    [ 224,  225,  226,  227,  228,  229,  230,  231,  232,  233,  234,  235,  236,  237,  238,  239],
    [ 240,  241,  242,  243,  244,  245,  246,  247,  248,  249,  250,  251,  252,  253,  254,  255]
];

const cp1250: number[][] = [
    [  32,   33,   34,   35,   36,   37,   38,   39,   40,   41,   42,   43,   44,   45,   46,   47],
    [  48,   49,   50,   51,   52,   53,   54,   55,   56,   57,   58,   59,   60,   61,   62,   63],
    [  64,   65,   66,   67,   68,   69,   70,   71,   72,   73,   74,   75,   76,   77,   78,   79],
    [  80,   81,   82,   83,   84,   85,   86,   87,   88,   89,   90,   91,   92,   93,   94,   95],
    [  96,   97,   98,   99,  100,  101,  102,  103,  104,  105,  106,  107,  108,  109,  110,  111],
    [ 112,  113,  114,  115,  116,  117,  118,  119,  120,  121,  122,  123,  124,  125,  126, 9633],
    [8364, 9633, 8218, 9633, 8222, 8230, 8224, 8225, 9633, 8240,  352, 8249,  346,  356,  381,  377],
    [9633, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 9633, 8482,  353, 8250,  347,  357,  382,  378],
    [  32,  711,  728,  321,  164,  260,  166,  167,  168,  169,  350,  171,  172,   32,  174,  379],
    [ 176,  177,  731,  322,  180,  181,  182,  183,  184,  261,  351,  187,  317,  733,  318,  380],
    [ 340,  193,  194,  258,  196,  313,  262,  199,  268,  201,  280,  203,  282,  205,  206,  270],
    [ 272,  323,  327,  211,  212,  336,  214,  215,  344,  366,  218,  368,  220,  221,  354,  223],
    [ 341,  225,  226,  259,  228,  314,  263,  231,  269,  233,  281,  235,  283,  237,  238,  271],
    [ 273,  324,  328,  243,  244,  337,  246,  247,  345,  367,  250,  369,  252,  253,  355,  729]
];

const cp932: number[][] = [
    [   32,    33,    34,    35,    36,    37,    38,    39,    40,    41,    42,    43,    44,    45,    46,    47],
    [   48,    49,    50,    51,    52,    53,    54,    55,    56,    57,    58,    59,    60,    61,    62,    63],
    [   64,    65,    66,    67,    68,    69,    70,    71,    72,    73,    74,    75,    76,    77,    78,    79],
    [   80,    81,    82,    83,    84,    85,    86,    87,    88,    89,    90,    91,    92,    93,    94,    95],
    [   96,    97,    98,    99,   100,   101,   102,   103,   104,   105,   106,   107,   108,   109,   110,   111],
    [  112,   113,   114,   115,   116,   117,   118,   119,   120,   121,   122,   123,   124,   125,   126,   127],
    [  128,   129,   130,   131,   132,   133,   134,   135,   136,   137,   138,   139,   140,   141,   142,   143],
    [  144,   145,   146,   147,   148,   149,   150,   151,   152,   153,   154,   155,   156,   157,   158,   159],
    [  160, 65377, 65378, 65379, 65380, 65381, 65382, 65383, 65384, 65385, 65386, 65387, 65388, 65389, 65390, 65391],
    [65392, 65393, 65394, 65395, 65396, 65397, 65398, 65399, 65400, 65401, 65402, 65403, 65404, 65405, 65406, 65407],
    [65408, 65409, 65410, 65411, 65412, 65413, 65414, 65415, 65416, 65417, 65418, 65419, 65420, 65421, 65422, 65423],
    [65424, 65425, 65426, 65427, 65428, 65429, 65430, 65431, 65432, 65433, 65434, 65435, 65436, 65437, 65438, 65439],
    [  224,   225,   226,   227,   228,   229,   230,   231,   232,   233,   234,   235,   236,   237,   238,   239],
    [  240,   241,   242,   243,   244,   245,   246,   247,   248,   249,   250,   251,   252,   253,   254,   255]
];

export const charsetOptions: { value: number[][], label: string }[] = [
    { value: cp1252, label: 'cp1252' },
    { value: cp1250, label: 'cp1250' },
    { value: cp932,  label: 'cp932'  }
];
