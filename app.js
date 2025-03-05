import * as THREE from 'three';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane to represent the window (shift it back so it's visible)
const geometry = new THREE.PlaneGeometry(10, 15);
const material = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.position.z = -5; // Move it back so it's in front of the camera
scene.add(plane);

// Position the camera
camera.position.z = 10;

const raindrops = [];

// Function to create raindrops
function createRaindrop() {
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
  const raindrop = new THREE.Mesh(geometry, material);

  raindrop.position.x = Math.random() * 10 - 5;
  raindrop.position.y = Math.random() * 10 - 2;
  raindrop.position.z = -4; // Place it in front of the plane

  scene.add(raindrop);
  raindrops.push(raindrop);
}

// Create multiple raindrops before starting animation
for (let i = 0; i < 50; i++) {
  createRaindrop();
}


// Function to merge raindrops
function mergeRaindrops() {
  for (let i = 0; i < raindrops.length; i++) {
    for (let j = i + 1; j < raindrops.length; j++) {
      const raindropA = raindrops[i];
      const raindropB = raindrops[j];

      const dist = raindropA.position.distanceTo(raindropB.position);

      if (dist < 0.2) {
        raindropA.scale.x += 0.1;
        raindropA.scale.y += 0.1;
        raindropA.scale.z += 0.1;

        scene.remove(raindropB);
        raindrops.splice(j, 1);
        j--;
      }
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  raindrops.forEach(raindrop => {
    raindrop.position.y -= 0.05;
    if (raindrop.position.y < -7) {
      raindrop.position.y = Math.random() * 10 + 3;
    }
  });

  mergeRaindrops();
  renderer.render(scene, camera);
}

// Start animation loop **after** creating raindrops
animate();