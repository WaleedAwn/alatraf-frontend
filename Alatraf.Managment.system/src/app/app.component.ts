import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PatientsListComponent } from "./features/Reception/Patients/components/patients.list/patients.list.component";
import { GlobalLoaderComponent } from "./shared/components/global-loader/global-loader.component";
import { ToastContainerComponent } from "./shared/components/toast-container/toast-container.component";

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, GlobalLoaderComponent, ToastContainerComponent]
})
export class AppComponent {
  title = 'Alatraf.Managment.system';
}
