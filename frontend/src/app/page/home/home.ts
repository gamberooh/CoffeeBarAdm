import { Component } from '@angular/core';
import { Beverage } from '../beverage/beverage';

@Component({
  selector: 'app-home',
  imports: [Beverage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
