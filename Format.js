/*****
 *
 * FromHex:  Modified From StackOverFlow Question:#10121507 Response:Joel Lundberg
 *
 * FromUTF8: Modified From crypto-js Site: http://code.google.com/p/crypto-js/source/browse/branches/2.x/src/Crypto.js?r=429
 *
 * ToUTF8: Modified From crypto-js Site: http://code.google.com/p/crypto-js/source/browse/branches/2.x/src/Crypto.js?r=429
 *
 * ToBase64: Taken From crypto-js Site: http://code.google.com/p/crypto-js/source/browse/branches/2.x/src/Crypto.js?r=429
 *
 * FromBase64: Taken From crypto-js Site: http://code.google.com/p/crypto-js/source/browse/branches/2.x/src/Crypto.js?r=429
 *
 ******/

/***
        Copyright 2013 Robert Gross


        Permission is hereby granted, free of charge, to any person obtaining
        a copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:

        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
        LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
        OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
        WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*****/

var FormatClass =
{
    Format: function ()
    {
        //Data Holders
        FormatClass.Format.HexTable =  [];
        FormatClass.Format.Base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        //Static Methods
        FormatClass.Format.prototype.ToEpoche =         function()  {
                                                                    return(Math.round((arguments[0].getTime())/1000));
                                                                }

        FormatClass.Format.prototype.ToDateTime =       function()  {
                                                                    return(Date(arguments[0]));
                                                                }

        FormatClass.Format.prototype.ToHex =            function()  {
                                                                    var str = "";
                                                                    for (var i = 0; i < arguments[0].length; i++){
                                                                        var firstDigit = (arguments[0][i] > 16) ? firstDigit = Math.floor(arguments[0][i]/16) : 0;
                                                                        str += FormatClass.Format.HexTable[firstDigit];
                                                                        str += FormatClass.Format.HexTable[Math.abs(arguments[0][i] - firstDigit*16)];
                                                                    }

                                                                    return str;
                                                                }

        FormatClass.Format.prototype.FromHex =          function()  {
                                                                    var a = [];
                                                                    for (var i = 0; i < arguments[0].length; i += 2) {
                                                                        a.push(parseInt(("0x" + arguments[0].substr(i, 2)),16));}
                                                                    return a;
                                                                }

        FormatClass.Format.prototype.ToBase64 =         function()  {
                                                                    // Use browser-native function if it exists
                                                                    if (typeof btoa == "function")
                                                                    {
                                                                        for (var str = [], i = 0; i < arguments[0].length; i++)
                                                                            str.push(String.fromCharCode(arguments[0][i]));
                                                                        return btoa(str.join(""));
                                                                    }

                                                                    for(var base64 = [], i = 0; i < arguments[0].length; i += 3) {
                                                                        var triplet = (arguments[0][i] << 16) | (arguments[0][i + 1] << 8) | arguments[0][i + 2];
                                                                        for (var j = 0; j < 4; j++) {
                                                                            if (i * 8 + j * 6 <= arguments[0].length * 8)
                                                                                base64.push(FormatClass.Format.Base64Table.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
                                                                            else base64.push("=");
                                                                        }
                                                                    }

                                                                    return base64.join("");
                                                                }

        FormatClass.Format.prototype.FromBase64 =       function()  {
                                                                    // Use browser-native function if it exists
                                                                    if (typeof atob == "function")
                                                                    {
                                                                        arguments[0] = atob(arguments[0]);
                                                                        for (var bytes = [], i = 0; i < arguments[0].length; i++)
                                                                            bytes.push(arguments[0].charCodeAt(i) & 0xFF);
                                                                        return bytes;
                                                                    }

                                                                    // Remove non-base-64 characters
                                                                    arguments[0] = arguments[0].replace(/[^A-Z0-9+\/]/ig, "");

                                                                    for (var bytes = [], i = 0, imod4 = 0; i < arguments[0].length; imod4 = ++i % 4) {
                                                                        if (imod4 == 0) continue;
                                                                        bytes.push(((FormatClass.Format.Base64Table.indexOf(arguments[0].charAt(i - 1)) & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2)) |
                                                                            (arguments[0].indexOf(arguments[0].charAt(i)) >>> (6 - imod4 * 2)));
                                                                    }

                                                                    return bytes;
                                                                }

        FormatClass.Format.prototype.ToUTF8 =           function()  {
                                                                    for (var str = [], i = 0; i < arguments[0].length; i++)
                                                                        str.push(String.fromCharCode(arguments[0][i]));
                                                                    var newStr = str.join("");
                                                                    return decodeURIComponent(escape(newStr));
                                                                }

        FormatClass.Format.prototype.FromUTF8 =         function()  {
                                                                    var str = unescape(encodeURIComponent(arguments[0]));
                                                                    for (var bytes = [], i = 0; i < str.length; i++){
                                                                        bytes.push(str.charCodeAt(i) & 0xFF);}
                                                                    return bytes;
                                                                }

        FormatClass.Format.prototype.ToUBytes =         function()  {
                                                                        var bytes = [];
                                                                        for(var x = 0; x < arguments[0].length; x++){
                                                                            bytes.push((arguments[0][x] < 0) ? 256 + arguments[0][x] : arguments[0][x]);}
                                                                        return bytes;
                                                                    }

        FormatClass.Format.prototype.ToSBytes =         function()  {
                                                                        var bytes = [];
                                                                        for(var x = 0; x < arguments[0].length; x++){
                                                                            bytes.push((arguments[0][x] > 127) ? arguments[0][x] - 256 : arguments[0][x]);}
                                                                        return bytes;
                                                                    }

        FormatClass.Format.prototype.BytesToString =    function()  {
                                                                        var str = "[";
                                                                        for(var x = 0; x < arguments[0].length; x++){
                                                                        str += (x == arguments[0].length-1) ? arguments[0][x].toString() + "]" : arguments[0][x].toString() + ", ";}
                                                                        return str;
                                                                    }

        //Private Methods
        function loadHexTable()
        {
            for(var i = 0; i<10; i++ ) {
                FormatClass.Format.HexTable[i] = i;
            }

            for(var i = 10; i<=15; i++ ) {
                FormatClass.Format.HexTable[i] = String.fromCharCode('A'.charCodeAt(0)+i-10);
            }
        }

        //Populate Data Types
        loadHexTable();
    }

}