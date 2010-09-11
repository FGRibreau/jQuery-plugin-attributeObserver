/*
  jQuery-PropertyObserver v0.1, by Francois-Guillaume Ribreau.

  Copyright (c)2010 Francois-Guillaume Ribreau. All rights reserved.
  Released under the Creative Commons BY-SA Conditions.
    http://creativecommons.org/licenses/by-sa/3.0/

  Usage:
  	(init):
  		$('#el').PropertyObserver(attr, callback, [delay]);
	
  	(getters):
  		$('#el').PropertyObserver(); //get the PropertyObserver instance
  		$('#el').PropertyObserver().remove(); //Remove the PropertyObserver instance (& clear the timeout)
  		$('#el').PropertyObserver().setOldValue(oldValue); //Set an old value (override the current one)
*/

jQuery.fn.PropertyObserver = function(){
	
	var PropertyObserver = function(el, attr, cb, delay){
		var el = el,
				cb = cb,
				delay = delay,
				oldValue = false,
				timeout = null;
		
		function check(){
			var newValue = el.getAttribute(attr);
			
			if(oldValue === false){
			  oldValue = newValue;
			}
      
			if(oldValue != newValue){
				cb(oldValue, newValue);
				oldValue = newValue;
			}
			
			timeout = setTimeout(function(){check();}, delay);
		}
		
		this.setOldValue = function(value){
			oldValue = value;
		};
		
		this.remove = function(){
			clearTimeout(timeout);
			$.removeData(el, 'PropertyObserver');
			return $(el);
		}
		
		check();
	};
	
	/* Interface */
	var args = arguments;
	
	if(args.length == 0){
		return $.data(this[0], 'PropertyObserver');
	}
	
	var cb
		, attr
		, delay = 1000;
	
	if(this.length == 0){
		throw new Error('[PropertyObserver] Select one (or more) elements.');
		return false;
	}
	
	if(typeof(args[0]) != 'string'){
		throw new Error('[PropertyObserver] 1st argument must be a string');
		return false;
		
	} else {
		attr = args[0];
	}
	
	if(typeof(args[1]) != 'function'){
		throw new Error('[PropertyObserver] Second argument must be a function');
		return false;
		
	} else {
		cb = args[1];
	}
	
	if(typeof(args[2]) == 'number'){
		delay = args[2];
	}
	
	var i = this.length;
	while(i--){
		$.data(this.eq(i)[0], 'PropertyObserver', new PropertyObserver(this[i], attr, cb, delay));
	}
	
	return this;
};