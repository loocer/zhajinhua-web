import * as datas from './tools'
export default class GameObject{
	constructor(obj){
		this.id = Date.parse( new Date())
		this._gameType = obj.type
		this._allPosations = []
		this._renderElement = obj.renderElement
		this.showLooker = []
		this.allPokers = true//true is going,false is not going
		this.raiseMoney = 200
        this.camera = null
        this.scene = null
        this.lookAtMesh = null
        this.renderer = null
        this.plane = null
        this.directionalLight= null
        this.ambientLight = null
        this.allsObject = []
	}
	setAllPosations(){
		var temp = this
		this._allPosations = datas.AllPosations[temp._gameType]
	}
    getMeshOnMourse(self){
        let maths =[]
        var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        vector = vector.unproject(self.camera);

        var raycaster = new THREE.Raycaster(self.camera.position, vector.sub(self.camera.position).normalize());

        var intersects = raycaster.intersectObjects(self.allsObject);

        if (intersects.length > 0) {

            for(var t in intersects){
                console.log(intersects[t])
                intersects[t].object.position.y = 1
                maths.push(intersects[t].object)
            }
        }
        self.checkValue(maths)
    }
    checkValue(mathArray){
       for(let i in mathArray){
            var sps = {
                x:mathArray[i].position.x,
                y:mathArray[i].position.y,
                z:mathArray[i].position.z,
                rz:0
            }
            var spe = {
                x:mathArray[i].position.x,
                y:20,
                z:mathArray[i].position.z,
                rz:0.5 * Math.PI
            }
            var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                console.log(this)
                mathArray[i].position.x = this.x
                mathArray[i].position.y = this.y
                mathArray[i].position.z = this.z
                mathArray[i].rotation.z = this.rz
            }).start()
       }
    }
    changeState(obj){
        let color = datas.getStateColor(obj.state)
        this.scene.traverse(function(e){
            if(e.class === obj.id + 'stateLight'){
                e.material.color = '#000000fa'
                console.log(e)
            }
        })
    }
    setStateLight(){
        let stateColor = datas.stateColor
        let data = this._allPosations
        for(let s in data){
            let color = datas.getStateColor(data[s].state)
            let sphereGeometry = new THREE.SphereGeometry(3, 10, 10);
            let sphereMaterial = new THREE.MeshLambertMaterial({color: color});
            let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.class = data[s].id + 'stateLight'
            // position the sphere
            sphere.position.x = data[s].x;
            sphere.position.y = -2;
            sphere.position.z = data[s].z;
            sphere.castShadow = true;

            // add the sphere to the scene
            this.scene.add(sphere);
        }
        
    }
	setPukerPanel(object,time){

		let cube = new THREE.BoxGeometry(20, 15, 0.1)
        var urlF = "/static/assets/6.jpg";
        var urlB = "/static/assets/6-1.jpg";
        // var urlF = object.urlFront
        // var urlB = object.urlBack
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
        	var url = i === 4 ? urlF : urlB
        	let texture = THREE.ImageUtils.loadTexture(url)
            let m = new THREE.MeshPhongMaterial({map:texture})
        	materialArr.push(m)
        }

  
        let facematerial=new THREE.MeshFaceMaterial(materialArr)
        let mesh=new THREE.Mesh(cube,facematerial)
        mesh.class = object.class
        this.allsObject.push(mesh)
        this.scene.add(mesh)
        mesh.rotation.x = -0.5 * Math.PI
        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = 0
        var sp = {
            x:0,
            y:30,
            z:0
        }
        var tween = new TWEEN.Tween(sp).to({x:object.x, y:object.y, z:object.z, rz:object.rt * Math.PI}, time).onUpdate(function(){
            mesh.position.x = this.x
            mesh.position.y = this.y
            mesh.position.z = this.z
            mesh.rotation.z = this.rz
        })
        return tween
	}
    initPuker(){
        var temp;
        var data = [],tempMesh = []
        for(let i = 0;i<3;i++){
            data = data.concat(this._allPosations)
        }
        for (let d in data){
            data[d].rt = Math.random()
            var urlF = "/static/assets/6.jpg";
            var urlB = "/static/assets/6-1.jpg";
            // var urlF = object.urlFront
            // var urlB = object.urlBack
            var materialArr = []
            for(let i = 0 ; i < 6; i++){
                var url = i === 4 ? urlF : urlB
                let texture = THREE.ImageUtils.loadTexture(url)
                let m = new THREE.MeshPhongMaterial({map:texture})
                materialArr.push(m)
            }
            let facematerial=new THREE.MeshFaceMaterial(materialArr)
            let cube = new THREE.BoxGeometry(20, 15, 0.1)
            let mesh=new THREE.Mesh(cube,facematerial)
            mesh.rotation.z = Math.random()
            mesh.rotation.x = -0.5 * Math.PI
            mesh.position.x = data[d].x
            mesh.position.y = -10
            mesh.position.z = data[d].z
            mesh.class = data[d].class
            this.allsObject.push(mesh)
            tempMesh.push(mesh)
            this.scene.add(mesh)

            let sp = {
                x:mesh.position.x,
                y:-5,
                z:mesh.position.z
            }
            var tween = new TWEEN.Tween(sp).to({x:mesh.position.x, y:1, z:mesh.position.z}, 100).onUpdate(function(){
                 mesh.position.x = this.x
                 mesh.position.y = this.y
                 mesh.position.z = this.z
            }).start()
        }

        // for(let m in tempMesh){
        //     let sp = {
        //         x:tempMesh[m].position.x,
        //         y:-5,
        //         z:tempMesh[m].position.z
        //     }
        //     var tween = new TWEEN.Tween(sp).to({x:tempMesh[m].position.x, y:5, z:tempMesh[m].position.z, rz:tempMesh[m].position.rt}, 1000).onUpdate(function(){
        //          tempMesh[m].position.x = this.x
        //          tempMesh[m].position.y = 5
        //          tempMesh[m].position.z = this.z
        //          tempMesh[m].rotation.z = this.rz
        //     }).start()
        // }
        // var data = []
        // for(let i = 0;i<3;i++){
        //     data = data.concat(this._allPosations)
        // }
        // for (let d in data){
        //     data[d].rt = Math.random()
        //     this.setPukerPanel(data[d],1000).start()
        // }
    }
	createPanel(){
		var temp;
		var data = []
        for(let i = 0;i<3;i++){
            data = data.concat(this._allPosations)
        }
        for (let d in data){
            data[d].rt = Math.random()
            if(d==0){
               var tweenObject = this.setPukerPanel(data[d],500);
               temp = tweenObject;
               tweenObject.start();
            }else{
               var tweenObject1 = this.setPukerPanel(data[d],500);
               temp.chain(tweenObject1)
               temp = tweenObject1
            }
        }
	}
	test_initState(){
		var stats = new Stats()
        stats.setMode(0) 
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.left = '0px'
        stats.domElement.style.top = '0px'
        document.getElementById("Stats-output").appendChild(stats.domElement)
        return stats
	}
    resice(pm){
        var self = this
        var endP1 = {x:0,y:20,z:0}
        var scale = chroma.scale(['green', 'white']);
        var stoneGeom = new THREE.BoxGeometry(10, 5, 10);
        var stone = new Physijs.BoxMesh(stoneGeom, Physijs.createMaterial(new THREE.MeshLambertMaterial(
                {
                    color: scale(Math.random()).hex(),
                    transparent: false, opacity: 1,
                       map: THREE.ImageUtils.loadTexture( '/static/assets/textures/general/darker_wood.jpg' )
                }),0.5,0.7));
        stone.position.copy(new THREE.Vector3(endP1.x, endP1.y, endP1.z));
        stone.lookAt(self.scene.position);
        stone.__dirtyRotation = true;
        // stone.position.y = 3.5;

        this.scene.add(stone);
        var tween = new TWEEN.Tween(pm).to({x:endP1.x, y:endP1.y, z:endP1.z}, 1000).onUpdate(function(){
            var temp = this
            stone.position.x = temp.x
            stone.position.z = temp.z
            // stone.position=(new THREE.Vector3(temp.x, temp.y, temp.z));
                // pm[0] = this.x;
                // pm[1] = this.y;
                // pm[2] = this.z;
            })
        tween.start();
    }
	init(){
		this.setAllPosations()
        Physijs.scripts.worker = '/static/libs/physijs_worker.js';
        Physijs.scripts.ammo = './ammo.js';
		this.scene = new Physijs.Scene
		this.scene.setGravity(new THREE.Vector3(0, -80, 0))
		let camera = this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.x = -100
        this.camera.position.y = 90
        this.camera.position.z = 0
        let renderer = this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        let planeGeometry = new THREE.PlaneGeometry(180, 180)
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
        let plane = this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
        // rotate and position the plane
        this.plane.rotation.x = -0.5 * Math.PI
        this.plane.position.x = 0
        this.plane.position.y = 0
        this.plane.position.z = 0
        this.scene.add(plane)

        let lookAtGeom = new THREE.SphereGeometry(2)
        let lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: '#fff700'}))
        this.scene.add(lookAtMesh)

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
        directionalLight.position.set(-20, 40, 60)
        this.scene.add(directionalLight)

        // add subtle ambient lighting
        let ambientLight = new THREE.AmbientLight(0x292929)
        this.scene.add(ambientLight)

        this._renderElement.appendChild(renderer.domElement)

        let ground_material = Physijs.createMaterial(
                    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('/static/assets/textures/general/wood-2.jpg')}),
                    .9, .3)
        let ground = new Physijs.BoxMesh(new THREE.BoxGeometry(180,0.1, 180), ground_material, 0)
        this.scene.add(ground)

        this.setStateLight()

        let self = this
        function knowWhat(){
           self.scene.traverse(function(e){
                console.log(e)
                // if(e.class==='looker2'){
                //     e.rotation.x = 0.5 * Math.PI;
                //     console.log(e)
                // }else if (me === e.class) {

                // }
                
            }) 
        }

        var s = this.scene
        var c = this.camera
        var r = this.renderer
        var t = this.test_initState()
        var render = function(){
            t.update()
            TWEEN.update()
            c.lookAt(new THREE.Vector3(0, 0, 0))
            r.render(s, c)
            s.simulate(undefined, 1)
            requestAnimationFrame(render)
            // knowWhat()
        }
        render()
	}
}