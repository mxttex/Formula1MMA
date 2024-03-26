let canvas, engine, camera, obj;
let scene;

//ATTUALMENTE SETTATO CON IL CONTENUTO DEL FILE PROVA, IN MODO DA AVERE UN'IDEA GENERALE DI COME SIA IL GIOCO
window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("gameCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera('cam', 
            Math.PI*47/24,
             1.5,
            20, 
            new BABYLON.Vector3(0,1.4,2.3), 
            scene);
    camera.attachControl(canvas,true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 13*2;          

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
        
     //populateScene(scene);

    // // carico il circuito e la macchina scelti dall'utente
    var circuit = localStorage.getItem("CIRCUIT");

    // //Bisogna sistemare le dimensioni

    switch(circuit){
        case "Circuit1":


            BABYLON.SceneLoader.ImportMesh("", "../objects/circuito/", "circuito.obj", scene)

            break;
        case "Circuit2":
            BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene);
            break;
        // case "Circuit3":
        //     BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene)
        //     break;
        default:
            BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene);
            break;
    }
    

    var car = localStorage.getItem("CAR");

     switch(car){
         case "Car1":
             BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene, meshesImported)
             break;
         case "Car2":
            BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene, meshesImported)
            break;
         case "Car3":
            BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene, meshesImported)
            break;
         default:
            BABYLON.SceneLoader.ImportMesh("", "../objects/macchina1/", "macchina1.obj", scene, meshesImported)
            break;
     }



    console.log(scene.meshes)
    
   
    

    
    // main loop
    engine.runRenderLoop(()=>scene.render());

    // resize event
    window.addEventListener("resize", () => engine.resize());

    scene.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);


});

function meshesImported(meshes){
    const scaleFactor = 0.01;
    meshes.forEach(m => {
        m.scaling.set(scaleFactor, scaleFactor, scaleFactor)
        camera.parent= m;
        console.log("Nome della mesh:", m.name);
    })
}