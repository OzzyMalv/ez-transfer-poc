interface LUX {
  init: () => void;
  send: () => void;
}

declare const LUX: LUX;

interface Heap {
  identify: (id) => void;
  addUserProperties: (data) => void;
  track: (eventName, data) => void;
  addEventProperties: (data) => void;
  removeEventProperty: (propertyName) => void;
  clearEventProperties: () => void;
}
declare const heap: Heap;
