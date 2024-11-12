import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from "react";

interface Props {
    trigger?: React.ReactNode;
    title?: string;
    desciption?: string;
    content?: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

const Sheets: React.FC<Props> = ({ trigger, desciption, title, content, side }) => {
    return <Sheet>
        <SheetTrigger>{trigger}</SheetTrigger>
        <SheetContent side={side} >
            <SheetHeader className="my-3" >
                <SheetTitle className="text-gradient text-2xl" >{title}</SheetTitle>
                <SheetDescription>
                    {desciption}
                </SheetDescription>
            </SheetHeader>
            <div>
                {content}
            </div>
        </SheetContent>
    </Sheet>

};

export default Sheets;