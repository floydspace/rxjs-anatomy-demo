const { Observable } = require('rxjs');
const { shareReplay, share } = require('rxjs/operators');

async function fn() {
    const observable = new Observable(observer => {
        console.log('call to server');
        const result = 'result from server'; // new HttpRequest();
        try {
            observer.next(result);
        } catch (error) {
            observer.error(error);
        }
        observer.complete();
        return () => {
            // destructor
        }
    });
    
    // =================================
    
    const sharedObservable = observable.pipe(shareReplay(1));
    console.log(await sharedObservable.toPromise());
    console.log(await sharedObservable.toPromise());
    console.log(await sharedObservable.toPromise());
    console.log(await sharedObservable.toPromise());
    console.log(await sharedObservable.toPromise());
    console.log(await sharedObservable.toPromise());
}

fn();
