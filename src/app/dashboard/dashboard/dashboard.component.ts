import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts = [
    {
      user: {
        id: 2,
        name: 'Juan Antonio Rodriguez',
        avatar: 'http://i.pravatar.cc/128?img=2'
      },
      datetime: 1543924629944
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
      comments: [{
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }]
    },
    {
      user: {
        id: 2,
        name: 'Juan Antonio Rodriguez',
        avatar: 'http://i.pravatar.cc/128?img=2'
      },
      datetime: 1543924629944
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
      comments: [{
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }]
    },
    {
      user: {
        id: 2,
        name: 'Juan Antonio Rodriguez',
        avatar: 'http://i.pravatar.cc/128?img=2'
      },
      datetime: 1543924629944
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
      comments: [{
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1',
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }]
    }
  ];

  constructor() {}

  ngOnInit() {
    console.log('onInit - DashboardComponent');
  }
}
