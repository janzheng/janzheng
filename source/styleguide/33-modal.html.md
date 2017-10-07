---
title: Modals
type: styleguide
layout: styleguide
name: modals
section: components
---


<main markdown="1">

# Modals

`_modals.scss`

Modals are a fancy name for those annoying "popups". They're useful to convey information that users feel are temporary, and that can be easily "closed". In general they feel a lot "lighter" and more easily dismissible than a full page load. 

Examples include important messages, user prompts, lightboxes and galleries, and receipt / confirmation screens.

The modal component is wrapped with a modal class that can be easily attached with javascript.

Modals were inspired by the [Tympanus](https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/) article.

Use `griddick` and other components to organize layout.

<div class="_message" markdown="1">

The following works for modals smaller than the window. A special class `._modal-html` can be added to the `<html>` tag when the modal is open to fix some scrolling issues for larger modals.

</div>

<div class="_button" onclick="openWindow()">Open Modal Window</div>

<div class="_modal-container "  >
  <div class="_modal-popup-container "  >
    <div class="_modal _modal-effect-slideUp">
      <div class="_modal-content">
        <div class="_modal-close" onclick="closeWindow()"><i class="fa fa-close"></i></div>
        <div class="_modal-wrapper">
          <h3>This is a header for the modal</h3>
          <p>This is an example of a really long modal, and how it scrolls. Note how a special class is added to the html tag to prevent the body from scrolling in the background / doubling up on scroll bars when the modal is up.</p>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
        </div>
      </div>
    </div>
    <div class="_modal-overlay" onclick="closeWindow()"></div>
  </div>

<script>
  function openWindow() {
    console.log('open!')
    $('._modal-popup-container').addClass('--open');
    $('html').addClass('_modal-html');
    $('._modal').addClass('--open');
  }

  function closeWindow() {
    console.log('close...!');
    $('._modal-popup-container').removeClass('--open');
    $('html').removeClass('_modal-html');
    $('._modal').removeClass('--open');
  }
</script>
</div>



~~~

<div class="_button" onclick="openWindow()">Open Modal Window</div>

<div class="_modal-container "  >
  <div class="_modal-popup-container "  >
    <div class="_modal _modal-effect-slideUp">
      <div class="_modal-content">
        <div class="_modal-close" onclick="closeWindow()"><i class="fa fa-close"></i></div>
        <div class="_modal-wrapper">
          <h3>This is a header for the modal</h3>
          <p>This is an example of a really long modal, and how it scrolls. Note how a special class is added to the html tag to prevent the body from scrolling in the background / doubling up on scroll bars when the modal is up.</p>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
          <div>Modal content goes in here</div>
        </div>
      </div>
    </div>
    <div class="_modal-overlay" onclick="closeWindow()"></div>
  </div>

<script>
  function openWindow() {
    console.log('open!')
    $('._modal-popup-container').addClass('--open');
    $('html').addClass('_modal-html');
    $('._modal').addClass('--open');
  }

  function closeWindow() {
    console.log('close...!');
    $('._modal-popup-container').removeClass('--open');
    $('html').removeClass('_modal-html');
    $('._modal').removeClass('--open');
  }
</script>
~~~

</main>

