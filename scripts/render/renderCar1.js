let canvas, engine, camera, obj;
let scene, car1;

function renderCar1(){
    canvas = document.getElementById("renderFirstCar"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    var texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera("Camera", 
        Math.PI/2, 
        Math.PI/3, 
        25, new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 5;
    camera.attachControl(canvas, true);

    camera.useAutoRotationBehavior=true;
    camera.useAutoRotationBehavior.idleRotationSpeed= 0.05;
    camera.useAutoRotationBehavior.idleRotationSpinupTime = 4000;
    camera.useAutoRotationBehavior.idleRotationWaitTime = 4000;

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
    scene.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);

    BABYLON.SceneLoader.Append("./", "../objects/MACCHINA_1/f1_car1.glb", scene, function (scene) {
        var model = scene.meshes[0]

        var backward = scene.animationGroups.find(a => a.name === "backward.002")
        var forward = scene.animationGroups.find(a => a.name === "forward.002")
        var right = scene.animationGroups.find(a => a.name === "steeringRight")
        var left = scene.animationGroups.find(a => a.name === "steeringLeft.002")
        let idle = scene.animationGroups.find(a => a.name === "idle")

        //console.log(scene.animationGroups)

        idle.start(true)
     });
            
	engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", function () { engine.resize();});
}

