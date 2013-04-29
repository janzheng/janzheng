
$(document).ready(function() {

  $('.flexslider').flexslider({
    animation: "slide",
    slideshow: false,
    itemWidth: 2000
  });


   //show / hide functionality
   //initially hide all collapsible areas; moved into CSS instead
   // $(".expandable .collapsible").hide();
   $(".btn").click(function() {
      // console.log("clicked"); 
      $(this).parent().find('.collapsible, .collapsible-mobile').toggle();
      $(this).parent().find('.btn-open-mobile, .btn-close-mobile, .btn-open, .btn-close').toggle();
   });

   //reset all buttons when window resizes, or the open/close buttons will show all weird-like

   var delay = (function(){
       var timer = 0;
       return function(callback, ms){
           clearTimeout (timer);
           timer = setTimeout(callback, ms);
       };
   })();

   $(function() {
       var pause = 100; // will only process code within delay(function() { ... }) every 100ms.
       $(window).resize(function() {
           delay(function() {
               var width = $(window).width();
       
              //show buttons and hide content if in mobile view
               if( width > 470 ) {
                  // medium and large
                  $('.btn-open-mobile, .btn-close-mobile').hide();
                  $('.collapsible-mobile').show();
               } else if( width <= 470 ) {
                   // code for mobile portrait
                  $('.collapsible-mobile, .btn-close-mobile').hide();
                  $('.btn-open-mobile').show();
               }
           
           }, pause );
       });
       $(window).resize();

   });

}); // end .ready