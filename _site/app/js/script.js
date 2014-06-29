
$(document).ready(function() {

  // $('.flexslider').flexslider({
  //   animation: "slide",
  //   slideshow: false,
  //   itemWidth: 2000
  // });

  // Initiate Skrollr for parallax scrolling
  // skrollr.init({forceHeight: false, easing: 'cubic'});
  // don't init on mobile
  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    skrollr.init({
        forceHeight: false,
        easing: 'cubic'
    });
}

  // set background images for posts with bg-images on homepage
  $('.post--container').each(function(){
    var bg = $(this).data("bg");
    if(typeof $(this).data("bg") != 'undefined') {
      $(this).css('background-image', 'url(' + bg + ')');
    } 
  });

  // set header images for posts with bg-images on homepage
  $('.article--head-img').each(function(){
    var img = $(this).data("img");
    if(typeof $(this).data("img") != 'undefined') {
      $(this).css('background-image', 'url(' + img + ')');
    } 
  });




  // 
  // FILTER SYSTEM
  // 

  // dashes won't work w/ list.js, have to use camel
  // sorting for blog posts / uses List.js
  var options = {
      valueNames: [ 'sortCategory', 'sortDate' ]
  };

  var blogPosts = new List('blogList', options);

  function filterBy(cat) {
    blogPosts.filter(function(post) {
      return post.values().sortCategory == cat ? true : false;
    }); 
  }

  function filterReset() {
    blogPosts.filter();
  }

  var titleDefault = $(".page--title").text();
  // not MVC but whatever

  if(window.location.hash.length > 0) {
    var hash = window.location.hash.substring(1);
    filterBy(hash);
    $(".filter-btn[data-filter='"+hash+"']").addClass('filter-btn--active');
  }

  $(".filter-btn").bind('mouseup',function(e) {
    if ($(this).hasClass('filter-btn--active')) {
      window.location.hash = ''
      filterReset();
      $(".page--title").text(titleDefault);
      $(".filter-btn").removeClass('filter-btn--active');
    } else {
      window.location.hash = $(this).data('filter');
      $(".filter-btn").removeClass('filter-btn--active');
      filterBy($(this).data('filter'));
      $(this).addClass('filter-btn--active');
      $(".page--title").text($(this).data('filter') + 's')
    }
  });

  // hover tooltip
  var hoverdefault = $(".page--title").text();






  // 
  // FLUIDBOX
  // 

  $('figure a, a[rel="lightbox"]').fluidbox();




  //make the title blank so it doesn't flash all the time
  // $(".posts--filters").bind('mouseenter',function(e) {
  //   $(".page--title").html('   ');
  // });
  // $(".posts--filters").bind('mouseleave',function(e) {
  //   $(".page--title").text(hoverdefault);
  // });


  // $(".filter-btn").bind('mouseenter',function(e) {
  //   $(".page--title").text($(this).data('filter') + 's');
  // });
  // $(".filter-btn").bind('mouseleave',function(e) {
  //   $(".page--title").html('   ');
  // });


  // 
  // Opens links (in posts and articles) in a new tab
  // 
  $('.article a[href]:not(.fluidbox)').click(function(e) {
    var url = $(this).attr('href');

    // only do this if not an anchor link
    if (url.indexOf('#') == -1 ) {
      e.preventDefault();
      window.open($(this).attr('href'));
    }
  });

  // 
  // generates random quotes for About page
  // 
  quotes = [
              'stay a while, and listen', 
              'stay a while, and listen', 
              'stay a while, and listen', 
              'stay a while, and listen', 
              '"To listen is to lean in, softly, with a willingness to be changed by what we hear." - unknown',
              'would you like a cup of tea?',
              "let's go ride bikes!",
              "let's make things happen!",
              "there's more than one way to skin a website!",
              'it is easy to complain, but difficult to improve!',
              "#yolo. seize the day. make your life extraordinary!",
              "let's design something fun & messy!",
              "let's design something clean & elegant!",
            ];

  rand = Math.floor(Math.random()*(quotes.length));
  $('.about-quote').text(quotes[rand]);


  // Math.floor((Math.random()*10));

  // ************************************************************
  // Smooth Scrolling 
  // - can link to a # of another page, and smooth-scroll down to that #

    var scrollElement = 'html, body';
    
    // Smooth scrolling for internal links
    $("a[href^='#']").click(function(event) {
      event.preventDefault();
      
      var $this = $(this),
      target = this.hash,
      $target = $(target);
      
      if( !(typeof $target.offset() === "undefined")) {
        $(scrollElement).stop().animate({
          'scrollTop': $target.offset().top
        }, 500, 'swing', function() {
          window.location.hash = target;
        });
      }
    });



// ************************************************************
// Button show / hide functionality
// ************************************************************

   $(".expandablejs--preview").bind('mouseup',function(e) {
      // console.log("btn-show-hide--content btn-show-hide clicked"); 
      $(this).parent().find('.expandablejs--full').slideToggle(function() {refreshStickyElements();});
      $(this).parent().find('.expandablejs--btn-open, .expandablejs--btn-close').toggle();
   
      //when opening up some elements (About Us), we need to update the sticky objects
      
   });

}); // end .ready



// 
// Sticky Elements
// Elements stick to the top of the window but doesn't leave the container that it sits inside
// - The key to making the position work is setting the parent container to position: relative
//   so the sticky element's absolute position can use the parent container as a reference
// 

// $('.sticky-item').waypoint('sticky', {
//   direction: 'down',
//   stuckClass: 'stuck',
//   wrapper: '<div class="sticky-wrapper" />'
// });

refreshStickyElements();

function refreshStickyElements() {
  
  // lazy, inefficient (but quick) way of refreshing waypoints
  $.waypoints('destroy');

  $( ".sticky-item" ).each(function( index ) {

    var obj_height = parseInt($(this).children(".sticky-content").outerHeight());
    var obj_parent_top = parseInt($(this).parent().offset().top);
    var obj_parent_padbottom = parseInt($(this).parent().css('padding-bottom'));
    var obj_parent_height = parseInt($(this).parent().outerHeight());
    var bottom = parseInt(obj_height + obj_parent_padbottom - obj_parent_height);

    var topWaypoint = new $(this).waypoint(function(dir) {

      if (dir == 'down') {
        $(this).children(".sticky-content").css({"position": "fixed","top": "0"})
      }
      else {
        $(this).children(".sticky-content").css({"position": "", "top": ""})
      }
    }, { offset: 0 });


    // Going UP
    var bottomWaypoint = new $(this).waypoint(function(dir) {
      if (dir == 'up') {
        $(this).children(".sticky-content").css({"position": "fixed","top": "0"})
      }
      else {
        $(this).children(".sticky-content").css({"position": "absolute", "top": obj_parent_height - obj_height - obj_parent_padbottom})
      }

    }, { offset: bottom });

  });




  // ************************************************************
  // Initiate the royal slider
  $('.royalSlider').royalSlider({
    arrowsNav: true,
    loop: false,
    keyboardNavEnabled: true,
    controlsInside: true,
    imageScaleMode: 'fit',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 450, 
    controlNavigation: 'bullets',
    thumbsFitInViewport: true,
    navigateByClick: false,
    startSlideId: 0,
    visibleNearby: true,
    autoPlay: false,
    transitionType:'move',
    globalCaption: true,
    deeplinking: {
      enabled: true,
      change: false,
      prefix: 'slide-'
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    imgWidth: 1400,
    imgHeight: 680
  });


}
