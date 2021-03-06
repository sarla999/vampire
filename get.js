var http = require('http');
var cheerio = require('cheerio');

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
var url = 'mongodb://localhost:27017/vampire';



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
				var result = [];
				result.push(baseurl+param);
				result.push(htmlcode);
				resolve(result);
			});
		});


		req.on('error',function(e){
			console.log(e.message);
		});

		req.end();
	});
	
}


//get final thread page url
function get_threads_url(htmlcode){

	$ = cheerio.load(htmlcode);
	var nodelists = $('div.imgItem').children('a');
	var lists = [];
	nodelists.map(function(index,elem){
		lists[index] = $(this).attr('href');
	});

	return lists;
}

//get categroy list page url
function get_cate_url(htmlcode){
	
	$ = cheerio.load(htmlcode);
	var nodelists = $('#ttp_all').nextAll('li').children('a');
	var lists = [];
	nodelists.map(function(index,elem){
		lists[index] = $(this).attr('href');
	});

	return lists;
}

//gen page lists by page num
function gen_page_nums(htmlcode){
	$ = cheerio.load(htmlcode);
	var pages = $('div.pg').children('label').children('span').attr('title');

	var page_lists = [];

	if(typeof(pages) == 'undefined'){
		page_lists.push('page=1');
	}else{
		var nums = /[0-9]+/.exec(pages)[0];
		for(var i=2 ; i<=nums ; i++){
			page_lists.push('page='+i);
		}
	}

	return page_lists;
}

//save url to db
function save_data(pagelists){
	for(var i in pagelists){
		if(pagelists[i] != 'undefined'){
			//var data = {'site':'vrzy.com','url':pagelists[i],'status':0}
			console.log(pagelists[i])
			/*MongoClient.connect(url , function(err,db){
				var col = db.collection('tasks');

				col.insert(data,function(err,result){
					//test.equal(null, err);
					console.log(result);
				});

			});*/

		}
	}

}


var base_url = 'bbs.vrzy.com';
var landing_page = '/forum.php?mod=forumdisplay&fid=43&mobile=2';

open_url(base_url,landing_page).then(function(value){

	var cate_page = get_cate_url(value[1]);

	for(var i in cate_page){
		var cate_page_url = '/'+cate_page[i];

		open_url(base_url,cate_page_url).then(function(value){
			var cate_sub_page_url = [];
			cate_sub_page_url.push(gen_page_nums(value[1]));

			for(var j in cate_sub_page_url){
				if(cate_sub_page_url[j].length == 1){
					var thread_url_lists = get_threads_url(value[1]);					
					//save to db
					save_data(thread_url_lists);
				}else{
					var thread_url_lists = get_threads_url(value[1]);					
					//save to db
					save_data(thread_url_lists);
					for(var v in cate_sub_page_url[j]){

						var query = value[0].substr(12)+'&'+cate_sub_page_url[j][v];
						open_url(base_url,query).then(function(value){
							var thread_url_lists = get_threads_url(value[1]);
							save_data(thread_url_lists);
								//console.log(thread_url_lists);

						}).catch(function(error){
							console.log(error)
						});

					}

				}
			}
			
			//console.log(thread_url_lists);
			//save_data(thread_url_lists);
		}).catch(function(error){
			console.log(error);
		});	
	}


}).catch(function(error){
	console.log(error);
});
