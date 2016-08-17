---
layout: layout-post
title: Semi-Sticky Vertical Sidebar
summary: for pages with really, really long sidebars

source: /app/posts/lab/left-nav
<!-- preview-img : /app/posts/lets-run/preview.png -->
   
preview-css : post-preview-std
<!-- external: # -->
<!-- youtube: # -->
<!-- vimeo: # -->

<!-- categories: info, lab, thought, tool, portfolio -->
category : lab
tags : [prototype, design, ux]

published : true
portfolio : false
comments : true
featured : false
type : blog
---

<notextile>

<!-- <link rel="stylesheet" href="{{page.source}}/left-nav.css"> -->

<style type="text/css">

  .sticky-sidebar-toggle {
    width: 40px;
    font-size: 13px; 
    text-align: center;
    background-color: rgba(82, 185, 62, 0.25);
  }
  .sticky-sidebar-toggle:hover {
    background-color: rgba(82, 185, 62, 0.65);
    cursor: pointer;
  }

  .sticky-sidebar-container {
    width: 40px;
    right: 70px;
    position: absolute;
  }

  .sticky-sidebar-container li{
    width: 40px;
    padding: 60px 0;
    text-align: center;
    list-style-type: none;
  }

    .post--left-nav-taller {
      padding: 20px 0 !important;
    }

  .sticky-sidebar-container ul{
    padding-bottom: 0px !important ;
  }
  .sticky-sidebar-container li:nth-child(1){
    background-color: rgba(42, 112, 125, 0.05);
  }
  .sticky-sidebar-container li:nth-child(2){
    background-color: rgba(42, 112, 125, 0.1);
  }

  .sticky-sidebar-container li:nth-child(3){
    background-color: rgba(42, 112, 125, 0.15);
  }

  .sticky-sidebar-container li:nth-child(4){
    background-color: rgba(42, 112, 125, 0.2);
  }

  .sticky-sidebar-container li:nth-child(5){
    background-color: rgba(42, 112, 125, 0.25);
  }

  .sticky-sidebar-container li:nth-child(6){
    background-color: rgba(42, 112, 125, 0.3);
  }

</style>


<script src="{{page.source}}/waypoints.min.js"></script>
<script src="{{page.source}}/jquery.ba-throttle-debounce.min.js"></script>


<script>

