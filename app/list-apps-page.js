var lvmModule = require("./login-view-model");

function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = { apps: page.navigationContext };
}
exports.pageNavigatedTo = pageNavigatedTo;
