// eventBus.ts

// Toast
export const toastMessage = ref('');
let toastTimeoutId: string | number | NodeJS.Timeout | undefined; // 用於存儲計時器的 ID

export function showToast(message: any) {
 // 清除之前的計時器
 if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
 }

 // 立即更新彈出訊息
 toastMessage.value = message;

 // 設置一個新的計時器，在三秒後清除彈出訊息
 toastTimeoutId = setTimeout(() => {
    toastMessage.value = '';
 }, 3000);
}
/** showToast('123test'); */

// ToastError
export const toastErrorMessage = ref('')
export function showToastError(message: any) {
  toastErrorMessage.value = message
  setTimeout(() => {
    toastErrorMessage.value = ''
  }, 3000)
}

// CustomDialog 彈窗
export const dialogTitle = ref('')
export const dialogMessage = ref('')
export const showDialog = ref(false)
let resolveDialogPromise: (value: boolean) => void

export function openDialog(title: string, message: string): Promise<boolean> {
  dialogTitle.value = title
  dialogMessage.value = message
  showDialog.value = true
  return new Promise((resolve) => {
    resolveDialogPromise = resolve
  })
}

export function confirmDialog() {
  resolveDialogPromise(true)
  showDialog.value = false
}

export function cancelDialog() {
  resolveDialogPromise(false)
  showDialog.value = false
}
/**
   const confirmed = await openDialog('注意', '確定要刪除嗎？')
  if (!confirmed) {
    return
  }
 */

// Loading
export const isLoading = ref(false)

export function showLoading() {
  isLoading.value = true
}

export function hideLoading() {
  isLoading.value = false
}
