import Section from "@/components/Section";
import { User } from "@/declarations/backend/backend.did";
import { backend } from "@/declarations/export";
import { structureData } from "@/utils";
import { useQueryCall } from "@ic-reactor/react";
import { useEffect, useState } from "react";

const Citizens: React.FC = () => {

    const { data, loading } = useQueryCall({
        functionName: 'getAllUser'
    });

    const allUsers = data as [string, User][];

    if (loading) return <div>Loading...</div>



    return <>

        <Section title="Citizens" selected="Citizens" >
            <div>
                {allUsers?.map(([_, user], i) => {
                    return <>{user.id}</>
                })}
            </div>
        </Section>
    </>
};

export default Citizens;