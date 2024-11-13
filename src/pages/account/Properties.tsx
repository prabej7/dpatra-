import { Section } from "@/components"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { backend } from "@/declarations/export";
import { toast } from 'react-toastify'
import MapSheet from "@/components/user/Map/MapSheet";

const schema = z.object({
    regNo: z.string().min(1, {
        message: "Registration No. is required."
    }),

    owner: z.string().min(1, {
        message: "Owner ID is required."
    }),

    valuation: z.string().min(1, {
        message: "Valuation is required."
    }),
    lat: z.string().min(1, {
        message: "Latitude is required."
    }),
    lon: z.string().min(1, {
        message: "Longitude is required."
    }),
    propertyType: z.string().min(1, {
        message: "Property type is required."
    })
});

const Properties: React.FC = () => {
    return <Section title="Properties" selected="Properties" >
        <div>

        </div>
    </Section>
};

export default Properties;