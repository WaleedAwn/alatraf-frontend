import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DialogConfig } from '../DialogConfig';
import { NgFor, NgIf } from '@angular/common';

export interface DialogResult {
  confirmed: boolean;
  payload?: any;
}

@Component({
  selector: 'app-shared-dialog',
  imports: [NgIf,NgFor],
  templateUrl: './shared-dialog.component.html',
  styleUrl: './shared-dialog.component.css',
})
export class SharedDialogComponent {
  @Input() config!: DialogConfig;
  @Output() closed = new EventEmitter<DialogResult>();

  @ViewChild('dialogBox') dialogBox!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2, private host: ElementRef) {}

  ngOnInit(): void {
    if (!this.config) {
      this.config = { title: '', showCancel: true };
    }
    // prevent body scroll while dialog open
    this.renderer.addClass(document.body, 'dialog-open');
    // small focus handling
    setTimeout(() => {
      const focusEl: HTMLButtonElement | null =
        this.dialogBox?.nativeElement.querySelector(
          'button, input, [tabindex]'
        ) as any;
      focusEl?.focus();
    }, 0);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'dialog-open');
  }

  close(confirmed = false) {
    this.closed.emit({ confirmed, payload: this.config?.payload });
  }

  // close on ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (!this.config?.disableBackdropClose) {
      this.close(false);
    }
  }

  backdropClick() {
    if (!this.config?.disableBackdropClose) {
      this.close(false);
    }
  }

  objectEntries(obj: any) {
    if (!obj) return [];
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }
}
