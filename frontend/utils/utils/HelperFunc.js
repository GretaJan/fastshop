
const regexFormats = {
    color: '^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$',
    decimal: '^([1-9]|([1-9][0-9]))(\.|\,)[0-9]{1,2}$',
    decimalWithComma: '^([1-9]|([1-9][0-9]))\,[0-9]{1,2}$',
    maxThreeDigits: '^[0-9]{0,3}$',
    quantityDigits: '^([1-9]|[1-9][0-9]|[1-1]([5-5][0-0]|[0-4][0-9]))$',
}

export function verifyRegex(type, value){
    const currentRegexFormat = new RegExp(regexFormats[type])

    if(currentRegexFormat.test(value))
        return true
    return false
}
