const glob = require("glob");

module.exports = function(app) {

    glob("**/*.js", {cwd: __dirname}, (error, matches) => {
        if (error) return;
        if(matches === "index") return;
        console.log(matches);
    })
}
