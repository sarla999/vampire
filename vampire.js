
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


casper.thenOpen(login_page,function(){
	
//	var login_sign = this.evaluate(function(){
//		return __utils__.exists('.jump_c');
//	});	

	
//	if(login_sign){
//		casper.echo('you are login');
//		casper.exit();
//	}else{
		this.capture('test.png');
		system.stdout.writeLine('input verification code:');
		var vcode = system.stdin.readLine();

		this.fill('form#loginform',{
			'username': 'sarla999',
			'password' : '620519',
			'seccodeverify' : vcode

			},true);

//		}
		
});


casper.then(function(){

	this.wait(6000,function(){
		this.click('.btn4');
	});
	
	this.wait(3000,function(){
		this.click('.btForum');
	});
	
	//this.wait(2000,function(){
	//	this.capture('login.png');
	//});
});


casper.thenOpen(list_page,function(){
	this.waitFor(function check(){
		return this.evaluate(function(){
					return __utils__.exists('#waterfall');
				});	
			},function then(){
				this.capture('list.png');
				});
	
});

casper.run();
