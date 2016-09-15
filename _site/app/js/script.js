
$(document).ready(function() {







  // $('.flexslider').flexslider({
  //   animation: "slide",
  //   slideshow: false,
  //   itemWidth: 2000
  // });

  // Initiate Skrollr for parallax scrolling
  // skrollr.init({forceHeight: false, easing: 'cubic'});
  // don't init on mobile

  //  DO WE REALLY NEED THIS?!?
  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    skrollr.init({
        forceHeight: false,
        easing: 'cubic'
    });
}

  // set background images for posts with bg-images on homepage
  $('.post__container').each(function(){
    var bg = $(this).data("bg");
    if(typeof $(this).data("bg") != 'undefined') {
      $(this).css('background-image', 'url(' + bg + ')');
    } 
  });

  // set header images for posts with bg-images on homepage
  $('.article__head__img').each(function(){
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
    try {
      blogPosts.filter(function(post) {
        return post.values().sortCategory == cat ? true : false;
      }); 
    } catch(e) {
      // do nothing
    }
  }

  function filterReset() {
    blogPosts.filter();
  }


  if(window.location.hash.length > 0) {
    var hash = window.location.hash.substring(1);
    filterBy(hash);
    $(".filter-btn[data-filter='"+hash+"']").addClass('filter-btn--active');
  }
  $(".filter-clear").bind('mouseup',function(e) {
    window.location.hash = '';
    filterReset();
    $(".filter-btn").removeClass('filter-btn--active');
  });

  $(".filter-btn").bind('mouseup',function(e) {
    if ($(this).hasClass('filter-btn--active')) {
      window.location.hash = '';
      filterReset();
      $(".filter-btn").removeClass('filter-btn--active');
    } else {
      window.location.hash = $(this).data('filter');
      $(".filter-btn").removeClass('filter-btn--active');
      filterBy($(this).data('filter'));
      $(this).addClass('filter-btn--active');
    }
  });



  // 
  // FLUIDBOX lightbox
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
  $('.article a[href]:not(.fluidbox):not(.sameTab):not(.about-link)').click(function(e) {
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
              'stay a while, and listen.', 
              "let's make it happen.",
              'to complain is easy, to act is hard.',
              "seize the day. Be extraordinary.",
            ];

  rand = Math.floor(Math.random()*(quotes.length));
  $('.aboutQuote').text(quotes[rand]);


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


// only check resize for about page for speed
if (window.location.pathname == "/about.html") {
  $( window ).resize(function() {
    refreshStickyElements();
  });
}

function refreshStickyElements() {
  
  // lazy, inefficient (but quick) way of refreshing waypoints
  $.waypoints('destroy');

  $( ".sticky-item" ).each(function( index ) {

    // outerheight doesn't include margin by default, setting to true fixes this
    var obj_height = parseInt($(this).children(".sticky-content").outerHeight(true));
    var obj_parent_top = parseInt($(this).parent().offset().top);
    var obj_parent_padbottom = parseInt($(this).parent().css('padding-bottom'));
    var obj_parent_height = parseInt($(this).parent().outerHeight()); // don't include margin for container, so year doesn't hit bottom edge
    var bottom = parseInt(obj_height - obj_parent_height);

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
      // console.log('HIT: bottom=' + bottom + ' obj_height: ' + obj_height + ' obj_parent_height: ' + obj_parent_height + ' obj_parent_padbottom ' + obj_parent_padbottom);
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
    arrowsNav: false,
    loop: false,
    keyboardNavEnabled: true,
    controlsInside: true,
    // imageScaleMode: 'fit',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 500, 
    // controlNavigation: 'bullets',
    thumbsFitInViewport: true,
    // navigateByClick: false,
    controlNavigation: 'thumbnails',
    startSlideId: 0,
    visibleNearby: true,
    autoPlay: false,
    transitionType:'move',
    globalCaption: true,
    fullscreen: {
      // fullscreen options go gere
      enabled: true,
      nativeFS: false
    },
    deeplinking: {
      enabled: true,
      change: false,
      prefix: 'slide-'
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    // imgWidth: 1400,
    imgHeight: 680
  });



  // 
  // tumblr Handler
  // 

  // console.log(tumblr_api_read);

}



