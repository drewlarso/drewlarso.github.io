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
            backgroundColor: 0x0d001a,
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
    private bgStars!: Phaser.GameObjects.Particles.ParticleEmitter
    private mgStars!: Phaser.GameObjects.Particles.ParticleEmitter
    private fgStars!: Phaser.GameObjects.Particles.ParticleEmitter

    private scrollY: number = 0

    constructor() {
        super('space-scene')
    }

    preload() {
        this.load.image('bg', 'bg.png')
        this.load.image('light', 'light_01.png')
        this.load.image('star', 'star_04.png')
    }

    create() {
        this.add
            .sprite(this.scale.width / 2, this.scale.height / 2, 'bg')
            .setOrigin(0.5)

        this.createSmoke()
        this.createStars()
        this.input.enabled = false
    }

    update(): void {
        const scrollDelta = window.scrollY - this.scrollY
        if (scrollDelta === 0) return
        this.scrollY = window.scrollY
        //hello
        const stars = [this.bgStars, this.mgStars, this.fgStars]
        stars.forEach((emitter) => {
            let parallaxValue = 0
            switch (emitter) {
                case this.bgStars:
                    parallaxValue = 0.1
                    break
                case this.mgStars:
                    parallaxValue = 0.25
                    break
                case this.fgStars:
                    parallaxValue = 0.5
                    break
            }

            if (!emitter) return
            emitter.forEachAlive((particle) => {
                particle.y -= scrollDelta * parallaxValue
            }, [])
        })
    }

    private createSmoke() {
        const LIFESPAN = 5000
        const MAXALIVEPARTICLES = 5
        const COLOR = 0x4f1446

        this.add.particles(0, 0, 'light', {
            scale: { min: 4, max: 5 },
            speed: { min: 0, max: 5 },
            lifespan: LIFESPAN,
            maxAliveParticles: MAXALIVEPARTICLES,
            frequency: LIFESPAN / MAXALIVEPARTICLES,
            color: [COLOR],
            alpha: {
                values: [0.0, 0.3, 0.3, 0.0],
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
        })
    }

    private createStars() {
        const LIFESPAN = 5000
        const MAXALIVEPARTICLES = 50
        const COLOR = 0x6e5181

        // dim
        this.bgStars = this.add
            .particles(0, 0, 'star', {
                scale: {
                    values: [0.0, 0.05, 0.05, 0.0],
                    interpolation: 'bezier',
                },
                speed: { min: 0, max: 10 },
                angle: { min: 0, max: 360 },
                rotate: { min: -180, max: 180 },
                lifespan: LIFESPAN,
                maxAliveParticles: MAXALIVEPARTICLES / 2,
                frequency: LIFESPAN / (MAXALIVEPARTICLES / 2),
                color: [COLOR],
                alpha: {
                    values: [0.0, 1.75, 1.5, 0.0],
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
            })
            .setDepth(1)

        // brighter
        this.mgStars = this.add
            .particles(0, 0, 'star', {
                scale: {
                    values: [0.0, 0.1, 0.1, 0.0],
                    interpolation: 'bezier',
                },
                speed: { min: 0, max: 8 },
                angle: { min: 0, max: 360 },
                rotate: { min: -180, max: 180 },
                lifespan: LIFESPAN,
                maxAliveParticles: MAXALIVEPARTICLES / 3,
                frequency: LIFESPAN / (MAXALIVEPARTICLES / 3),
                color: [COLOR],
                alpha: {
                    values: [0.0, 2, 1.8, 0.0],
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
            })
            .setDepth(1)

        // brightest
        this.fgStars = this.add
            .particles(0, 0, 'star', {
                scale: {
                    values: [0.0, 0.2, 0.2, 0.0],
                    interpolation: 'bezier',
                },
                speed: { min: 0, max: 8 },
                angle: { min: 0, max: 360 },
                rotate: { min: -180, max: 180 },
                lifespan: LIFESPAN,
                maxAliveParticles: MAXALIVEPARTICLES / 4,
                frequency: LIFESPAN / (MAXALIVEPARTICLES / 4),
                color: [COLOR],
                alpha: {
                    values: [0.0, 4, 3.6, 0.0],
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
            })
            .setDepth(1)
    }
}
