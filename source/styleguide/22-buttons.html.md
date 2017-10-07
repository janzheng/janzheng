---
title: Buttons
type: styleguide
layout: styleguide
name: buttons
section: simple
---


<main markdown="1">

# Buttons

`_buttons.scss`

The main navigation uses a two-section grid block of [ one three ], with standard links as navigation buttons. A special `_nav--separator` attribute exists to separate parts of the navigation.

The lighter in-page nav uses a `--simple` attribute that removes some of the heavier styling elements.


Some JS is used to provide the 'sticky nav' functionality, namely ScrollMagic.  `#nav-tr` is the triggering element, and when triggered, the `#nav` gets pinned by ScrollMagic and receives the `--pinned` attribute class for additional styling. Super simple. Note that IDs are used to identify sticky elements, though they could easily be changed to classes instead.

~~~ javascript
// animation controller
var stickyController = new ScrollMagic.Controller();

// sticky nav
var nav = new ScrollMagic.Scene({triggerElement: "#nav-tr", triggerHook: "onLeave"})
        .setPin("#nav")
        .setClassToggle("#nav", "--pinned") // add class toggle
        .addTo(stickyController);
~~~


Standard Navigation:

<div id="nav-tr" >
  <nav id="nav" class="_nav _container _content">
    <div class="_grid-one-three _grid-center-h">
      <a class="nav-logo" href="/"><span class="_logo">B<i>a</i>b<o>u</o></span></a>
      <div class="nav-links">
        <a href="#intro" data-offset-scroll="-100">Features</a>
        <a href="#privacy" data-offset-scroll="-100">Privacy</a>
        <a href="#pricing" data-offset-scroll="-100">Pricing</a>
        <a class="_nav--separator">login</a>
      </div>
    </div>
  </nav>
</div>

Simple Navigation:

<div id="nav-tr" >
  <nav id="nav" class="_nav --simple _ease-none _container ">
    <div class="">
      <a href="#inspiration" data-offset-scroll="-100">Nav Option 1</a>
      <a href="#inspiration" data-offset-scroll="-100">Nav Option 2 </a>
    </div>
  </nav>
</div>



## Links

Links are very simple, and are denoted [with an underline](#) to indicate clickability. They don't have any colors to prevent distration (though that could certainly be amended). The hover state provides a color shift and an easing function to indicate interactivity.

Note that the links in the navigation do not have the underline.



## Buttons

Buttons come in two variations, a default rectangular one and a slimmer call to action. The default can be used anywhere, whereas the slimmer round "pill" button should be used as "calls to action" ('CTA') where users are led down a path to either unerstand more about your app or sign up or pay for services. The pill is in lowercase to appear "friendlier" and lower pressure as well.

<button class="_button">Press Me!</button> <button class="_button-pill _button-thin">Press Me!</button>




</main>