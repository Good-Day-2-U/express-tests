import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('page3/page3' , {
    layout: 'main',
    title: 'Page 3',
    jsScript: '../../scripts.js',
    text: 'Page 4',
    urlLink: '/page4',
    buttonFunc: 'page4()'
  });
});

