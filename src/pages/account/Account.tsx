
import { UserInfos } from "@/components";
import Section from "@/components/Section";
import { useAuth } from "@/hooks";
import { useUser } from "@/store";
import { convertDP } from "@/utils";

const Account: React.FC = () => {
    const { isUserLoading } = useAuth()

    const { user } = useUser()

    if (isUserLoading) return <>Loading..</>

    const img = convertDP(user.dp);

    return <Section selected="Dashboard" title="Dashboard" >
        <UserInfos />
    </Section>
};

export default Account