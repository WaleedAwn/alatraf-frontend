import { Component, computed, signal } from '@angular/core';
import { CustomerComponent } from "./features/customer/customer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Alatraf.Managment.system';

}
