import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-global-loader',
  imports: [NgIf],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.css'
})
export class GlobalLoaderComponent {
  loadingService = inject(LoadingService);

}
