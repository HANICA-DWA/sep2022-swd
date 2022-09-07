const fs = require('fs');

let promise_wrappers = {};

promise_wrappers.readdirP = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

promise_wrappers.readFileP = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

promise_wrappers.writeFileP = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

promise_wrappers.unlinkFileP = (file) => {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

promise_wrappers.createEmptyFileP = (newFile) => {
    return new Promise((resolve, reject) => {
        fs.open(newFile, 'wx', (err, fd) => {
            if (err) {
                reject(err);
            } else {
                fs.close(fd, err => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('HALLO');
                        resolve();
                    }
                });
            }
        });    
    });
};

promise_wrappers.setTimeoutP = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay)
    });
}

module.exports = promise_wrappers;