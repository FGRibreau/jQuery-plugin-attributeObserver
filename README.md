# jQuery AttributeObserver [![Gittip](http://badgr.co/gittip/fgribreau.png)](https://www.gittip.com/fgribreau/)

jQuery AttributeObserver allow developer to bind handler to listen to HTML element's attribute changes.

## Usage
	
	$('#el').AttributeObserver(attr || callback, callback, [delay]);
	
	//Or in the real word:
	
	$('title').AttributeObserver('text', function(oldValue, newValue){
		alert(['Page title changed from ',oldValue,' to ',newValue].join(''));
	}, 1000);
	
	//This only works with iFrame on the same domain
	$('iframe').AttributeObserver('src', function(oldValue, newValue){
		alert(['iFrame src changed from ',oldValue,' to ',newValue].join(''));
	}, 1000);
