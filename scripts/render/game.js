let canvas, engine, camera, obj;
let scene;
let pivot;
var animations;

//ATTUALMENTE SETTATO CON IL CONTENUTO DEL FILE PROVA, IN MODO DA AVERE UN'IDEA GENERALE DI COME SIA IL GIOCO
window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("gameCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera('cam', 
            Math.PI, Math.PI/3+0.3,
            0, 
            new BABYLON.Vector3(-1.5
                ,3.8,-0), 
            scene);
    // camera.attachControl(canvas,true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 13*2;          

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(5, 1, 0), scene);
    light1.intensity = 0.5;
    // light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    // light2.intensity = 0.5;
    // light2.parent = camera;
        
     //populateScene(scene);

    // // carico il circuito e la macchina scelti dall'utente
    var circuit = localStorage.getItem("CIRCUIT");

    // //Bisogna sistemare le dimensioni

    pivot = new BABYLON.TransformNode('a', scene);

    switch(circuit){
        case "Circuit1":


            BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuito1.obj", scene)

            break;
        case "Circuit2":
            BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuit2.glb", scene);
            break;
        // case "Circuit3":
        //     BABYLON.SceneLoader.ImportMesh("", "../objects/circuito/", "circuito.obj", scene)
        //     break;
        default:
            BABYLON.SceneLoader.ImportMesh("", "../objects/circuito1/", "circuit2.glb", scene);
            break;
    }
    

    var car = localStorage.getItem("CAR");

    //  switch(car){
    //      case "Car1":
    //          BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_1/", "f1_car1.obj", scene, meshesImported)
    //          break;
    //      case "Car2":
    //         BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_2/", "f1_car2.obj", scene, meshesImported)
    //         break;
    //      case "Car3":
    //         BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_3/", "f1_car3.obj", scene, meshesImported)
    //         break;
    //      default:
    //         BABYLON.SceneLoader.ImportMesh("", "../objects/MACCHINA_1/", "f1_car1.obj", scene, meshesImported)
    //         break;
    //  }

    var macchina = new Macchina(car);



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
            $("#speed").text(speed*2000)
            
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
                            // pivot.position.addInPlace(speed);
                        }
                }

            }
                
                // let delta = new BABYLON.Vector3(speed*Math.sin(phi), 0, speed*Math.cos(phi));
                // pivot.position.addInPlace(speed);

                if(speed > 0)
                {
                    
                    animations[1].start(true);
                    animations[1].speedRatio = Math.abs(speed*10)
                }
                else if(speed <0){
                    animations[0].start(true);
                    animations[0].speedRatio = Math.abs(speed*10);
                }
                else{
                    // animations[1].stop();
                    // animations[0].stop();

                }

        })

        
        
        
        

        
});


function meshesImported(meshes, animationGroup){
    const scaleFactor = 0.001;
    meshes.forEach(m => {
        m.scaling.set(scaleFactor, scaleFactor, scaleFactor)
        camera.parent= m;
        m.parent = pivot;
        m.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0)
        console.log("Nome della mesh:", m.name);
    })


    animations = scene.animationGroups

    animations[0].stop();

    
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

        pivot.position.x = 0.3974527082647077
        pivot.position.y = 0.001
        pivot.position.z = 1.4359542108900896
        this.advance(-0.1)
    }

    advance(d) {
        let phi = pivot.rotation.y;
        // delta è il vettore spostamento
        let delta = new BABYLON.Vector3(d*Math.sin(phi), 0, d*Math.cos(phi));
        pivot.position.addInPlace(delta);
        this.distanza_percorsa += d;
    }
    
}