import {Injectable} from '@angular/core';
import {MessageService} from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  public toastSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      detail: message, life: 3000
    });
  }

  public toastError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: ``,
      detail: message, life: 3000
    });
  }

  public toastInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: ``,
      detail: message, life: 3000
    });
  }
}
