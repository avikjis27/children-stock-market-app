let express = require('express')
const http = require('http');
let app = express();
var port = process.env.PORT || 8080;
var middleware_ep = process.env.MIDDLEWARE_EP;


app.get('/', (req, res) => res.send("Welcome to children's stock market: front end"));

app.get('/data', function (req, res) {
	
	let resp_data = {
		"Frontend-meta":{
			"host": req.headers.host,
		}
	};

	let data=''

	http.get(middleware_ep + "/data", (resp) => {
		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			resp_data["middleware-data"] = JSON.parse(data)
			res.send(resp_data);
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});

});

app.listen(port, function () {
	console.log("Children's stock market is now open!!");
});

process.on('SIGINT', function() {
    process.exit();
});