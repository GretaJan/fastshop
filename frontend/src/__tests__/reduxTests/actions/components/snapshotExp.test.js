// function to test
function sum(a, b) {
    return a + b;
  }
  
  // our test
  it('should return the sum of two numbers (4 + 5 = 9)', () => {
    expect(sum(4, 5)).toMatchSnapshot();
  });
  
  // snapshot output
  exports[`should get the sum of two numbers (4 + 5 = 9) 1`] = `9`;