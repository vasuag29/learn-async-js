function logRowsWithNegative(arr) {
    return new Promise((resolve, reject) => {

        if (Array.isArray(arr)) {
            const promises = arr.map(row => {
                return new Promise((resolveRow, rejectRow) => {
                    setTimeout(() => {
                        if (row.some(num => num < 0)) {
                            resolveRow(row);
                        } else {
                            rejectRow('Row does not contain any negative numbers');
                        }
                    }, 0);
                });
            });

            Promise.any(promises)
                .then(negRow => {
                    resolve(negRow);
                })
                .catch(error => {
                    reject('No row with negative numbers found');
                });
        } else {
            reject('BAD INPUT: Expected array as input');
        }
    });
}

const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

const negRowsPromise = logRowsWithNegative(array2D);
negRowsPromise.then(negRow => {
    console.log("Row with negative numbers:", negRow);
}).catch(error => {
    console.error("Rows with Negative Promise Error:", error);
});