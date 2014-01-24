

// ************************************************************
// Project Code
// - Code specific to the wireframe project
// 
// ************************************************************


// ************************************************************
// Add theme for Holder.js
// when Holder first loads, set a default bg color, and clear all text
// Run Holder with the "real" theme after the desired fonts have been loaded, or the fonts won't display properly
// - Google Webfont addon will ensure fonts are loaded
Holder.add_theme("protowire", {background: "dd5435", text: ""})
 try {
    WebFont.load({
       google: {families: ['Oswald']},
       active: function() {Holder.add_theme("protowire", {background:"#dd5435", foreground:"#fff", size:11, font: "Oswald"}).run();}
    })
 } catch(e) {}
    

// ************************************************************

// ************************************************************
// Fade the main-menu background on scroll
$( window ).scroll(function() {
  var menu = $( "#main-header .floater" );
  if($(document).scrollTop() > 0 ) {
    // scrolled down - darken the menu bg
    menu.css('background-color','rgba(0, 0, 0, 0.8)');
    // uncomment console.log to "reactivate" it, or to confirm .scroll is getting called
  }
  else {
    // scrolled to top - fade back the bg
    menu.css('background-color','rgba(0, 0, 0, 0.2)');
  }
});
// darken bg when mouse hovers over
$( window ).ready(function() {
  $( "#main-header .floater" ).hover(
    function() {
      $(this).css('background-color','rgba(0, 0, 0, 0.8)');

    },function() {
      $(this).css('background-color','rgba(0, 0, 0, 0.2)');
  });
});   
// ************************************************************


// ************************************************************
$( window ).ready(function() {

  // Initiate Skrollr for parallax scrolling
  skrollr.init({forceHeight: false});

});   
// ************************************************************




// ************************************************************
// Initiate the home slider
jQuery(document).ready(function($) {
  $('#home-slider').royalSlider({
    arrowsNav: true,
    loop: false,
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 450, 
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: false,
    startSlideId: 0,
    autoPlay: false,
    transitionType:'move',
    globalCaption: false,
    deeplinking: {
      enabled: true,
      change: false,
      prefix: 'slide-'
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    imgWidth: 1400,
    imgHeight: 680
  });
});




// ************************************************************
// Waypoints 
// - Events based on scroll location
// $('#main-menu').waypoint(function() {
//   notify('100 pixels from the top');
//   alert('yeah')
// }, { offset: 5 });
  

// Waypoint
// ************************************************************








// ************************************************************
// Prototype Code
// - General, reusable prototype / wireframe snippet
// - For wireframe or project-specific code, use project.js
// 
// ************************************************************




// ************************************************************
// Toggle
// Toggles visibility of a target only by adding display:block and removing
//  - example <div class="btn pw-toggle" data-target=".links"></div><div class="links"></div> will add display:block to the link
//  - Useful for mobile menus and breakpoint-specific content
//  - CSS should appropriately hide elements

$(document).ready(function() {

  $(".pw-toggle").click(function() {
    pwToggle(this);
  });

  $(".pw-toggle-hover").hover(function() {
    pwToggle(this);
  });

  function pwToggle(toggleVar) {
    var target = $($(toggleVar).data("target")); //turn target into jQ object
    // console.log("toggle clicked. Target: " + $(this).data("target")); console.dir( target );

    target.animate({height: "toggle"}, 300, "swing", function() {
      target.css('display','');
      target.toggleClass('pw-toggle-visible');
    });

    // toggle current button 'active' state
    $(toggleVar).toggleClass('pw-toggle-active');
  }
});


// End Toggle
// ************************************************************

// ************************************************************
// Select
// In a group of objects, interacting with one object attaches a class to it, and detaches the class from other objects
//  - Example: Mouse over Item A, and Item B and C will fade
//  - <div class="pw-select item active" data-target=".item" data-targetclass="active" ></div>
//    <div class="pw-select item" data-target=".item" data-targetclass="active" ></div>
//    - the code will look for targets and manipulate them. 
//      The 'active' class state could be applied to one of the classes to initially indicate it's active
//    - interacting with one item will attach '.active' on the target, and remove ".active" from the other items
//    - this function only attaches/detaches classes, all styling is done in CSS


$(document).ready(function() {

  $(".pw-select").click(function() {
    pwSelect(this);
  });

  $(".pw-select-hover").hover(function() {
    pwSelect(this);
  });

  function pwSelect(selectVar) {
    var target = $($(selectVar).data("target")); 
    var targetclass = $(selectVar).data("targetclass"); 

    $(target).removeClass(targetclass);
    $(selectVar).addClass(targetclass);
  }

});

// End Select
// ************************************************************




// ************************************************************
// Smooth Scrolling 
// - can link to a # of another page, and smooth-scroll down to that #

$(document).ready(function() {
  var scrollElement = 'html, body';
  
  // Smooth scrolling for internal links
  $("a").click(function(event) {
    if(this.href.match('#') && getRootUrl(this) == getRootUrl(window.location)) {
      target = this.hash;
      event.preventDefault();
      scrollTo(target);
    }
  });

  function scrollTo(hash) {
    // var item = $(item),
    $target = $(hash);
    
    $(scrollElement).stop().animate({
      'scrollTop': $target.offset().top
    }, 500, 'swing', function() {
      window.location.hash = hash
    });

  }

  // check for location hash if loaded from another page or link looks like site.html#link
  if(window.location.hash) {
    // Fragment exists
    var hash = window.location.hash;
    window.location.hash = "#";
    scrollTo(hash);
  }
});
function getRootUrl(url) {
  return String(url).substr(0,String(url.href).indexOf('#'));
}

// End Smooth Scrolling
// ************************************************************





// ************************************************************
// JQuery Lorem Ipsum Generation 
// - generates lorem ipsum content from .lorem-ipsum and data
// - general use $('.ipsum').lorem({ type: 'paragraphs',amount:'4',ptags:true}); 
// -
$(document).ready(function() {

  $( ".lorem-ipsum" ).each(function( index ) {
    var type = $(this).data("type");
    var amount = $(this).data("amount");
    var ptags = $(this).data("ptags");

    $(this).lorem({ type: type, amount: amount, ptags: ptags}); 
  });

});
  

// End Smooth Scrolling
// ************************************************************

