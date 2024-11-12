import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { backend } from "@/declarations/export";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [_, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [error, setError] = useState<{
        text: string;
        color: string;
    }>({
        color: "",
        text: ""
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { message, token } = await backend.login(username, password) as {
                message: string;
                token: string;
            };

            if (message == '200') {
                setCookie('token', token);
                navigate("/account");
                return;
            }

            if (message == "401") {
                return setError({
                    text: "User ID or password is incorrect.",
                    color: "red"
                });
            }

            setError({
                text: "User doesn't exists.",
                color: "red"
            });

        } catch (error) {
            setError({
                text: "Something went wrong.",
                color: "red"
            });
        } finally {
            setLoading(false);
        }
    }
    return <div className="h-screen w-screen flex justify-center items-center" >
        <div className="border flex rounded-xl " >
            <div className="p-12" >
                <img src="/assets/imgs/login.svg" className="h-72" />
            </div>
            <div className="border" ></div>
            <form className="p-12" onSubmit={handleSubmit} >
                <p className="font-bold text-3xl text-green-500" >Login to DPatra.</p>
                {error && <p className="my-3" style={{ color: error.color }} >{error.text}</p>}
                <div className="flex flex-col gap-3 mt-6" >
                    <Input placeholder="User ID" autoFocus onChange={(e) => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Button disabled={isLoading} variant="pri" >
                        {isLoading ? <Spinner size="small" /> : "Login"}
                    </Button>
                </div>

                <div>
                    <p className="text-sm text-center mt-6 text-slate-800" >Note: Password can't be recovered, <br /> because of security reasons.</p>
                </div>
            </form>
        </div>
    </div>
};

export default Login;