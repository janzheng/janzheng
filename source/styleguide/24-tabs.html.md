---
title: Tabs
type: styleguide
layout: styleguide
name: tabs
section: simple
---


<main markdown="1">

# Tabs

`_tabs.scss`

Tabs are essentially buttons or menu items that shows some information and hides others. The JS implementation is not included as it's fairly straightforward, but will depend on the framework. Class helper flags are provided to make the development earlier however.

There are several ways to implement tabs, including using no JS with radio `<input>` elements. However, I opted for using link tags, as you can set a hash in the URL, and eventually open up the specific tag later by sharing the URL with hash (this part is not implemented). Keep in mind that tab hashes might clash with nav hashes, so don't go too crazy.

By default, tab navigation items are considered unselected. Attach an `--active` class to a `_tabs-item` to indicate selected state.  

~~~
<div class="_margin-bottom-2">
  <div class="_tabs">
    <a href="#tabOne" class="_tabs-item">Tab One</a>
    <a href="#tabTwo" class="_tabs-item --active">Tab Two (active)</a>
    <a href="#tabThree" class="_tabs-item">Tab Three</a>
    <a href="#tabFour" class="_tabs-item">Tab Four</a>
  </div>
</div>
~~~
<div class="_styleguide-example _margin-bottom-2">
  <div class="_tabs">
    <a href="#tabOne" class="_tabs-item">Tab One</a>
    <a href="#tabTwo" class="_tabs-item --active">Tab Two (active)</a>
    <a href="#tabThree" class="_tabs-item">Tab Three</a>
    <a href="#tabFour" class="_tabs-item">Tab Four</a>
  </div>
</div>

With `--border`

<div class="_styleguide-example _margin-bottom-2">
  <div class="_tabs --border">
    <a class="tabOne _tabs-item">Tab One</a>
    <a class="tabTwo _tabs-item --active">Tab Two</a>
    <a class="tabThree _tabs-item">Tab Three</a>
    <a  class="tabFour _tabs-item">Tab Four</a>
  </div>
</div>

Helpers have also been provided for tab content. Add `_tab-container` to the containing element, and add `_tab-content` to each tab of content. By default, every `_tab-content` item will be hidden. Add a `--selected` class to the selected `_tab-content` to display the seleted content tab. 

~~~
  <div class="_tabs --border">
    <a href="#tabOne" class="tabOne _tabs-item">Tab One</a>
    <a href="#tabTwo" class="tabTwo _tabs-item --active">Tab Two</a>
    <a href="#tabThree" class="tabThree _tabs-item">Tab Three</a>
    <a href="#tabFour" class="tabFour _tabs-item">Tab Four</a>
  </div>

<div class="_tab-container">
  <div class="tabOne _tabs-content">Content for tab one</div>
  <div class="tabTwo _tabs-content --selected">Content for tab two</div>
  <div class="tabThree _tabs-content">Content for tab three</div>
  <div class="tabFour _tabs-content">Content for tab four</div>
</div>
~~~

Here is a sample implementation with jQuery. All I am doing is adding the `--active` and `--selected` flag by looking up the hash value from the nav item:

<div class="_styleguide-example _margin-bottom-2">
  <div class="_tabs --border">
    <a href="#tabOne" class="tabOne _tabs-item">Tab One</a>
    <a href="#tabTwo" class="tabTwo _tabs-item --active">Tab Two</a>
    <a href="#tabThree" class="tabThree _tabs-item">Tab Three</a>
    <a href="#tabFour" class="tabFour _tabs-item">Tab Four</a>
  </div>
  <div class="_tab-container">
    <div class="tabOne _tabs-content">Content for tab one</div>
    <div class="tabTwo _tabs-content --selected">Content for tab two</div>
    <div class="tabThree _tabs-content">Content for tab three</div>
    <div class="tabFour _tabs-content">Content for tab four</div>
  </div>
</div>


~~~
<script>
  $('._tabs-item').on('click', function() {
    // set nav
    $('._tabs-item').removeClass('--active');
    $('._tabs-item.' +target).addClass('--active');

    // set content
    $('._tabs-content').removeClass('--selected');
    $('._tabs-content.' +target).addClass('--selected');

  });
</script>
~~~
<script>
  $('._tabs-item').on('click', function() {
    let target = $(this).prop("hash").substr(1);

    // set nav
    $('._tabs-item').removeClass('--active');
    $('._tabs-item.' +target).addClass('--active');

    // set content
    $('._tabs-content').removeClass('--selected');
    $('._tabs-content.' +target).addClass('--selected');

  });
</script>

</main>

