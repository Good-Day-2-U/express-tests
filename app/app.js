import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {create as createHandlebars} from 'express-handlebars'
import express from 'express';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hbs = createHandlebars();
dotenv.config();


// DATABASE
// import { connect } from './database.js';

// View Engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);



// Main Page
app.use(express.static('public'));

// Canvas Page
import { router as canvasPageRoute } from './views/canvasPage/routes.js';
app.use('/canvasPage', canvasPageRoute);

// About Page
import { router as aboutPageRoute } from './views/aboutPage/routes.js';
app.use('/aboutPage', aboutPageRoute);




// Start App
export function start() {
    app.listen(80, () => {
        console.log('Listening at http://localhost')
    })
}






// Adding a button using handlebar variables {{button text urlLink buttonFunc}}

// hbs.handlebars.registerHelper("button", function(text, urlLink, buttonFunc) {
//   urlLink = hbs.handlebars.escapeExpression(urlLink)
//   text = hbs.handlebars.escapeExpression(text)
//   buttonFunc = hbs.handlebars.escapeExpression(buttonFunc)
      
//  return new hbs.handlebars.SafeString("<button onclick='" + buttonFunc + "' href='" + urlLink + "' target = '_blank'>" + text +"</button>");
// });