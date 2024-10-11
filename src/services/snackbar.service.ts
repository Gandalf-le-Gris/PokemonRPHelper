interface SnackbarInfo {
  display: boolean,
  message: string,
  color: string,
}

export class SnackbarService {
  public snackbarInfo: Ref<SnackbarInfo> = ref({ display: false, message: '', color: '' });

  public setSuccess(message: string) {
    this.snackbarInfo.value = {
      display: true,
      message,
      color: 'success',
    }
  }

  public setError(message: string) {
    this.snackbarInfo.value = {
      display: true,
      message,
      color: 'error',
    }
  }
}