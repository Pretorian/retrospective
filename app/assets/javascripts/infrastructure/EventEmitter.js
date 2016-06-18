'use strict';

class EventEmitter
{
  constructor(channel)
  {
    this.channel = channel;
  }

  emitEventsFor(emittable)
  {
    emittable.getEmittableEvents().forEach((event) => {
      const data = event.serialize();
      this.channel.trigger(data.name, data.data);
    });
  }
}

export default EventEmitter;
