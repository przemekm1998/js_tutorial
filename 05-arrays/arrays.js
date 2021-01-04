// Add to the end
const hobbies = ['Sports', 'Cooking'];
hobbies.push('Reading');
console.log('Push', hobbies);

// Prepend
hobbies.unshift('Movies');
console.log('Unshift', hobbies);

// Remove last
hobbies.pop();
console.log('Pop', hobbies);

// Remove first
hobbies.shift();
console.log('Shift', hobbies);

// Splice
hobbies.splice(1, 0, 'Good food');
console.log('Splice', hobbies);

// Splice - remove first
const removedElement = hobbies.splice(0, 1);
console.log('Splice remove', hobbies);
//
Slice
// const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.slice(-1);
console.log('Last element', storedResults);
//
// Concat
const storedResults = testResults.concat([1, 2, 3]);
console.log('Concat', storedResults);

// IndexOf
console.log('Index of', testResults.indexOf(1.5));

// Last IndexOf
console.log('Last indef of', testResults.lastIndexOf(1.5));

// Find - does not create a copy
const personData = [
    {name: 'Max'},
    {name: 'Manuel'}
];

const manuel = personData.find((person, idx, persons) => {
    return person.name === 'Manuel'
});

console.log('Find', manuel);

manuel.name = 'Anna';
console.log(manuel);
console.log(personData);

// Find index

const maxIndex = personData.findIndex((person, idx, persons) => {
    return person.name === 'Max';
});
console.log('Find index', maxIndex);
// Includes
console.log('Includes', testResults.includes(10.99));

// For each
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustPrices = [];

prices.forEach((price) => {
    const new_price = price * (1 + tax);
    taxAdjustPrices.push(new_price);
});

console.log('after for each', taxAdjustPrices);

// Map

const newTaxAdjustedPrices = prices.map((price, idx, prices) => {
    const new_price = price * (1 + tax);


    return {
        index: idx,
        price: new_price
    };
})

console.log('Map', newTaxAdjustedPrices);

// Sort

const sortedPrices = prices.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
});

console.log('Reversed sort', sortedPrices.reverse());

// Filter

const filteredArray = prices.filter(price => price > 6);
console.log('Filtered', filteredArray);

// Reduce

const sum = prices.reduce((prevValue, curValue, curIndex, prices) => {
    return prevValue + curValue;
}, 0);

const new_sum = prices.reduce((prevValue, curValue) => prevValue + curValue, 0); // shorter

console.log('Reduce', new_sum);

// Chaining

const newPricesObj = [
    {price: 5.99},
    {price: 4.48}
]

const pricesSum = newPricesObj.map(price => price.price).reduce((prev, cur) => prev + cur);
console.log('Chaining', pricesSum);
// Split

const data = 'new york;10.99;2000';
const transformed = data.split(';');
console.log('Split', transformed);

// Join

const nameFragments = ['Max', 'Schwarz'];
const name = nameFragments.join(' ');
console.log('Join', name);

// Spread operator

const copiedNameFragments = [...nameFragments];
console.log('Spread', copiedNameFragments);

const prices = [0, 1, 2, 3];
console.log(Math.min(...prices));

// Array destructuring

const nameData = ['Max', 'Schwarz', 'Mr', 30];
const [firstName, lastName, ...otherInformation] = nameData;
console.log(firstName, lastName);
console.log(otherInformation);