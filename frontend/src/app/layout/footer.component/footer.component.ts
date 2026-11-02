import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly companyName = input<string>("Coffee Bar ADM");
  readonly motto = input<string>("Beviti un caffettino simpatico in compagnia!")
  readonly hours = input<string>("Hours: Mon-Sun 7am-8pm");
  readonly address = input<string>("Via Mura Anteo Zamboni 7");
  readonly year = new Date().getFullYear();
}
