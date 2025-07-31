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
            transparent: true,
            parent: containerRef.current,
            scene: [SpaceScene],
            physics: {
                default: 'matter',
                matter: {
                    gravity: { x: 0, y: 0 },
                    // debug: true,
                },
            },
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
    private smoke!: Phaser.GameObjects.Particles.ParticleEmitter

    private scrollX: number = 0
    private scrollY: number = 0
    private attractorY: number = 0
    private attractor!: Phaser.Physics.Matter.Image

    constructor() {
        super('space-scene')
    }

    preload() {
        this.load.image('bg', 'bg.png')
        this.load.image('light', 'light_01.png')
        this.load.image('star', 'star_04.png')
        this.load.image('comet', 'comet.png')
    }

    create() {
        // this.add
        //     .sprite(this.scale.width / 2, this.scale.height / 2, 'bg')
        //     .setOrigin(0.5)

        this.createSmoke()
        this.createStars()
        this.input.enabled = false

        // this.attractorY = this.scale.height / 2
        // const cometCount = 10
        // for (let i = 0; i < cometCount; i++) {
        //     const side = Phaser.Math.Between(0, 3)
        //     let x = 0
        //     let y = 0
        //     if (side === 0) {
        //         // left
        //         x = Phaser.Math.Between(-1000, -100)
        //         y = Phaser.Math.Between(0, this.scale.height)
        //     } else if (side === 1) {
        //         // top
        //         x = Phaser.Math.Between(0, this.scale.width)
        //         y = Phaser.Math.Between(-1000, -100)
        //     } else if (side === 2) {
        //         // right
        //         x = this.scale.width + Phaser.Math.Between(1000, 100)
        //         y = Phaser.Math.Between(0, this.scale.height)
        //     } else if (side === 3) {
        //         // bottom
        //         x = Phaser.Math.Between(0, this.scale.width)
        //         y = this.scale.height + Phaser.Math.Between(1000, 100)
        //     }

        //     this.matter.add
        //         .image(x, y, 'comet', 0, {
        //             mass: Phaser.Math.Between(10, 25),
        //         })
        //         .setScale(Phaser.Math.FloatBetween(0.2, 0.3))
        //         .setDepth(10)
        // }

        // this.attractor = this.matter.add
        //     .image(this.scale.width / 2, this.scale.height / 2, 'light', 0, {
        //         shape: { type: 'circle', radius: 196 },
        //         // @ts-expect-error attractors do exist
        //         attractors: [
        //             // @ts-expect-error types?
        //             (bodyA, bodyB) => ({
        //                 x: (bodyA.position.x - bodyB.position.x) * 0.000001,
        //                 y: (bodyA.position.y - bodyB.position.y) * 0.000001,
        //             }),
        //         ],
        //         isStatic: true,
        //         isSensor: true,
        //     })
        //     .setScale(0.1)
    }

    update(): void {
        // update(_time: number): void {
        // this.attractor.setPosition(
        //     this.scale.width / 2,
        //     this.attractorY + Math.sin(time / 1000) * 50
        // )

        const scrollDelta = window.scrollY - this.scrollY
        if (scrollDelta === 0) return
        this.scrollY = window.scrollY
        this.scrollX = window.scrollX

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
        const MAXALIVEPARTICLES = 4
        const PURPLE = 0x380d4a

        this.smoke = this.add.particles(0, 0, 'light', {
            scale: { min: 4, max: 5 },
            speed: { min: 0, max: 5 },
            lifespan: LIFESPAN,
            maxAliveParticles: MAXALIVEPARTICLES,
            frequency: LIFESPAN / MAXALIVEPARTICLES,
            color: [PURPLE],
            alpha: {
                values: [0.0, 0.6, 0.1, 0.0],
                interpolation: 'bezier',
            },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    -500,
                    -500,
                    this.scale.width + 500,
                    this.scale.height + 500
                ),
                quantity: 1,
            },
        })
    }

    private createStars() {
        const LIFESPAN = 5000
        const MAXALIVEPARTICLES = 100
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
                    values: [0.0, 0.15, 0.15, 0.0],
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
