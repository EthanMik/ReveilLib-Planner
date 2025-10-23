import { describe, it, expect} from "vitest";
import { toPX } from "./Util";

describe("toPX", () => {
  it("Testing toPX", () => {
    const out = toPX(
      { x: -56, y: 43 },
      { x: -72, y: 72, w: 144, h: 144 },
      { x: 136, y: 175, w: 575, h: 575 }
    );
    expect(out.x).toBeCloseTo(199.9, 1);
    expect(out.y).toBeCloseTo(59.2, 1);
  });
});