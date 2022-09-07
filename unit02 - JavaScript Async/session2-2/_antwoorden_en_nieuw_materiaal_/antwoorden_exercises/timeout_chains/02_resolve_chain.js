/* Promise chain A */
Promise.resolve(1).then(value => {
    console.log(`A - ${value}`);
    return Promise.resolve('twee');
}).then(value => {
    console.log(`A - ${value}`);
});

/* Promise chain B */
Promise.resolve('een').then(value => {
    console.log(`B - ${value}`);
    return Promise.resolve(2);
}).then(value => {
    console.log(`B - ${value}`);
});