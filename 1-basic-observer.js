function Observable(observer) {
    let i = 0;
    const timerId = setInterval(() => observer.next(i++), 500);
    // observer.complete();
    return () => {
        // destructor
        if (timerId) {
            clearInterval(timerId)
        }
    };
}

const unsubscribe = Observable({
    next: result => console.log(result),
    error: err => console.error(err),
    complete: () => console.log('completed')
});

setTimeout(() => unsubscribe(), 5000);
