---
title: Button Groups
type: styleguide
layout: styleguide
name: buttongroups
section: simple
---


<main markdown="1">

# Button Groups

`_buttonGroups.scss`

Button groups are grouped `_button.scss` elements. The element itself acts like an encapsulation of elements, and tries to create a context around the buttons inside the group.

It might not work out of the box with custom button styles, so make sure you style it correctly.

Modifiers:

- `--pill`
- `--outline`

<div class="_styleguide-example">
<div class="_margin-bottom-2">
  <div class="_buttonGroup">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>

<div class="_margin-bottom-2">
  <div class="_buttonGroup --pill">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>

<div class="_margin-bottom-2">
  <div class="_buttonGroup --outline">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>
</div>
~~~
<div class="_margin-bottom-2">
  <div class="_buttonGroup">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>

<div class="_margin-bottom-2">
  <div class="_buttonGroup --pill">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>

<div class="_margin-bottom-2">
  <div class="_buttonGroup --outline">
    <button class="_button">Button One</button>
    <button class="_button">Button Two</button>
    <button class="_button">Button Three</button>
    <button class="_button">Button Four</button>
  </div>
</div>
~~~




</main>

