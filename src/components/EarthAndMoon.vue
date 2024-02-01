<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <div ref="ThreeDimension" style="width: 70%" class="initial"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  mounted() {
    let scene, camera, renderer;
    let controls;
    let WIDTH = window.innerWidth / 1.3;
    let HEIGHT = window.innerHeight / 1.3;

    let earth, cloud, moon;

    const init = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(WIDTH, HEIGHT);
      this.$refs.ThreeDimension.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT, 0.1, 1000);
      camera.position.set(240, 60, 0);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 200;
      controls.maxDistance = 400;
      controls.enableDamping = true;

      const axes = new THREE.AxesHelper(150);
      const imageLoader = new THREE.TextureLoader();
      imageLoader.load(require("../assets/image/Albedo.jpg"), (data) => {
        const material_univ = new THREE.MeshBasicMaterial({
          map: data,
          side: THREE.FrontSide,
        });
        const geometry_univ = new THREE.SphereGeometry(80, 32, 32);
        earth = new THREE.Mesh(geometry_univ, material_univ);
        earth.rotation.x = 0.275;
        scene.add(earth);
      });

      const imgld_galaxy = new THREE.TextureLoader();
      imgld_galaxy.load(require("../assets/image/universe.jpg"), (data) => {
        const material_galaxy = new THREE.MeshBasicMaterial({
          map: data,
          side: THREE.BackSide,
        });
        const geometry_galaxy = new THREE.SphereGeometry(500, 32, 32);
        const galaxy = new THREE.Mesh(geometry_galaxy, material_galaxy);
        scene.add(galaxy);
      });

      const imgld_cloud = new THREE.TextureLoader();
      imgld_cloud.load(require("../assets/image/Clouds.png"), (data) => {
        const material_galaxy = new THREE.MeshBasicMaterial({
          map: data,
          side: THREE.FrontSide,
          transparent: true,
          opacity: 0.7
        });
        const geometry_galaxy = new THREE.SphereGeometry(80, 32, 32);
        const galaxy = new THREE.Mesh(geometry_galaxy, material_galaxy);
        earth.add(galaxy);
      });

      console.log(earth, moon, cloud);

      scene.add(axes);
      renderer.render(scene, camera);
    };

    const animate = () => {
      camera.lookAt(scene.position); // 장면의 위치를 바라봄
      camera.updateProjectionMatrix(); // 변경된 카메라 값을 적용
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    init();
    animate();
  },
};

Math.radians = (degrees) => {
  return (degrees * Math.PI) / 180;
};
</script>

<style>
</style>