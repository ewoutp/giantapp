var lvmModule = require("./login-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = lvmModule.loginViewModel;
}
exports.pageLoaded = pageLoaded;
