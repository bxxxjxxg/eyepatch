
$(document).ready(function () {
   
	$('.header-ac').hide();

	$('.header-level').hide();

	$("#problemList td:nth-child(4)").hide();
	$("#problemList td:nth-child(5)").hide();
	
	$('.total-ac').hide();
	$('.total-submit').hide();

	var info = $('.total-ac').text() + $('.total-submit').text();
	console.log(info);

	$("#result").watch({
		properties: "prop_innerHTML",
    	watchChildren: true,
    	callback: function (data, i) {
    		var count = (data.vals[i].match(/Accepted/g) || []).length;
    		// alert(count);
        	if (count >= 1) {
        		// alert("hey");
        		$("#result-state").css('display','inline-block');
        		
        	}
        	if (count == 2) {
        		$('.total-ac').insertAfter($("#result-state").parent());
        		$('.total-ac').show();
        		$('.total-submit').insertAfter($("#result-state").parent());
				$('.total-submit').show();
        	}
    	}
	});

	chrome.storage.sync.get('hideLocked', function(response) {
		if (response.hideLocked)
			$('tr i').parent().parent().remove();
	});


});

