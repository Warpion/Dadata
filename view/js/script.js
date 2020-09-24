$(document).ready(function () {

	var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
	var token = "81fe5d1069034cb9c1e32ee15508bdb879adc471";
	var query = "";

	var options = {
	    method: "POST",
	    mode: "cors",
	    headers: {
	        "Content-Type": "application/json",
	        "Accept": "application/json",
	        "Authorization": "Token " + token
	    },
	    body: JSON.stringify({query: query})
	}

	
	
	$('body').on('click', '.suggest_item', function(event) {
		event.preventDefault();
		$('.address').val( $(this).text() );
		query = $('.address').val();
		addressInputChange(query)
	});

	$('.address').keyup(function() {

		query = $('.address').val();
		addressInputChange(query);
		
	});

	$('body').click(function() {
		let input = $('.address');
		if( !input.is(":focus") ) {
			$('.support').hide();
		} else {
			query = $('.address').val();
			addressInputChange(query);
		}
	});

	function addressLoadSuggestion(result) {
		let suggestions = result.suggestions;
		$('.suggestions').html('');

		if( suggestions.length > 1 ) {
			$('.support').show();
			let i = 0;
			for (let suggest of result.suggestions) {
				if(i < 5) {
					$('.suggestions').append('<div class="suggest_item">' + suggest.value + '</div>');
					i++;
				}
				else { break; }
			}
		}
		else if ( suggestions.length === 1 && result.suggestions[0].value !== $('.address').val() ) {
			$('.support').show();
			$('.suggestions').append('<div class="suggest_item">' + result.suggestions[0].value + '</div>');
		}
		else {
			$('.support').hide();
		}
		
	}

	function addressInputChange(query) {
		options.body = JSON.stringify( {query: query} );

		fetch(url, options)
		.then(response => response.json())
		.then(result => addressLoadSuggestion(result) )
		.catch(error => console.log("error", error));
	}


});