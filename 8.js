const { ReplaySubject } = require('rxjs');

async function fn() {
    const subject = new ReplaySubject(1);
    
    console.log('call to server');
    const result = 'result from server'; // new HttpRequest();
    try {
        subject.next(result);
    } catch (error) {
        subject.error(error);
    }
    subject.complete();
    
    
    // =================================
    
    console.log(await subject.toPromise());
    console.log(await subject.toPromise());
    console.log(await subject.toPromise());
    console.log(await subject.toPromise());
    console.log(await subject.toPromise());
    console.log(await subject.toPromise());
}

fn();