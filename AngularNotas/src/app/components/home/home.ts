// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.html',
//   styleUrl: './home.css'
// })
// export class Home {

// }
import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [RouterLink]
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.init3D();
      this.animateText();
    };
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  mixers: THREE.AnimationMixer[] = [];
  clock = new THREE.Clock();


  init3D() {
    const canvas = document.getElementById('scene') as HTMLCanvasElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // camera.position.set(-3, -2, 5);
    camera.position.set(0, 1.4, 5);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Cargar lápiz 3D
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer;


    loader.load('/assets/hazel_pencil_run.glb', (gltf: any) => {
      const model = gltf.scene;



      const rotTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      rotTl.to(model.rotation, { y: Math.PI * -0.5, duration: 1 }); // giro en Y
      // rotTl.to(model.rotation, { x: Math.PI, duration: 1 });     // luego giro en X


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      tl.to(model.position, { x: 2, y: 0.5, duration: 1 });   // centro → esquina inferior derecha
      tl.to(model.position, { x: 2, y: 1, duration: 1 });  // esquina inferior derecha → esquina inferior izquierda



      // Normalizar tamaño automáticamente
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxAxis = Math.max(size.x, size.y, size.z);
      const scaleFactor = 1 / maxAxis; // ajusta a "1" de tamaño
      model.scale.setScalar(scaleFactor * 2); // multiplica *2 si quieres más grande

      // Centrarlo
      box.getCenter(model.position).multiplyScalar(-1);

      scene.add(model);

      // Si trae animaciones
      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip: THREE.AnimationClip) => {
          mixer.clipAction(clip).play();
        });

        // Guardar el mixer para animar en el render loop
        this.mixers.push(mixer);
      }
    });



    const animate = () => {
      requestAnimationFrame(animate);

      const delta = this.clock.getDelta();
      this.mixers.forEach(mixer => mixer.update(delta));

      renderer.render(scene, camera);
    };
    animate();



    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animateText() {
    const elementos = gsap.utils.toArray<HTMLElement>(".headline, .subtext, .reveal");

    if (!elementos || elementos.length === 0) {
      console.warn("No se encontraron elementos para animar");
      return;
    }

    elementos.forEach((el: HTMLElement) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        clipPath: "inset(0 100% 0 0)", // empieza oculto
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });

      // Animación de entrada real
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        clipPath: "inset(0 0% 0 0)", // se revela
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }


}
