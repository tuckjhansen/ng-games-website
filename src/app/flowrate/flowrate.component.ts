import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-flowrate',
  templateUrl: './flowrate.component.html',
  styleUrls: ['./flowrate.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class FlowrateComponent implements OnInit {

  flowrateUrl: string;

  constructor() { 
    this.flowrateUrl = window.location.hostname === 'localhost'
      ? '/assets/flowrate/index.html'
      : 'https://games.tuckerhansen.com/assets/flowrate/index.html';
  }

  ngOnInit(): void {}

  images = [
    {
      src: '../../assets/pictures/flowratePlanets.png',
      alt: 'Procedurally Generated Planets',
      caption: 'Procedurally Generated Planets'
    },
    {
      src: '../../assets/pictures/fuelSiteSurfaceFlowrate.png',
      alt: 'Surface with Fuel Sites',
      caption: 'Surface with Fuel Sites'
    },
    {
      src: '../../assets/pictures/planetSurface.png',
      alt: 'Landed',
      caption: 'Landed'
    }
  ];

  showModal = false;
  selectedImage: any = null;

  openModal(image: any) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
