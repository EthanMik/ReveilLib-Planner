import fieldImg from "../assets/VURC_pushback.png";
import FieldWithMarkers from "./FieldWithMarkers";

export function FieldImg() {
  return (
    <div className="translate-x-[13px]">
      <FieldWithMarkers src={fieldImg} width={575} height={575} />
    </div>
  );
}