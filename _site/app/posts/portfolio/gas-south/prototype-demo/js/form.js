$(document).ready(function () {

	// SHOW/HIDE CONDITIONAL AREAS
	$('.conditionalSection').hide();
	$('.trigger').change(function() {
		$('.' + $(this).data('rel')).toggle();
	});
	
	
	
	
	
	/* Masking
	http://igorescobar.github.io/jQuery-Mask-Plugin/
	*/
	
	$('.phoneMask').mask('(000) 000-0000', {placeholder: "(___) ___-____"});
	$('.ssnMask').mask('000-00-0000', {placeholder: "___-__-____"});
	$('.dateMask').mask('00/00/0000', {placeholder: "__/__/____"});


	var btnGroup1 = groupHighlight('.rateselector', '', 'highlight');
	var btnGroup1 = groupHighlight('.rateselector2', '', 'highlight');
	var btnGroup2 = groupHighlight('.serviceselector', '', 'highlight');
	var btnGroup2 = groupHighlight('.servtypeselector', '', 'highlight');
	
	
	function groupHighlight(group, target, highlight) {
		$(group + ' input').change(function() {
			$(group + ' ' + target).removeClass(highlight);
			$(this).parent($(target)).addClass(highlight);
		});
	}


});
