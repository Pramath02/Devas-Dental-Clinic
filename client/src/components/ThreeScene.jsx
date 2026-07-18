import { useEffect, useRef } from 'react';

export default function ThreeScene({ onLoaded }) {
  const loadedRef = useRef(false);
  const containerRef = useRef(null);
  const isMobileRef = useRef(
    typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Must be defined before try block so it's available to all exit paths
    function signalLoaded() {
      if (!loadedRef.current && onLoaded) {
        loadedRef.current = true;
        onLoaded();
      }
    }

    try {
      const THREE = window.THREE;
      if (!THREE || !THREE.GLTFLoader) {
        console.warn('THREE or GLTFLoader not loaded — skipping 3D scene');
        signalLoaded();
        return;
      }

      // Scene setup
      const scene = new THREE.Scene();
      const aspect = el.clientWidth / el.clientHeight;
      const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(isMobileRef.current ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      el.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0x443322, 0.4));
      scene.add(new THREE.AmbientLight(0x88bbff, 0.3));

      const mainLight = new THREE.DirectionalLight(0xffeedd, 1.2);
      mainLight.position.set(5, 8, 7);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x88ccff, 0.5);
      fillLight.position.set(-4, 2, 5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
      rimLight.position.set(-3, 4, -6);
      scene.add(rimLight);

      scene.add(new THREE.HemisphereLight(0xffeedd, 0x8899bb, 0.6));

      // Tooth group
      const toothGroup = new THREE.Group();
      toothGroup.position.y = -0.2;
      toothGroup.scale.set(isMobileRef.current ? 0.6 : 0.7, isMobileRef.current ? 0.6 : 0.7, isMobileRef.current ? 0.6 : 0.7);
      scene.add(toothGroup);

      // Load the GLB tooth model
      const loader = new THREE.GLTFLoader();
      loader.load(
        '/js/Meshy_AI_Ivory_Crest_0718133457_texture.glb',
        (gltf) => {
          const model = gltf.scene;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              const mat = child.material;
              if (mat) {
                mat.envMapIntensity = 1.5;
                if (mat.color) {
                  const c = mat.color;
                  if (c.r < 0.3 && c.g < 0.3 && c.b < 0.3) {
                    mat.color.setHex(0xf0e8d8);
                  }
                }
                if (mat.metalness > 0.8) mat.metalness = 0.3;
                if (mat.roughness < 0.1) mat.roughness = 0.3;
                mat.needsUpdate = true;
              }
            }
          });

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          toothGroup.add(model);

          const crown = createGoldCrown(THREE);
          const toothTopY = size.y / 2;
          crown.position.y = toothTopY + 0.25;
          crown.rotation.x = 0.05;
          crown.rotation.z = -0.03;
          toothGroup.add(crown);

          signalLoaded();
        },
        undefined,
        (error) => {
          console.warn('Failed to load GLB tooth model:', error);
          createProceduralTooth(THREE, toothGroup);
          signalLoaded();
        }
      );

      // Particles
      const particles = createParticleSystem(THREE, scene, isMobileRef.current);

      // Camera
      camera.position.set(0, 0.3, 3.5);
      camera.lookAt(0, 0, 0);

      // Mouse tracking
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;

      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      const onTouchMove = (e) => {
        if (e.touches.length > 0) {
          mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
          mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove, { passive: true });

      // Animation loop
      const clock = new THREE.Clock();
      let animId;

      function animate() {
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        targetRotX += (mouseY * 0.3 - targetRotX) * 0.05;
        targetRotY += (mouseX * 0.5 - targetRotY) * 0.05;

        toothGroup.rotation.y += delta * (isMobileRef.current ? 0.15 : 0.3);
        toothGroup.rotation.x = 0.1 + targetRotX * 0.15;
        toothGroup.rotation.z = -0.03 + targetRotY * 0.1;
        toothGroup.position.y = -0.2 + Math.sin(elapsed * 0.5) * 0.04;

        if (particles) {
          animateParticles(THREE, particles, delta, elapsed);
          particles.rotation.y += delta * 0.02;
        }

        renderer.render(scene, camera);
      }

      animate();

      // Resize
      const resizeObserver = new ResizeObserver(() => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(el);

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onTouchMove);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    } catch (e) {
      console.warn('Three.js scene error:', e);
      signalLoaded(); // Always release the loading screen, even if 3D crashes
    }
  }, []);

  return <div ref={containerRef} id="threejs-container" />;
}

