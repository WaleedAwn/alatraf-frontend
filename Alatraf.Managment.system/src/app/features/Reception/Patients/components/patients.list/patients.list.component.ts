import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-patients-list',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './patients.list.component.html',
  styleUrl: './patients.list.component.css'
})
export class PatientsListComponent {

}
