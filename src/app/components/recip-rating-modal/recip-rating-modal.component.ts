import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recip-rating-modal',
  templateUrl: './recip-rating-modal.component.html',
  styleUrls: ['./recip-rating-modal.component.scss']
})
export class RecipRatingModalComponent implements OnInit {
  @Output() modalEvent = new EventEmitter<number>();
  hearts: string[] = ['🤍','🤍','🤍','🤍','🤍']
  selectedRating!: number;

  constructor() { }

  ngOnInit(): void {
  }

  setRating(index: number){
    this.hearts = this.hearts.map((heart, i) => i <= index ? heart = '❤️' : heart = '🤍');
    this.selectedRating = index+1;
  }

  closeModal(){
    this.modalEvent.emit(this.selectedRating)
  }

}
