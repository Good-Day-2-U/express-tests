import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('aboutPage/aboutPage' , {
    layout: 'main',
    titleName: 'About Page',
    scripts: ['scripts/scripts.js']
  });
});
