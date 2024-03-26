let canvas1, engine1, camera1, obj1;
let scene1;

function renderCircuit2(){
	
    canvas1 = document.getElementById("renderSecondCircuit"); // Get the canvas1 element
    engine1 = new BABYLON.Engine(canvas1, true); // Generate the BABYLON 3D engine1
	camera1;

    
    let texture, light1, light2;
    
    scene1 = new BABYLON.Scene(engine1);
    camera1 = new BABYLON.ArcRotateCamera("Camera1", 
        Math.PI/2, 
        Math.PI/3, 
        50, new BABYLON.Vector3(0,0,0), scene1);
    camera1.wheelPrecision = 40;
    camera1.lowerRadiusLimit = 5;
    camera1.attachControl(canvas1, true);

    camera1.useAutoRotationBehavior=true;
    camera1.useAutoRotationBehavior.idleRotationSpeed= 0.05;
    camera1.useAutoRotationBehavior.idleRotationSpinupTime = 4000;
    camera1.useAutoRotationBehavior.idleRotationWaitTime = 4000;

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene1);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene1);   
    light2.intensity = 0.5;
    light2.parent = camera1;
        
    scene1.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);
    
    BABYLON.SceneLoader.Append("./", "../objects/circuito1/circuito1.obj", scene1, function (scene1) {
     


    });
            
	engine1.runRenderLoop(() => scene1.render());

    window.addEventListener("resize", function () { engine1.resize();});
}
