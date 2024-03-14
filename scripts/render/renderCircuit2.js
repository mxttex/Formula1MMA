let canvas1, engine1, camera1, obj1;
let scene1;

window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas1 = document.getElementById("renderSecondCircuit"); // Get the canvas1 element
    engine1 = new BABYLON.Engine(canvas1, true); // Generate the BABYLON 3D engine1
	camera1;

    
    let texture, light1, light2;
    
    scene1 = new BABYLON.Scene(engine1);
    camera1 = new BABYLON.ArcRotateCamera("Camera1", 
        Math.PI/2, 
        Math.PI/3, 
        100, new BABYLON.Vector3(0,0,0), scene1);
    camera1.wheelPrecision = 40;
    camera1.lowerRadiusLimit = 5;
    camera1.attachControl(canvas1, true);

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene1);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene1);   
    light2.intensity = 0.5;
    light2.parent = camera1;
        
    
    
    BABYLON.SceneLoader.Append("./", "../objects/macchina.obj", scene1, function (scene1) {
        createGrid(scene1);
        var ruote = [];
        ruote.push(scene1.meshes[13]);
        ruote.push(scene1.meshes[14]);
       

      
       
        scene1.registerBeforeRender(() => {
            let t = performance.now() * 0.001;
          
        })


    });
            
	engine1.runRenderLoop(() => scene1.render());

    window.addEventListener("resize", function () { engine1.resize();});
});
