$( document).ready( function(){
	$( '#reg-top-show').click( function(){
		$( '#reg-top-block').animate( { height: 'show'}, 500, function(){
			$( '#reg-top-submit').show();
			$( '#reg-top-show').hide();
		});

		return false;
	})

	$( '#reg-bottom-show').click( function(){
		$( '#reg-bottom-block').animate( { width: 'show'}, 500, function(){
			$( '#reg-bottom-submit').show();
			$( '#reg-bottom-show').hide();
		});

		return false;
	})

	$( '.required-control').change( function(){
		var elements = $( this).parents( 'form').find( '.required-control');

		var check = false;
		$( elements).each(function(idx, el){
			var val = $( el).val();

			if( val) {
				check = true;
			}
		});

		if( check) {
			$( elements).removeAttr( 'required');
		} else {
			$( elements).attr( { required: 'required'});
		}

	});


	$('form.ajax').ajaxForm( function( json) {
		var data = JSON.parse( json);
		var self = this;

		if( typeof data.redirect != 'undefined') {
			console.log( 'form redirect: ', data.redirect);
			window.location.replace( data.redirect);
		}

		$(self).find('.message').html('');
		$(self).find('.has-error').removeClass('has-error');

		if( data.errors) {

			console.log( 'form errors: ', data.errors);

			for(var idx in data.errors) {
				$('#' + idx).addClass('has-error')
					.parents('.input-group').addClass('has-error')
					.end().parents('.form-group').addClass('has-error')

			}
		}

		if( data.message) {

			console.log( 'form message: ', data.message);
			$('form .message').html( data.message);
		}
	});


	//user left
	var rand = function(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var getCookie = function(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	var setCookie = function(name, value, options) {
		options = options || {};

		var expires = options.expires;

		if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires*1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		var updatedCookie = name + "=" + value;

		for(var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}

		document.cookie = updatedCookie;
	}

	var deleteCookie = function(name){
		setCookie(name, "", { expires: -1 })
	}

	var pointLeft = function(){
		var name = 'point_left';
		var value = getCookie( name);

		if( typeof value == 'undefined' || value >= 100) {
			value = rand( 50, 99);
		}

		value = value - rand( 1, 3);
		setCookie( name, value);

		if( value > -5000) {
			if( value < 2)
				value = 2;

			if( value < 10)
				value = '0' + value;

			$( '#point-left').html( value);
		} else {
			deleteCookie( name)
		}

		var interval = rand( 10000, 15000);
		setTimeout( pointLeft, interval);
	}

	pointLeft();


	$(function(){

		$('.carousel-items').on('click', '.carousel-block', function (){
			$(this).find('.vidos').fadeIn();
			$('.video_form').fadeIn();
		})
		$('.video_form').click(function(){
			$('.video_form, .vidos').fadeOut();
		});
	});
})