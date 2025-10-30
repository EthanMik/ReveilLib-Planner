import fieldImg from "../assets/VURC_pushback.png";
import { AddControl } from "../core/Path";
import { FIELD_IMG_DIMENSIONS } from "../core/Util";
import Field from "./FieldWithMarkers";

export function FieldImg() {
  return (
    <div className="translate-x-[13px]">
      <Field src={fieldImg} width={FIELD_IMG_DIMENSIONS.w} height={FIELD_IMG_DIMENSIONS.h} onCursorMove={AddControl} />
    </div>
  );
}