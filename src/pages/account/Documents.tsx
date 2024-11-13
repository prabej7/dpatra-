import { Section, Sheets } from "@/components"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { backend } from "@/declarations/export";
import { useState } from "react";
import { Search } from 'lucide-react'
import { FindDoc } from "./components";

const schema = z.object({
    owner: z.string().min(1, { message: "Owner ID is required." }),
    name: z.string().min(1, { message: "Document name is required." }),
    dtype: z.string().min(1, { message: "Document type is required." }),
});

type formField = z.infer<typeof schema>;

const Documents: React.FC = () => {
    const [doc, setDoc] = useState<number[]>([]);
    const { register, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm<formField>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (formData: formField) => {
        try {
            const { dtype, name, owner } = formData;

            const response = await backend.addDoc(String(owner), String(Math.floor(Math.random() * 1000000)), name, doc, dtype, true, String(new Date()));

            if (response == "200") {
                reset();
                return toast.success("Successfully Added!");
            }

            return toast.error(response);

        } catch (error) {
            return toast.error("Something went wrong!")
        }
    }



    return <Section title="Documents" selected="Documents" titleOptions={<FindDoc />}  >
        <div className="mt-6" >
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}  >
                <Input placeholder="Owner" {...register("owner")} />
                {errors.owner && <p className="text-red-500" >{errors.owner.message}</p>}
                <Input placeholder="Document Name" {...register("name")} />
                {errors.name && <p className="text-red-500" >{errors.name.message}</p>}
                <Input placeholder="Document Type" {...register("dtype")} />
                {errors.dtype && <p className="text-red-500" >{errors.dtype.message}</p>}
                <Input type="file" onChange={async (e) => {
                    const { files } = e.target;
                    if (files && files[0]) {
                        const imageByteData: number[] = [...new Uint8Array(await files[0].arrayBuffer())];

                        setDoc(imageByteData);
                    }

                }} />

                <Button variant="pri" type="submit"  >
                    {isSubmitting ? <Spinner /> : "Submit"}
                </Button>
            </form>
        </div>
    </Section>
};

export default Documents;