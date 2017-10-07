---
title: Sidebar
type: styleguide
layout: styleguide
name: sidebar
section: components
---


<main markdown="1">

# Sidebar

`_sidebar.scss`

The sidebar is used for styling the sidebar (like the one used for this style guide).

A little javascript with MagicScroll is required to keep the menu to stick the left side, if needed: just add a span with the class `_sticky-tr` to make it work.

Note: The pinned state uses the somewhat-supported `position: sticky` element.

HTML:

~~~html
<aside>
  <h1 class="_transparent">menu</h1>
  <span class="_sticky-tr"></span>
  <div class="_sidebar">
    <%= partial '/partials/style-menu' %>
  </div>
</aside>
~~~

`<head>` requirements:

~~~html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.js"></script>
~~~

Javascript:

~~~js
var sidebar = new ScrollMagic.Scene({triggerElement: "._sidebar-tr", triggerHook: "onLeave"})
    .setClassToggle("._sidebar", "--pinned") // add class toggle
    .addTo(stickyController);

~~~

</main>

