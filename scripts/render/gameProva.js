let canvas, engine, camera, obj;
let scene;

//ATTUALMENTE SETTATO CON IL CONTENUTO DEL FILE PROVA, IN MODO DA AVERE UN'IDEA GENERALE DI COME SIA IL GIOCO
window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("gameCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera('cam', 
            -Math.PI/2, 1.5,
            20, 
            new BABYLON.Vector3(0,1.4,2.3), 
            scene);
    camera.attachControl(canvas,true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 13*2;          

    light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.5;
    light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, -4), scene);   
    light2.intensity = 0.5;
    light2.parent = camera;
        
    // populateScene(scene);

    // carico il circuito e la macchina scelti dall'utente
    var circuit = localStorage.getItem("CIRCUIT");
    var car = localStorage.getItem("CAR");
    //Bisogna sistemare le dimensioni
    switch(circuit){
        case "Circuit1":
            BABYLON.SceneLoader.Append("./", "../objects/circuito/circuito.obj", scene, function (scene) {});
           
            break;
        case "Circuit2":
            BABYLON.SceneLoader.Append("./", "../objects/circuito/circuito.obj", scene, function (scene) {});
            break;
        case "Circuit3":
            BABYLON.SceneLoader.Append("./", "../objects/circuito/circuito.obj", scene, function (scene) {});
            break;
        default:
            BABYLON.SceneLoader.Append("./", "../objects/circuito/circuito.obj", scene, function (scene) {});
            break;
    }

    switch(car){
        case "Car1":
            BABYLON.SceneLoader.Append("./", "../objects/macchina1/macchina1.obj", scene, function (scene) {});
            break;
        case "Car2":
            BABYLON.SceneLoader.Append("./", "../objects/macchina1/macchina1.obj", scene, function (scene) {});
            break;
        case "Car3":
            BABYLON.SceneLoader.Append("./", "../objects/macchina1/macchina1.obj", scene, function (scene) {});
            break;
        default:
            BABYLON.SceneLoader.Append("./", "../objects/macchina1/macchina1.obj", scene, function (scene) {});
            break;
    }
   
    
    
    // main loop
    engine.runRenderLoop(()=>scene.render());

    // resize event
    window.addEventListener("resize", () => engine.resize());

    scene.clearColor = new BABYLON.Color3(60/255, 139/255, 199/255);

   
   

    
    
    // //roba provvisoria per vedere se funzionano gli eventi dei tasti
   
    
    // class Macchina {
    
    //     constructor()  {
    //         // uso un perno per permettermi di sistemare facilmente 
    //         // la macchina sul pavimento.
    //         // se metto il perno sull'origine allora la macchina
    //         // appare appoggiata al piano xz
    //         let perno = this.perno = new BABYLON.TransformNode('macchina', scene);
    
    //         let box = BABYLON.MeshBuilder.CreateBox('car', {}, scene);
    //         box.material = matMacchina;
    //         box.parent = perno;
    //         box.scaling.set(0.5,0.6,2)
    //         box.position.y = 0.6;
    
    
    //     advance(d) {
    //         let phi = this.perno.rotation.y;
    //         let delta = new BABYLON.Vector3(d*Math.sin(phi), 0, d*Math.cos(phi));
    //         this.perno.position.addInPlace(delta);
    //         this.distanza_percorsa += d;
    //         this.ruotaRuote(this.distanza_percorsa)
    //     }

    

    //     let tasti = {};

    //     scene.onKeyboardObservable.add((kbInfo) => {
    //         if(kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) //controlla se il tasto è stato premuto o rilasciato
    //         {
    //             //se è stato premuto
    //             tasti[kbInfo.event.key] = true;
    //         }
    //         else{
    //             //se il tasto è stato rilasciato
    //             tasti[kbInfo.event.key] = false;
    //         }
    //     })

    //     let speed = 0.0;

    //     scene.registerBeforeRender(() =>
    //     {
    //         macchina.advance(speed);

    //         if(tasti['a'])
    //             macchina.perno.rotation.y -= 0.02;
    //         else if(tasti['d'])
    //             macchina.perno.rotation.y += 0.02;

    //             if(tasti['w']) {
    //                 // aumento la velocità (fino ad un massimo di 0.1)
    //                 speed = Math.min(0.1, speed + 0.001);
    //             } else if(tasti['s']) {
    //                 // freno, cioè diminuisco la velocità (fino ad un minimo
    //                 // di 0)
    //                 speed = Math.max(-0.1, speed - 0.001);
    //             } else {
    //                 // se non faccio nulla la macchina rallenta da sola
    //                 if(speed>=0){
    //                     speed = Math.max(0.0, speed - 0.0001);
    //                     }else {
    //                         speed = Math.min(0.0,speed + 0.0001)
    //                     }
    //             }
    //     })
    // }
    
});