$(document).ready(function() {

  // click this button to toggle the menu size
  $('.sticky-sidebar-toggle').click( 
    function() { 
      $('.sticky-sidebar-container li').toggleClass("post--left-nav-taller")
      refresh();
    } 
  )

  // 
  // de-duplication code
  // 

  // Resize + Scroll debouncer from: http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
  $(window).resize( $.throttle( 130, window_resize ) );   // Bind the throttled handler to the resize event.
  $(window).scroll( $.throttle( 80, scroll ) );           // Bind the throttled handler to the scroll event.



  // 
  // ELEMENTS
  // 

  // the navigation container that aligns the menu horizontally, and determines the start position.
  // this element floats, so we don't always know its true size.
  var nav_container = $('.sticky-sidebar-nav');

  // the navigation menu element. 
  // this element floats, so we don't always know its true size.
  var nav_element = $(nav_container).children('nav');

  // the actual items in the navigation. 
  var nav_items = $(nav_element).children('.sticky-sidebar-nav-items');

  // necessary for css positioning
  var nav_height = nav_element.outerHeight();

  // page element where navigation will stop sticking to the side
  var last_element = $('.sticky-sidebar-stop');

  // 
  // POSITIONS
  // once a waypoint is triggered, the position tells the menu where the menu should be positioned
  // 

  // if the container isn't at the top of the page, this value adjusts for that difference
  var container_position = $(nav_container).parent().offset().top; 
  // where should the menu stick at the last element?
  var position_end = last_element.position().top + last_element.height() - nav_height - container_position;


  // 
  // OFFSETS
  // offsets tell the waypoints when they should be triggered.
  // 

  // all offsets are relative to the navigation menu, and will trigger waypoints
  // when the navigation menu hits various parts of the page.
  var offset_start = 0;     // very top of the container
  var offset_top = 0;       // top of the element

  // where the bottom of the element hits the browser viewport. We subtract by viewport height to get the bottom of the viewport, instead of top
  var offset_bottom = $.waypoints('viewportHeight') - nav_height; 

  // offset is relative to bottom of the window. This is calculated in scroll and refresh
  var offset_end = last_element.height() - container_position + nav_height;

  // 
  // COMPUTATION VALUES
  // these values determine where the waypoints will trigger, and where the navigation menu will stick
  // 

  // is the menu too tall for the window?
  // this could be a function, but as a variable it isn't evaluated as many times
  var is_too_tall = ($.waypoints('viewportHeight') < nav_element.outerHeight()) ? true : false; 
  if (!is_too_tall) {offset_end = last_element.height() - container_position + nav_height;}

  var direction, last_direction, last_scroll_top = 0, wp_state = 0;
  // wp_state is required to stop any interactions from firing below the end waypoint. These might fire in 
  // different orders on page load, depending on the viewport's scroll position

  function refresh() {
    // using nav_items because it will report the true height, since it never floats
    // need to calculate new heights on refresh
    nav_height = nav_items.height();

    // Positions
    container_position = $(nav_container).parent().offset().top; 
    position_end = last_element.position().top + last_element.height() - nav_height - container_position;

    offset_bottom = $.waypoints('viewportHeight') - nav_height; 
    offset_end = 0 - last_element.height() + $.waypoints('viewportHeight'); 

    is_too_tall = ($.waypoints('viewportHeight') < nav_items.outerHeight()) ? true : false; 
    if (!is_too_tall) {offset_end = 0 - last_element.height() + nav_height;}

    $.waypoints('refresh');
  }


  // 
  //  WAYPOINT Triggers
  // 

  //  WAYPOINT 1: Top of the Container; the top of the page / parent element
  var wp1 = $(nav_container).waypoint(function(dir) {
    state_container_top($(this), dir); 
  }, { offset: offset_start });

  //  WAYPOINT 2: Top of the Navigation Element; top of the menu, but not necessarily at top of page
  var wp2 = $(nav_element).waypoint(function(dir) {
    state_menu_top($(this), dir);
  }, { offset: function() { return offset_top } });
  // }, { offset: function() { console.log('new top offset: ' + offset_top); return offset_top } });

  //  WAYPOINT 3: Bottom of the Navigation Element;
  var wp3 = $(nav_element).waypoint(function(dir) {
    state_menu_bottom($(this), dir);
  }, { offset: function() { return offset_bottom } });

  //  WAYPOINT 4: Bottom of the Last Element; bottom of the page
  var wp4 = $(last_element).waypoint(function(dir) {
    state_container_bottom($(this), dir);
  }, { offset: function() { return offset_end } });


  // Resize + Scroll debouncer from: http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
  function scroll() {
    last_direction = direction;
    direction = (last_scroll_top < $(window).scrollTop()) ? 'down' : 'up';
    last_scroll_top = $(window).scrollTop();

    if (last_direction != direction) {
      refresh();
      new_position = nav_element.offset().top;
      absolute_position = new_position - container_position;

      if(is_too_tall) {
        $(nav_element).css({
          'position' : 'absolute',
          'top' : absolute_position
        });
      }
    }

  }

  function window_resize() {
    // on resize needs to call the scroll function for a refresh, or all the waypoints will be wrong
    refresh();
  }

  // when users focus back on the tab, they might have resized the browser.
  $(window).focus(function() {
    refresh();
  })






  // 
  //  STATE CONTROLLERS
  //  These are actions that the current state of the menu, and are separated from the triggers

  function state_container_top(_this, dir) {
    console.log('waypoint 1 : ' + dir);

    // if the viewport's at the very top, we set the position to static, so menu stays at the top of the container
    if (dir==='up') {

      nav_element.css({
        'position' : 'static'
      });

    } 
  }

  function state_menu_top(_this, dir) {
    console.log('waypoint 2 : ' + dir)

    // this happens when we're scrolling the viewport up, and we hit the top of the nav element
    if (dir==='up' && is_too_tall) {

      // note, don't set the waypoint element as sticky, as it'll cause problems
      $(_this).css({
        'position' : 'fixed',
        'top' : 0
      });
    } else if (!is_too_tall) {
      $(_this).css({
        'position' : 'fixed',
        'top' : 0,
        'bottom' : ''
      });
    }
  }

  function state_menu_bottom(_this, dir) {
    console.log('waypoint 3 : ' + dir)

    // if user's scrolling down and menu is too tall, set to fixed at the bottom
    if(dir==='down' && is_too_tall && wp_state !== 'bottom') {

      // note, don't set the waypoint element as sticky, as it'll cause problems
      $(_this).css({
        'position' : 'fixed',
        // hack / bug fix. If we place the menu at 0, Waypoints will think we're scrolling up.
        // this places the menu 1 pixel below the viewport, so when scrolling down, the
        // waypoint event will fire properly. Unfortunately this creates a 'jumping' effect when
        // scrolling downwards too quickly, right after page load
        'bottom' : -1, 
        'top' : ''
      });

    }


  }

  function state_container_bottom(_this, dir) {
    console.log('waypoint 4 : ' + dir)

    // if the viewport's at the very bottom, we set the position to static no matter the size of the menu
    if (dir==='down') {
      wp_state = 'bottom';
      nav_element.css({
        'position' : 'absolute',
        'top' : position_end,
        'bottom' : ''
      });
    } else {
      wp_state = 'going up';
    }

  }



});
















