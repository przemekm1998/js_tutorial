const person1 = {name: 'Max'};
const person2 = {name: 'Manuel'};

const personData = new Map([
    [person1, [
        {
            date: 'yesterday',
            price: 10
        },
        {
            date: 'today',
            price: 20
        }
    ]],
]);

console.log(personData);
console.log(personData.get(person1));

personData.set(person2, [
    {
        date: 'today',
        price: 20
    }
])

console.log(personData);

// for (const entry of personData.entries()) {
//     console.log('Loop of', entry);
// }

for (const [key, value] of personData.entries()) {
    console.log('Key', key);
    console.log('Value', value);
}