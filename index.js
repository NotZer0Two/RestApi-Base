const express = require("express")
const progressBar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
const target = 100;
const current = 50;
const path = require('path');
const ratio = Math.floor((current / target) * progressBar.length);
const app = express()

require("./routes")(app)
require("./discord")

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/main.css', (req, res) => {
  res.sendFile(process.cwd() + '/main.css')
})

app.listen(5000, () => {
  const newProgressBar = progressBar.substring(0, ratio) + '🔥' + progressBar.substring(ratio + 1, progressBar.length)
  console.log(newProgressBar)
  console.log("➤ ⚠️ | All loaded")
  console.log("➤ ⚠️ | Loaded Main Page")
  console.log("➤ ⚠️ | Loaded Discord Bot")
  console.log("➤ ⚠️ | Created By ZeroTwo")
  console.log(newProgressBar)    
})
// WIKI SECTION | SOLO IN CASO DI AIUTO
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬
//        res.set({ "Content-Type": "image/png" }) | Setta la cosa in imagine png
//        res.send(canvas.toBuffer()) | Manda il canvas
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬
//        res.json({ jsonproperty: `Your query is: ${query}` }) | Manda una sola Querry
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬
//        res.json({       | Manda diverse Querry
//            "pop" : "here",    | PRIMA QUERRY
//            "here" : "here"    | SECONDA QUERRY
//           })
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬

// ERROR SECTION | SOLO PER ERRORI GRAVI
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬
// 404 | La paggina non carica
// ERROR | manca una stringa
// ▬▬▬▬▬▬▬▬▬▬🔥▬▬▬▬▬▬▬▬▬