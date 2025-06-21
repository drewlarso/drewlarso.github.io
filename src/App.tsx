import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

function App() {
    return (
        <div className="w-screen, h-screen">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    )
}

export default App
