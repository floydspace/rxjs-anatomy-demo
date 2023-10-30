class Observable {
  constructor(observe) {
    this.observe = observe;
  }

  subscribe(observer) {
    return {
        unsubscribe: this.observe(observer)
    }
  }
}

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