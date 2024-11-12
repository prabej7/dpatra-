import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";

interface Props {
    triggerer?: React.ReactNode;
    title: string;
    description?: string;
    children?: React.ReactNode;
    onOpenChange?: () => void;
    open?: boolean;
    w?: string
}

const Dialogue: React.FC<Props> = ({ title, triggerer, children, description, onOpenChange, open, w }) => {
    return <Dialog open={open} onOpenChange={onOpenChange}  >
        <DialogTrigger>
            {triggerer}
        </DialogTrigger>
        <DialogContent className={`w-${w}`} >
            <DialogHeader>
                <DialogTitle className="text-slate-800" >{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>

};

export default Dialogue;