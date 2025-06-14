<script setup lang="ts">
import {
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer,
} from 'three'
import { onMounted, render } from 'vue'

onMounted(() => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    const renderer = new WebGLRenderer({
        canvas: document.querySelector('#bg-three-canvas') as HTMLCanvasElement,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const textureLoader = new TextureLoader()
    const skyTexture = textureLoader.load('/bg.png')
    const skySphereMaterial = new MeshBasicMaterial({ map: skyTexture })
    const sphereGeometry = new SphereGeometry(500)
    sphereGeometry.applyMatrix4(new Matrix4().makeScale(-1, 1, 1))
    const skySphere = new Mesh(sphereGeometry, skySphereMaterial)
    scene.add(skySphere)

    const animate = () => {
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
})
</script>

<template>
    <canvas id="bg-three-canvas" class="fixed left-0 top-0"></canvas>
</template>
