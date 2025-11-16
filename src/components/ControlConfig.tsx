import { use, useEffect, useState } from "react";
import { useSegment } from "../hooks/useSegment";
import { clamp } from "../core/Util";
import flipHorizontal from "../assets/flip-horizontal.svg";
import flipVertical from "../assets/flip-vertical.svg";

type ControlInputProps = {
    getValue?: () => number | undefined;
    updateValue?: (value: number) => void;
    valueMin: number;
valueMax: number;
}

function ControlInput({
    getValue,
    updateValue,
    valueMin,
    valueMax
}: ControlInputProps) {
    const { segment } = useSegment();

    const [ value, SetValue ] = useState<number>(0);
    const [ edit, setEdit ] = useState<string | null>(null);

    const display: string = edit !== null ? edit : value.toFixed(1);

    const resetValue = () => {
        const val: number | undefined = getValue?.();
        const num = val === undefined ? "" : val.toFixed(1); 

        setEdit(num);
    }

    useEffect(() => {
        resetValue();

    }, [segment.controls])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setEdit(evt.target.value)
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (edit === null) return;
        
        if (evt.key === "Enter" || evt.key == "Tab") {
            const num: number = parseFloat(edit);
            if (!Number.isFinite(num)) return;

            const selectedControls = segment.controls.filter(c => c.selected);
            if (selectedControls.length > 1) return;

            updateValue?.(clamp(num, valueMin, valueMax));

            SetValue(num);

            evt.currentTarget.blur();
        }
    }

    const cancel = () => {
        resetValue();
    }

    const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        cancel();
        evt.currentTarget.blur();
    }

    return (
        <input 
            className="bg-blackgray w-[80px] h-[40px]
            outline-none rounded-lg text-center text-white
            hover:outline-1
            "

            type="text"
            value={ display }

            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    );
}

type MirrorDirection = "x" | "y";

type MirrorControlProps = {
    src: string
    mirrorDirection: MirrorDirection
}

function MirrorControl({
    src,
    mirrorDirection
}: MirrorControlProps) {
    const { setSegment } = useSegment(); 

    const mirrorX = () => {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.selected
                ? { ...control, position: { ...control.position, x: -control.position.x, }, }
                : control
            ),
        }));
    }

    const mirrorY = () => {
        setSegment(prev => ({
            ...prev,
            controls: prev.controls.map(control =>
                control.selected
                ? { ...control, position: { ...control.position, y: -control.position.y, }, }
                : control
            ),
        }));
    }

    const handleOnClick = () => {
        if (mirrorDirection === "x") {
            mirrorX();
        } else if (mirrorDirection === "y") {
            mirrorY();
        }
    }

    return (
        <button 
            className="flex items-center justify-center w-[35px] h-[35px] 
            rounded bg-transparent hover:bg-lightgray border-none outline-none fill-white"
            onClick={handleOnClick}>
            <img 
                className="fill-white w-10 h-10"
                src={src}   
            />
        </button>
    );
}

export default function ControlConfig() {
    const { segment, setSegment } = useSegment();
    
    const getXValue = () => {
        const x: number | undefined = segment.controls.find(c => c.selected)?.position.x;
        return x
    }

    const getYValue = () => {
        const y: number | undefined = segment.controls.find(c => c.selected)?.position.y;
        return y
    }

    const getHeadingValue = () => {
        const heading: number | undefined = segment.controls.find(c => c.selected)?.heading;
        return heading;
    }

    const updateXValue = (newX: number) => {
        setSegment(prev => ({
                    ...prev,
                    controls: prev.controls.map(control =>
                        control.selected
                        ? { ...control, position: { ...control.position, x: newX, }, }
                        : control
                    ),
                }));
    }

    const updateYValue = (newY: number) => {
        setSegment(prev => ({
                    ...prev,
                    controls: prev.controls.map(control =>
                        control.selected
                        ? { ...control, position: { ...control.position, y: newY, }, }
                        : control
                    ),
                }));
    }

    const updateHeadingValue = (newHeading: number) => {
        setSegment(prev => ({
                    ...prev,
                    controls: prev.controls.map(control =>
                        control.selected
                        ? { ...control, heading: newHeading, }
                        : control
                    ),
                }));
    }

    return (
        <div className="flex items-center bg-medgray w-[500px] h-[65px] rounded-lg">
            <ControlInput updateValue={updateXValue} getValue={getXValue} valueMin={-72} valueMax={72}/>
            <ControlInput updateValue={updateYValue} getValue={getYValue} valueMin={-72} valueMax={72}/>
            <ControlInput updateValue={updateHeadingValue} getValue={getHeadingValue} valueMin={-72} valueMax={72}/>
            <MirrorControl mirrorDirection="x" src={flipHorizontal}/>
            <MirrorControl mirrorDirection="y" src={flipVertical}/>
        </div>
    );
}