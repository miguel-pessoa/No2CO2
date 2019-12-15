import { Component, OnInit } from '@angular/core';
import { TripService } from 'app/entities/trip/trip.service';

@Component({
  selector: 'jhi-partner-offers',
  templateUrl: './partner-offers.component.html',
  styleUrls: ['./partner-offers.component.scss']
})
export class PartnerOffersComponent implements OnInit {
  points: number;
  error: string;
  success: string;
  languages: any[];

  selectedOffer: Offer;

  offers: Offer[] = [
    {
      cost: '299',
      imageUrl: '../../../content/images/humana.png',
      text: 'Buy 2 get 3rd free',
      title: 'Humana',
      category: 'Used clothing store'
    },
    {
      cost: '599',
      imageUrl: '../../../content/images/maria.png',
      text: '12% on any purchases above 20€',
      title: 'Maria Granel',
      category: 'Green Groceries'
    },
    {
      cost: '499',
      imageUrl: '../../../content/images/oficina.png',
      text: '50% on any bike check-up',
      title: 'Cicloficina dos Anjos',
      category: 'Biking'
    },
    {
      cost: '250',
      imageUrl: '../../../content/images/horto.png',
      text: '30% Discount on the second air filtering plant',
      title: 'Horto do Campo Grande',
      category: 'Plants'
    }
  ];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.points = this.tripService.getPoints();
  }

  close() {
    this.selectedOffer = null;
  }

  click(offer) {
    if (this.points > offer.cost) {
      this.selectedOffer = offer;
    }
  }

  yes(offer) {
    if (!offer.used) {
      offer.used = true;
      this.tripService.updatePoints(-offer.cost);
      this.points = this.tripService.getPoints();
    }
  }
}

export class Offer {
  public imageUrl?: string;
  public category?: string;
  public title?: string;
  public text?: string;
  public cost?: string;
  public used?: boolean;
}
