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
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  mounted() {
    let scene, camera, renderer;

    let width = window.innerWidth / 1.3;
    let height = window.innerHeight / 1.3;
    let controls;

    const init = () => {
      renderer = new Three.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000);
      this.$refs.ThreeDimension.appendChild(renderer.domElement);

      scene = new Three.Scene();
      camera = new Three.PerspectiveCamera(80, width / height, 0.1, 1000);
      camera.projectionMatrix.set(400, 250, 0);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 200;
      controls.maxDistance = 400;
      controls.enableDamping = true;

      const imageLoader = new Three.TextureLoader();
      imageLoader.load(require("@/assets/image/room.jpg"), (data) => {
        const material = new Three.MeshBasicMaterial({
          map: data,
          side: Three.BackSide,
          // side: Three.FrontSide,
        });
        const geometry = new Three.SphereGeometry(400, 32, 32);
        const roomMesh = new Three.Mesh(geometry, material);
        scene.add(roomMesh);
      });

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
</script>

<style scoped>
.initial {
  all: initial;
}
</style>