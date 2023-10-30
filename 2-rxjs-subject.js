const { Subject } = require('rxjs');

const subject = new Subject();

subject.subscribe({
    next: result => console.log(result),
    error: err => console.error(err),
    complete: () => console.log('completed')
});

let i = 0;
const timerId = setInterval(() => subject.next(i++), 500);

setTimeout(() => {
    clearInterval(timerId);
    subject.complete();
}, 5000);
