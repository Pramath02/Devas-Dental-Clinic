/**
 * Procedural 3D Tooth Model — Classic Tooth Emoji 🦷
 * Recreates the familiar tooth emoji silhouette in 3D
 * with a golden crown 👑 hovering above it
 */
const THREE = window.THREE;

/**
 * Creates a tooth that matches the 🦷 emoji silhouette
 * — flat top, bulging crown, narrow neck, blunt rounded root
 */
export function createTooth() {
    const group = new THREE.Group();

    // ============================================================
    // TOOTH BODY — Emoji silhouette via LatheGeometry
    // ============================================================
    const points = [
        // Root tip — blunt and rounded like the emoji
        new THREE.Vector2(0.0,  -0.55),
        new THREE.Vector2(0.09, -0.54),
        new THREE.Vector2(0.16, -0.5),
        new THREE.Vector2(0.23, -0.44),
        // Root body
        new THREE.Vector2(0.28, -0.37),
        new THREE.Vector2(0.32, -0.3),
        new THREE.Vector2(0.34, -0.22),
        // Neck — narrowest point
        new THREE.Vector2(0.35, -0.14),
        new THREE.Vector2(0.34, -0.06),
        // Crown — expanding from neck
        new THREE.Vector2(0.37,  0.02),
        new THREE.Vector2(0.42,  0.08),
        new THREE.Vector2(0.48,  0.15),
        new THREE.Vector2(0.52,  0.22),
        new THREE.Vector2(0.55,  0.3),
        // Widest part
        new THREE.Vector2(0.57,  0.38),
        new THREE.Vector2(0.57,  0.46),
        // Top edge
        new THREE.Vector2(0.54,  0.52),
        new THREE.Vector2(0.49,  0.56),
        // Top surface — nearly flat
        new THREE.Vector2(0.44,  0.58),
        new THREE.Vector2(0.37,  0.59),
        new THREE.Vector2(0.28,  0.6),
        new THREE.Vector2(0.18,  0.6),
        new THREE.Vector2(0.08,  0.6),
        new THREE.Vector2(0.0,   0.6),
    ];

    const toothGeometry = new THREE.LatheGeometry(points, 48, 0, Math.PI * 2);

    const toothMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xf5f0e8),
        emissive: new THREE.Color(0x000000),
        metalness: 0.05,
        roughness: 0.25,
        clearcoat: 0.3,
        clearcoatRoughness: 0.4,
        reflectivity: 0.5,
        envMapIntensity: 1.0,
        thickness: 0.6,
        transmission: 0.06,
    });

    const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
    tooth.castShadow = true;
    tooth.receiveShadow = true;
    tooth.rotation.x = 0.05;
    tooth.rotation.z = -0.03;
    group.add(tooth);

    // ============================================================
    // OCCLUSAL CUSPS — 4 subtle rounded bumps
    // ============================================================
    const cuspMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xf2ede5),
        roughness: 0.25,
        metalness: 0.04,
        clearcoat: 0.15,
        envMapIntensity: 0.6,
    });

    const cuspRadius = 0.16;
    const cuspY = 0.56;
    const spread = 0.27;

    [
        [ spread,  spread],
        [-spread,  spread],
        [ spread, -spread],
        [-spread, -spread],
    ].forEach(([x, z]) => {
        const cuspGeo = new THREE.SphereGeometry(cuspRadius, 10, 8);
        const cusp = new THREE.Mesh(cuspGeo, cuspMaterial);
        cusp.position.set(x, cuspY, z);
        cusp.scale.set(1.0, 0.45, 1.0);
        cusp.castShadow = true;
        cusp.receiveShadow = true;
        cusp.rotation.x = 0.05;
        cusp.rotation.z = -0.03;
        group.add(cusp);
    });

    // ============================================================
    // GOLDEN CROWN 👑 — hovering above the tooth
    // ============================================================
    const crown = createGoldCrown();
    // Position it above the tooth with a visible gap
    crown.position.y = 1.0;  // hovers above the tooth top (tooth top is at y=0.6)
    // Match the tooth's slight rotation so it stays aligned
    crown.rotation.x = 0.05;
    crown.rotation.z = -0.03;
    group.add(crown);

    return group;
}

// ============================================================
// GOLD CROWN BUILDER 👑
// ============================================================
function createGoldCrown() {
    const group = new THREE.Group();

    const goldMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffd700),
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 0.2,
        clearcoatRoughness: 0.2,
        envMapIntensity: 2.5,
    });

    const darkGoldMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xdaa520),
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: 0.1,
        envMapIntensity: 2.0,
    });

    const jewelMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xff2244),
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        envMapIntensity: 3.0,
    });

    // --- Base band (torus) ---
    const base = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.06, 16, 32),
        goldMat
    );
    base.rotation.x = Math.PI / 2;
    group.add(base);

    // --- Bottom rim ---
    const rim = new THREE.Mesh(
        new THREE.TorusGeometry(0.53, 0.035, 12, 32),
        darkGoldMat
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.07;
    group.add(rim);

    // --- Crown points (5 triangular peaks) ---
    const numPoints = 5;
    const peakHeight = 0.3;
    const peakBaseRadius = 0.06;
    const orbitRadius = 0.45;

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const x = Math.sin(angle) * orbitRadius;
        const z = Math.cos(angle) * orbitRadius;

        // Cone-shaped peak
        const peak = new THREE.Mesh(
            new THREE.ConeGeometry(peakBaseRadius, peakHeight, 8),
            goldMat
        );
        peak.position.set(x, peakHeight / 2, z);
        group.add(peak);

        // Small orb on tip
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 8, 8),
            goldMat
        );
        orb.position.set(x, peakHeight + 0.02, z);
        group.add(orb);
    }

    // --- Jewels on the base band ---
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
        const x = Math.sin(angle) * 0.5;
        const z = Math.cos(angle) * 0.5;

        const jewel = new THREE.Mesh(
            new THREE.SphereGeometry(0.025, 8, 8),
            jewelMat
        );
        jewel.position.set(x, 0.0, z);
        group.add(jewel);
    }

    return group;
}

/**
 * Creates a simplified tooth for use in smaller scenes
 */
export function createSimpleTooth() {
    const points = [
        new THREE.Vector2(0.0,  -0.5),
        new THREE.Vector2(0.1,  -0.48),
        new THREE.Vector2(0.2,  -0.4),
        new THREE.Vector2(0.3,  -0.25),
        new THREE.Vector2(0.35, -0.1),
        new THREE.Vector2(0.36,  0.0),
        new THREE.Vector2(0.4,   0.1),
        new THREE.Vector2(0.48,  0.2),
        new THREE.Vector2(0.52,  0.35),
        new THREE.Vector2(0.5,   0.48),
        new THREE.Vector2(0.44,  0.52),
        new THREE.Vector2(0.32,  0.54),
        new THREE.Vector2(0.18,  0.55),
        new THREE.Vector2(0.0,   0.55),
    ];

    const geometry = new THREE.LatheGeometry(points, 20);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xf5f0e8,
        roughness: 0.3,
        metalness: 0.05,
        clearcoat: 0.2,
    });

    const tooth = new THREE.Mesh(geometry, material);
    return tooth;
}