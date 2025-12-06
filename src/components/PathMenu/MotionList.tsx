import { useEffect, useState } from "react";
import eyeOpen from "../../assets/eye-open.svg";
import eyeClosed from "../../assets/eye-closed.svg";
import threeDots from "../../assets/three-dots.svg";
import lockClose from "../../assets/lock-close.svg";
import lockOpen from "../../assets/lock-open.svg";
import downArrow from "../../assets/down-arrow.svg";
import { useSegment } from "../../hooks/useSegment";
import Slider from "../Util/Slider";

type MotionListProps = {
    name: string
    segmentId: string
}

export default function MotionList({name, segmentId}: MotionListProps) {
  const [value, setValue] = useState<number>(0);
  const [ segment, setSegment ] = useSegment(); 
  const selected = segment.controls.find((c) => c.id === segmentId)?.selected;
  const [ isEyeOpen, setEyeOpen ] = useState(false);
  const [ isLocked, setLocked ] = useState(false);

    useEffect(() => {
      if (name === "Drive") {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.id === segmentId
                ? { ...control, drivePower: value }
                : control
            ),
        }));
      }

      if (name === "Turn") {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.id === segmentId
                ? { ...control, turnPower: value }
                : control
            ),
        }));
      }

    }, [value])

    const handleEyeOnClick = () => {
      setEyeOpen((visible) => {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.id === segmentId
                ? { ...control, visible: !visible }
                : control
            ),
        }));
        return !visible
      })
    }

    const handleLockOnClick = () => {
      setLocked((locked) => {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.id === segmentId
                ? { ...control, locked: !locked }
                : control
            ),
        }));

        return !locked
      })
    }

    return (
        <div className={`${selected ? "bg-medlightgray" : ""} center justify-between items-center 
        flex flex-row w-[450px] h-[35px] gap-[10px]
        hover:bg-medgray_hover rounded-lg pl-4 pr-4
        `}>
            <img className="w-[15px] h-[15px]"
                src={downArrow}
            />
            <button className="cursor-pointer" 
              onClick={handleEyeOnClick}>
              <img className="w-[30px] h-[22px]"
                  src={isEyeOpen ? eyeClosed : eyeOpen}
              />
            </button>

            <button className="cursor-pointer" 
              onClick={handleLockOnClick}>
              <img className="w-[30px] h-[22px]"
                  src={isLocked ? lockClose : lockOpen}
              />
            </button>
            <span className="w-[80px] text-left">
                {name}
            </span>
            <Slider 
                sliderWidth={250}
                sliderHeight={5}
                knobHeight={16}
                knobWidth={16}
                value={value} 
                setValue={setValue}
            />
            <span className="w-10">
                {(value / 100).toFixed(2)}
            </span>
            <img className="w-[18px] h-[18px]"
                src={threeDots}
            />
        </div>
    );
}
