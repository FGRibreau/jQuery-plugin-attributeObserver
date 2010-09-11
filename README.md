# jQuery AttributeObserver

jQuery AttributeObserver allow developer to bind handler to listen to HTML element's attribute changes.

## Usage
	
	$('#el').AttributeObserver(attr, callback, [delay]);
	
	//Or in the real word:
	
	$('iframe').AttributeObserver('src', function(oldValue, newValue){
		alert(['iFrame src attribute has changed from ',oldValue,' to ',newValue].join(''));
	}, 1000);