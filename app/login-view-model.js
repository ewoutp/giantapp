var utils = require('./utils');
var gs = require("./gsapi");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var __extends = utils.extends;
var api = gs.api;

var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.call(this);
        this.set("login", "")
        this.set("password", "")
        this.set("org", "")
        this.set("env", "dev")
    }
    LoginModel.prototype.tapLogin = function () {
        var login = this.get("login");
        var password = this.get("password");
        var org = this.get("org");
        var env = this.get("env");
        api.Login(login, password, function(token) {
            console.log("Token=" + token);
            api.ListApps(org, env, function(apps) {
                console.log(JSON.stringify(apps));
                frameModule.topmost().navigate({
                    moduleName: "list-apps-page",
                    context: apps
                });
            }, function(err) {
                console.log("Error=" + err);                
            });
        }, function(err) {
            console.log("Error=" + err);
        });
    };
    return LoginModel;
})(observable.Observable);

exports.LoginModel = LoginModel;
exports.loginViewModel = new LoginModel();
