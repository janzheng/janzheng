$(function(){
	$(".post-home h1 a").hover(
	  function () {
	    $(this).parent().parent().find(".external").addClass("hover");
	  },
	  function () {
	    $(this).parent().parent().find(".external").removeClass("hover");
	  }
	);
});
