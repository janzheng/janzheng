


var navOffset = -60;

function verticalScroll(_target) {
  // console.log('scrolling to ', _target)
  var scrollElement = 'html, body';
  event.preventDefault();
  
  // Smooth scrolling for internal links
  $("a[href^='#']").click(function(event) {
    event.preventDefault();

    // var $this = $(this),
    var target = this.hash || _target,
        $target = $(target),
        offset = $('a[href='+target+']').data('offset-scroll') || 0; // <... data-offset-scroll="400"> 
        offset += navOffset;

    // console.log('scroll: ' , target, $('a[href='+target+']'), $('a[href='+target+']').data('offset-scroll'))
    // if(_target) {
    //   offset = $('a[href=#'+'target]').data('offset-scroll') || 0;
    //   console.log('new target offset: ', offset, _target)
    // }
    // console.log('start vScroll')

    if( typeof $target.offset() !== "undefined") {
      // window.location.hash = target;
      $(scrollElement).stop().animate({
        'scrollTop': $target.offset().top + offset
      }, 500, 'swing', function() {

        // changes target id so we don't scroll twice w/ setting location
        var id = target.replace(/^.*#/, ''),
            elem = document.getElementById(id)
        elem.id = id+'-tmp'
        window.location.hash = target
        elem.id = id

        // window.location.hash = target;
        event.preventDefault();
        // console.log('finished vScroll: ', target)
      });
    }
  });
}




$(document).ready(function() {

  // hide loader; reveal page
  window.setTimeout(onLoadPage, 400)

  $("a[href^='#'], html, body").unbind();
  // 
  // Smooth Scrolling 
  // - can link to a # of another page, and smooth-scroll down to that #
  // 


  // console.log('window height/width: ' + windowHeight + ' | ' + windowWidth);



  // sidebar element
  // var sidebar = new ScrollMagic.Scene({triggerElement: "._sidebar-tr", triggerHook: "onLeave"})
  //         .setClassToggle("._sidebar", "--pinned") // add class toggle
  //         .addTo(stickyController);


});


// runs after ready, after all elements have loaded
$(window).load(function() {
  var windowHeight = $(window).height();
  windowWidth = $(window).width();

  // intercept hash load
  let hash = location.hash;
  // console.log(hash);

  if(hash !== '') {
    verticalScroll(hash);
  } else {
    verticalScroll();
  }
  
  onResize();
})


function isMobile() { 
  // not really device sniffing. just responsive 
  if( $(window).width() >= 768 ) {
    return false;
  }
  return true;
}


// this runs on every resize
// good for width/height setting
function onResize() {
  // console.log('onresize')

  // sets the size of the hero element
  var heroHeight = 0.6 * $(window).height(); // 0.6vh
  var heroHeight_xs = 612; // 0.9 * $(window).height(); // 0.6vh

  if(isMobile()) {
    // console.log('setting at fixed', heroHeight_xs)
    $('._hero, ._hero figure').css({'height': heroHeight_xs})
  } else {
    // console.log('setting at ', heroHeight)
    $('._hero, ._hero figure').css({'height': heroHeight})
  }

  // 
  // sticky nav
  // 

  // animation controller
  var stickyController = new ScrollMagic.Controller();

  // scroll delay on effects
  // if( !isMobile() ) {
  //   var navFx = new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", offset: 50})
  //         .setClassToggle("#nav", "--pinned") // add class toggle
  //         .addTo(stickyController);
  // }

  // for drawing grids for _grid-markers
  var mainWidth = parseInt($('._grid-markers-basis').css( "width" )) - parseInt($('._grid-markers-basis').css( "padding-right" )) - parseInt($('._grid-markers-basis').css( "padding-left" ));
  var cols = $('._grid-markers').data('cols');
  // console.log('grid marker width: ', mainWidth, ' cols', cols, $('._grid-markers').innerWidth());

  var emptyDivs = '';
  for(i=0; i<cols; i++) {
    emptyDivs += '<div></div>'; // create empty divs for markers
  }
  
  $('._grid-markers')
    .html(emptyDivs)
    .width(mainWidth)
    .addClass('_span-col-'+cols)
    .css({
      'grid-template-columns': 'repeat('+cols+', 1fr)',
      'margin-left': $('._grid-markers-basis').css( "padding-left" ),
      'margin-right': $('._grid-markers-basis').css( "padding-right" ),
    });

}

$(window).on('resize', _.throttle(onResize, 500));

function onLoadPage() {
  $('body').addClass('--loaded')
}


