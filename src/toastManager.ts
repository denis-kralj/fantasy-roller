import { Notify } from 'quasar'

function showToast(message: string, type: 'positive' | 'negative' | 'info' | 'warning' = 'info') {
    Notify.create({
        message,
        type,
        position: 'top',
    })
}

function showErrorToast(message: string) {
    showToast(message, 'negative')
}

function showSuccessToast(message: string) {
    showToast(message, 'positive')
}

type ToastManager = {
    showErrorToast: (message: string) => void
    showSuccessToast: (message: string) => void
}

const toastManager: ToastManager = {
    showErrorToast,
    showSuccessToast,
}

export default toastManager
