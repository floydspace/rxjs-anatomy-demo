class Observable {
    constructor(observe) {
        this.observe = observe;
    }

    subscribe(observer) {
        return this.observe(observer);
    }
}

function map(predicate) {
    return (source) => new Observable((observer) => {
        return source.subscribe({
            next: value => observer.next(predicate(value)),
            error: err => observer.error(err),
            complete: () => observer.complete()
        });
    });
}

const observable = new Observable(observer => {
    let i = 0;
    const timerId = setInterval(() => observer.next(i++), 500);
    // observer.complete();
    return {
        unsubscribe: () => {
            // destructor
            if (timerId) {
                clearInterval(timerId)
            }
        }
    };
});

const subscription = map(r => r * 2)(map(r => r * 2)(observable)).subscribe({
    next: result => console.log(result),
    error: err => console.error(err),
    complete: () => console.log('completed')
});

setTimeout(() => {
    subscription.unsubscribe();
}, 5000);