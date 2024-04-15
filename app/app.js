import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {create as createHandlebars} from 'express-handlebars'
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hbs = createHandlebars();
dotenv.config();


// DATABASE
await mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.ghxsadr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)


// View Engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);



// Main Page
app.use(express.static('public'));

// Adding a button using handlebar variables {{button text urlLink buttonFunc}}
hbs.handlebars.registerHelper("button", function(text, urlLink, buttonFunc) {
  urlLink = hbs.handlebars.escapeExpression(urlLink)
  text = hbs.handlebars.escapeExpression(text)
  buttonFunc = hbs.handlebars.escapeExpression(buttonFunc)
      
 return new hbs.handlebars.SafeString("<button onclick='" + buttonFunc + "' href='" + urlLink + "' target = '_blank'>" + text +"</button>");
});

// Page 2
import { router as page2Route } from './views/page2/routes.js';
app.use('/page2', page2Route);

// Page 3
import { router as page3Route } from './views/page3/routes.js';
app.use('/page3', page3Route);

// Page 4
app.get('/page4', (req, res) => {
  res.send("Hello Page 4");
});




// Start App
export function start() {
    app.listen(80, () => {
        console.log('Listening at http://localhost')
    })
}