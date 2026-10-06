import Swal from 'sweetalert2';

export const alert = (alertType = 'success', message: string) => {
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

export const centerAlert = (alertType = 'success', title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: alertType
    });
}

export const delAlert = async () => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    return result.isConfirmed;
}