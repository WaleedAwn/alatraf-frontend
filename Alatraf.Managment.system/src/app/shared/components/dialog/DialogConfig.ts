export interface DialogConfig {
  title: string;
  message?: string;
  type?: 'confirm' | 'delete' | 'success' | 'warning' | 'info' | 'custom';
  payload?: any;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean; // default true
  width?: string; // e.g. '500px'
  disableBackdropClose?: boolean; // default false
}
