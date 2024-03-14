let canvas, engine, camera, obj;
let scene;
var CoT;

window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("renderCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    CoT = new BABYLON.TransformNode("root");
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
    
    BABYLON.SceneLoader.Append("./", "ferrari.obj", scene, function (scene) {
        createGrid(scene);
        //var ruote = [];
        //ruote.push(scene.meshes[13]);
        //ruote.push(scene.meshes[14]);
        
        scene.meshes[4].parent =CoT;
        scene.meshes[5].parent =CoT;
        scene.meshes[6].parent =CoT;
        scene.meshes[4].absolutePosition.set(0,0,0)
        scene.meshes[5].absolutePosition.set(0,0,0)
        scene.meshes[6].absolutePosition.set(0,0,0)
        CoT.position.set(-0.2,-2.5,16.3)
        scene.meshes[4].position.set(0.2,2.5,-16.3)
        scene.meshes[5].position.set(0.2,2.5,-16.3)
        scene.meshes[6].position.set(0.2,2.5,-16.3)
        
        

        //CoT.position.set(-15.681,0.038,-0.094)
        //scene.meshes[7].position.set(15.681,-0.038,-0.094)
       
        scene.registerBeforeRender(() => {
            let t = performance.now() * 0.001;
            //z = 16.3 y=-2.5 x=-0.2
            

            CoT.rotation.x = t*5





            //car.position.z =Math.sin(t)*10;
        //    ruote[0].

            //ruote[0].position.z = Math.sin(t)/4;
            //ruote[1].position.z = Math.sin(t)/4;
        })


    });
            
	engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", function () { engine.resize();});
});