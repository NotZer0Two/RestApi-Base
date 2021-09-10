const fetch = require('node-fetch');

// example for use node-fetch work for all type of site with json response
module.exports = {
    name: "hug",
    run: async(req, res) => {
        const url = `https://api.tenor.com/v1/search?q=anime_hug&key=APIKEYQ&contentfilter=low`

        let response = await fetch(url);
        let json = await response.json();

        const index = Math.floor(Math.random() * json.results.length);
        res.json({ link: `${json.results[index].url}` })
    }
}