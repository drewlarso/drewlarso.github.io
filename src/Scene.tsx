import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {
    Color,
    InstancedMesh,
    Matrix4,
    Mesh,
    Object3D,
    Raycaster,
    Vector2,
    type RGB,
} from 'three'

const Hexagons = () => {
    const planeMesh = useRef<Mesh>(null!)
    const hexMesh = useRef<InstancedMesh>(null!)

    const { camera, scene, gl } = useThree()
    const mouse = useRef(new Vector2())
    const raycaster = useRef(new Raycaster())

    const rows = 100
    const cols = 100
    const dummy = new Object3D()
    const dummyMatrix = new Matrix4()

    const hoverRadius = 55.0
    const hoverStrength = 0.25
    const radius = 1
    const width = radius * 1.732
    const xSpacing = width
    const zSpacing = radius * 1.5

    useEffect(() => {
        gl.domElement.addEventListener('mousemove', (event: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect()
            mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.current.y =
                -((event.clientY - rect.top) / rect.height) * 2 + 1
        })

        let i = 0
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * xSpacing
                let y = 0
                let z = row * zSpacing

                // alternate rows
                if (row % 2 === 1) {
                    x += xSpacing / 2
                    y = col % 2 ? 0.25 : 0
                } else {
                    y = col % 2 ? 0 : 0.25
                }

                // center in the world
                x -= (cols * xSpacing) / 2 - xSpacing / 2
                z -= (rows * zSpacing) / 2 - zSpacing / 2

                dummy.position.set(x, y, z)
                dummy.updateMatrix()
                hexMesh.current.setMatrixAt(i, dummy.matrix)
                i++
            }
        }
        hexMesh.current.instanceMatrix.needsUpdate = true
    })

    useFrame(() => {
        raycaster.current.setFromCamera(mouse.current, camera)
        if (planeMesh.current) {
            const intersects = raycaster.current.intersectObject(
                planeMesh.current
            )
            if (intersects[0]) {
                const point = intersects[0].point

                for (let i = 0; i < rows * cols; i++) {
                    hexMesh.current.getMatrixAt(i, dummyMatrix)
                    dummy.position.setFromMatrixPosition(dummyMatrix)
                    const distance = dummy.position.distanceTo(point)
                    dummy.position.y = 0
                    if (distance < hoverRadius) {
                        dummy.position.y =
                            -(hoverRadius - distance) * hoverStrength
                        hexMesh.current.setColorAt(
                            i,
                            new Color().lerpColors(
                                new Color('#7441ae'),
                                new Color('#b1e2e7'),
                                (hoverRadius * 0.75) / distance
                            )
                        )
                    } else {
                        hexMesh.current.setColorAt(i, new Color('#7441ae'))
                    }
                    dummy.updateMatrix()
                    hexMesh.current.setMatrixAt(i, dummy.matrix)
                }
            }
            hexMesh.current.instanceMatrix.needsUpdate = true
            if (hexMesh.current.instanceColor) {
                hexMesh.current.instanceColor.needsUpdate = true
            }
        }
    })

    return (
        <>
            <mesh ref={planeMesh} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshBasicMaterial visible={false} />
            </mesh>
            <instancedMesh
                ref={hexMesh}
                args={[undefined, undefined, rows * cols]}
            >
                <cylinderGeometry args={[radius, radius, 3, 6]} />
                <meshStandardMaterial color="#7441ae" flatShading={true} />
            </instancedMesh>
        </>
    )
}

const Scene = () => {
    const camera = useThree((state) => state.camera)

    useEffect(() => {
        camera.position.set(-3, 15, 10)
    })

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={0.1} />
            <directionalLight color="white" position={[5, 5, 5]} />
            <Hexagons />
        </>
    )
}

export default Scene
