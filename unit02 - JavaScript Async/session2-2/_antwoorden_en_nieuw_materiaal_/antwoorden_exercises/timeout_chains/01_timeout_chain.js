/* A */
/* De simpelste oplossing is alle delays op 0 zetten. */

/* B */
/* Nee, BINNEN een promise chain is de volgorde wel gegarandeerd */

/* Promise chain A */
setTimeoutP(10).then(() => {
    console.log('A - 1');
    return setTimeoutP(20);
}).then(() => {
    console.log('A - 2');
});

/* Promise chain B */
setTimeoutP(100).then(() => {
    console.log('B - 1');
    return setTimeoutP(150);
}).then(() => {
    console.log('B - 2');
});

/* Promise-based interface */
function setTimeoutP(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay)
    });
}