import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css'],
})
export class NotificationCardComponent implements OnInit {
  @Input() message: string;

  constructor() {}

  ngOnInit(): void {}
}
