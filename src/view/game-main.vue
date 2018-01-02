<template>
  <div class="game-main">
    <div id="Stats-output">
    </div>
    <div id="buttons">
        <span @click="kanpai">翻牌</span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <!-- Div which will hold the Output -->
    <div id="WebGL-output">
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
// import * as TWEEN from "tween";
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      msg: '哟嗬喂扎金花',
      gamerNum: 4,
      showLooker:[],
      showMesh:[]
    }
  },
  methods: {
    comeRoom () {
    },
    songkai () {
      for(var s in this.showMesh){
            this.showMesh[s].position.y = backPosation[s]
        }
    },
    kanpai (){
      this.showLooker.push({className:'looker4',x:-50,z:0,ro:0});
    }
  },
  mounted () {
    var camera;
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    var showLooker=this.showLooker
    var oarray=[];
    var showMesh=this.showMesh;
    var backPosation=[];
    function chakan(){
        var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(oarray);

        if (intersects.length > 0) {

            for(var t in intersects){
                console.log(intersects[t])
                backPosation.push(intersects[t].object.position.y)
                intersects[t].object.position.y = -5
                showMesh.push(intersects[t].object)
            }
        }
    }
    var data = [
        {class:'looker1',x:0,y:0.1,z:80,rt:-0.8},
        {class:'looker2',x:80,y:0.1,z:0,rt:-0.2},
        {class:'looker3',x:0,y:0.1,z:-80,rt:-0.6},
        {class:'looker4',x:-50,y:0.1,z:0,rt:-0.6},

        {class:'looker1',x:0,y:0.2,z:80,rt:0.1},
        {class:'looker2',x:80,y:0.2,z:0,rt:-0.12},
        {class:'looker3',x:0,y:0.2,z:-80,rt:0.6},
        {class:'looker4',x:-50,y:0.2,z:0,rt:0.36},

        {class:'looker1',x:0,y:0.3,z:80,rt:0.18},
        {class:'looker2',x:80,y:0.3,z:0,rt:-0.02},
        {class:'looker3',x:0,y:0.3,z:-80,rt:-0.76},
        {class:'looker4',x:-50,y:0.3,z:0,rt:-0.36}
    ]
    // once everything is loaded, we run our Three.js stuff.
    function init() {
        // textureLoader = new THREE.TextureLoader();
        var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -100;
        camera.position.y = 90;
        camera.position.z = 0;

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(180, 180);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);


        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene

        scene.add(plane);

        

        var lookAtGeom = new THREE.SphereGeometry(2);
        var lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: 0xff0000}));
        scene.add(lookAtMesh);


        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(-20, 40, 60);
        scene.add(directionalLight);


        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x292929);
        scene.add(ambientLight);

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(renderer.domElement);

        // call the render function
        var step = 0;

        // make sure that for the first time, the
        // camera is looking at the scene
        //   camera.lookAt(scene.position);
        render();


        var step = 0;
        function cameraAction(){
            step += 0.02;
            if (camera instanceof THREE.Camera) {
                var x = 10 + ( 100 * (Math.sin(step)));
                camera.lookAt(new THREE.Vector3(x, 10, 0));
                lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
            }
        }
        function createPanel(){
            function getPanel(id,object){
                console.log(object)
                var cube = new THREE.BoxGeometry(20, 15, 0.1);
                
                var url = "static/6.jpg";
                var url1 = "static/6-1.jpg";
                var texture1 = THREE.ImageUtils.loadTexture(url1);
                var texture2= THREE.ImageUtils.loadTexture(url1);
                var texture3 = THREE.ImageUtils.loadTexture(url1);
                var texture4= THREE.ImageUtils.loadTexture(url1);
                var texture5 = THREE.ImageUtils.loadTexture(url);
                var texture6 = THREE.ImageUtils.loadTexture(url1);
                var materialArr=[
                    new THREE.MeshPhongMaterial({map:texture1}),
                    new THREE.MeshPhongMaterial({map:texture2}),
                    new THREE.MeshPhongMaterial({map:texture3}),
                    new THREE.MeshPhongMaterial({map:texture4}),
                    new THREE.MeshPhongMaterial({map:texture5}),
                    new THREE.MeshPhongMaterial({map:texture6})
                ];
                var facematerial=new THREE.MeshFaceMaterial(materialArr);
                var mesh=new THREE.Mesh(cube,facematerial);//
                // mesh.id = ~~id;
                mesh.class = object.class
                oarray.push(mesh)
                scene.add(mesh);
                // var planeGeometry = new THREE.PlaneGeometry(10, 20);
                // var planeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
                // var plane = new THREE.Mesh(planeGeometry, planeMaterial);


                // // rotate and position the plane
                mesh.rotation.x = -0.5 * Math.PI;
                mesh.position.x = 0;
                mesh.position.y = 0;
                mesh.position.z = 0;

                // // add the plane to the scene
                // scene.add(plane);
                var sp = {
                    x:0,
                    y:0,
                    z:0
                }
                var tween = new TWEEN.Tween(sp).to({x:object.x, y:object.y, z:object.z, rz:object.rt * Math.PI}, 500).onUpdate(function(){
                    mesh.position.x = this.x;
                    mesh.position.y = this.y;
                    mesh.position.z = this.z;
                    mesh.rotation.z = this.rz;
                })
                return tween
            }
            var temp;
          
            for (var did in data){
                if(did==0){
                   var tweenObject = getPanel(did,data[did]);
                   temp = tweenObject;
                   tweenObject.start();
                }else{
                   var tweenObject1 = getPanel(did,data[did]);
                   temp.chain(tweenObject1)
                   temp = tweenObject1
                }
            }
            // tween2.chain(tween);





            // var planeGeometry = new THREE.PlaneGeometry(10, 20);
            // var planeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
            // var plane = new THREE.Mesh(planeGeometry, planeMaterial);


            // // rotate and position the plane
            // plane.rotation.x = -0.5 * Math.PI;
            // plane.position.x = 0;
            // plane.position.y = 0;
            // plane.position.z = 0;

            // // add the plane to the scene
            // scene.add(plane);
           
            // var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
            // // rotate and position the plane
            // plane2.rotation.x = -0.5 * Math.PI;
            // plane2.position.x = 0;
            // plane2.position.y = 0;
            // plane2.position.z = 0;

            // // add the plane to the scene
            // scene.add(plane2);
            // var sp = {
            //     x:0,
            //     y:0,
            //     z:0
            // }
            // var sp1 = {
            //     x:0,
            //     y:0,
            //     z:0
            // }
            // var tween = new TWEEN.Tween(sp).to({x:0, y:0.2, z:80, rz:-0.8 * Math.PI}, 1000).onUpdate(function(){
            //     plane.position.x = this.x;
            //     plane.position.y = this.y;
            //     plane.position.z = this.z;
            //     plane.rotation.z = this.rz;
            // })
            // var tween2 = new TWEEN.Tween(sp1).to({x:80, y:0.2, z:0, rz:-0.2 * Math.PI}, 1000).onUpdate(function(){
            //     plane2.position.x = this.x;
            //     plane2.position.y = this.y;
            //     plane2.position.z = this.z;
            //     plane2.rotation.z = this.rz;
            // }).start();
            // tween2.chain(tween);
        }
        createPanel();
        var me = "looker1"
        var showLooker1 = [
            {className:'looker1',x:0,z:40,ro:0},
            {className:'looker2',x:40,z:0,ro:1},
            {className:'looker3',x:0,z:-40,ro:0.5},
            {className:'looker4',x:-50,z:0,ro:0}
        ]
        
        function knowWhat(){
           scene.traverse(function(e){
            for(var i in showLooker){
                if(e.class===showLooker[i].className){
                    e.rotation.x = 0.5 * Math.PI;
                    // e.rotation.z = showLooker[i].ro * Math.PI;
                    e.position.x = showLooker[i].x;
                    e.position.z = showLooker[i].z;
                }
            }
                // if(e.class==='looker2'){
                //     e.rotation.x = 0.5 * Math.PI;
                //     console.log(e)
                // }else if (me === e.class) {

                // }
                
            }) 
        }
        function render() {

            stats.update();
            TWEEN.update();
            knowWhat();
            // render using requestAnimationFrame
            // cameraAction();
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        // .position.x = 20+( 10*(Math.cos(step)));
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init
    document.addEventListener('mousedown', chakan, false);
    document.addEventListener('mousemove', songkai, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  /* set margin to 0 and overflow to hidden, to go fullscreen */
  margin: 0;
  overflow: hidden;
}
#buttons{
  position: fixed;
  left: 200px;
}
</style>