</script>

  <!-- quick note on the class naming scheme: 'post' just means this is a post on my blog, and 'left-nav' is the name of the article -->
  <!-- might realx the example here to make more legible for others... -->


  <!-- the container holds all the nav elements. I placed it on the right edge of the browser, but this container could be anywhere in the content -->
  <!-- the purpose of the container is to give space for the menu items to move around, and to properly place them somewhere on the page -->


  <div class="sticky-sidebar-container" id="left-nav--anchor-1">
    <div class="sticky-sidebar-toggle">toggle</div>

    <!-- the nav element itself has logic applied to it that will move it up and down the page -->
    <div class="sticky-sidebar-nav" >
      <nav>
        <ul class="sticky-sidebar-nav-items">
          <li><a href="#left-nav--anchor-1">1</a></li>
          <li><a href="#left-nav--anchor-2">2</a></li>
          <li><a href="#left-nav--anchor-3">3</a></li>
          <li><a href="#left-nav--anchor-4">4</a></li>
          <li><a href="#left-nav--anchor-5">5</a></li>
          <li><a href="#left-nav--anchor-6">6</a></li>
        </ul>
      </nav>
    </div>
  </div>

</notextile>


<notextile>
  <div class="article__linkBlock">
    <a href="{{page.source}}/demo/sticky-sidebar-demo.html" class="link-external btn-inline">Demo</a>
    <a href="{{page.source}}/demo/sticky-sidebar.zip" class="link-external btn-inline">Download .zip</a>
  </div>
</notextile>

<p class="dropcap"> Vertical sidebar menus are great. They allow for much more content than horizontal menus, as they can grow past the bottom of the page. For this reason, sites with long pages of documentation such as <a href="http://foundation.zurb.com/docs/">Zurb</a>, <a href="http://neat.bourbon.io/docs/">Bourbon</a>, <a href="http://reallygoodemails.com/">Really Good Emails</a> and <a href="http://getbootstrap.com/components/">Bootstrap</a> tend to employ the vertical navigation design pattern.</p>

Keep in mind that I'm not talking about *top-level primary site navigation*. Instead, I'm specifically talking about page-level vertical sidebar menus.

<h2 id="left-nav--anchor-2">A New Take on an Old Friend</h2>

<figure>
<img src="{{page.source}}/bootstrap3.png"> 
<figcaption>the sidebar from Bootstrap doesn't always fit</figcaption>
</figure> Vertical navigation has existed pretty much since the birth of the internet. Though recently, a few design pattern variations have emerged, including the sticky sidebar (Bootstrap) and the scrolling container (Really Good Emails). The scrolling container is self-explanatory: users scroll the menu independently of the main content, and the sidebar is not affected by the scroll position of the main page. In contrast, as users scroll down the page on Bootstrap, the menu sticks to the side as a _fixed position_ css element, and reacts to the user's scroll position. This latter method creates a stronger  "bond" between the sidebar and the content, as clicking on sidebar items will scroll to different parts of the page. 

In addition to the sticky nav, Bootstrap does something else that's very clever: it detects the users' scroll position, and expands different parts of the sidebar. However, as I'm on a small screen, expanding submenus ends up pushing the rest of the menu outside my browser, pushing some items below the viewport.



<h2 id="#left-nav--anchor-3">Scaling Upwards</h2>

<figure class="figure-wide">
<img src="{{page.source}}/up2.jpg" />
</figure>


