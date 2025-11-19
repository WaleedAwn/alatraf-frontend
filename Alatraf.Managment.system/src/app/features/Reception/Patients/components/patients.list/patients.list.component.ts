import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients-list',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './patients.list.component.html',
  styleUrl: './patients.list.component.css'
})
export class PatientsListComponent {

  patients=input.required<Patient[]>()




}
