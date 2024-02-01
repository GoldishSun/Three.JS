<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <div ref="ThreeDimension" style="height: 500px"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as Three from 'three';
  export default {
    mounted(){
      const width = window.innerWidth / 1.3;
      const height = window.innerHeight / 1.3;
      const scene = new Three.Scene();
      const camera = new Three.PerspectiveCamera(
        100, // fov : 시야각 (가까이서 보냐, 멀리서 보냐) => 줌 또는 달리와 비슷함.
        width / height, // 종횡비
        0.1, // near : 카메라 시점으로부터 보이기 시작하는 지점 설정
        1000 // far : 카메라 시점으로부터 보이지 않는 지점 설정
      );

      const renderer = new Three.WebGLRenderer();
      renderer.setSize(width, height);
      this.$refs.ThreeDimension.appendChild(renderer.domElement);

      const geometry = new Three.BoxGeometry();
      // const material = new Three.MeshBasicMaterial({color: 0x00ff });
      const material = new Three.MeshLambertMaterial({color: 0x00FF00 });
      const cube = new Three.Mesh(geometry, material);
      scene.add(cube);

      const spotLight = new Three.SpotLight(0xffffff);

      spotLight.position.set(1, 2.5, 2.5);
      scene.add(spotLight);

      // const spotLightHelper = new Three.SpotLightHelper(spotLight);
      // scene.add(spotLightHelper);

      // const axes = new Three.AxesHelper(5, 5);
      // scene.add(axes);

      // const gridHelper = new Three.GridHelper(5, 10, 10);
      // scene.add(gridHelper);

      camera.position.z = 4;
      camera.position.x = 0;
      camera.position.y = 1;

      const speed = 0.01;
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += speed;
        cube.rotation.y += speed;
        cube.rotation.z += speed;
        renderer.render(scene, camera);
      }
      animate();
    }
  }
</script>

<style scoped>

</style>
