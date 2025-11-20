import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Injector,
} from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { DialogConfig, DialogType } from './DialogConfig';
import {
  DialogResult,
  SharedDialogComponent,
} from './shared-dialog/shared-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector // Angular 14+ dynamic creation
  ) {}

  open(config: DialogConfig): Observable<DialogResult> {
    const subject = new Subject<DialogResult>();

    // create component dynamically
    const compRef = createComponent(SharedDialogComponent, {
      environmentInjector: this.envInjector,
      elementInjector: this.injector,
    });

    // pass config
    compRef.instance.config = config;

    // subscribe to closed event
    const sub = compRef.instance.closed.subscribe((res: DialogResult) => {
      subject.next(res);
      subject.complete();
      sub.unsubscribe();
      this.destroy(compRef);
    });

    // attach to app DOM
    this.appRef.attachView(compRef.hostView);
    const domElem = (compRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return subject.asObservable();
  }

  confirm(config: DialogConfig): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const sub = this.open(config).subscribe({
        next: (res) => {
          observer.next(!!res.confirmed);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });

      return () => sub.unsubscribe();
    });
  }

  async confirmPromise(config: DialogConfig): Promise<boolean> {
    return firstValueFrom(this.confirm(config)); // resolves to boolean
  }

  confirmDelete(config: DialogConfig): Observable<boolean> {
    return this.confirm({
      type: DialogType.Delete,
      title: config.title ?? 'حذف',
      message: config.message,
      payload: config.payload,
      confirmText: 'حذف',
      cancelText: 'إلغاء',
      showCancel: true,
    });
  }

  confirmSuccess(message: string, title = 'Success'): Observable<boolean> {
    return this.confirm({
      type: DialogType.Success,
      title,
      message,
      showCancel: false,
    });
  }

  private destroy(compRef: ComponentRef<any>) {
    try {
      this.appRef.detachView(compRef.hostView);
      compRef.destroy();
    } catch (e) {
      console.warn('Dialog destroy error', e);
    }
  }
}
