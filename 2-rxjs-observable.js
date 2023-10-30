const { Observable } = require('rxjs');

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

const subscription = observable.subscribe({
    next: result => console.log(result),
    error: err => console.error(err),
    complete: () => console.log('completed')
});

setTimeout(() => subscription.unsubscribe(), 5000);
// https://github.com/apollographql/apollo-client/blob/82775abdfbc321b42e240b016c5f4e8f22ef74a7/packages/apollo-client/src/core/ObservableQuery.ts#L571