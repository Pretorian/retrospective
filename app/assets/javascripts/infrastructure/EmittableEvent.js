'use strict';

class EmittableEvent
{
  serialize()
  {
    return {
      name: `client-${this.constructor.name}`,
      data: this.toArray()
    };
  }
}

export default EmittableEvent;
