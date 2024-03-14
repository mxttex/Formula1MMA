let canvas, engine, camera, obj;
let scene;

window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("renderFirstCircuit"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera("Camera", 
        Math.PI/2, 
        Math.PI/3, 
        100, new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 5;
    camera.attachControl(canvas, true);

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
        
    
    
    BABYLON.SceneLoader.Append("./", "../objects/macchina.obj", scene, function (scene) {
        createGrid(scene);
        var ruote = [];
        ruote.push(scene.meshes[13]);
        ruote.push(scene.meshes[14]);
       

      
       
        scene.registerBeforeRender(() => {
            let t = performance.now() * 0.001;
          
        })


    });
            
	engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", function () { engine.resize();});
});
