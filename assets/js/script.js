
$(document).ready(function() {

   //show / hide functionality
   //initially hide all collapsible areas; moved into JS instead
   // $(".expandable .collapsible").hide();
   $(".btn").click(function() {
      // console.log("clicked"); 
      $(this).parent().find('.collapsible').toggle();
      $(this).parent().find('.btn-open').toggle();
      $(this).parent().find('.btn-close').toggle();
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
       
               if( width > 470 ) {
                  // medium and large
                  $('.btn-open, .btn-close').hide();
                  $('.collapsible').show();
               } else if( width <= 470 ) {
                   // code for mobile portrait
                  $('.collapsible, .btn-close').hide();
                  $('.btn-open').show();
               }
           
           }, pause );
       });
       $(window).resize();

   });


// @include media($small) {
//   .collapsible, .btn-close{
//     display: none;
//   }
// }

// @include media($medium) {
//   .btn-open, .btn-close{
//     display: none;
//   }
// }
}); // end .ready