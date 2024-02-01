<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <div ref="GallaryViewer" id="GallaryViewer" class="initial"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as Three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
export default {
  data() {
    return {
      WIDTH: window.innerWidth / 1.3,
      HEIGHT: window.innerHeight / 1.3,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,

      totalNum: 1,
      cardArray: [],
    }
  },
  methods: {
    removeTest() {
      if(this.targets.length < 1) return;
      this.scene.remove(this.targets[0]);
    },
    init() {
      this.scene = new Three.Scene();
      this.scene.background = new Three.Color("#ffffff");
      this.camera = new Three.PerspectiveCamera(75, this.WIDTH / this.HEIGHT, 0.1, 1000);
      this.camera.position.set(0, 0, 50);
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.renderer.shadowMap.enabled = true;
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls = new DragControls(this.cardArray, this.camera, this.renderer.domElement);
      // const axes = new Three.AxesHelper(150);
      // this.scene.add(axes);
      // const gridHelper = new Three.GridHelper(240, 20);
      // this.scene.add(gridHelper);
      gsap.from(this.camera.position, {
        duration: 1,
        delay: 1,
        z: 200,
        ease: "Power2.easeInOut",
      });
      const canvas = document.getElementById("GallaryViewer");
      canvas.appendChild(this.renderer.domElement);

      const light = new Three.HemisphereLight(0xffffff, 0xffffff, 3);
      light.position.set(100, 100, 0);
      this.scene.add(light);

      // const geometry = new Three.BoxGeometry(400, 400, 2);
      // const material = new Three.MeshPhongMaterial({color: 0x464946});
      // const wallMesh = new Three.Mesh(geometry, material);
      // wallMesh.position.set(0, 0, -1);
      // wallMesh.receiveShadow = true; //default is false
      // wallMesh.castShadow = true;
      // this.scene.add(wallMesh);

      this.totalNum = 16;
      for (let i = 1; i < this.totalNum; i++)
        this.addBox(i);
    },
    animate() {
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    addBox(i) {
      const imageMap = new Three.TextureLoader();
      imageMap.load('/pictures/' + i + ".jpg", (data) => {
        const geometry = new Three.BoxGeometry(16, 12, 1);
        const material = new Three.MeshPhongMaterial({
          map: data,
          // color: 0xffffff,
        });
        const cardMesh = new Three.Mesh(geometry, material);
        cardMesh.castShadow = true;
        cardMesh.receiveShadow = true;

        let x = 0; //Math.random() * 50 - 25;
        let y = 0; //Math.random() * 50 - 25;
        let z = 0;
        cardMesh.position.set(x, y, z);

        gsap.to(cardMesh.position, {
          duration: 0.8,
          delay: i * 0.1 + 0.5,
          x: Math.random() * 80 - 40,
          y: Math.random() * 80 - 40,
          ease: "Power4.easeIn",
        });
        gsap.to(cardMesh.rotation, {
          duration: 0.8,
          delay: i * 0.1 + 0.5,
          z: Math.random() * 2 - 1,
          ease: "Power4.easeIn",
        });

        this.cardArray.push(cardMesh);
        //drag를 위한 배열
        this.scene.add(cardMesh);
      });
    },
    addLight(...pos) {
      const color = 0xffffff;
      const intensity = 0.4;
      const light = new Three.PointLight(color, intensity);
      light.castShadow = true;

      light.position.set(...pos);
      light.shadow.mapSize.width = 512; // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.5; // default
      light.shadow.camera.far = 500; // default
      light.shadow.radius = 5;
      light.shadow.blurSamples = 5;
      this.scene.add(light);

      const helper = new Three.PointLightHelper(light);
      this.scene.add(helper);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
}
</script>
<style scoped></style>

<!-- <template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="addBox">click</v-btn>
        <div ref="GallaryViewer" ID="GallaryViewer" style="width: 100%" class="initial"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {
      scene : null,
      camera : null,
      renderer : null,
      controls : null,
      WIDTH : window.innerWidth / 1.1,
      HEIGHT : window.innerHeight / 1.1,
    }
  },
  methods: {
    addBox(){
      console.time("cube_add");
      const geometry = new THREE.BoxGeometry(10, 10, 10);
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
      });
      const boxMesh = new THREE.Mesh(geometry, material);
      const {x, y, z} = {x : Math.random() * 400 - 200, y : Math.random() * 400 - 200, z : Math.random() * 400 - 200};
      boxMesh.position.set(x, y, z);
      boxMesh.rotation.set(0, y, 0);
      this.scene.add(boxMesh);
      console.timeEnd("cube_add");
    },
    three_init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#ffffff");
      this.camera = new THREE.PerspectiveCamera(75, this.WIDTH / this.HEIGHT, 0.1, 1000);
      this.camera.position.set(0, 0, 150);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      const gv = document.getElementById("GallaryViewer");
      gv.appendChild(this.renderer.domElement);

      const axes = new THREE.AxesHelper(150);
      this.scene.add(axes);

      const gridHelper = new THREE.GridHelper(240, 20);
      this.scene.add(gridHelper);

      var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
      light.position.set(100, 100, 0);
      this.scene.add(light);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    three_animate() {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.three_animate);
    }
  },
  mounted() {
    this.three_init();
    this.three_animate();
  },
}
</script>

<style scoped></style> -->
