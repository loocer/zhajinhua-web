import * as tools from './tools'
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
        this.compareTemp = {
            compareObj:[],
            compareP:[]
        }
        this.allsObject = []
        this.state = {checkState:false}
        this.stateTextures = [
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-1.png"),
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-2.png"),
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-3.png"),
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-4.png"),
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-5.png"),
            THREE.ImageUtils.loadTexture("/static/assets/textures/resice-6.png")
        ]
        this.avatarTextures = []
        this.textures = [
            THREE.ImageUtils.loadTexture("/static/assets/6.jpg"),
            THREE.ImageUtils.loadTexture("/static/assets/6-1.jpg"),
            THREE.ImageUtils.loadTexture("/static/Avatar.jpg")
        ]
	}
    setAvatarTextures(picUrls){
        this.avatarTextures = []
        for(let p in picUrls){
            this.avatarTextures.push(THREE.ImageUtils.loadTexture(picUrls[p]))
        }
    }
	setAllPosations(){
		var temp = this
		this._allPosations = tools.AllPosations[temp._gameType]
	}
    getMeshOnMourse(self){
        let maths =[]
        var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        vector = vector.unproject(self.camera);

        var raycaster = new THREE.Raycaster(self.camera.position, vector.sub(self.camera.position).normalize());

        var intersects = raycaster.intersectObjects(self.allsObject);

        if (intersects.length > 0) {

            for(var t in intersects){
                intersects[t].object.position.y = 1
                maths.push(intersects[t].object)
            }
        }
        self.checkValue(maths)
    }
    showValue(className){
        let mathArray = this.allsObject
        var myself =  mathArray[mathArray.length-1]
       for(let i in mathArray){
            if( mathArray[i].class === className){
               var sps = {
                    x:mathArray[i].position.x,
                    y:mathArray[i].position.y,
                    z:mathArray[i].position.z,
                    rt:1,
                    rz:0
                }
                this.compareTemp.compareObj.push(mathArray[i])
                this.compareTemp.compareP.push(sps)
                var spe = {
                    x:myself.position.x + 20,
                    y:20,
                    z:myself.position.z + 5 *i -50,
                    rz:0.5 * Math.PI,
                    rt:0
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z 
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = this.rz/2
                    mathArray[i].rotation.x = this.rz
                }).start() 
            }
       }
    }
    hideValue(className){
        let tempData = null
        let mathArray = this._allPosations
        for(let m in mathArray){
            if(mathArray[m].class === this.compareTemp.compareObj[0].class){
                tempData = mathArray[m]
            }
        }
        let objs = this.compareTemp.compareObj
        let tempArray = []
        for(let i in objs){
            if(className === objs[i].class){
                var sps = {
                        x:objs[i].position.x,
                        y:objs[i].position.y,
                        z:objs[i].position.z,
                        rt:1,
                        rz:0
                    }
                var spe = {
                    x:tempData.x,
                    y:tempData.y,
                    z:tempData.z,
                    rz:-0.5 * Math.PI,
                    rt:Math.random()
                }
                
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    objs[i].position.x = this.x
                    objs[i].position.y = this.y 
                    objs[i].position.z = this.z 
                    objs[i].rotation.x = this.rz
                    objs[i].rotation.z = this.rt
                    objs[i].rotation.y = 0
                }).start()  
            }
            if(className !== objs[i].class){
                tempArray.push(objs[i])
            }
        }
        this.compareTemp.compareObj = tempArray
    }
    pass(className){
        let mathArray = this.allsObject
        for(let i in mathArray){
            if( mathArray[i].class === className){
               var sps = {
                    x:mathArray[i].position.x,
                    y:mathArray[i].position.y,
                    z:mathArray[i].position.z,
                    rt:1,
                    rz:0
                }
                var spe = {
                    x:0,
                    y:5,
                    z:0,
                    rz:-0.5 * Math.PI,
                    rt:Math.random()
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z 
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = 0
                    mathArray[i].rotation.x = this.rz
                })
                var spen = {
                    x:0,
                    y:-5,
                    z:0,
                    rz:-0.5 * Math.PI,
                    rt:Math.random()
                }
                var tween2 = new TWEEN.Tween(spe).to(spen, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z 
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = 0
                    mathArray[i].rotation.x = this.rz
                })
                tween.chain(tween2).start()
            }
        }
    }
    compareTemp1(className){
        this.checkValue()
        let mathArray = this.allsObject
        var myself =  mathArray[mathArray.length-1]
       for(let i in mathArray){
            if( mathArray[i].class === className){
                
               var sps = {
                    x:mathArray[i].position.x,
                    y:mathArray[i].position.y,
                    z:mathArray[i].position.z,
                    rt:1,
                    rz:0
                }
                this.compareTemp.compareObj.push(mathArray[i])
                this.compareTemp.compareP.push(sps)
                var spe = {
                    x:myself.position.x + 20,
                    y:20,
                    z:myself.position.z + 5 *i -50,
                    rz:0.5 * Math.PI,
                    rt:0
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z 
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = this.rz/2
                    mathArray[i].rotation.x = this.rz
                }).start() 
            }
       }
    }
    compareTemp2(winClass){
        let temp =this
        let mathArray = this._allPosations
        let tempData = null
        for(let m in mathArray){
            if(mathArray[m].class === this.compareTemp.compareObj[0].class){
                tempData = mathArray[m]
            }
        }

        let objs = temp.compareTemp.compareObj
        for(let i in objs){
            if(winClass === mathArray[mathArray.length-1].class){
                this.checkValue()
                var sps = {
                    x:objs[i].position.x,
                    y:objs[i].position.y,
                    z:objs[i].position.z,
                    rt:1,
                    rz:0
                }
                var spe = {
                    x:temp.compareTemp.compareP[i].x,
                    y:temp.compareTemp.compareP[i].y,
                    z:temp.compareTemp.compareP[i].z,
                    rz:0.5 * Math.PI,
                    rt:0
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    objs[i].position.x = this.x
                    objs[i].position.y = this.y 
                    objs[i].position.z = this.z 
                    objs[i].rotation.z = this.rt
                    objs[i].rotation.y = 0
                    objs[i].rotation.x = this.rz
                }).start() 
            }else{
                var sps = {
                    x:objs[i].position.x,
                    y:objs[i].position.y,
                    z:objs[i].position.z,
                    rt:1,
                    rz:0
                }
                var spe = {
                    x:tempData.x,
                    y:tempData.y,
                    z:tempData.z,
                    rz:-0.5 * Math.PI,
                    rt:Math.random()
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    objs[i].position.x = this.x
                    objs[i].position.y = this.y 
                    objs[i].position.z = this.z 
                    objs[i].rotation.x = this.rz
                    objs[i].rotation.z = this.rt
                    objs[i].rotation.y = 0
                }).start() 
            }
        }
    }
    checkValue(){
        this.state.checkState = !this.state.checkState
        let mathArray = this.allsObject 
       for(let i in mathArray){
            if( mathArray[i].class === mathArray[mathArray.length-1].class && this.state.checkState){
                var sps = {
                    x:mathArray[i].position.x,
                    y:mathArray[i].position.y,
                    z:mathArray[i].position.z,
                    rt:1,
                    rz:0
                }
                var spe = {
                    x:mathArray[i].position.x,
                    y:20,
                    z:mathArray[i].position.z + 5 *i -50,
                    rz:0.5 * Math.PI,
                    rt:0
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z 
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = this.rz/2
                    mathArray[i].rotation.x = this.rz
                }).start()
            }
            if( mathArray[i].class === mathArray[mathArray.length-1].class && !this.state.checkState){
                var sps = {
                    x:mathArray[i].position.x,
                    y:mathArray[i].position.y,
                    rt:2 * Math.PI,
                    z:mathArray[i].position.z,
                    rz:0.5 * Math.PI
                }
                var spe = {
                    x:mathArray[i].position.x,
                    y:1,
                    rt:Math.random(),
                    z:mathArray[i].position.z + 50 -5*i,
                    rz:0
                }
                var tween = new TWEEN.Tween(sps).to(spe, 1000).onUpdate(function(){
                    mathArray[i].position.x = this.x
                    mathArray[i].position.y = this.y 
                    mathArray[i].position.z = this.z
                    mathArray[i].rotation.z = this.rt
                    mathArray[i].rotation.y = this.rz/2
                    mathArray[i].rotation.x = this.rz*2 + 1.5 *Math.PI
                    // mathArray[i].rotation.y = this.rz + 1.5 * Math.PI
                }).start()
            }
       }
    }
    changeState(obj){
        let color = tools.getStateColor(obj.state)
        this.scene.traverse(function(e){
            if(e.class === obj.class + 'stateLight'){
                e.material.color = new THREE.Color(color)
                console.log(e)
            }
        })
    }
    changeStateText(obj){
        function changeTypeToCode(state){
            if(state == tools.acType.ON_RAISE){
                return 4
            }
            if(state == tools.acType.GAME_PASS){
                return 1
            }
            if(state == tools.acType.ADD_RAISE){
                return 2
            }
            if(state == tools.acType.SHOW_VALUE){
                return 3
            }
            if(state == tools.acType.GAME_PK){
                return 4
            }else{
                return 5
            }
        }
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
            let texture = this.stateTextures[changeTypeToCode(obj.state)]
            let m =  new THREE.MeshPhongMaterial({map:texture})
            materialArr.push(m)
        }
        this.scene.traverse(function(e){
            if(e.class === obj.class + 'stateText'){
                e.material.map = null
                console.log(e)
            }
        })
    }
    //userId,state
    setStateText(dataObj){
        let cube = new THREE.BoxGeometry(15, 8, 0.1)
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
            let texture = this.stateTextures[2]
            let m = new THREE.MeshPhongMaterial({map:texture})
            materialArr.push(m)
        }
        let facematerial=new THREE.MeshFaceMaterial(materialArr)
        let mesh=new THREE.Mesh(cube,facematerial)
            this.scene.add(mesh);
            mesh.class = dataObj.class  + 'stateText'
            mesh.rotation.x = -0.5 * Math.PI
            mesh.rotation.z = 0.5 * Math.PI
            mesh.position.x = dataObj.avatarPosition.x - 20;
            mesh.position.y = 2;
            mesh.position.z = dataObj.avatarPosition.z;
    }
    setStateLight(dataObj,a){
        let color = tools.getStateColor(dataObj.state)
        let sphereGeometry = new THREE.SphereGeometry(3, 10, 10);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: color});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.class = dataObj.class + 'stateLight'
            sphere.position.x = dataObj.pointPosition.x;
            sphere.position.y = 2;
            sphere.position.z = dataObj.pointPosition.z;
            sphere.castShadow = true;
            this.scene.add(sphere);
        let cube = new THREE.BoxGeometry(20, 15, 0.1)
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
            let texture = this.avatarTextures[a]
            let m = i === 4 ? new THREE.MeshPhongMaterial({map:texture}):new THREE.MeshPhongMaterial({map:texture})
            materialArr.push(m)
        }
        let facematerial=new THREE.MeshFaceMaterial(materialArr)
        let mesh=new THREE.Mesh(cube,facematerial)
            this.scene.add(mesh);
            mesh.rotation.x = -0.5 * Math.PI
            mesh.rotation.z = 0.5 * Math.PI
            mesh.position.x = dataObj.avatarPosition.x;
            mesh.position.y = 2;
            mesh.position.z = dataObj.avatarPosition.z;
        var options = {
                size: 4,
                height: 0.01,
                font: "lisu",
                bevelEnabled: false
        };
        var options2 = {
                size: 4,
                height: 0.01,
                font: "helvetiker",
                bevelEnabled: false
        };
        function createMesh(geom) {
            var meshMaterial = new THREE.MeshPhongMaterial({
                specular: 0xFFFFFF,
                color:  0xFFFFFF,
                shininess: 0.8,
                metal: false
            });
            var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
            return plane
        }
        let text = createMesh(new THREE.TextGeometry(dataObj.nickName.slice(0,5), options));
            text.rotation.x = -0.5 * Math.PI
            text.rotation.z = 0.5 * Math.PI
            text.position.x = dataObj.avatarPosition.x - 10;
            text.position.y = 1;
            text.position.z = dataObj.avatarPosition.z + 10;
            this.scene.add(text);
        let text2 = createMesh(new THREE.TextGeometry(dataObj.account, options2));
            text2.rotation.x = -0.5 * Math.PI
            text2.rotation.z = 0.5 * Math.PI
            text2.position.x = dataObj.avatarPosition.x + 12;
            text2.position.y = 1;
            text2.position.z = dataObj.avatarPosition.z + 10;
            this.scene.add(text2);    
        
    }
	setPukerPanel(object,time){
		let cube = new THREE.BoxGeometry(25, 17, 0.1)
        var urlF = this.textures[0];
        var urlB = this.textures[1];
        // var urlF = object.urlFront
        // var urlB = object.urlBack
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
        	var url = i === 4 ? urlF : urlB
        	let texture = url
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
        console.log(object.y)
        var tween = new TWEEN.Tween(sp).to({x:object.pokerPosition.x, y:object.pokerPosition.y, z:object.pokerPosition.z, rz:object.pokerPosition.rt * Math.PI}, time).onUpdate(function(){
            mesh.position.x = this.x
            mesh.position.y = this.y
            mesh.position.z = this.z
            mesh.rotation.z = this.rz
        })
        return tween
	}
    setBasePic(){
        for(let a in this._allPosations){
            if(this._allPosations[a].state != tools.stateColor.NONE){
                this.setStateLight(this._allPosations[a], a)
                this.setStateText(this._allPosations[a])
            }
        }
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
            mesh.rotation.z = data[d].pokerPosition.rt
            mesh.rotation.x = -0.5 * Math.PI
            mesh.position.x = data[d].pokerPosition.x
            mesh.position.y = -10
            mesh.position.z = data[d].pokerPosition.z
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
        var size = this._allPosations.length
        for(let i = 0;i<3;i++){
            data = data.concat(this._allPosations)
        }
        for (let d in data){
            data[d].pokerPosition.y = d / size + 2 
            data[d].pokerPosition.rt = Math.random()
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
        this.camera.position.x = 0
        this.camera.position.y = 390
        this.camera.position.z = 0
        let renderer = this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        let planeGeometry = new THREE.PlaneGeometry(360, 180)
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

        let directionalLight = new THREE.DirectionalLight(0xffffff,2)
        directionalLight.position.set(-20, 40, 60)
        this.scene.add(directionalLight)

        // add subtle ambient lighting
        let ambientLight = new THREE.AmbientLight(0x292929)
        this.scene.add(ambientLight)

        this._renderElement.appendChild(renderer.domElement)

        let ground_material = Physijs.createMaterial(
                    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('/static/assets/textures/ground.png')}),
                    .9, .3)
        let ground = new Physijs.BoxMesh(new THREE.BoxGeometry(360,0.1, 180), ground_material, 0)
        this.scene.add(ground)
        let self = this
        this.setBasePic()
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