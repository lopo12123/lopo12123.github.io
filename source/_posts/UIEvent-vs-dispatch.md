---
title: UIEvent vs dispatch
date: 2023-12-11 21:29:33
tags:
  - JS
  - DOM
categories:
  - Essay
---

In most cases, we can use `dispatchEvent` to simulate a user action, but sometimes it doesn't work. And in some special cases, `dispatchEvent` can take effect but has different behavior from `UIEvent` triggered by user action.

<!-- more -->

## UIEvent

The `UIEvent` interface provides specific contextual information associated with User Interface events. (was introduced in DOM Level 2)

### Definition

IDL definition:

```IDL
interface UIEvent : Event {
    readonly attribute views::AbstractView  view;
    readonly attribute long detail;
    void initUIEvent(
        in DOMString typeArg, 
        in boolean canBubbleArg, 
        in boolean cancelableArg, 
        in views::AbstractView viewArg, 
        in long detailArg
    );
};
```

In `lib.dom.d.ts`, it is defined as:

```ts
interface UIEvent extends Event {
    readonly detail: number;
    readonly view: Window | null;
    /**
     * @deprecated
     */
    readonly which: number;

    /**
     * @deprecated
     */
    initUIEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number): void;
}
```

## Mouse Event

The mouse event module originates from the [html40](https://www.w3.org/TR/html40/)'s `onclick`, `ondblclick`, `onmousedown`, `onmouseup`, `onmouseover`, `onmousemove`, and `onmouseout` attributes. This event module is specifically designed for use with **pointing input devices**, such as a mouse or a trackball. (was introduced in DOM Level 3)

### Definition

IDL definition:

```IDL
[Constructor(DOMString type, optional MouseEventInit eventInitDict)]
interface MouseEvent : UIEvent {
  readonly attribute long screenX;
  readonly attribute long screenY;
  readonly attribute long clientX;
  readonly attribute long clientY;

  readonly attribute boolean ctrlKey;
  readonly attribute boolean shiftKey;
  readonly attribute boolean altKey;
  readonly attribute boolean metaKey;

  readonly attribute short button;
  readonly attribute unsigned short buttons;

  readonly attribute EventTarget? relatedTarget;

  boolean getModifierState(DOMString keyArg);
};
```

In `lib.dom.d.ts`, it is defined as:

```ts
interface MouseEvent extends UIEvent {
    readonly altKey: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly relatedTarget: EventTarget | null;
    readonly screenX: number;
    readonly screenY: number;
    readonly shiftKey: boolean;
    readonly x: number;
    readonly y: number;

    getModifierState(keyArg: string): boolean;

    /**
     * @deprecated
     */
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}
```

## dispatchEvent

As the MDN says, the `dispatchEvent` method send an `Event` to the target object, and **synchronously** invoking the affected event listeners in the _appropriate_ order.

### About the _appropriate_ order

From the DOM2 Events specification:

> Although all EventListeners on the EventTarget are guaranteed to be triggered by any event which is received by that EventTarget, no specification is made as to the order in which they will receive the event with regards to the other EventListeners on the EventTarget.

The vast majority of browser implementations (Chrome, Firefox, Opera, etc.), including IE9, fire the handlers in the order in which they were attached. IE8 and earlier do it the other way around.

The newer (and now very well-established) DOM3 event spec added the requirement that they be fired in order of registration (what most browsers do).

> 11.1.1. Changes to DOM Level 2 event flow
> This new specification introduced the following new concepts in the event flow:
> - Event listeners are now ordered. In DOM Level 2, the event ordering was unspecified.
> - The event flow now includes the Window, to reflect existing implementations.

Unfortunately, although the above reference exists in the DOM3 document, I did not find the specific order requirements.
But it does have an entry in its glossary called [_candidate event listeners_](https://www.w3.org/TR/DOM-Level-3-Events/#candidate-event-listeners) which says:

> The list of all event listeners that have been registered on the target object in their order of registration.

### isTrusted

[//]: # (TODO)

## addEventListener

> Alternatively, event listeners can be removed by passing an AbortSignal to addEventListener() and calling abort() on the controller owning the signal.

[//]: # (TODO)

## References

- [Interface UIEvent](https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-UIEvent)
- [UI Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events)
- [Mouse Events](https://www.w3.org/TR/DOM-Level-3-Events/#events-mouseevents)
- [MouseEvent (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- [dispatchEvent](https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent)
- [dispatchEvent (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
- [Introduction to "DOM Events"](https://dom.spec.whatwg.org/#introduction-to-dom-events)

- [Question on StackOverflow](https://stackoverflow.com/questions/49805942/what-is-the-order-of-inline-onclick-vs-addeventlistener-and-why)
- [Question on StackOverflow](https://stackoverflow.com/questions/2706109/are-event-handlers-in-javascript-called-in-order)
