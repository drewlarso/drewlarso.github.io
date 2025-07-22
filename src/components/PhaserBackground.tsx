import Phaser from 'phaser'
import { useEffect, useRef } from 'react'

export default function PhaserBackground() {
    const gameRef = useRef<Phaser.Game | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef) return

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 1920,
            height: 1080,
            backgroundColor: 0x01050c,
            parent: containerRef.current,
            scene: [SpaceScene],
            scale: {
                mode: Phaser.Scale.ENVELOP,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        }

        gameRef.current = new Phaser.Game(config)

        return () => {
            gameRef.current?.destroy(true)
            gameRef.current = null
        }
    }, [])

    return (
        <div
            className="fixed w-screen h-screen overflow-hidden -z-10"
            ref={containerRef}
        />
    )
}

class SpaceScene extends Phaser.Scene {
    constructor() {
        super('space-scene')
    }

    preload() {
        this.load.image('smoke1', 'smoke_04.png')
        this.load.image('smoke2', 'smoke_01.png')
        this.load.image('smoke3', 'smoke_08.png')

        this.load.image('star1', 'star_04.png')
    }

    create() {
        this.createSmoke()
        this.createStars()
        this.input.enabled = false
    }

    private createSmoke() {
        this.add.particles(0, 0, 'smoke1', {
            speed: { min: 50, max: 100 },
            scale: { min: 1.25, max: 1.75, ease: 'Quad.easeOut' },
            angle: { min: -180, max: 180 },
            rotate: { start: 0, end: 60, random: true },
            color: [0x1cb099],
            lifespan: { min: 8000, max: 12000 },
            alpha: {
                values: [0.0, 0.025, 0.025, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -100,
                    -100,
                    this.scale.width + 100,
                    this.scale.height + 100
                ),
                quantity: 1,
            },
            maxAliveParticles: 50,
            frequency: 10000 / 50,
            blendMode: 'SCREEN',
        })
        this.add.particles(0, 0, 'smoke2', {
            speed: { min: 10, max: 20 },
            scale: { min: 1.6, max: 2.8, ease: 'Quad.easeOut' },
            angle: { min: -180, max: 180 },
            rotate: { start: 0, end: 60, random: true },
            color: [0x0b586e],
            lifespan: { min: 5000, max: 15000 },
            alpha: {
                values: [0.0, 0.025, 0.1, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -100,
                    -100,
                    this.scale.width + 100,
                    this.scale.height + 100
                ),
                quantity: 1,
            },
            maxAliveParticles: 35,
            frequency: 18000 / 35,
            blendMode: 'SCREEN',
        })
        this.add.particles(0, 0, 'smoke3', {
            speed: { min: 5, max: 10 },
            scale: { min: 1.6, max: 3.8, ease: 'Quad.easeOut' },
            angle: { min: -180, max: 180 },
            rotate: { start: 0, end: 60, random: true },
            color: [0x051e45],
            lifespan: { min: 5000, max: 10000 },
            alpha: {
                values: [0.0, 0.1, 0.05, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -100,
                    -100,
                    this.scale.width + 100,
                    this.scale.height + 100
                ),
                quantity: 1,
            },
            maxAliveParticles: 15,
            frequency: 7000 / 15,
            blendMode: 'SCREEN',
        })
    }

    private createStars() {
        this.add.particles(0, 0, 'star1', {
            speed: { min: 2, max: 3 },
            scale: { min: 0.025, max: 0.075 },
            color: [0xffffff],
            lifespan: { min: 2000, max: 8000 },
            alpha: {
                values: [0.0, 0.5, 0.5, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -100,
                    -100,
                    this.scale.width + 100,
                    this.scale.height + 100
                ),
                quantity: 1,
            },
            maxAliveParticles: 100,
            frequency: 10000 / 100,
            blendMode: 'SCREEN',
        })
        this.add.particles(0, 0, 'star1', {
            speed: { min: 0, max: 3 },
            scale: { min: 0.01, max: 0.0125 },
            color: [0xddddff],
            lifespan: { min: 6000, max: 12000 },
            alpha: {
                values: [0.0, 1.0, 2.5, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -100,
                    -100,
                    this.scale.width + 100,
                    this.scale.height + 100
                ),
                quantity: 1,
            },
            maxAliveParticles: 1000,
            frequency: 9000 / 1000,
            blendMode: 'SCREEN',
        })
    }
}