function animateParticles(THREE, particles, delta, elapsed) {
  const pos = particles.geometry.attributes.position.array;
  const init = particles.userData?.initialPositions;
  const time = elapsed * 0.15;

  for (let i = 0; i < pos.length / 3; i++) {
    const i3 = i * 3;
    const seed = i * 0.5;
    if (init) {
      pos[i3] = init[i3] + Math.sin(time + seed) * 0.08;
      pos[i3 + 1] = init[i3 + 1] + Math.sin(time * 0.7 + seed * 0.3) * 0.06;
      pos[i3 + 2] = init[i3 + 2] + Math.cos(time * 0.5 + seed * 0.4) * 0.08;
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;
}

function createProceduralTooth(THREE, group) {
  const points = [
    new THREE.Vector2(0.0,  -0.55), new THREE.Vector2(0.09, -0.54),
    new THREE.Vector2(0.16, -0.5),  new THREE.Vector2(0.23, -0.44),
    new THREE.Vector2(0.28, -0.37), new THREE.Vector2(0.32, -0.3),
    new THREE.Vector2(0.34, -0.22), new THREE.Vector2(0.35, -0.14),
    new THREE.Vector2(0.34, -0.06), new THREE.Vector2(0.37,  0.02),
    new THREE.Vector2(0.42,  0.08), new THREE.Vector2(0.48,  0.15),
    new THREE.Vector2(0.52,  0.22), new THREE.Vector2(0.55,  0.3),
    new THREE.Vector2(0.57,  0.38), new THREE.Vector2(0.57,  0.46),
    new THREE.Vector2(0.54,  0.52), new THREE.Vector2(0.49,  0.56),
    new THREE.Vector2(0.44,  0.58), new THREE.Vector2(0.37,  0.59),
    new THREE.Vector2(0.28,  0.6),  new THREE.Vector2(0.18,  0.6),
    new THREE.Vector2(0.08,  0.6),  new THREE.Vector2(0.0,   0.6),
  ];

  const tooth = new THREE.Mesh(
    new THREE.LatheGeometry(points, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0xf5f0e8, metalness: 0.05, roughness: 0.25,
      clearcoat: 0.3, clearcoatRoughness: 0.4,
      reflectivity: 0.5, envMapIntensity: 1.0,
      thickness: 0.6, transmission: 0.06,
    })
  );
  tooth.castShadow = true;
  tooth.receiveShadow = true;
  tooth.rotation.x = 0.05;
  tooth.rotation.z = -0.03;
  group.add(tooth);

  const crown = createGoldCrown(THREE);
  crown.position.y = 1.0;
  crown.rotation.x = 0.05;
  crown.rotation.z = -0.03;
  group.add(crown);
}

function createGoldCrown(THREE) {
  const group = new THREE.Group();

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd700, metalness: 0.9, roughness: 0.15,
    clearcoat: 0.2, clearcoatRoughness: 0.2, envMapIntensity: 2.5,
  });

  const darkGoldMat = new THREE.MeshPhysicalMaterial({
    color: 0xdaa520, metalness: 0.85, roughness: 0.25,
    clearcoat: 0.1, envMapIntensity: 2.0,
  });

  const jewelMat = new THREE.MeshPhysicalMaterial({
    color: 0xff2244, metalness: 0.3, roughness: 0.1,
    clearcoat: 0.8, clearcoatRoughness: 0.1, envMapIntensity: 3.0,
  });

  const base = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.06, 16, 32), goldMat);
  base.rotation.x = Math.PI / 2;
  group.add(base);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.035, 12, 32), darkGoldMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.07;
  group.add(rim);

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const x = Math.sin(angle) * 0.45;
    const z = Math.cos(angle) * 0.45;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 8), goldMat);
    peak.position.set(x, 0.15, z);
    group.add(peak);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), goldMat);
    orb.position.set(x, 0.32, z);
    group.add(orb);
  }

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
    const x = Math.sin(angle) * 0.5;
    const z = Math.cos(angle) * 0.5;
    const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), jewelMat);
    jewel.position.set(x, 0.0, z);
    group.add(jewel);
  }

  return group;
}

function createParticleSystem(THREE, scene, isMobile) {
  const count = isMobile ? 60 : 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.userData = { initialPositions: positions.slice() };

  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(200,230,255,0.8)');
  g.addColorStop(1, 'rgba(200,230,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.06, map: new THREE.CanvasTexture(canvas),
      transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, opacity: 0.6, color: 0xc8d8e8,
    })
  );
  particles.userData = { initialPositions: positions.slice() };
  scene.add(particles);
  return particles;
}