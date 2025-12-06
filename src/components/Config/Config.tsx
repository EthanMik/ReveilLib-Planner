import CommandButton from "./CommandButton";
import FieldButton from "./FieldButton";

export default function Config() {
    return (
        <div className="bg-medgray w-[575px] h-[65px] rounded-lg flex items-center gap-3 pl-6">
            <span className="text-[20px]">
                File
            </span>
            <FieldButton/>
            <span className="text-[20px]">
                Robot
            </span>
            <CommandButton/>
            <span className="text-[20px]">
                Settings
            </span>
        </div>
    );
}