import { useCallback, useEffect } from 'react';
import './../styles/toast-message.scss';

const ToastMessage = ({ toastList, position, setList }) => {
    const deleteToast = useCallback((id) => {
        const toastListItems = toastList.filter((e) => e.id !== id);
        setList(toastListItems);
    }, [toastList, setList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length) {
                deleteToast(toastList[0].id);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [toastList, deleteToast]);

    return (
        <div className={`toast-notification__container ${position}`}>
            {
                toastList.map((toast, index) => (
                <div 
                    key={index} 
                    className='toast-notification'
                    style={{ backgroundColor: toast.backgroundColor }}
                >
                    <button className='toast-notification__button' onClick={() => deleteToast(toast.id)}>X</button>
                    <div>
                        <p className='toast-notification__title'>{toast.title}</p>
                        <p className='toast-notification__description'>{toast.description}</p>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default ToastMessage;