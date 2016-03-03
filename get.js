var http = require('http');
var cheerio = require('cheerio');

function open_url(baseurl,param){

	return new Promise(function(resolve, reject){

		var options = {
			hostname : baseurl,
			port : 80,
			path : param,
			method: 'GET',
			headers : {
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
			}
		};



		var req = http.request(options,function(res){

			var htmlcode = '';
	
			res.on('data',function(chunk){
				htmlcode += chunk;
			});

			res.on('end',function(){
				//console.log(htmlcode);
				resolve(htmlcode);
			});
		});


		req.on('error',function(e){
			console.log(e.message);
		});

		req.end();
	});
	
}


function filter_html(htmlcode,keywords){

	$ = cheerio.load(htmlcode);
		

}


open_url('bbs.vrzy.com','/forum.php?mod=forumdisplay&fid=43&page=3').then(function(value){

	console.log(value);

}).catch(function(error){
	console.log(error);
});
