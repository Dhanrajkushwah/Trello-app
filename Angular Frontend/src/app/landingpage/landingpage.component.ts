import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  currentIndex = 0;

  constructor() { }
  ngOnInit(): void {
  }

  carouselItems = [
    {
      link: 'https://trello.com/use-cases/project-management',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/5Oc1c9iIDmXtUFHs0uWuLQ/cef21b3212ac080d9d0adad649dc31e9/icon-content-folder_2x.png',
      title: 'Project Management',
      description: 'Keep tasks in order, deadlines on track, and team members aligned with Trello.'
    },
    {
      link: 'https://trello.com/use-cases/meetings',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/5j0J5BEzFktzLYnsszcJWc/be9270f9ea1e9bb3c69a799e54ef9fea/icon-object-megaphone_2x.png',
      title: 'Meetings',
      description: 'Empower your team meetings to be more productive, empowering, and dare we say—fun.'
    },
    {
      link: 'https://trello.com/use-cases/onboarding',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/5JwPiAFuOJCWEdYiTqlfs3/ca86f7f918d09a1782284ba4578a28ec/icon-object-leaf_2x.png',
      title: 'Onboarding',
      description: 'Onboarding to a new company or project is a snap with Trello’s visual layout.'
    },
    {
      link: 'https://trello.com/use-cases/task-management',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/4Mgm4SG6P6bD673rMtNpXP/9f8798510480b30d296550be747b9624/icon-content-checklists_2x.png',
      title: 'Task Management',
      description: 'Track, manage, complete, and bring tasks together like the pieces of a puzzle.'
    },
    {
      link: 'https://trello.com/use-cases/brainstorming',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/x2AI5JZPTDVY7BxKbvClM/dc65b20bf0914caa72bcaf2ddbb05d9b/UseCasesBrainstorming.svg',
      title: 'Brainstorming',
      description: 'Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.resources.'
    },
    {
      link: 'https://trello.com/use-cases/resource-hub',
      image: 'https://images.ctfassets.net/rz1oowkt5gyp/5rv4eidOfMf1vdEzVpHNlA/bb102f380f9cfd3d1761858d8910963d/icon-object-book_2x.png',
      title: 'Resource Hub',
      description: 'Save time with a well-designed hub that helps teams find information.'
    }
  ];

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.carouselItems.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.carouselItems.length - 1) ? this.currentIndex + 1 : 0;
  }
}