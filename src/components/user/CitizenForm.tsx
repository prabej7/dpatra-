import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";

// Define the Zod schema for validation
const formSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    year: z.string().length(4, "Enter a valid year"),
    month: z.string().min(1, "Month is required"),
    day: z.string().min(1, "Day is required"),
    address: z.string().min(1, "Address is required"),
    czid: z.string().min(1, "Citizenship No. is required"),
    nid: z.string().min(1, "NID No. is required"),
    pan: z.string().min(1, "PAN No. is required"),
    gender: z.string().min(1, "Gender is required"),
    martialStatus: z.string().min(1, "Marital status is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


type FormSchemaType = z.infer<typeof formSchema>;

const CitizenForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log("Form data:", data);
        // Handle form submission
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Input placeholder="Full Name" {...register("fullname")} />
            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

            <div className="flex gap-6">
                <Input placeholder="YYYY" {...register("year")} />
                <Input placeholder="MM" {...register("month")} />
                <Input placeholder="DD" {...register("day")} />
            </div>
            {errors.year && <p className="text-red-500">{errors.year.message}</p>}

            <Input placeholder="Permanent Address" {...register("address")} />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}

            <Input placeholder="Citizenship No." {...register("czid")} />
            <div className="flex gap-6">
                <Input placeholder="NID No." {...register("nid")} />
                <Input placeholder="PAN No." {...register("pan")} />
            </div>
            <div className="flex gap-6">
                <Input placeholder="Gender" {...register("gender")} />
                <Input placeholder="Marital Status" {...register("martialStatus")} />
            </div>

            <Input type="file" onChange={handleFileChange} />

            <div className="flex gap-3">
                <Input type="password" placeholder="New Password" {...register("password")} />
                <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

            <Button disabled={isSubmitting} variant="pri" type="submit">
                Submit
            </Button>
        </form>
    );
};

export default CitizenForm;