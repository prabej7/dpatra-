import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Dialogue } from "@/components"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { backend } from "@/declarations/export";
import { useCookies } from "react-cookie";
import { useAuth } from "@/hooks";
import { Send } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { toast } from "react-toastify";

const schema = z.object({
    account: z.string().min(1, {
        message: "Account No. is required!",
    }),
    amount: z.string().min(1, {
        message: "Amount is required."
    }),
    purpose: z.string().min(1, {
        message: "Purpose is required."
    })
});

type formField = z.infer<typeof schema>;

const Transfer: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors, isSubmitting, }, reset, setError } = useForm<formField>({
        resolver: zodResolver(schema)
    });

    const { account: accountError, amount: amountError, purpose: purposeError, root: rootError } = errors
    const [{ token }] = useCookies(['token']);
    const onSubmit = async (formData: formField) => {
        try {
            const { account, amount, purpose } = formData;
            const response = await backend.performTransaction(String(token), String(account), BigInt(amount), purpose, String(new Date()), String(Math.floor(Math.random() * 1000000)));

            if (response == "200") {
                toast.success("Transfered Successfully!");
                reset();
                return;
            }

            toast.error(response);

        } catch (error) {
            console.log(error);
        }
    }

    return <Dialogue onOpenChange={() => setOpen(!open)} open={open} title="Transfer Funds" description="Enter account number, amount and purpose to tarsfer funds." triggerer={<Button variant="pri" onClick={() => setOpen(true)}  >
        <Send />
        Transfer Funds</Button>}  >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} >
            {rootError && <p className="text-red-500" >{rootError.message}</p>}
            <Input placeholder="Account No." {...register('account')} />
            {accountError && <p className="text-red-500" >{accountError.message}</p>}
            <Input placeholder="Amount" {...register('amount')} />
            {amountError && <p className="text-red-500" >{amountError.message}</p>}
            <Input placeholder="Purpose" {...register('purpose')} />
            {purposeError && <p className="text-red-500" >{purposeError.message}</p>}
            <Button disabled={isSubmitting} variant="pri" >
                {isSubmitting ? <Spinner /> : "Transfer"}
            </Button>
        </form>
    </Dialogue>
};

export default Transfer;