A vertical nav falls apart if there are too many links on the menu. If it's too tall, links will appear below the fold. And if it's sticky, users will never see those f links.

In this case, one solution is to allow the viewport to keep scrolling continue scrolling until the bottom of the menu is visible, and stick the menu to the viewport as the browser continues scrolling down. Likewise, when scrolling up, let the menu scroll with the content until the top of the menu is visible before making the menu stick. This method will let users to quickly access both the top and the bottom of the navigation menu.

The one down-side to this implementation is the user won't always see current active menu item, since if the menu is very tall, the active link might either be above or below the viewport.

I've seen a few implementations of this idea in the wild, but can't remember where. I'll update this post with examples when I find any. Or you could spare me the trouble and [send me some](mailto:janeazy@gmail.com).


<h2 id="#left-nav--anchor-4">Implementation</h2>

There are a few scenarios I used when I built the demo:

* Is the sidebar always fairly short?
* Is the sidebar most likely going to be very tall?
* Could the sidebar be either short or tall?

1) If the sidebar is usually short, it will most likely never be larger than the browser viewport. In this scenario, the sidebar could easily remain a fixed-position element.

2) If the sidebar is always taller than the viewport, we can let the viewport scroll to the bottom or the top edge of sidebar menu before applying a sticky effect, This way, every part of the sidebar will be easier to access.

3) This case is a combination of the first two cases. The menu behavior needs to respond to the dynamic size of the navigation element. It adds a small amount of complication, but still adheres to items 1) and 2). This is the scenario that's covered by this demo page.

To approach scenario 3, I used [JQuery Waypoints](http://imakewebthings.com/jquery-waypoints/) to track the positions of menu objects relative to both the viewport and other objects. A much simpler way to implement a sticky menu is using [Skrollr](https://github.com/Prinzhorn/skrollr), but Skrollr lacks the dynamic properties of Waypoints. It would be a good technology for scenario 1, if the menu height and the waypoints weren't dynamic.

The implementation using Waypoints is fairly straightforward. On every element change or viewport interaction (like the size of the menu changing, the page is scrolled, or the browser resized) I update the relative waypoint offsets, and the positions where the menu should stick. I'm using Waypoints to track for the scroll condition, and set the appropriate values when a certain scroll condition has been met. 

I also make sure to implement deduplication and other barriers to prevent the system from calculating more than it needs to, to keep the scrolling mechanism as smooth as possible.



<h2 id="#left-nav--anchor-5">Bugs and Issues</h2>

After several code rewrites and iterations, most bugs have been squashed. Though there are still a few bugs:

1) The way I'm implementing the debouncer to reduce the number of calculations doesn't always seem to catch user behavior, like scrolling or resizing.

2) I'm not sure how to account for zooming in the browser, since I don't know how to capture browser behavior.

3) I'm accounting for page focus and page resize, but I'm not accounting for repositioning the menu while the browser window is being resized. At the end of window resize, the menu position will be wrong until the viewport hits another waypoint.

4) Finally, this method will not work properly on mobile and tablet devices, as scrolling won't fire until the scrolling stops. [ScrollMagic](https://github.com/janpaepke/ScrollMagic) seems to have bypassed this issue by using iScroll, but at this point it might make more sense to use an independent sidebar or an [off-canvas](http://www.lukew.com/ff/entry.asp?1514s) pattern. 

If you have found issues or have any ideas to how to speed up, improve, or fix anything, please [send me a note!](mailto:janeazy@gmail.com)

<p class="sticky-sidebar-stop"> This is the last section that the sidebar will follow, as denoted by the class <code>.sticky-sidebar-stop</code>.</p>


<h2 id="left-nav--anchor-6">Lastly</h2>

Sometimes a little more effort is required to add subtle pieces of details, something most might not even recognize, but the extra effort definitely can make a product or functionality shine.

All the code for this repository is free to use. It is experimental and a proof of concept, and is (only somewhat) optimized or checked for bugs. If you'd like to add this functionality to your site, you're more than welcome.

In the future I'll create a separate Github project with a guide on how to use the code.

<a href="{{page.source}}/demo/sticky-sidebar-demo.html" class="link-external btn-inline">Demo</a>
<a href="{{page.source}}/demo/sticky-sidebar.zip" class="link-external btn-inline">Download .zip</a>
