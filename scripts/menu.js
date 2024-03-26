// $(".menu").click(function(){
//     alert(localStorage.getItem("name"))
// })

$().ready(function(){
    
$(".buttonCar").click(function(){
   var num = $(this).attr("id");
   localStorage.setItem("CAR",num);
   location.href = "../pages/circuitchoice.html";
   
});
$(".buttonCircuit").click(function(){
    var num = $(this).attr("id");
    localStorage.setItem("CIRCUIT",num);
    location.href = "../pages/game.html";
    
});
});



