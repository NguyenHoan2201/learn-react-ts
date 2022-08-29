import { NavigateOptions, To } from 'react-router-dom';

class Event{
  handlers: { [key: string]: ((args: any) => any)[] } = {};

  on(event: string, fn: (args: any) => any) {
    if(!this.handlers[event]){
      this.handlers[event] = []
    }

    this.handlers[event].push(fn)
  }

  emit(event: string, args: any) {
    if(!this.handlers[event]){
      return;
    }

    this.handlers[event].forEach(fn => fn(args))
  }

  remove(event: string) {
    this.handlers[event] && delete this.handlers[event]
  }
}

const $event = new Event();

interface NavigateParams{
  to: To;
  options?: NavigateOptions
}

export function navigate(params: NavigateParams) {
  $event.emit('navigate-to', params);
}

export default $event;