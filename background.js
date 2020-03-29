$(document).ready(function () {
	var sidebarLoaded = false; // Avoid sidebar to be watched twice

	$.get( "/api/problems/algorithms/", function( data ) {
		var acBucket = [0, 0, 0, 0];
		var totalBucket = [0, 0, 0, 0];
		data = JSON.parse(data);
		
		for (var i in data.stat_status_pairs) {
			// console.log(JSON.stringify(data.stat_status_pairs[i][j]));
			if (!data.stat_status_pairs[i].paid_only) {
				totalBucket[data.stat_status_pairs[i].difficulty.level] += 1;
				if (data.stat_status_pairs[i].status == "ac")
					acBucket[data.stat_status_pairs[i].difficulty.level] += 1;
			}
		}

		console.log("total = " + totalBucket + " ac = " + acBucket);
		var ac = acBucket.reduce((a,b)=>a+b);
		var total = totalBucket.reduce((a,b)=>a+b);
		$('span.label.label-primary.round').html('<span>' + (total - ac) + ' Todo (' + ac + '/' + total + ' Solved)</span>');
		$('div#welcome span.label.label-success.round').html('<span>Easy ' + (totalBucket[1] - acBucket[1]) + ' Todo</span>');
		$('div#welcome span.label.label-warning.round').html('<span>Medium ' + (totalBucket[2] - acBucket[2]) + ' Todo</span>');
		$('div#welcome span.label.label-danger.round').html('<span>Hard ' + (totalBucket[3] - acBucket[3]) + ' Todo</span>');
		$('div.col-xs-4.text-primary.text-center').html('<div class="text-500 status">' + (total - ac)+ ' </div><span class="text text-sm status">Todo</span>');
		$('div.col-xs-4.text-success.text-center').html('<div class="text-500 status">' + ac + '/' + total + ' </div><span class="text text-sm status">Solved</span>');
		//$('spanlabel.label-primary.round').empty();
		
	});

	// Hide main content while loading
	$('.content-wrapper > *').not('.navbar').css('opacity', '0');

	// Watch main content
	$('.content-wrapper').watch({
		properties: 'prop_innerHTML',
		watchChildren: true,
		callback: function (data, i) {
			$('tr div.frequency-locked i.fa.fa-lock').closest('i').remove()

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
