import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dungeoncrawler',
  templateUrl: './dungeoncrawler.component.html',
  styleUrls: ['./dungeoncrawler.component.css']
})
export class DungeoncrawlerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = [
    {
      src: '../../assets/pictures/flowrateplanets.png',
      alt: 'Procedurally Generated Planets',
      caption: 'Procedurally Generated Planets'
    },
    {
      src: '../../assets/pictures/flowratesurface.png',
      alt: 'Surfaces with Fuel Sites',
      caption: 'Surfaces with Fuel Sites'
    },
    {
      src: '../../assets/pictures/flowratefuelsite.png',
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
