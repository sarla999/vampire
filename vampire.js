
var casper = require('casper').create({

	logLevel: "debug",
	verbose: true

});

casper.start();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');

var login_page = 'http://bbs.vrzy.com/member.php?mod=logging&action=login&mobile=2';
var user = 'sarla999';
var pass = '620519';


casper.thenOpen(login_page,function(){

	this.capture('test.png');

});





casper.run();
