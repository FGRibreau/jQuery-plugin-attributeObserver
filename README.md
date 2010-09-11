# jQuery PropertyObserver

jQuery PropertyObserver allow developer to bind handler to listen to HTML element's property changes.

## Usage
	
	$('#el').PropertyObserver(attr, callback, [delay]);
	
	//Or in the real word:
	
	$('iframe').PropertyObserver('src', function(oldValue, newValue){
		alert(['iFrame src attribute has changed from ',oldValue,' to ',newValue].join(''));
	}, 1000);