
$(document).ready(function () {
	
	// Hide acceptance
	$('tbody.reactable-data td:nth-child(5)').each((index, obj) => {
  		$(obj).css('opacity', '0');
	});
	
	// Hide difficulty
	$('tbody.reactable-data td:nth-child(6)').each((index, obj) => {
  		$(obj).css('opacity', '0');
	});
   
   	// @TODO is this depricated?
	$('.header-ac').hide();
	$('.header-level').hide();
	$("#problemList td:nth-child(4)").hide();
	$("#problemList td:nth-child(7)").hide();
	$("#question_list th:nth-child(4)").text("");
	$("#question_list th:nth-child(5)").text("");
	$("#question_list td:nth-child(4)").text("");
	$("#question_list td:nth-child(5)").text("");
	
	var info = $('.question-info.text-info');

	info.hide();


	$("#result").watch({
		properties: "prop_innerHTML",
    		watchChildren: true,
    		callback: function (data, i) {
    			var count = (data.vals[i].match(/class="ng-binding text-success"/g) || []).length;
        		if (count >= 0) {
        			$("#result-state").css('display','inline-block');
        		}
        		if (count == 1) {
        			info.insertAfter($("#result-state").parent());
        			info.show();
        		}
    		}
	});

	chrome.storage.sync.get('hideLocked', function(response) {
		if (response.hideLocked) {
			$('tr i.fa.fa-lock').parent().parent().remove();
		}
	});
});

