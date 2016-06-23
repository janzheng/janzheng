
$(document).ready(function() {

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
  var nav_container = $('.right-rail-nav');

  // the navigation menu element. 
  // this element floats, so we don't always know its true size.
  var nav_element = $(nav_container).children('nav');

  // the actual items in the navigation. 
  var nav_items = $(nav_element).children('.nav_items');

  // necessary for css positioning
  var nav_height = nav_element.outerHeight();

  // page element where navigation will stop sticking to the side
  // FLOW 6: Use the last column-1 as the class
  // var last_element = $('.stop_nav');
  var last_element = $('.column-1:last-child');

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

