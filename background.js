
$(document).ready(function () {
   
	$('.header-ac').hide();

	$('.header-level').hide();

	$("#problemList td:nth-child(4)").hide();
	$("#problemList td:nth-child(5)").hide();
	$("#question_list th:nth-child(4)").text("");
	$("#question_list th:nth-child(5)").text("");
	$("#question_list td:nth-child(4)").text("");
	$("#question_list td:nth-child(5)").text("");
	
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
        		$('.total-submit').insertAfter($("#result-state").parent());
				$('.total-submit').show();
        		$('.total-ac').insertAfter($("#result-state").parent());
        		$('.total-ac').show();
        	}
    	}
	});

	chrome.storage.sync.get('hideLocked', function(response) {
		if (response.hideLocked)
			$('tr i').parent().parent().remove();
	});


});

