export interface ToastModel {
  response: 'success' | 'error' | 'info' | '';
  message: string;
  show: boolean;
}
