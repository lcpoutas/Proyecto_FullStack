document.addEventListener("DOMContentLoaded", function(){
    const forgotpasswordForm = document.getElementById("forgot-password-form");

    forgotpasswordForm.addEventListener("submit", function(e){
        e.preventDefault();

        const formData = new FormData(forgotpasswordForm);

        fetch("../php/forgot-password.php", {
            method: 'POST',
            body: formData
        })
        .then(response=> response.json())
        .then(data=>{
            if (data.status==="success"){
                alert("Se ha enviado un enlace de recuperación a tu correo.");
            } else{
                alert(data.message);
            }
        })
        .catch(error=>{
            console.error("Error en la solicitud:", error);
            alert("Error al conectar con el servidor. Intente nuevamente.");
        });

    });
});