import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('page2/page2' , {
    layout: 'main', 
    title: 'Page 2',
    jsScript: '../../scripts.js',
    buttons: [
      { text: 'Home' , urlLink: '/', buttonFunc: 'homeButton()'},
      { text: 'Page 2', urlLink: '/page2', buttonFunc: 'page2()'},
      { text: 'Page 3' , urlLink: '/page3', buttonFunc: 'page3()'}
    ]
  });
});

