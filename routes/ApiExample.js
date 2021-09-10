module.exports = {
    name: "apitest",
    run: async(req, res) => {
        const api = req.query.p;
        const apilist = require("../api/apilist.json")
        const apiprovided = apilist.find((userData) => userData === `${api}`)
        
        if (api === apiprovided) {
        const query = req.query.q;
        if(!query) return res.json({ error: "API EAT YOU KNOWWWWWWWWWW" });
        res.json({
            "apikey" : `your api is ${api}`,
            "query" : `your text is ${query}`,
            "here" : "here"
           })
        } else {
            res.json({ error: "Api not valid" });
        }
    }
}