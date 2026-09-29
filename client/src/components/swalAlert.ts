import Swal from 'sweetalert2';

export const alert = (alertType='success',message:string)=>{
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: alertType,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
}