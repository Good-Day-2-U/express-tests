import { Router } from 'express';
import {loggedInUser } from '../canvasPage/controller.js';



export const router = Router();

router.get('/', (req, res) => {
  res.render('canvasPage/canvasPage' , {
    layout: 'main', 
    titleName: 'Canvas Page',
    stylesheets: ['css/style.css'],
    scripts: ['scripts/scripts.js','scripts/svgDrawer.js' , 'scripts/uiTools.js', 'scripts/saveAndLoad.js'],
    user: loggedInUser
  });
});