export interface DraggableEvent<T> extends Event {
    item: T;
    originalEvent: MouseEvent | TouchEvent;
    type: string;
    from: HTMLElement;
    to: HTMLElement | undefined;
    oldIndex: number;
    newIndex: number | undefined;
    clone: HTMLElement;
    dragEl: HTMLElement;
    realDragEl: HTMLElement;
    cloneEl: boolean;
    mirror: boolean;
    offset: {
      x: number;
      y: number;
    };
    movement: {
      x: number;
      y: number;
    };
    distance: {
      x: number;
      y: number;
    };
  }