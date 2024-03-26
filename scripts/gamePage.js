$(document).ready(function(){
    var modalId = $("#modalId");
    $(modalId).on('show.bs.modal',function(event){
        let button= event.relatedTarget;
        let recipient= button.getAttribute('data-bs-whatever')
    });
   
    //  modalId.addEventListener('show.bs.modal', function (event) {
    //       // Button that triggered the modal
    //       let button = event.relatedTarget;
    //       // Extract info from data-bs-* attributes
    //       let recipient = button.getAttribute('data-bs-whatever');

    //     // Use above variables to manipulate the DOM
    // })
});
    