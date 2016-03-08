
$(document).ready(function () {
   
	$('.header-ac').hide();

	$('.header-level').hide();

	$("#problemList td:nth-child(4)").hide();
	$("#problemList td:nth-child(5)").hide();

	$("#result").watch({
		properties: "prop_innerHTML",
    	watchChildren: true,
    	callback: function (data, i) {
        	if (data.vals[i].indexOf("Accepted") != -1) {
        		// alert("hey");
        		$("#result-state").css('display','inline-block');
        	}
    	}
	});

	chrome.storage.sync.get('hideLocked', function(response) {
		if (response.hideLocked)
			$('tr i').parent().parent().remove();
	});

	$('.text-info').hide();

});

