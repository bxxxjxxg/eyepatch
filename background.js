
$(document).ready(function () {
	
	// Hide acceptance
	$('tbody.reactable-data td:nth-child(5)').each((index, obj) => {
  		$(obj).css('opacity', '0');
	});
	
	// Hide difficulty
	$('tbody.reactable-data td:nth-child(6)').each((index, obj) => {
  		$(obj).css('opacity', '0');
	});
	
	// Hide question stats while on the problem's page
	$('.question-info').hide();
   
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

