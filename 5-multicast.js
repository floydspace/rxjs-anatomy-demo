const { Observable, Subject } = require('rxjs');
const { multicast } = require('rxjs/operators');

const observable = new Observable(observer => {
    let i = 0;
    const timerId = setInterval(() => observer.next(i++), 500);
    // observer.complete();
    return () => {
        // destructor
        if (timerId) {
            clearInterval(timerId)
        }
    };
});

//=================================================

const multicasted = observable.pipe(
    multicast(() => new Subject())
);
const connectedSubscription = multicasted.connect();

//=================================================

const subscription1 = multicasted.subscribe(
    result => console.log('subscription1', result),
    err => console.error(err),
    () => console.log('completed')
);

setTimeout(() => subscription1.unsubscribe(), 4000);

let subscription2;
setTimeout(() => {
    subscription2 = multicasted.subscribe(
        result => console.log('subscription2', result),
        err => console.error(err),
        () => console.log('completed')
    );
}, 4000);

let subscription3;
setTimeout(() => {
    subscription3 = multicasted.subscribe(
        result => console.log('subscription3', result),
        err => console.error(err),
        () => console.log('completed')
    );
}, 6000);

setTimeout(() => subscription2.unsubscribe(), 10000);
setTimeout(() => subscription3.unsubscribe(), 10000);

//=================================================

setTimeout(() => connectedSubscription.unsubscribe(), 10000);
// https://github.com/apollographql/apollo-client/blob/82775abdfbc321b42e240b016c5f4e8f22ef74a7/packages/apollo-client/src/core/ObservableQuery.ts#L571