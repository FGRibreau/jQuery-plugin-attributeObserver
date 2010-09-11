module("PropertyObserver");

var callback = function(oldValue, newValue){
  ok(true, 'Callback (value changed from '+ oldValue + ' to ' + newValue + ')');
};

test('Input::value', function(){
	var $elmts = $('#qunit-fixture input')
	  , i = $elmts.length
	  , a = 0;
  
  expect(i*4);
  //Init observer
	while(i--){
	  $elmts.eq(i).PropertyObserver('value', callback, 100);
	  
	  equals(typeof($elmts.eq(i).PropertyObserver()), 'object', 'Get instance');
	}

	//Change value (the low level way)
	$elmts.each(function(id, el){
	  this.setAttribute('value','myNewValue');
	});
	
	stop();

	setTimeout(function(){
	  start();//Restart test
	  $elmts.each(function(i){
  	  var inst = $elmts.eq(i).PropertyObserver();
      ok(inst && inst.remove, 'Get instance');
      inst.remove();

      equals($elmts.eq(i).PropertyObserver(), null, 'Remove instance');
    });
    
	},300);
});

test('iFrame::src', function(){
	var $elmt = $('#myiframe')
	  , a = 0;
  
  expect(4);
  //Init observer
	$elmt.PropertyObserver('src', callback);
	var inst = $elmt.PropertyObserver();
	ok(inst && inst.remove, 'Get instance');

	//Change value (jQuery way)
	$elmt.attr('src', 'http://fgribreau.com/');
	
	stop();

	setTimeout(function(){
	  start();//Restart test
	  
	  console.debug($elmt, $elmt.PropertyObserver());
	  var inst = $elmt.PropertyObserver();
    ok(inst && inst.remove, 'Get instance');
    inst.remove();

    equals($elmt.PropertyObserver(), null, 'Remove instance');
	},1100);
});