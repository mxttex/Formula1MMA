let canvas, engine, camera, obj;
let scene;

window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("renderCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera("Camera", 
        1.0, 
        1.13, 
        10, new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 5;
    camera.attachControl(canvas, true);

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
        
    populateScene(scene);
    
    // main loop
    engine.runRenderLoop(()=>scene.render());

    // resize event
    window.addEventListener("resize", () => engine.resize());
    
    function populateScene(){
        
    }
    
    
});