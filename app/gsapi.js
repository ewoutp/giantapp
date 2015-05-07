var http = require("http");
var Base64 = require("./base64").Base64;

var Client = (function () {
    function Client() {
    }
    var baseUrl = "https://api.giantswarm.io/v1/";
    
    Client.prototype.Login = function (login, password, onOk, onError) {
    	var self = this;
		var result;
		http.request({
		    url: baseUrl + "user/" + login + "/login",
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    content: JSON.stringify({ password: Base64.encode(password) })
		}).then(function (response) {
		    result = response.content.toJSON();
		    if (result.status_code === 10000) {
		    	self.token = result.data.Id;
		    	onOk(self.token);
		    } else {
		    	onError(result);
		    }
		}, function (e) {
			onError(e);
		});
    };

    Client.prototype.ListApps = function(org, env, onOk, onError) {
    	var self = this;
		var result;
		http.request({
		    url: baseUrl + "org/" + org + "/env/" + env + "/app/",
		    method: "GET",
		    headers: { 
		    	"Content-Type": "application/json",
		    	"Authorization": "giantswarm " + self.token
		     }
		}).then(function (response) {
		    result = response.content.toJSON();
		    if (result.status_code === 10000) {
		    	onOk(result.data);
		    } else {
		    	onError(result);
		    }
		}, function (e) {
			onError(e);
		});    	
    };

    return Client;
})();

exports.Client = Client;
exports.api = new Client();
