
var system = require('system');
var casper = require('casper').create({

	logLevel: "info",
	verbose: true

});


var landing_page = 'http://bbs.vrzy.com';
var login_page = 'http://bbs.vrzy.com/member.php?mod=logging&action=login&mobile=2';
var list_page = 'http://bbs.vrzy.com/forum.php?mod=forumdisplay&fid=43&page=1&mobile=2';


casper.start();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');


casper.thenOpen(list_page,function(){
	this.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');

	//this.capture('what.png');
	
	var alllists = this.evaluate(function(){

		var listsnode = document.querySelectorAll('div.imgItem a');
		var listsarr = [].slice.call(listsnode,0);


		return listsarr.map(function(item){
				return item.getAttribute('href');
			});
		
		/*return listsarr.filter(function(e){
					return e;
				}).map(function(item){
					return item.getAttribute('href');
				});*/
	});
	
//	var urls = [];
	
	/*urls = alllists.map(function(item){

		return item.getAttribute('href');
	});*/

	this.echo('this is url');
	console.log(alllists);



});




casper.run();
