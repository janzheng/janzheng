
jQuery(document).ready(function($) {
  // Please note that autoHeight option has some conflicts with options like imageScaleMode, imageAlignCenter and autoScaleSlider
  // it's recommended to disable them when using autoHeight module
  $('#heroContent').royalSlider({
    autoHeight: false,
    arrowsNav: false,
    fadeinLoadedSlide: true,
    controlNavigationSpacing: 0,
    controlNavigation: 'tabs',
    imageScaleMode: 'none',
    transitionType: 'fade',
    navigateByClick: false,
    sliderDrag: false,
    imageAlignCenter:false,
    loopRewind: false,
    numImagesToPreload: 6,
    keyboardNavEnabled: true,
    usePreloader: false,
    autoPlay: {
            // autoplay options go gere
            enabled: true,
            pauseOnHover: true,
            delay: 5000
        }
  });
});

// jQuery(document).ready(function($) {
//   $('#heroContent').royalSlider({
//     arrowsNav: true,
//     loop: false,
//     keyboardNavEnabled: true,
//     controlsInside: false,
//     imageScaleMode: 'fill',
//     arrowsNavAutoHide: false,
//     autoScaleSlider: true, 
//     autoScaleSliderWidth: 960,     
//     autoScaleSliderHeight: 350,
//     controlNavigation: 'bullets',
//     thumbsFitInViewport: false,
//     navigateByClick: true,
//     startSlideId: 0,
//     autoPlay: false,
//     transitionType:'move',
//     globalCaption: false,
//     deeplinking: {
//       enabled: true,
//       change: false
//     },
//     /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
//     imgWidth: 1400,
//     imgHeight: 680
//   });
// });