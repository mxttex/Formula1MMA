let canvas2, engine2, camera2, obj2;
let scene2, acr2;

function renderCar2(){
    canvas2 = document.getElementById("renderSecondCar"); // Get the canvas2 element
    
    engine2 = new BABYLON.Engine(canvas2, true); // Generate the BABYLON 3D engine2
    
	camera2;

    
    var texture, light1, light2;
    
    scene2 = new BABYLON.Scene(engine2);
    camera2 = new BABYLON.ArcRotateCamera("camera2", 
        Math.PI/2, 
        Math.PI/3, 
        25, new BABYLON.Vector3(0,0,0), scene2);
    camera2.wheelPrecision = 40;
    camera2.lowerRadiusLimit = 5;
    camera2.attachControl(canvas2, true);
    camera2.useAutoRotationBehavior=true;
    camera2.useAutoRotationBehavior.idleRotationSpeed= 0.05;
    camera2.useAutoRotationBehavior.idleRotationSpinupTime = 4000;
    camera2.useAutoRotationBehavior.idleRotationWaitTime = 4000;
    // camera2.FramingBehavior =true;
    // camera2.FramingBehavior.radiusScale =2;
    // this.camera2.FramingBehavior.framingTime = 4000;

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene2);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene2);   
    light2.intensity = 0.5;
    light2.parent = camera2;
    scene2.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);    
    
    
    BABYLON.SceneLoader.Append("./", "../objects/MACCHINA_2/f1_car2.glb", scene2, function (scene2) {
        var model = scene.meshes[0]

        var backward = scene2.animationGroups.find(a => a.name === "backward.002")
        var forward = scene2.animationGroups.find(a => a.name === "forward.002")
        var right = scene2.animationGroups.find(a => a.name === "steeringRight")
        var left = scene2.animationGroups.find(a => a.name === "steeringLeft.002")
        let idle = scene2.animationGroups.find(a => a.name === "idle")

        //console.log(scene.animationGroups)

        idle.start(true)
    });
            
	engine2.runRenderLoop(() => scene2.render());

    window.addEventListener("resize", function () { engine2.resize();});
}

