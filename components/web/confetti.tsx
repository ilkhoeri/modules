"use client";
import { forwardRef } from "react";
import { mergeRefs } from "@/hooks/use-merged-ref";
import { useEffect, useRef, useState } from "react";

const DEFAULT_COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

interface Vector {
  x: number;
  y: number;
}

interface Born {
  span: number;
  time: number;
}

interface ParticleProps {
  position: Vector;
  velocity: Vector;
  gravity: Vector;
  friction: number;
  size: number;
  shape: number;
  color: string;

  // ...
  opacity: number;
  lifespan: number;
  lifeTime: number;
  bornTime: Born;
}

class Particle {
  position: Vector;
  velocity: Vector;
  gravity: Vector;
  friction: number;
  size: number;
  shape: number;
  color: string;

  // ...
  opacity: number;
  bornTime: Born;
  lifespan: number;
  lifeTime: number;

  constructor(parent: ParticleProps) {
    this.position = { ...parent.position };
    this.velocity = { ...parent.velocity };
    this.gravity = { ...parent.gravity };
    this.friction = parent.friction;
    this.size = parent.size;
    this.shape = parent.shape;
    this.color = parent.color;

    this.bornTime = { ...parent.bornTime };
    // ...
    this.opacity = 1;
    this.bornTime.span = Date.now();

    this.lifespan = parent.lifespan;
    this.lifeTime = parent.lifeTime;
  }

  reset() {
    this.bornTime.time = Date.now();
    this.position.y = -Math.random() * 80;
    this.position.x = Math.random() * window.innerWidth;
    this.velocity = { x: Math.random() * 6 - 3, y: Math.random() * 8 - 10 };
  }

  draw(ctx: CanvasRenderingContext2D) {
    const currentTime = Date.now();
    const age = currentTime - this.bornTime.span;

    // Calculates opacity based on age
    if (age < this.lifespan) {
      this.opacity = 1 - age / this.lifespan;
    } else {
      this.opacity = 0;
    }

    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.x * 0.2);
    ctx.scale(1, Math.sin(this.velocity.y * 0.2));
    ctx.fillStyle = this.color;

    if (this.shape === 0) {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size / 2, this.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  integrate() {
    // Manual implementation of vector operations
    this.velocity.x += this.gravity.x;
    this.velocity.y += this.gravity.y;
    // set the slope
    // this.velocity.x += Math.cos(this.velocity.y * 0.1) * 0.05;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y > window.innerHeight ||
      this.position.x < 0 ||
      this.position.x > window.innerWidth + 10
    ) {
      this.reset();
    }

    if (Date.now() - this.bornTime.span > this.lifeTime) {
      this.reset();
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.integrate();
    this.draw(ctx);
    const lifeRatio = Math.min(
      1,
      (Date.now() - this.bornTime.span) / this.lifeTime
    );
    ctx.globalAlpha = 1 - lifeRatio;
    // ...
    ctx.restore();
    // return to normal alpha
    ctx.globalAlpha = 1;
  }
}

interface ParticleSystemProps {
  maxParticles: number;
  gravity: { x: number; y: number };

  lifespan: number;
  lifeTime: number;
}

class ParticleSystem {
  gravity: { x: number; y: number };
  friction: number;
  particles: Particle[];
  // ...
  lifespan: number;
  lifeTime: number;

  constructor({
    maxParticles,
    gravity,
    lifespan,
    lifeTime
  }: ParticleSystemProps) {
    // ...
    this.lifespan = lifespan;
    this.lifeTime = lifeTime;
    this.gravity = { ...gravity };
    this.friction = 0.98;
    this.particles = Array.from({ length: maxParticles }, () => {
      return new Particle({
        position: {
          x: Math.random() * window.innerWidth,
          y: -Math.random() * 80
        },
        velocity: { x: Math.random() * 6 - 3, y: Math.random() * 8 - 10 },
        gravity: this.gravity,
        // translate3D shape
        // friction: this.friction,
        // translate3D shape
        friction: Math.round(Math.random()),
        size: Math.round(Math.random() * 10 + 5),
        shape: Math.round(Math.random()),
        color:
          DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],

        bornTime: { span: 1, time: Date.now() },
        lifespan: this.lifespan,
        lifeTime: this.lifeTime,
        opacity: 1
      });
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(particle => particle.render(ctx));
  }
}

export interface UseConfettiProps {
  lifespan?: number;
  lifeTime?: number;
}

type Object = { [key: string]: string };
function styles(): Object {
  const vars: Object = {};
  vars.cursor = "none";
  vars.display = "block";
  vars.background = "none transparent";
  vars.height = "100vh";
  vars.width = "100%";
  vars.zIndex = "9999";
  vars.top = "0px";
  vars.right = "0px";
  vars.bottom = "0px";
  vars.left = "0px";
  return vars;
}

export function useConfetti({ lifespan = 3500, lifeTime }: UseConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isNull, setIsNull] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Timer = lifeTime || lifespan + 500;

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      setCtx(context);
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    const handleResize = () => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const cleanupTimeout = setTimeout(() => setIsNull(true), Timer);
    return () => clearTimeout(cleanupTimeout);
  }, [Timer, isMounted]);

  useEffect(() => {
    if (!ctx || !isMounted) return;

    const confetti = new ParticleSystem({
      maxParticles: 500,
      gravity: { x: 0, y: 0.15 },
      lifespan,
      lifeTime: Timer
    });
    const animate = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
        confetti.render(ctx);
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [ctx, lifespan, Timer, canvasDimensions, isMounted]);

  return {
    canvasRef,
    styles,
    rendering: !isMounted || isNull,
    width: canvasDimensions.width,
    height: canvasDimensions.height
  };
}

export const Confetti = forwardRef<
  HTMLCanvasElement,
  React.ComponentPropsWithoutRef<"canvas"> & {
    style?: React.CSSProperties & {
      [key: string]: any;
    };
  } & UseConfettiProps
>(({ lifeTime, lifespan, style, ...props }, ref) => {
  const { rendering, canvasRef, width, height, styles } = useConfetti({
    lifeTime,
    lifespan
  });
  if (rendering) return null;
  const rest = {
    ref: mergeRefs(canvasRef, ref),
    width,
    height,
    style: { ...styles(), ...style },
    ...props
  };
  return <canvas {...rest} />;
});
Confetti.displayName = "Confetti";
