import type { ReactNode } from "react";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ColorConvertResultProps {
    children?: ReactNode;
}

export function ColorConverResult({ children }: ColorConvertResultProps) {
    return (
        <div className="mt-6 grid grid-cols-[minmax(0,max-content)_minmax(50%,1fr)_minmax(0,max-content)] items-center gap-5">
            {children}
        </div>
    );
}

interface ColorConvertResultItemProps {
    label: string;
    value: string;
}

export function ColorConvertResultItem({
    label,
    value,
}: ColorConvertResultItemProps) {
    function handleClickCopy() {
        navigator.clipboard.writeText(value).then(() => {
            // Alert the user that the action took place.
            // Nobody likes hidden stuff being done under the hood!
            toast.success("Copied to clipboard", {
                position: "bottom-center",
            });
        });
    }

    return (
        <>
            <div>
                <span>{label}</span>
            </div>
            <div>
                <span>{value}</span>
            </div>
            <div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClickCopy}
                >
                    <CopyIcon className="size-4" />
                </Button>
            </div>
        </>
    );
}
