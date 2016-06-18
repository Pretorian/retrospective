'use strict';

class EventListener
{
  constructor(channel)
  {
    this.channel = channel;
  }

  on(eventName, callback)
  {
    this.channel.bind(`client-${eventName}`, callback);

    return this;
  }
}

export default EventListener;

