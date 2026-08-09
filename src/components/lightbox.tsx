"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Image = { src: string; alt: string };

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export default function Lightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: {
  images: Image[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPos({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    resetZoom();
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length, resetZoom]);

  const next = useCallback(() => {
    resetZoom();
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length, resetZoom]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const nz = Math.max(z - ZOOM_STEP, MIN_ZOOM);
      if (nz === MIN_ZOOM) setPos({ x: 0, y: 0 });
      return nz;
    });
  }, []);

  // keyboard controls
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next, zoomIn, zoomOut]);

  // reset on open / image change
  useEffect(() => {
    if (open) {
      setCurrent(initialIndex);
      resetZoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialIndex]);

  // wheel to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  // drag to pan when zoomed
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= MIN_ZOOM) return;
    dragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handleImageClick = () => {
    if (dragging.current) return;
    if (zoom > MIN_ZOOM) {
      resetZoom();
    } else {
      zoomIn();
    }
  };

  if (!open || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-white/70 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {images.length > 1 && (
          <span className="absolute -top-10 left-0 text-white/70 text-sm font-medium">
            {current + 1} / {images.length}
          </span>
        )}

        <div
          ref={containerRef}
          className="relative overflow-hidden h-[80vh] flex items-center justify-center bg-black/50 rounded-lg select-none"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <img
            src={images[current]?.src}
            alt={images[current]?.alt}
            draggable={false}
            className="object-contain rounded-lg transition-transform duration-200 ease-out max-w-full max-h-full"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
              cursor: zoom > MIN_ZOOM ? (dragging.current ? "grabbing" : "grab") : "zoom-in",
              touchAction: "none",
            }}
            onClick={handleImageClick}
          />
        </div>

        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur">
          <button
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="text-white text-xl font-bold px-2 disabled:opacity-30"
          >
            −
          </button>
          <span className="text-white text-sm font-medium w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="text-white text-xl font-bold px-2 disabled:opacity-30"
          >
            +
          </button>
          <button
            onClick={resetZoom}
            className="text-white text-sm font-medium ml-2 hover:text-white/70 transition-colors"
          >
            Reset
          </button>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold px-2 hover:text-white/70 transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold px-2 hover:text-white/70 transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}