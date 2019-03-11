import { Component } from '@angular/core';

@Component({
  selector: 'sn-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  title = 'Hey there!! 👋';
  subtitle = 'My name is Yago';
  description = `I'm a frontend developer and love to create beautiful websites !!. You can check more about me in the followings sites:`;
  links = [
    { url: 'http://linkedin.com/yagopv', name: 'LinkedIn' },
    { url: 'http://github.com/yagopv', name: 'Github' },
    { url: 'http://portfolio.yagoperez.com', name: 'Portfolio' },
    { url: 'http://twitter.com/yperezva', name: 'Twitter' }
  ];

  contact = {
    description: 'If you want to contact with me you can send me an email to:',
    mail: 'yagoperez@outlook.com'
  };
}
