function sum2DArrayConcurrent(arr) {
    return new Promise((resolve, reject) => {
        console.log('Sum called ...');
        if (Array.isArray(arr)) {
            const promises = arr.map(row => {
                return new Promise((resolveRow, rejectRow) => {
                    setTimeout(() => {
                        const rowSum = row.reduce((acc, curr) => acc + curr, 0);
                        resolveRow(rowSum);
                    }, 0);
                });
            });

            Promise.all(promises)
                .then(rowSums => {
                    const totalSum = rowSums.reduce((acc, curr) => acc + curr, 0);
                    console.log('resolving ...');
                    resolve(totalSum);
                })
                .catch(error => {
                    console.log('rejecting ...');
                    reject('Error occurred while summing rows: ' + error);
                });
        } else {
            console.log('rejecting ...');
            reject('BAD INPUT: Expected array as input');
        }
        console.log('returning from sum');
    });
}

const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const sumPromise1 = sum2DArrayConcurrent(array2D);
sumPromise1.then(result => {
    console.log("Sum Promise 1:", result);
}).catch(error => {
    console.error("Sum Promise 1 Error:", error);
});

const sumPromise2 = sum2DArrayConcurrent('array2D');
sumPromise2.then(result => {
    console.log("Sum Promise 2:", result);
}).catch(error => {
    console.error("Sum Promise 2 Error:", error);
});