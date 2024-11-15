import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Map from "./Map";
import { Coords } from "./LocationUpdater";
import { Button } from "@/components/ui/button";
import { Map as MapIcon } from 'lucide-react'

interface Props {
    onLocationSelect: (coords: Coords) => void;
    title?: string;
    description?: string;
    coords?: Coords;
    h?: string
}

const MapSheet: React.FC<Props> = ({ onLocationSelect, coords, description, title, h }) => {
    return <Sheet>
        <SheetTrigger>
            <Button type="button" variant={h ? "link" : "outline"} className={`w-full h-${h}`} >
                Map<MapIcon />
            </Button>
        </SheetTrigger>
        <SheetContent side="top" >
            <SheetHeader>
                <SheetTitle>{title ? title : "Select Coordinates:"}</SheetTitle>
                <SheetDescription>
                    {description ? description : "Search for the location and click to select the location."}
                </SheetDescription>
            </SheetHeader>
            <Map coords={coords} onLocationSelect={onLocationSelect} />
        </SheetContent>
    </Sheet>

};

export default MapSheet;