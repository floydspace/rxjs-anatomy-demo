class Subject {
    constructor() {
        this.observers = [];
    }

    next(value) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].next(value);
        }
    }
    
    error(err) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].error(err);
        }
        this.observers = [];
    }
    
    complete() {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].complete();
        }
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            const subscriberIndex = this.observers.indexOf(observer);
            if (subscriberIndex > -1) {
                this.observers.splice(subscriberIndex, 1);
            }
        };
    }
}

const subject = new Subject();

const unsubscribe = subject.subscribe({
    next: result => console.log(result),
    error: err => console.error(err),
    complete: () => console.log('completed')
});

let i = 0;
const timerId = setInterval(() => subject.next(i++), 500);

setTimeout(() => unsubscribe(), 3000);

setTimeout(() => {
    clearInterval(timerId);
    subject.complete();
}, 5000);
