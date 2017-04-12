// subName - the name of the property with Subscription
// default name is sub

// for sub: Subscription[] = []; isArray = true
// for sub: Subscription: isArray = false

export function AutoUnsubscribe(subName: string = 'sub', isArray: boolean = true) {
  return function (constructor) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const sub = this[subName];

      if (sub && isArray) {
        sub.forEach(s => s.unsubscribe());
      }
      else if (sub && !isArray) {
        sub.unsubscribe();
      }

      original
        && typeof original === 'function'
        && original.apply(this, arguments);
      console.log(`Unsibscribe decorator is called. Subscription name is: ${subName}. Subscription is array: ${isArray}`);
    };
  }
}
