
describe('regex background', () => {
    it('backround regex must accept background format', () => {
        const regexColor = /^[a-zA-Z]{3,}$|^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ?[0-9]{1,3} ?, ?((0\.[0-9]{1,2})|1)[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/;           
        const backgroundHex = '#fff';
        const backgroundWord = 'blue';
        const backgroundRGBA = 'rgba(255, 255, 255, 0.2)';
        const backgroundRGB = 'rgb(255, 255, 255)';
        expect(backgroundHex).toMatch(regexColor);
        expect(backgroundWord).toMatch(regexColor);
        expect(backgroundRGBA).toMatch(regexColor);
        expect(backgroundRGB).toMatch(regexColor);
    })
    it('backround regex must throw error if incorrect background format', () => {
        const regexColor = /^[a-zA-Z]{3,}$|^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ?[0-9]{1,3} ?, ?((0\.[0-9]{1,2})|1)[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/;           
        const backgroundHex = '#ff';
        const backgroundWord = 'blue55';
        const backgroundRGBAComma = 'rgba(255, 255, 255, 0,2)';
        const backgroundRGBAMissingA = 'rgba(255, 255, 255)';
        const backgroundRGBDot = 'rgb(255 , 255. 255)';
        const backgroundRGBAddA = 'rgb(255 , 255, 255, 0.55)';
        expect(backgroundHex).not.toMatch(regexColor);
        expect(backgroundWord).not.toMatch(regexColor);
        expect(backgroundRGBAComma).not.toMatch(regexColor);
        expect(backgroundRGBAMissingA).not.toMatch(regexColor);
        expect(backgroundRGBDot).not.toMatch(regexColor);
        expect(backgroundRGBAddA).not.toMatch(regexColor);
    });
})
describe('Product number format', () => {
    it('energy number correct format', () => {
        const numberFormat = /^[0-9]*$/;
        const number = '5250';
        expect(number).toMatch(numberFormat);
    })
    it('energy number - returns error on invalid format', () => {
        const numberFormat = /^[0-9]*$/;
        const number = '525.0';
        const numberTwo = 'abc';
        expect(number).not.toMatch(numberFormat);
        expect(numberTwo).not.toMatch(numberFormat);
    });
    it('should accept decimals with comma or dot', () => {
        const decimalNumberFormat = /^([1-9]|([1-9][0-9]))(\.|\,)[0-9]{1,2}$/;
        const number = '10.5';
        const numberTwo = '10,55';
        const numberThree = '10.55';
        const numberFour = '5,55';
        const numberFive = '5,5';
        const numberSix = '1.5';
        expect(number).toMatch(decimalNumberFormat);
        expect(numberTwo).toMatch(decimalNumberFormat);
        expect(numberThree).toMatch(decimalNumberFormat);
        expect(numberFour).toMatch(decimalNumberFormat);
        expect(numberFive).toMatch(decimalNumberFormat);
        expect(numberSix).toMatch(decimalNumberFormat);
    })
    it('should throw error if not decimal format that contains with comma or dot', () => {
        const decimalNumberFormat = /^([1-9]|([1-9][0-9]))(\.|\,)[0-9]{1,2}$/;
        const number = '105';
        const numberTwo = '1055';
        const numberThree = 'test';
        const numberFour = '5555';
        const numberFive = '55';
        const numberSix = '.55';
        const numberSeven = '5,555';
        const numberEight = '25.555';
        const numberNine = '05.55';
        expect(number).not.toMatch(decimalNumberFormat);
        expect(numberTwo).not.toMatch(decimalNumberFormat);
        expect(numberThree).not.toMatch(decimalNumberFormat);
        expect(numberFour).not.toMatch(decimalNumberFormat);
        expect(numberFive).not.toMatch(decimalNumberFormat);
        expect(numberSix).not.toMatch(decimalNumberFormat);
        expect(numberSeven).not.toMatch(decimalNumberFormat);
        expect(numberEight).not.toMatch(decimalNumberFormat);
        expect(numberNine).not.toMatch(decimalNumberFormat);
    });
})
