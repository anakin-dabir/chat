import toast, { Toaster } from 'react-hot-toast';

const Toast = () => {
    const notify = () => toast.success('Sent');
    return (
        <div>
            <button className='btn btn-circle btn-wide' onClick={notify}>Make me a toast</button>
            <Toaster position="top-right" toastOptions={{ duration: 1000, className: 'w-44 mr-10' }} />
        </div>
    )
}

export default Toast

//npm install react-hot-toast