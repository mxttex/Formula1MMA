let canvas, engine, camera, obj;
let scene;

window.addEventListener('DOMContentLoaded', (event) => {
	
    canvas = document.getElementById("renderCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
	camera;

    
    let texture, light1, light2;
    
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera('cam', 
            -Math.PI/2, 1.5,
            3.2, 
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
        
    populateScene(scene);
    
    // main loop
    engine.runRenderLoop(()=>scene.render());

    // resize event
    window.addEventListener("resize", () => engine.resize());
    
    let raggioRuota = 0.56;

    scene.clearColor = new BABYLON.Color3(60/255, 139/255, 199/255);

    
    //roba provvisoria per vedere se funzionano gli eventi dei tasti
    function creaRuota() {

        // let perno = new BABYLON.TransformNode('ruota', scene);
    
        let semiSpessoreGomma = 0.05;
        let diameter = (raggioRuota-semiSpessoreGomma)*2;
    
        // creo il mozzo (che agisce anche come perno:
        // tutti gli elementi della ruota sono attaccati
        // al mozzo)
        let mozzo = BABYLON.MeshBuilder.CreateCylinder('mozzo', {
            diameter:0.2,
            height:0.15,
        }, scene);
        mozzo.material = matMozzi;
    
        // gomma
        let gomma = BABYLON.MeshBuilder.CreateTorus('car', {
            diameter:diameter,
            thickness:semiSpessoreGomma*2,
            tessellation:80
        }, scene);
        gomma.material = matGomme;
        gomma.parent = mozzo;
    
        // raggi
        let m = 5;
        let raggio = BABYLON.MeshBuilder.CreateCylinder('raggio', {
            diameter:0.05,
            height:diameter,
        }, scene);
        raggio.material = matRaggi;
        raggio.rotation.z = Math.PI/2;
        raggio.parent = mozzo;
        for(let i=1; i<m; i++) {
            let raggio2 = raggio.createInstance('i'+i);
            raggio2.rotation.y = 2*Math.PI*i/m;
            raggio2.parent = mozzo;
        }
    
        // voglio che la ruota giaccia nel piano yz 
        mozzo.rotation.z = Math.PI/2;
    
        return mozzo;
    }
    
    class Macchina {
    
        constructor()  {
            // uso un perno per permettermi di sistemare facilmente 
            // la macchina sul pavimento.
            // se metto il perno sull'origine allora la macchina
            // appare appoggiata al piano xz
            let perno = this.perno = new BABYLON.TransformNode('macchina', scene);
    
            let box = BABYLON.MeshBuilder.CreateBox('car', {}, scene);
            box.material = matMacchina;
            box.parent = perno;
            box.scaling.set(0.5,0.6,2)
            box.position.y = 0.6;
    
            // creo le ruote
            let ruote = this.ruote = [];
            for(let i=0;i<4;i++) {
                let ruota = creaRuota();
                ruota.parent = perno;
                ruote.push(ruota);        
            }
            // posiziono le ruote
            let dx = 0.32, dy = raggioRuota, dz = 0.6;
            ruote[0].position.set(dx,dy,dz);
            ruote[1].position.set(-dx,dy,dz);
            ruote[2].position.set(dx,dy,-dz);
            ruote[3].position.set(-dx,dy,-dz);
            this.distanza_percorsa = 0;
        }
    
        ruotaRuote(theta) {
            this.ruote.forEach(ruota => {
                ruota.rotation.x = theta / raggioRuota;
            })
        }
    
        advance(d) {
            let phi = this.perno.rotation.y;
            let delta = new BABYLON.Vector3(d*Math.sin(phi), 0, d*Math.cos(phi));
            this.perno.position.addInPlace(delta);
            this.distanza_percorsa += d;
            this.ruotaRuote(this.distanza_percorsa)
        }
    }

    const macchina = new Macchina();
    camera.parent = macchina.perno;
    
    
    // metodo per registrare le posizioni per poi creare il fantasma
    function registerPositions(){
        let positions= [];
        let position= new BABYLON.Vector3(macchina.position.x,macchina.position.y,macchina.position.z);
        positions.push(position);
    }
    function createGhostCar(positions){
        let ghostCar= new Macchina();
        ghostCar.perno.position= positions[0];
    }


    function populateScene(){
        createGrid(scene);
        matMacchina = new BABYLON.StandardMaterial('mat-macchina', scene);
        matGomme    = new BABYLON.StandardMaterial('mat-gomme', scene);
        matRaggi    = new BABYLON.StandardMaterial('mat-raggi', scene);
        matMozzi    = new BABYLON.StandardMaterial('mat-Mozzi', scene);
        matMacchina.diffuseColor.set(1,0.5,0.3);
        matGomme.diffuseColor.set(0.2,0.5,0.7);
        matRaggi.diffuseColor.set(0.7,0.5,0.1);
        matMozzi.diffuseColor.set(0.3,0.4,0.7);
        

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

        let speed = 0.0;
        createGhostCar()
        scene.registerBeforeRender(() =>
        {
            macchina.advance(speed);
            registerPositions();

            if(tasti['a'])
                macchina.perno.rotation.y -= 0.02;
            else if(tasti['d'])
                macchina.perno.rotation.y += 0.02;

                if(tasti['w']) {
                    // aumento la velocità (fino ad un massimo di 0.1)
                    speed = Math.min(0.1, speed + 0.001);
                } else if(tasti['s']) {
                    // freno, cioè diminuisco la velocità (fino ad un minimo
                    // di 0)
                    speed = Math.max(-0.1, speed - 0.001);
                } else {
                    // se non faccio nulla la macchina rallenta da sola
                    if(speed>=0){
                        speed = Math.max(0.0, speed - 0.0001);
                        }else {
                            speed = Math.min(0.0,speed + 0.0001)
                        }
                   
                }
        })
    }
    
});