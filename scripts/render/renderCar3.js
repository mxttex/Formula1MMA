let canvas3, engine3, camera3, obj3;
let scene3, car3;

function renderCar3(){
    canvas3 = document.getElementById("renderThirdCar"); // Get the canvas3 element
    engine3 = new BABYLON.Engine(canvas3, true); // Generate the BABYLON 3D engine3
	camera3;

    
    var texture, light1, light2;
    
    scene3 = new BABYLON.Scene(engine3);
    camera3 = new BABYLON.ArcRotateCamera("Camera", 
        Math.PI/2, 
        Math.PI/3, 
        50, new BABYLON.Vector3(0,0,0), scene3);
    camera3.wheelPrecision = 40;
    camera3.lowerRadiusLimit = 5;
    camera3.attachControl(canvas3, true);

     camera3.useAutoRotationBehavior=true;
    camera3.useAutoRotationBehavior.idleRotationSpeed= 0.05;
    camera3.useAutoRotationBehavior.idleRotationSpinupTime = 4000;
    camera3.useAutoRotationBehavior.idleRotationWaitTime = 4000;

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene3);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene3);   
    light2.intensity = 0.5;
    light2.parent = camera3;
        
    
    
    BABYLON.SceneLoader.Append("./", "../objects/monzatrack.glb", scene3, function (scene3) {
        var ruote = [];
        ruote.push(scene.meshes[7]);
        ruote.push(scene.meshes[8]);
        ruote.push(scene.meshes[9]);
        ruote.push(scene.meshes[10]);
       
        car3 = scene.meshes[0];

        ruote[0].parent =car3;
        ruote[1].parent =car3;
        ruote[2].parent =car3;
        ruote[3].parent =car3;

        
      
      


    });
            
	engine3.runRenderLoop(() => scene3.render());

    window.addEventListener("resize", function () { engine3.resize();});
}

