import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC<{ message: string }> = ({ message }) => {
    return (
      <div>
        {toast.success(message)}
      </div>
    );
  };
  
  export default Toast;