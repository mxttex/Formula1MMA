let canvas, engine, camera, obj;
let scene;

window.addEventListener('DOMContentLoaded', (event) => {
    canvas = document.getElementById("renderFirstCar"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    var texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera("Camera", 
        Math.PI/2, 
        Math.PI/3, 
        50, new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 5;
    camera.attachControl(canvas, true);

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
        
    
    
    BABYLON.SceneLoader.Append("./", "../objects/macchina.obj", scene, function (scene) {
        
        var ruote = [];
        ruote.push(scene.meshes[7]);
        ruote.push(scene.meshes[8]);
        ruote.push(scene.meshes[9]);
        ruote.push(scene.meshes[10]);
       
        car = scene.meshes[0];

        ruote[0].parent =car;
        ruote[1].parent =car;
        ruote[2].parent =car;
        ruote[3].parent =car;

        

      
       
        scene.registerBeforeRender(() => {
            let t = performance.now() * 0.001;
            car.rotation.y = Math.cos(Math.PI)*t*0.5;
        })


    });
            
	engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", function () { engine.resize();});
});

