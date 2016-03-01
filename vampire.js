var system = require('system');
var casper = require('casper').create({

	logLevel: "info",
	verbose: true

});


var base_url = 'http://bbs.vrzy.com/';
var login_page = 'http://bbs.vrzy.com/member.php?mod=logging&action=login&mobile=2';
var list_page = 'http://bbs.vrzy.com/forum.php?mod=forumdisplay&fid=43&page=1&mobile=2';
var thread_lists = [];


casper.start();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');

//take login
casper.thenOpen(login_page,function(){
	
		this.capture('test.png');
		system.stdout.writeLine('input verification code:');
		var vcode = system.stdin.readLine();

		this.fill('form#loginform',{
			'username': 'vrjingling',
			'password' : '620519',
			'seccodeverify' : vcode

			},true);

});

//jump to lists page
casper.then(function(){

	this.wait(5000,function(){
		this.click('.btn4');
	});
	
	this.wait(3000,function(){
		this.click('.btForum');
	});
	
});

//get thread url on one page
casper.thenOpen(list_page,function(){
	thread_lists = this.evaluate(function(){
		var listsnode = document.querySelectorAll('div.imgItem a');
		var listsarr = [].slice.call(listsnode,0);

		return listsarr.map(function(item){
			return item.getAttribute('href');
		});
	});
});

//open thread url and replay
casper.then(function(){
	
	casper.each(thread_lists,function(self,link){
		
		self.thenOpen(base_url+link,function(){
			this.wait(2000,function(){
				this.click('.viewBtn');
				this.capture('fastreplay.png');
				casper.exit();
			});
		});
	});

});


casper.run();
