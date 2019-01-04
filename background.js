$(document).ready(function () {
	var sidebarLoaded = false; // Avoid sidebar to be watched twice

	// Hide main content while loading
	$('.content-wrapper > *').not('.navbar').css('opacity', '0');

	// Watch main content
	$('.content-wrapper').watch({
		properties: 'prop_innerHTML',
		watchChildren: true,
		callback: function (data, i) {
			// Hide locked
			chrome.storage.sync.get('hideLocked', function(response) {
				if (response.hideLocked) {
					$('tr i.fa.fa-lock').closest('tr').css('display', 'none')
				}
			});

			// Hide Accepted
			chrome.storage.sync.get('hideAccepted', function(response) {
				if (response.hideAccepted) {
					$('tr span.text-success.fa.fa-check').closest('tr').css('display', 'none')
				}
			});

			// Hide question stats while on the problem's page
			var info = $('.side-bar');
			if(info.length == 1 && !sidebarLoaded) {
				info.css('opacity', '0');
				sidebarLoaded = true;
			}

			// Show content while loaded
			$('.content-wrapper > *').not('.navbar').css('opacity', '1');

			// After succesful submission
			$('.action').watch({
				properties: 'prop_innerHTML',
	  		watchChildren: true,
	  		callback: function (data, i) {
	  			var count = $('#result-state.text-success').length; // If the solution has been accepted
	    		if (count == 1) {
						// Show stats of the current problem
						info.css('opacity', '1');
						// Hide next challenges difficulty
						$('.next-challenge-list a').css('background-color', '#000');
	    		}
	  		}
			});
		}
	});
});
