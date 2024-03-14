let canvas2, engine2, camera2, obj2;
let scene2;

window.addEventListener('DOMContentLoaded', (event) => {
    canvas2 = document.getElementById("renderSecondCar"); // Get the canvas2 element
    
    engine2 = new BABYLON.Engine(canvas2, true); // Generate the BABYLON 3D engine2
    
	camera2;

    
    var texture, light1, light2;
    
    scene2 = new BABYLON.Scene(engine2);
    camera2 = new BABYLON.ArcRotateCamera("camera2", 
        Math.PI/2, 
        Math.PI/3, 
        50, new BABYLON.Vector3(0,0,0), scene2);
    camera2.wheelPrecision = 40;
    camera2.lowerRadiusLimit = 5;
    camera2.attachControl(canvas2, true);

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene2);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene2);   
    light2.intensity = 0.5;
    light2.parent = camera2;
        
    
    
    BABYLON.SceneLoader.Append("./", "../objects/macchina.obj", scene2, function (scene2) {
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

        
      
       
        scene2.registerBeforeRender(() => {
         
            let t = performance.now() * 0.001;
            car.rotation.y = Math.cos(Math.PI)*t*0.5;
        })


    });
            
	engine2.runRenderLoop(() => scene2.render());

    window.addEventListener("resize", function () { engine2.resize();});
});

