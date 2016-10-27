/*jshint esversion: 6 */

function VigenèreAutokeyCipher(key, abc) {
    this.encode = function(str) {
        let i = 0;
        let newKey = key + str.split('').map(x => {
            return inABC(x) ? x : '';
        }).join('');
        return str.trim().split('').map((x, idx) => {
            if (inABC(x)) {
                keyChar = newKey[i];
                i++;
            } else return x;
            return abc[(abc.indexOf(keyChar) + abc.indexOf(x)) % abc.length];
        }).join('');
    };
    this.decode = function(str) {
        let i = 0;
        let newKey = key;
        return str.trim().split('').map((x, idx) => {
            if (inABC(x)) {
                let decodedChar = decodeChar(abcIndex(x), abcIndex(newKey[i]));
                i++;
                newKey = newKey + decodedChar;
                return decodedChar;
            } else return x;
        }).join('');
    };

    const inABC = function checkinABC(chr) {
        return abc.indexOf(chr) >= 0 ? true : false;
    };

    const abcIndex = function getabcIndex(chr) {
        return abc.indexOf(chr);
    };

    const keyPos = function getkeyPos(idx) {
        return idx % key.length;
    };

    const decodeChar = function dodecodeChar(abcIdx, keyIdx) {
        if (abcIdx >= keyIdx) return abc[abcIdx - keyIdx];
        else return abc[abc.length + abcIdx - keyIdx];
    };
}