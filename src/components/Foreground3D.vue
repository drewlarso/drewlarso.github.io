<script setup lang="ts">
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    WebGLRenderer,
} from 'three'
import { onMounted } from 'vue'

onMounted(() => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    const renderer = new WebGLRenderer({
        canvas: document.querySelector('#fg-three-canvas') as HTMLCanvasElement,
        alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const meteorMaterial = new MeshNormalMaterial({
        flatShading: true,
    })
    const meteor = new Mesh(new SphereGeometry(1), meteorMaterial)
    meteor.position.y = -1
    meteor.position.z = -1.3
    scene.add(meteor)

    const onScroll = () => {
        const t = document.body.getBoundingClientRect().top
        camera.position.y = t * 0.005
        meteor.rotation.y = t * 0.005
    }
    onScroll()
    document.body.onscroll = onScroll

    const animate = () => {
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
})
</script>

<template>
    <canvas id="fg-three-canvas" class="fixed left-0 top-0 z-[150]"></canvas>
</template>
