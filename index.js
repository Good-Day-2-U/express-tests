import express from 'express';

const app = express();

app.use(express.static('public'));

// Main Page
 app.get('/page2', (req, res) => {
   res.send("Hello Page 2");
 });

// Start App
function start() {
    app.listen(80, () => {
        console.log('Listening at http://localhost')
    })
}

// dghslkhdgs

start();