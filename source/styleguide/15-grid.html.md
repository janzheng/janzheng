---
title: Grid & Layout
type: styleguide
layout: styleguide
name: grid
section: basics
---


<main markdown="1">

## Grid & Layout

`_griddick.scss`

The Grid system uses the newer HTML5 specced 'CSS Grids'. Support exists for most modern browsers, which means some older browsers will not support CSS grids, which will result in a mobile-look. (No polyfill exists for these users, as it's a smaller demographic at this point. No worries for IE6 anymore!)

The Grid (named 'Griddick') should be fairly straightforward if you're familiar with CSS grids. It mainly exists as a group of helpers to make CSS grids easier to implement. [CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/) has a good overview of how CSS Grids work. [Learn CSS Grid](http://learncssgrid.com/) is also an excellent resource, and [Grid by Example](https://gridbyexample.com/examples/) offers examples of popular grid layouts (and how to implement them).

For mobile and smaller screens, Griddick works with the responsive settings setup in `_heart.scss` to collapse blocks into a single column.  

## Responsive Sizes

The responsive grid is setup with the screen sizes from Bootstrap. Instead of "mobile" and "desktop" breakpoints, the different widths are setup from extra-small to large:

- `xs: 0px to 767px`
- `sm: 768px - 991px`
- `md: 992px - 1199px`
- `lg: 1200px - 2100px` 
- `magic: 640px` useful breakpoint for content


## Grid Examples


~~~
<div class="_grid-one _align-center">
  <div class="_grid-block _color-bg-silver-light">
      <p>One block grid </p>
  </div>
</div>
~~~

<div class="_styleguide-example">
  <div class="_grid-one">
    <div class="_grid-block _color-bg-silver-light">
        <p>One block grid </p>
    </div>
  </div>
</div>


~~~
<div class="_grid-three _align-center">
  <div class="_grid-block _color-bg-silver-light">
      <p>Three block grid </p>
  </div>
  <div class="_grid-block _color-bg-silver-light">
      <p>Three block grid </p>
  </div>
  <div class="_grid-block _color-bg-silver-light">
      <p>Three block grid </p>
  </div>
</div>
~~~

<div class="_styleguide-example">
  <div class="_grid-three">
    <div class="_grid-block _color-bg-silver-light">
        <p>Three block grid </p>
    </div>
    <div class="_grid-block _color-bg-silver-light">
        <p>Three block grid </p>
    </div>
    <div class="_grid-block _color-bg-silver-light">
        <p>Three block grid </p>
    </div>
  </div>
</div>



~~~
<div class="_grid-one-three _align-center">
  <div class="_grid-block _color-bg-silver-light">
      <p>One block grid </p>
  </div>
  <div class="_grid-block _color-bg-silver-light">
      <p>Three block grid </p>
  </div>
</div>
~~~

<div class="_styleguide-example">
<div class="_grid-one-three">
  <div class="_grid-block _color-bg-silver-light">
      <p>One block grid </p>
  </div>
  <div class="_grid-block _color-bg-silver-light">
      <p>Three block grid </p>
  </div>
</div>
</div>


Please check the `_griddick.scss` file for all the different variations, and add more to fit your needs.


## Helpers

Helpers like `._align` exist to both make CSS Grids easier to implement and to expose grid functionality to the HTML-side. For example, `_align-center` exists to vertically align elements on a row. Again, please check the `_griddick.scss` file for the various helper options.


## Layouts

Layouts are more generalized patterns. Currently there's only two layout patterns, the `_grid-content-image` and `_grid-image-content` patterns used to lay out content and images side by side, like one would normally see on marketing landing pages. Note that `grid-row-start` is used to reflow content in mobile view so that images will always appear above the content.


</main>


