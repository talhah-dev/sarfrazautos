"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Package, PhoneCall } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./scroll-expand.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollExpandProps {
  src?: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 46,
  startHeight = 60,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.65,
  useWindowScroll = true,
  enabled = true,
  children,
  className = "",
  style,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty("--se-title-size", `${clamp(w * 0.055, 26, 68)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? "" : "scroll-expand--scroller"} ${className}`.trim()}
      style={style}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {mediaType === "video" ? (
              <video
                ref={mediaRef as React.RefObject<HTMLVideoElement>}
                className="scroll-expand__media"
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                ref={mediaRef as React.RefObject<HTMLImageElement>}
                className="scroll-expand__media brightness-75"
                src={src}
                alt={alt}
                draggable={false}
              />
            )}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function PurchaseCtaSection({ className = "" }: { className?: string }) {
  return (
    <section className={cn("w-full bg-black text-white relative", className)}>
      <ScrollExpand
        src="/auth-banner.jpg"
        alt="Sarfraz Autos Parts Supply"
        title="Interested in Purchasing?"
        scrollHint="Scroll to expand"
        useWindowScroll
        mediaZoom={1.3}
        startWidth={48}
        startHeight={64}
        startRadius={28}
      >
        <div className="max-w-3xl flex flex-col items-center justify-center text-center px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-600/90 text-white backdrop-blur-md mb-4 border border-red-500/30 uppercase tracking-wider">
            Direct Counter &amp; Bulk Distribution
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            Contact Us for Purchasing &amp; Supply
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-zinc-300 max-w-xl mb-8 leading-relaxed">
            Need urgent counter pick-up for a single bike part, or looking to register your shop for wholesale master crate shipments? Our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#wholesale"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium px-8 h-12 text-sm md:text-base shadow-lg transition-transform hover:scale-105"
              )}
            >
              <Package className="mr-2 size-5" />
              Wholesale Orders
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="#retail"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-medium px-8 h-12 text-sm md:text-base shadow-lg transition-transform hover:scale-105"
              )}
            >
              <PhoneCall className="mr-2 size-4" />
              Retail Counter
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}

export default PurchaseCtaSection;
