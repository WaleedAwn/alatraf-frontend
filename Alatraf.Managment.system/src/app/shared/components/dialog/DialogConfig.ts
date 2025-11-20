export interface DialogConfig {
  title: string;
  message?: string;
  type?: DialogType;
  payload?: any;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean; // default true
  width?: string; // e.g. '500px'
  disableBackdropClose?: boolean; // default false
}
export enum DialogType {
  Delete = 'delete',
  Confirm = 'confirm',
  Success = 'success',
  Warning = 'warning',
}
