import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, PanelTopDashed } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema
const schema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    year: z.string().length(4, "Enter a valid year"),
    month: z.string().min(1, "Month is required"),
    day: z.string().min(1, "Day is required"),
    address: z.string().min(1, "Address is required"),
    czid: z.string().optional(),
    nid: z.string().optional(),
    pan: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),

}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Define form phases
type Phase = 1 | 2 | 3;

type formFiled = z.infer<typeof schema>;

const Register: React.FC = () => {
    const [phase, setPhase] = React.useState<Phase>(1);
    const [dp, setDP] = useState<File>();
    // Initialize useForm with Zod schema
    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm<formFiled>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        

    };

    const handlePhaseChange = (phase: number) => {
        const { address, confirmPassword, day, fullname, month, password, year, czid, nid, pan } = getValues();
        if (phase == 2 && fullname && year && month && day && address) {
            setError('root', { message: "" });
            return setPhase(phase as Phase);
        } else if (phase == 3 && czid && nid && pan) {
            setError('root', { message: "" });
            return setPhase(phase as Phase);
        }

        return setError('root', { message: "All Fields are required!" })
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-50">
            <div className="flex flex-col gap-3 w-96">
                <p className="font-bold text-slate-800 text-3xl">Register Citizen</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" >
                    {errors.root && <p className="text-red-500" >{errors.root.message}</p>}
                    {phase === 1 && (
                        <>
                            <Input placeholder="Full Name" {...register("fullname")} />
                            {errors.fullname && <p>{errors.fullname.message}</p>}

                            <div className="flex gap-6">
                                <Input placeholder="YYYY" {...register("year")} />
                                <Input placeholder="MM" {...register("month")} />
                                <Input placeholder="DD" {...register("day")} />
                            </div>
                            {errors.year && <p>{errors.year.message}</p>}
                            <Input placeholder="Permanent Address" {...register("address")} />
                            {errors.address && <p>{errors.address.message}</p>}

                            <Button type="button" variant="pri" onClick={() => handlePhaseChange(2)}>
                                Next <ArrowRightIcon size={20} />
                            </Button>
                        </>
                    )}

                    {phase === 2 && (
                        <>
                            <Input placeholder="Citizenship No." {...register("czid")} />
                            <div className="flex gap-6">
                                <Input placeholder="NID No." {...register("nid")} />
                                <Input placeholder="PAN No." {...register("pan")} />
                            </div>

                            <Button type="button" variant="pri" onClick={() => handlePhaseChange(3)}>
                                Next <ArrowRightIcon size={20} />
                            </Button>
                        </>
                    )}

                    {phase === 3 && (
                        <>
                            {errors.password && <p className="text-red-500" >{errors.password.message}</p>}
                            {errors.confirmPassword && <p className="text-red-500" >{errors.confirmPassword.message}</p>}
                            <Input type="file" onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setDP(e.target.files[0]);
                                }
                            }} />
                            <div className="flex gap-3">
                                <Input type="password" placeholder="New Password" {...register("password")} />
                                <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
                            </div>


                            <Button type="submit" variant="pri">
                                Submit <ArrowRightIcon size={20} />
                            </Button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
