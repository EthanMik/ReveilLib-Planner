import { useCallback, useRef, useState } from "react";

type Marker = { id: string; x: number; y: number };

type Props = {
  src: string;
  width?: number;
  height?: number;
  radius?: number;
  initialMarkers?: Marker[];
  onChange?: (markers: Marker[]) => void;
  showLines?: boolean;   // NEW
  closeLoop?: boolean;   // NEW
};

export default function FieldWithMarkers({
  src,
  width = 575,
  height = 575,
  radius = 14,
  initialMarkers = [],
  onChange,
  showLines = true,    // NEW
  closeLoop = false,   // NEW
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [markers, setMarkers] = useState<Marker[]>(
    initialMarkers.map((m) => ({ ...m, id: m.id ?? crypto.randomUUID() }))
  );
  type DragState = { id: string; dx: number; dy: number } | null;
  const [drag, setDrag] = useState<DragState>(null);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const toSvgPoint = useCallback(
    (
      evt:
        | React.PointerEvent<SVGSVGElement>
        | React.PointerEvent<SVGCircleElement>
    ) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };

      const pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;

      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };

      const inv = ctm.inverse();
      const { x, y } = pt.matrixTransform(inv);

      return {
        x: clamp(x, radius, width - radius),
        y: clamp(y, radius, height - radius),
      };
    },
    [radius, width, height]
  );

  const updateMarkers = (next: Marker[]) => {
    setMarkers(next);
    onChange?.(next);
  };

  const handleBackgroundPointerDown = (evt: React.PointerEvent<SVGSVGElement>) => {
    const tag = evt.target instanceof Element ? evt.target.tagName.toLowerCase() : "";
    if (tag === "circle") return;

    const { x, y } = toSvgPoint(evt);
    updateMarkers([...markers, { id: crypto.randomUUID(), x, y }]);
  };

  const handleMarkerPointerDown = (
    evt: React.PointerEvent<SVGCircleElement>,
    id: string
  ) => {
    evt.stopPropagation();
    const p = toSvgPoint(evt);
    const m = markers.find((mm) => mm.id === id);
    if (!m) return;

    (evt.currentTarget as Element).setPointerCapture?.(evt.pointerId);
    setDrag({ id, dx: m.x - p.x, dy: m.y - p.y });
  };

  const handleSvgPointerMove = (evt: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const p = toSvgPoint(evt);
    const next = markers.map((m) =>
      m.id === drag.id
        ? {
            ...m,
            x: clamp(p.x + drag.dx, radius, width - radius),
            y: clamp(p.y + drag.dy, radius, height - radius),
          }
        : m
    );
    updateMarkers(next);
  };

  const endDrag = () => setDrag(null);

  const handleMarkerContextMenu = (
    evt: React.MouseEvent<SVGCircleElement>,
    id: string
  ) => {
    evt.preventDefault();
    updateMarkers(markers.filter((m) => m.id !== id));
  };

  // === NEW: build the polyline points string ===
  const pointsStr =
    markers.length > 0
      ? [
          ...markers.map((m) => `${m.x},${m.y}`),
          ...(closeLoop && markers.length > 2 ? [`${markers[0].x},${markers[0].y}`] : []),
        ].join(" ")
      : "";

  return (
    <div
      className="inline-block select-none"
      style={{ width, height, touchAction: "none" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="block"
        onPointerDown={handleBackgroundPointerDown}
        onPointerMove={handleSvgPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <image
          href={src}
          x={0}
          y={0}
          width={width}
          height={height}
          pointerEvents="none"
          preserveAspectRatio="none"
        />

        {/* NEW: draw the connecting line under the markers */}
        {showLines && markers.length >= 2 && (
          <polyline
            points={pointsStr}
            fill="none"
            stroke="rgb(59,130,246)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none" // don't block clicks/drag
          />
        )}

        {markers.map((m, idx) => (
          <g key={m.id} style={{ cursor: "grab" }}>
            <circle
              cx={m.x}
              cy={m.y}
              r={radius}
              fill="rgba(59,130,246,0.25)"
              stroke="rgb(59,130,246)"
              strokeWidth={2}
              onPointerDown={(e) => handleMarkerPointerDown(e, m.id)}
              onContextMenu={(e) => handleMarkerContextMenu(e, m.id)}
            />
            <text
              x={m.x}
              y={m.y + 4}
              textAnchor="middle"
              fontSize={12}
              fill="rgb(59,130,246)"
              pointerEvents="none"
            >
              {idx + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
