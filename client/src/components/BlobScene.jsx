import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';
import { useCarouselContext } from '../context/contextProvider';
import Loader from './Loader';
import GUI from 'lil-gui';


const blobs = [
    {
        name: 'Color Fusion',
        background: '#75BCC6',
        config: {
            uPositionFrequency: 1.22,
            uPositionStrength: 0.55,
            uSmallWavePositionFrequency: 2.4,//multiple tips
            uSmallWavePositionStrength: 0.14,//height of tips
            roughness: 1,
            metalness: 1,
            envMapIntensity: 0.5,
            clearcoat: 0,
            clearcoatRoughness: 0,
            transmission: 0,
            flatShading: false,
            wireframe: false,
            map: 'cosmic-fusion'
        }
    },
    {
        name: 'Purple Mirror',
        background: '#5300B1',
        config: { "uPositionFrequency": 0.584, "uPositionStrength": 0.276, "uSmallWavePositionFrequency": 0.899, "uSmallWavePositionStrength": 1.266, "roughness": 0, "metalness": 1, "envMapIntensity": 2, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "purple-rain" },
    },
    {
        name: 'Alien Goo',
        background: '#45ACD8',
        config: { "uPositionFrequency": 4.53, "uPositionStrength": 2, "uSmallWavePositionFrequency": .16, "uSmallWavePositionStrength": 0.14, "roughness": 0, "metalness": 1, "envMapIntensity": 2, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "lucky-day" },
    },
    {
        name: 'some Goo',
        background: '#F186B7',
        config: {
            uPositionFrequency: 7.13,
            uPositionStrength: 0.06,
            uSmallWavePositionFrequency: 0.7,
            uSmallWavePositionStrength: 0.94,
            roughness: 0.292,
            metalness: 0.73,
            envMapIntensity: 0.86,
            clearcoat: 1,
            clearcoatRoughness: 0,
            transmission: 0,
            flatShading: false,
            wireframe: false,
            map: 'rainbow'
        }
    }
];

const BlobScene = () => {
    const canvasRef = useRef();
    const sceneRef = useRef(null);
    const meshRef = useRef(null);
    const uniformsRef = useRef(null);
    const materialRef = useRef(null);
    const guiRef = useRef(null);

    const { backgroundColor, activeIndex, setLoading, loading, showGui } = useCarouselContext();
    const previousIndexRef = useRef(activeIndex);


    useEffect(() => {
        setLoading(true);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;

        const textureLoader = new THREE.TextureLoader();
        const rgbeLoader = new RGBELoader();

        const currentBlob = blobs[activeIndex % blobs.length];
        const uniforms = {
            uTime: { value: 0 },
            uPositionFrequency: { value: currentBlob.config.uPositionFrequency },
            uPositionStrength: { value: currentBlob.config.uPositionStrength },
            uTimeFrequency: { value: 0.3 },
            uSmallWavePositionFrequency: { value: currentBlob.config.uSmallWavePositionFrequency },
            uSmallWavePositionStrength: { value: currentBlob.config.uSmallWavePositionStrength },
            uSmallWaveTimeFrequency: { value: 0.3 }
        };

        const material = new CustomShaderMaterial({
            baseMaterial: THREE.MeshPhysicalMaterial,
            vertexShader,
            fragmentShader,
            uniforms,
            map: textureLoader.load(`/gradients/${currentBlob.config.map}.png`),
            metalness: currentBlob.config.metalness,
            roughness: currentBlob.config.roughness,
            envMapIntensity: currentBlob.config.envMapIntensity,
            clearcoat: currentBlob.config.clearcoat,
            clearcoatRoughness: currentBlob.config.clearcoatRoughness,
            transmission: currentBlob.config.transmission,
            flatShading: currentBlob.config.flatShading,
            wireframe: currentBlob.config.wireframe
        });

        const geometry = mergeVertices(new THREE.IcosahedronGeometry(1, 70));
        geometry.computeTangents();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        meshRef.current = mesh;
        uniformsRef.current = uniforms;
        materialRef.current = material;

        rgbeLoader.load(
            'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr',
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
                setLoading(false);
            }
        );

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        };

        animate();
        // Debug GUI
        const gui = new GUI({ width: 300 });
        gui.domElement.style.display = 'none';
        guiRef.current = gui;

        gui.add(uniforms.uPositionFrequency, 'value')
            .name('Position Frequency')
            .min(0).max(10).step(0.01);

        gui.add(uniforms.uPositionStrength, 'value')
            .name('Position Strength')
            .min(0).max(2).step(0.01);

        gui.add(uniforms.uSmallWavePositionFrequency, 'value')
            .name('Wave Frequency')
            .min(0).max(5).step(0.01);

        gui.add(uniforms.uSmallWavePositionStrength, 'value')
            .name('Wave Strength')
            .min(0).max(2).step(0.01);


        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            gui.destroy(); // Clean up GUI
        };
    }, []);

    useEffect(() => {
        const blob = blobs[activeIndex % blobs.length];
        const textureLoader = new THREE.TextureLoader();

        if (!sceneRef.current || !meshRef.current || !materialRef.current || !uniformsRef.current) return;

        sceneRef.current.background = new THREE.Color(blob.background);

        const uniforms = uniformsRef.current;
        uniforms.uPositionFrequency.value = blob.config.uPositionFrequency;
        uniforms.uPositionStrength.value = blob.config.uPositionStrength;
        uniforms.uSmallWavePositionFrequency.value = blob.config.uSmallWavePositionFrequency;
        uniforms.uSmallWavePositionStrength.value = blob.config.uSmallWavePositionStrength;

        const mat = materialRef.current;
        mat.metalness = blob.config.metalness;
        mat.roughness = blob.config.roughness;
        mat.envMapIntensity = blob.config.envMapIntensity;
        mat.clearcoat = blob.config.clearcoat;
        mat.clearcoatRoughness = blob.config.clearcoatRoughness;
        mat.transmission = blob.config.transmission;
        mat.flatShading = blob.config.flatShading;
        mat.wireframe = blob.config.wireframe;
        mat.map = textureLoader.load(`/gradients/${blob.config.map}.png`);
        mat.needsUpdate = true;

        // ✅ Smooth Rotation Animation
        const mesh = meshRef.current;
        const prevIndex = previousIndexRef.current;
        const direction = activeIndex > prevIndex ? -1 : 1;

        const rotationAmount = Math.PI / 2 * direction;
        const startRotation = mesh.rotation.y;
        const targetRotation = startRotation + rotationAmount;

        const duration = 400; // in ms
        let startTime = null;

        const animateRotation = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            mesh.rotation.y = THREE.MathUtils.lerp(startRotation, targetRotation, easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateRotation);
            }
        };

        requestAnimationFrame(animateRotation);

        previousIndexRef.current = activeIndex;
    }, [activeIndex]);
    // 👇 Button to show GUI
    // ✅ Respond to showGui toggle
    useEffect(() => {
        if (guiRef.current) {
            guiRef.current.domElement.style.display = showGui ? 'block' : 'none';
        }
    }, [showGui]);


    return (
        <>
            {loading && (
                <Loader />
            )}
            <canvas ref={canvasRef} className="w-full h-full" />

        </>
    );
};

export default BlobScene;
