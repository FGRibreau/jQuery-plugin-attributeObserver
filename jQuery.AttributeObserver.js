/*
  jQuery-AttributeObserver v0.1, by Francois-Guillaume Ribreau.

  Copyright (c)2010 Francois-Guillaume Ribreau. All rights reserved.
  Released under the Creative Commons BY-SA Conditions.
    http://creativecommons.org/licenses/by-sa/3.0/

  Usage:
  	(init):
  		$('#el').AttributeObserver(attr, callback, [delay]);
	
  	(getters):
  		$('#el').AttributeObserver(); //get the AttributeObserver instance
  		$('#el').AttributeObserver().remove(); //Remove the AttributeObserver instance (& clear the timeout)
  		$('#el').AttributeObserver().setOldValue(oldValue); //Set an old value (override the current one)
  		$('#el').AttributeObserver().forceCheck([callback]); //Force a check (callback is optional)
*/

jQuery.fn.AttributeObserver = function(){
	
	var AttributeObserver = function(el, attr, cb, delay){
		var el = el,
				cb = cb,
				delay = delay,
				oldValue = false,
				timeout = null;
		
		function check(){
			var newValue = typeof(attr) == 'function' ? attr(el) : el.getAttribute(attr);
			
			if(oldValue === false){
			  oldValue = newValue;
			}
      
			if(oldValue != newValue){
			  
			  if(typeof(forceCheckCb) == 'function'){
					forceCheckCb(oldValue, newValue, el);
				}
        				
				cb(oldValue, newValue);
				oldValue = newValue;
			}
			
			timeout = setTimeout(function(){check();}, delay);
		}
		
		/* 
		  The following methods could be moved 
		  in AttributeObserver.prototype.
		*/
		this.setOldValue = function(value){
			oldValue = value;
		};
		
		this.remove = function(){
			clearTimeout(timeout);
			$.removeData(el, 'AttributeObserver');
			return $(el);
		}
		
		this.forceCheck = function(forceCheckCb){
			clearTimeout(timeout);
			check(forceCheckCb);
    };

		check();
	};

	
	/* Interface */
	var args = arguments;
	
	if(args.length == 0){
		return $.data(this[0], 'AttributeObserver');
	}
	
	var cb
		, attr
		, delay = 1000;
	
	if(this.length == 0){
		throw new Error('[AttributeObserver] Select one (or more) elements.');
		return false;
	}
	
	if(typeof(args[0]) != 'string' && typeof(args[0]) != 'function'){
		throw new Error('[AttributeObserver] 1st argument must be a string or a function');
		return false;
		
	} else {
		attr = args[0];
	}
	
	if(typeof(args[1]) != 'function'){
		throw new Error('[AttributeObserver] Second argument must be a function');
		return false;
		
	} else {
		cb = args[1];
	}
	
	if(typeof(args[2]) == 'number'){
		delay = args[2];
	}
	
	var i = this.length;
	while(i--){
		$.data(this.eq(i)[0], 'AttributeObserver', new AttributeObserver(this[i], attr, cb, delay));
	}
	
	return this;
};