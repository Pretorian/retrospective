'use strict';

class Emittable
{
  constructor()
  {
    this._emittableEvents = [];
  }

  publish(event)
  {
    this._emittableEvents.push(event);
  }

  getEmittableEvents()
  {
    return this._emittableEvents;
  }
}

export default Emittable;
