let canvas2,  engine2, camera2, obj2;
let scene2;

function renderCircuit3(){
	
    canvas2 = document.getElementById("renderThirdCircuit"); // Get the canvas2 element
     engine2 = new BABYLON.Engine(canvas2, true); // Generate the BABYLON 3D  engine2
	camera2;

    
    let texture, light1, light2;
    
    scene2 = new BABYLON.Scene( engine2);
    camera2 = new BABYLON.ArcRotateCamera("Camera2", 
        Math.PI/2, 
        Math.PI/3, 
        50, new BABYLON.Vector3(0,0,0), scene2);
    camera2.wheelPrecision = 40;
    camera2.lowerRadiusLimit = 5;
    camera2.attachControl(canvas2, true);

    camera2.useAutoRotationBehavior=true;
    camera2.useAutoRotationBehavior.idleRotationSpeed= 0.05;
    camera2.useAutoRotationBehavior.idleRotationSpinupTime = 4000;
    camera2.useAutoRotationBehavior.idleRotationWaitTime = 4000;

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene2);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene2);   
    light2.intensity = 0.5;
    light2.parent = camera2;
        
    scene2.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);
    
    BABYLON.SceneLoader.Append("./", "../objects/macchina.obj", scene2, function (scene2) {
        
    });
            
	 engine2.runRenderLoop(() => scene2.render());

    window.addEventListener("resize", function () {  engine2.resize();});
}
