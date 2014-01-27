
$(document).ready(function() {

  $('.flexslider').flexslider({
    animation: "slide",
    slideshow: false,
    itemWidth: 2000
  });


  // set background images for posts with bg-images on homepage
  $('.post-list').each(function(){
    var bg = $(this).data("bg");
    if(typeof $(this).data("bg") != 'undefined') {
      console.log('exists')
      $(this).css('background-image', 'url(' + bg + ')');
    } 
});

// ************************************************************
// Button show / hide functionality
//initially hide all collapsible areas (specified in CSS)
// $(".mobile-hide").hide();

// $(".mobile-open").click(function() {
//   var width = $(window).width();
//   // if( width <= 480 ) {$(this).find('.mobile-hide').slideToggle();}
//   if( width <= 480 ){toggleMobile(this);}
// });


// function toggleMobile(input){
//   var state = $(input).find('.mobile-hide').css('display');
  
//   if (state == 'none'){
//     showMobile(input);
//   } else
//   { hideMobile(input); }
// }
// function showMobile(input) {
//     $(input).find('.mobile-hide').css('display', 'block');
// }

// function hideMobile(input) {
//     $(input).find('.mobile-hide').css('display', 'none');
// }
// End button show / hide
// ************************************************************

   //show / hide functionality
   //initially hide all collapsible areas; moved into CSS instead
   // $(".expandable .collapsible").hide();
   // $(".btn").mousedown(function() {
   $(".btn").bind('mouseup',function(e) {
      console.log("btn btn clicked"); 
      $(this).parent().find('.collapsible, .collapsible-mobile').toggle();
      $(this).parent().find('.btn-open-mobile, .btn-close-mobile, .btn-open, .btn-close').toggle();
   });

  //reset all buttons when window resizes, or the open/close buttons will show all weird-like
  var pause = 500;
  var newWidth, lastWidth;
  setInterval(function(){interval()},pause);

  function interval()
  {
    lastWidth = newWidth;
    newWidth = $(window).width();
    // console.log('interval tick: ' + lastWidth + ' ' + newWidth)

    //show buttons and hide content if in mobile view
    if(lastWidth != newWidth) {
      if( newWidth >= 470 ) {
        // medium and large
        $('.btn-open-mobile, .btn-close-mobile').hide();
        $('.collapsible-mobile').show();
      } else if( newWidth < 470 ) {
         // code for mobile portrait
        $('.collapsible-mobile, .btn-close-mobile').hide();
        $('.btn-open-mobile').show();
      }
    }
  }


   // var delay = (function(){
   //     var timer = 0;
   //     return function(callback, ms){
   //         clearTimeout (timer);
   //         timer = setTimeout(callback, ms);
   //         console.log('delay tick')
   //     };
   // })();

   //     var pause = 1000; // will only process code within delay(function() { ... }) every 100ms.
   //     delay(function() {
   //         var width = $(window).width();
   //         console.log("callback function")
   
   //        //show buttons and hide content if in mobile view
   //         if( width >= 470 ) {
   //            // medium and large
   //            $('.btn-open-mobile, .btn-close-mobile').hide();
   //            $('.collapsible-mobile').show();
   //         } else if( width < 470 ) {
   //             // code for mobile portrait
   //            $('.collapsible-mobile, .btn-close-mobile').hide();
   //            $('.btn-open-mobile').show();
   //         }
       
   //     }, pause );
   // });

   // $(function() {
   //     var pause = 1000; // will only process code within delay(function() { ... }) every 100ms.
   //     $(window).resize(function() {
   //         delay(function() {
   //             var width = $(window).width();
       
   //            //show buttons and hide content if in mobile view
   //             if( width >= 470 ) {
   //                // medium and large
   //                $('.btn-open-mobile, .btn-close-mobile').hide();
   //                $('.collapsible-mobile').show();
   //             } else if( width < 470 ) {
   //                 // code for mobile portrait
   //                $('.collapsible-mobile, .btn-close-mobile').hide();
   //                $('.btn-open-mobile').show();
   //             }
           
   //         }, pause );
   //     });
   //     $(window).resize();

   // });

}); // end .ready


