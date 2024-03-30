
$(document).ready()
{
    $("#startButton").click(function(){

        let stringaInput = $("#inputNome").val();
        if(stringaInput.length > 0){
            location.href ="../pages/carchoice.html";
            console.log($("#inputNome").val().length);
            localStorage.setItem('name', stringaInput);
        }
        else{
            alert("Inserire il nome del giocatore");
        }
    })
}
