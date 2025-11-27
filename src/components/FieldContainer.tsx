import Field from "./Field";
import { FIELD_IMG_DIMENSIONS } from "../core/Util";
import { useField } from "../hooks/useField";
import fieldimg from "../assets/pushback-match.png"

export default function FieldContainer() {
  const { field } = useField();

  return (
    <Field
      src={field === "" ? fieldimg : field}
      img={FIELD_IMG_DIMENSIONS}
      radius={17}
    />
  );
}