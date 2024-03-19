let canvas, engine, camera, obj;
let scene;
window.addEventListener('DOMContentLoaded', (event) =>
{
    canvas = document.getElementById("homeCanvas"); // Get the canvas element

    engine = new BABYLON.Engine(canvas, true);
    camera;

    let texture, light1, light2;

    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera(
        'cam', -Math.PI, Math.PI/3, -4, new BABYLON.Vector3(0,0,0), scene
    )

    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 2.5;
    camera.upperRadiusLimit = 2.5;          

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(5,5,5), scene);
    light1.intensity = 10;
    


    engine.runRenderLoop(() => scene.render());

    scene.clearColor = new BABYLON.Color3(60/255, 139/255, 199/255);
    populateScene(scene)
    scene.registerBeforeRender(()=>{
        let t = performance.now()*0.001;
        // camera.parent = scene.meshes[0]
        camera.position.z = Math.sin(t);

        // camera.position = BABYLON.Vector3.Lerp(camera.position,-camera.position,0.05);

    })

    function populateScene(){
        BABYLON.SceneLoader.Append("../", "objects/mercedes_amg_petronas__w14_2023.glb", scene, function (scene) {
            console.log("Sono qui! Sono qui!");
            
            obj = scene.meshes[0];

            obj.position.set(0,0,0)
        })}
})


// $("#startButton").click(function(){
//     $("#homeCanvas").show();
// })


// let canvas, engine, camera, obj;
// let scene;
// window.addEventListener('DOMContentLoaded', (event) =>
// {
//     canvas = document.getElementById("homeCanvas"); // Get the canvas element

//     engine = new BABYLON.Engine(canvas, true);
//     camera;

//     let texture, light1, light2;

//     scene = new BABYLON.Scene(engine);
//     camera = new BABYLON.ArcRotateCamera(
//         'cam', -Math.PI, Math.PI/3, -4, new BABYLON.Vector3(0,0,0), scene
//     )

//     camera.wheelPrecision = 50;
//     camera.lowerRadiusLimit = 2.5;
//     camera.upperRadiusLimit = 2.5;          

//     light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(5,5,5), scene);
//     light1.intensity = 10;
    


//     engine.runRenderLoop(() => scene.render());

//     scene.clearColor = new BABYLON.Color3(60/255, 139/255, 199/255);
//     populateScene(scene)
//     scene.registerBeforeRender(()=>{
//         let t = performance.now()*0.001;
//         // camera.parent = scene.meshes[0]
//         camera.position.z = Math.sin(t);

//         // camera.position = BABYLON.Vector3.Lerp(camera.position,-camera.position,0.05);

//     })

//     function populateScene(){
//         BABYLON.SceneLoader.Append("../", "objects/mercedes_amg_petronas__w14_2023.glb", scene, function (scene) {
//             console.log("Sono qui! Sono qui!");
            
//             obj = scene.meshes[0];

//             obj.position.set(0,0,0)
//         })}
// })




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
