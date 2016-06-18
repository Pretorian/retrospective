'use strict';

// Taken from https://gist.github.com/therebelrobot/11382114
class Container
{
  constructor()
  {
    this.values = {};
    this.factories = {};
  }

  set(name, callable)
  {
    if (typeof callable === "function") {
      this.factories[name] = callable;
    } else {
      this.values[name] = callable;
    }
  }

  get(name)
  {
    if (this.values[name] === undefined) {
      this.values[name] = this.factories[name](this);
    }
    return this.values[name];
  }
}

export default Container;
