import { Component, computed, signal } from '@angular/core';
// import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PatientsPageComponent } from "./features/Reception/Patients/Pages/patients.page/patients.page.component";
// import { PatientsListComponent } from "./features/Reception/Patients/components/patients.list/patients.list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SidebarComponent, HeaderComponent]
})
export class AppComponent {
  title = 'Alatraf.Managment.system';
}
