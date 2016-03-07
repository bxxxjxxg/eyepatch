
$(document).ready(function () {
   
	$('.header-ac').hide();

	$('.header-level').hide();

	$("#problemList td:nth-child(4)").hide();
	$("#problemList td:nth-child(5)").hide();

	chrome.storage.sync.get('hideLocked', function(response) {
		if (response.hideLocked)
			$('tr i').parent().parent().remove();
	});

	$('.text-info').hide();

});
