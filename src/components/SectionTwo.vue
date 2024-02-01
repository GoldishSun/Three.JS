<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <div ref="ThreeDimension" class="initial"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
Math.radians = (degrees) => {
  return (degrees * Math.PI) / 180;
};
export default {
  mounted() {
    let width = window.innerWidth / 1.3;
    let height = window.innerHeight / 1.3;

    let halfWidth = width / 2;
    let halfHeight = height / 2;

    let mouseX = 0,
      mouseY = 0;
    let targetX = 0,
      targetY = 0;

    const carGroup = new Three.Group();
    const wheel_front_Group = new Three.Group();
    const wheel_back_Group = new Three.Group();

    let isHelpful = true;
    let scene, camera, renderer;

    const init = () => {
      scene = new Three.Scene();
      camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(50, 50, 50);
      renderer = new Three.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x0e2255);
      this.$refs.ThreeDimension.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = 10;
      // controls.enablePan = false;
      // controls.enableZoom = false;
      controls.enableDamping = true;

      if (isHelpful) {
        const axes = new Three.AxesHelper(50);
        scene.add(axes);

        const gridHelper = new Three.GridHelper(70, 20);
        scene.add(gridHelper);
      }

      //조명
      const light = new Three.DirectionalLight(0xffffff, 3);
      light.position.set(20, 50, 50);
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);

      const helper = new Three.DirectionalLightHelper(light, 3);
      scene.add(helper);
      // const HemisphereLight = new Three.HemisphereLight(0xc0daf5, 0xc0daf5, 5);
      // HemisphereLight.position.set(-50, 50, -50);
      // scene.add(HemisphereLight);
      // const ambientLight = new Three.AmbientLight(0xffffff, 2);
      // scene.add(ambientLight);
      // const spotLight = new Three.SpotLight(0xffffff);
      // spotLight.position.set(60, 60, 60);
      // scene.add(spotLight);

      const gmty = new Three.BoxGeometry(20, 12, 30);
      const mtrl = new Three.MeshLambertMaterial({
        color: 0xffd400,
        wireframe: false,
      });
      const box = new Three.Mesh(gmty, mtrl);

      const gmty_top = new Three.BoxGeometry(14, 8, 20);
      const box_top = new Three.Mesh(gmty_top, mtrl);
      box_top.position.set(0, 10, -2);

      const gmtl_cylinder = new Three.CylinderGeometry(5, 5, 3, 10);
      const mtrl_cylinder = new Three.MeshBasicMaterial({ color: 0x000000 });

      const wheel = new Three.Mesh(gmtl_cylinder, mtrl_cylinder);
      wheel.rotateZ(Math.radians(90));

      const wheel_front_L = wheel.clone();
      wheel_front_L.position.x = -12;
      wheel_front_Group.add(wheel_front_L);
      const wheel_front_R = wheel.clone();
      wheel_front_R.position.x = 12;
      wheel_front_Group.add(wheel_front_R);
      wheel_front_Group.position.set(0, -4, 8);
      //앞바퀴

      const wheel_back_L = wheel.clone();
      wheel_back_L.position.x = -12;
      wheel_back_Group.add(wheel_back_L);
      const wheel_back_R = wheel.clone();
      wheel_back_R.position.x = 12;
      wheel_back_Group.add(wheel_back_R);
      wheel_back_Group.position.set(0, -4, -8);
      //뒷바퀴

      carGroup.add(box, box_top, wheel, wheel_front_Group, wheel_back_Group);
      scene.add(carGroup);
    };

    let keyCode = 0;
    let keyDownChk = false;

    const animate = () => {
      if (keyDownChk) {
        if (keyCode == "ArrowUp" || keyCode == 38) {
          carGroup.position.z = carGroup.position.z + 1;
          wheel_front_Group.children.forEach((item) => {
            item.rotation.x = item.rotation.x + 0.1;
          });
          wheel_back_Group.children.forEach((item) => {
            item.rotation.x = item.rotation.x + 0.1;
          });
        } else if (keyCode == "ArrowDown" || keyCode == 40) {
          carGroup.position.z = carGroup.position.z - 1;
          wheel_front_Group.children.forEach((item) => {
            item.rotation.x = item.rotation.x - 0.1;
          });
          wheel_back_Group.children.forEach((item) => {
            item.rotation.x = item.rotation.x - 0.1;
          });
        }
      }

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      if (carGroup) {
        carGroup.rotation.y += 0.05 * (targetX - carGroup.rotation.y);
        carGroup.rotation.x += 0.05 * (targetY - carGroup.rotation.x);
      }

      camera.lookAt(scene.position); // 장면의 위치를 바라봄
      camera.updateProjectionMatrix(); // 변경된 카메라 값을 적용
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const stageResize = () => {
      width = window.innerWidth / 1.3;
      height = window.innerHeight / 1.3;

      halfWidth = width / 2;
      halfHeight = height / 2;

      renderer.setSize(width, height);
      camera.aspect = width / height;
    };

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX - halfWidth;
      mouseY = event.clientY - halfHeight;
    };

    const onDocumentKeyDown = (event) => {
      keyCode = event.key || event.keyCode;
      keyDownChk = true;
    };

    const onDocumentKeyUp = () => {
      keyDownChk = false;
    };

    init();
    animate();
    document.addEventListener("mousemove", onDocumentMouseMove);
    document.addEventListener("keydown", onDocumentKeyDown);
    document.addEventListener("keyup", onDocumentKeyUp);
    window.addEventListener("resize", stageResize);
  },
};
</script>

<style scoped>
.initial {
  all: initial;
}
</style>
