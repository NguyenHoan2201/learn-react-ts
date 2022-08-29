import { NavigateOptions, To } from 'react-router-dom';

class Event {

  private static instance: Event;

  private constructor() { }

  handlers: { [key: string]: ((args: any) => any)[] } = {};

  on(event: string, fn: (args: any) => any) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(fn);
  }

  emit(event: string, args: any) {
    if (!this.handlers[event]) {
      return;
    }

    this.handlers[event].forEach(fn => fn(args));
  }

  remove(event: string) {
    this.handlers[event] && delete this.handlers[event];
  }

  static getInstance() {
    if (!Event.instance) {
      Event.instance = new Event();
    }
    return Event.instance;
  }
}

const $event = Event.getInstance();

interface NavigateParams {
  to: To;
  options?: NavigateOptions
}

export function navigate(params: NavigateParams) {
  $event.emit('navigate-to', params);
}

export default $event;