import { toast } from 'react-toastify';

const options = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};
const toastify = {
  success: (msg) => {
    toast.success(msg, options);
  },
  error: (msg) => {
    console.log('toast', msg)
    toast.error(msg, options);
  },
  warning: (msg) => {
    toast.warning(msg, options);
  },
  info: (msg) => {
    toast.info(msg, options);
  },
};

export default toastify;