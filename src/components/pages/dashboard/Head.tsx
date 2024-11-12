import { Card } from "@/components";
import { User } from "@/declarations/backend/backend.did";
import { useQueryCall } from "@ic-reactor/react";



const UserInfos: React.FC = () => {

    const { data, loading } = useQueryCall({
        functionName: 'getAllUser'
    });

    const allUsers = data as [string, User][];

    const coutUnverified = (): number => {
        let count = 0;
        allUsers?.map(([id, user]) => {
            if (!user.isVerified) {
                count++;
            }
        })

        return count;
    }

    const unverifiedUsers = coutUnverified();

    const cards: { title: string; content: number }[] = [
        { title: "Total Users", content: allUsers?.length },
        { title: "Unverified Users", content: unverifiedUsers },
        { title: "Verified Users", content: Math.abs(allUsers?.length - unverifiedUsers) }
    ]

    return <>
        <div className="grid grid-cols-3 grid-rows-1 gap-6 my-6 w-full" >{cards.map((({ title, content }) => {
            return <Card title={title} content={content} />
        }))}</div>


    </>
};

export default UserInfos;