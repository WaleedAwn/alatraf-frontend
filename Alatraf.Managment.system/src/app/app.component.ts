import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent]
})
export class AppComponent {
  title = 'Alatraf.Managment.system';
}
