import { backend } from "@/declarations/export";
import { useUser } from "@/store";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [{ token }, _] = useCookies(['token']);
    const navigate = useNavigate();
    const store = useUser();


    //Loadings
    const [isUserLoading, setUserLoading] = useState<boolean>(false);

    if (!token) {
        navigate("/login");
    }

    useEffect(() => {
        (async () => {
            setUserLoading(true);
            try {
                const { message, user } = await backend.getUser(String(token), String(token));
                if (message == "200") {
                    store.setUser(user);
                } else {
                    return navigate("/login")
                }
            } catch (error) {
                console.log(error);
            } finally {
                setUserLoading(false);
            }

        })();
    }, [token]);

    return { isUserLoading }
}

export default useAuth;