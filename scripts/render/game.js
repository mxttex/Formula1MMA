let canvas, engine, camera, obj;
let scene;
let pivot;
let round = 0;
let minute = 0;
let second = 0;
let count = 0;
var animations;
var cameras = [];
var nrCamere = 0;

//ATTUALMENTE SETTATO CON IL CONTENUTO DEL FILE PROVA, IN MODO DA AVERE UN'IDEA GENERALE DI COME SIA IL GIOCO
window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("gameCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let light1;
    scene = new BABYLON.Scene(engine);
    // carico il circuito e la macchina scelti dall'utente
    var circuit = localStorage.getItem("CIRCUIT");

    // //Bisogna sistemare le dimensioni

    pivot = new BABYLON.TransformNode('a', scene);

    // switch(circuit){
    //     case "Circuit1":


    //         BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuito1.obj", scene)

    //         break;
    //     case "Circuit2":
    //         BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuit2.glb", scene);
    //         break;
    //     // case "Circuit3":
    //     //     BABYLON.SceneLoader.ImportMesh("", "../objects/circuito/", "circuito.obj", scene)
    //     //     break;
    //     default:
    //         BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuit2.glb", scene);
    //         break;
    // }

    BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuito2_modificato.glb", scene)

    
    console.log(scene.meshes)
    
    var car = localStorage.getItem("CAR");

   

    var macchina = new Macchina(car);
    CreaCamere(scene);

    // camera = cameras[1];
    console.log(cameras)
    camera = new BABYLON.ArcRotateCamera();
    camera = cameras[nrCamere]
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 13*2;          

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(5, 1, 0), scene);
    light1.intensity = 0.5;

        

   


    stopWatch();

    console.log(scene.meshes)
    
   
    

    
    // main loop
    engine.runRenderLoop(()=>scene.render());

    // resize event
    window.addEventListener("resize", () => engine.resize());

    scene.clearColor = new BABYLON.Color3(153/255, 204/255, 255/255);
    let tasti = {};

    scene.onKeyboardObservable.add((kbInfo) => {
        if(kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) //controlla se il tasto è stato premuto o rilasciato
        {
            //se è stato premuto
            tasti[kbInfo.event.key] = true;
        }
        else{
            //se il tasto è stato rilasciato
            tasti[kbInfo.event.key] = false;
        }
    })
    let speed = 0;
    
    scene.registerBeforeRender(() =>
        {
            let t = performance.now()*0.1;
        $("#round").text(round+" \\ 3")
           
            macchina.advance(speed/50);
            // registerPositions();

            if(tasti['a'])
            {
                pivot.rotation.y -= 0.02;
                animations[4].start();
            }
            else if(tasti['d'])
            {
                pivot.rotation.y += 0.02;
                animations[3].start();
            }
            else{
                if(tasti['w']) {
                    // aumento la velocità (fino ad un massimo di 0.1)
                    speed = Math.min(0.1, speed + 0.001);
                    // animations[1].start();
                    // pivot.position.addInPlace(speed);
                } else if(tasti['s']) {
                    // freno, cioè diminuisco la velocità (fino ad un minimo
                    // di 0)
                    speed = Math.max(-0.1, speed - 0.001);
                    
                    // pivot.position.addInPlace(speed);
                } else {
                    // se non faccio nulla la macchina rallenta da sola
                    if(speed>=0){
                        speed = Math.max(0.0, speed - 0.0001);
                        }else {
                            speed = Math.min(0.0,speed + 0.0001)
                        }
                }

            }

            if(tasti['1'])
                scene.activeCamera = cameras[0];
            else if(tasti['2'])
                scene.activeCamera = cameras[1];
            else if(tasti['3'])
                scene.activeCamera = cameras[2];
            else if(tasti['4'])
                scene.activeCamera = cameras[3];
            


            if(speed > 0)
            {
                animations[0].stop();
                animations[1].start(true);
                animations[1].speedRatio = Math.abs(speed*10)
            }
            else if(speed <0){
		        animations[1].stop();
                animations[0].start(true);
                animations[0].speedRatio = Math.abs(speed*10);
            }
        })

        
        
        
        

        
});


function meshesImported(meshes, animationGroup){
    const scaleFactor = 0.001;
    meshes.forEach(m => {
        m.scaling.set(scaleFactor, scaleFactor, scaleFactor)
        
        for(let i=0; i<cameras.length; i++){
            cameras[i].parent = m;
        }

        m.parent = pivot;
        m.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0)
        console.log("Nome della mesh:", m.name);
    })


    animations = scene.animationGroups

    animations[0].stop();

    
}

function stopWatch() {
    let timer = true;
    if (timer) {
        count++;
        if (count == 100) {
            second++;
            count = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
          
            minute = 0;
            second = 0;
        }
        let minuteString = minute;
        let secondString = second;
        let countString = count;
        
        if (minute < 10) {
            minuteString = "0" + minuteString;
        }
        if (second < 10) {
            secondString = "0" + secondString;
        }
  
        if (count < 10) {
            countString = "0" + countString;
        }
        $("#timer").text(minuteString+" : "+secondString+" : "+countString);
        
        setTimeout(stopWatch, 10);
    }
}

class Macchina 
{
    constructor(car){
        switch(car){
            case "Car1":
                BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_1/", "f1_car1.glb", scene, meshesImported)
                break;
            case "Car2":
                BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_2/", "f1_car2.glb", scene, meshesImported)
                break;
            case "Car3":
                BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_3/", "f1_car3.glb", scene, meshesImported)
                break;
            default:
                BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_1/", "f1_car1.glb", scene, meshesImported)
                break;
        }

        pivot.position.x = -2.782626152038574
        pivot.position.y = 0.001
        pivot.position.z = 1.2650659084320068
        pivot.rotation.y = 4.53
        this.advance(0)
    }

    advance(d) {
        let phi = pivot.rotation.y;
        // delta è il vettore spostamentowwww
        let delta = new BABYLON.Vector3(d*Math.sin(phi), 0, d*Math.cos(phi));
        pivot.position.addInPlace(delta);
        this.distanza_percorsa += d;
    }
    
}

function CreaCamere(scene){
    let camera1 = new BABYLON.ArcRotateCamera('cam', 
        Math.PI, Math.PI/3+0.3,0, 
        new BABYLON.Vector3(-1.5,3.8,0), 
        scene);

    

    let camera2 = new BABYLON.ArcRotateCamera('cam1', 
        Math.PI, Math.PI/3+0.3,3, 
        new BABYLON.Vector3(-1.5,3.8,0), 
        scene);
    
    let camera3 = new BABYLON.ArcRotateCamera('cam2',
        Math.PI, Math.PI/3+0.3,3, 
        new BABYLON.Vector3(-1.5,3.8,1), 
        scene);

    let camera4 = new BABYLON.ArcRotateCamera('cam3', Math.PI, Math.PI/3+0.3,17, 
    new BABYLON.Vector3(-1.5,3.8,0), 
    scene)

    cameras.push(camera1);
    cameras.push(camera2);
    cameras.push(camera3);
    cameras.push(camera4);
}

