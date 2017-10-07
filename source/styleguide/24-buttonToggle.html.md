---
title: Toggles
type: styleguide
layout: styleguide
name: toggleswitch
section: simple
---


<main markdown="1">

# Toggle Switch Buttons

`_toggle.scss`

Toggle buttons are essentially checkboxes with an associated text (e.g. on or off, enabled or disabled). I've chosen to implement a JS-free toggle button (as opposed to Bootstrap's JS-heavy implementation)

Left position means "off", and right position means "on". Make sure the labels always describe the current state (e.g. "Disabled") and not future (e.g. "Turn On") as that gets confusing quickly.  

~~~
<label class="_toggle">
  <input type="checkbox">
  <span class="_toggle-slider"></span>
  <label class="_off">Disabled</label>
  <label class="_on">Enabled</label>
</label>

<label class="_toggle --pill">
  <input type="checkbox">
  <span class="_toggle-slider"></span>
  <label class="_off">Off</label>
  <label class="_on">On</label>
</label>
~~~
<div class="_margin-bottom-2">
  <div class="_margin-bottom">
    <label class="_toggle">
      <input type="checkbox">
      <span class="_toggle-slider"></span>
      <label class="_off">Disabled</label>
      <label class="_on">Enabled</label>
    </label>
  </div>
  <div class="_margin-bottom">
    <label class="_toggle --pill">
      <input type="checkbox">
      <span class="_toggle-slider"></span>
      <label class="_off">Off</label>
      <label class="_on">On</label>
    </label>
  </div>
</div>



</main>

