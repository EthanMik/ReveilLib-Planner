import { useState } from "react";
import Slider from "./Slider";

export default function PathConfig() {
    const [value, setValue] = useState<number>(0);

    return (
        <div className="bg-medgray w-[500px] h-[650px] rounded-lg">
            <Slider value={value} setValue={setValue} />
        </div>
    );  
}