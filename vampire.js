
var system = require('system');
var casper = require('casper').create({

	logLevel: "info",
	verbose: true

});


var landing_page = 'http://bbs.vrzy.com';
var login_page = 'http://bbs.vrzy.com/member.php?mod=logging&action=login&mobile=2';


casper.start();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');


casper.thenOpen(login_page,function(){

	this.capture('test.png');

});


casper.then(function(){

	system.stdout.writeLine('input verification code:');
	var vcode = system.stdin.readLine();

	this.fill('form#loginform',{
		'username': 'sarla999',
		'password' : '620519',
		'seccodeverify' : vcode

	},true);
	
	this.wait(5000,function(){

		this.capture('login.png');
	
	});

});


casper.run();
