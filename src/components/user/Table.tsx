import { User } from "@/declarations/backend/backend.did";
import { convertDP } from "@/utils";
import { Check, X } from 'lucide-react';
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialogue } from "@/components"

interface Props {
    users: [string, User][]
}

const Table: React.FC<Props> = ({ users: u }) => {
    const [users, setUsers] = useState<[string, User][]>(u);
    const [selectedUser, setSelectedUser] = useState<User>();

    const handleVerify = (id: string, opt: boolean) => {

        setUsers((prevUsers) =>
            prevUsers.map(([userId, user]) =>
                userId === id ? [userId, { ...user, isVerified: opt }] : [userId, user]
            )
        );
        setSelectedUser(undefined);
    };

    return <div className="overflow-x-auto">
        <Dialogue
            open={selectedUser ? true : false}
            title="Citizen Details"
            onOpenChange={() => setSelectedUser(undefined)}
            children={
                <div className="flex gap-3" >
                    <ul className="w-72" >
                        <li><strong>Full Name:</strong> </li>
                        <li><strong>Gender:</strong> </li>
                        <li><strong>Date of Birth:</strong></li>
                        <li><strong>Address:</strong> </li>
                        <li><strong>NID:</strong> </li>
                        <li><strong>Citizenship ID:</strong> </li>
                        <li><strong>Role:</strong> </li>
                        <li><strong>Marital Status:</strong> </li>
                        <li><strong>Email:</strong> </li>
                        <li><strong>Phone Number:</strong></li>



                        <li><strong>Documents:</strong> </li>
                        <li><strong>Properties:</strong></li>
                        <li><strong>Transactions:</strong> </li>
                        <li><strong>Verification Date:</strong> </li>
                        <li><strong>Last Login:</strong> </li>
                        <li><strong>Created At:</strong> </li>
                    </ul>
                    <ul  >
                        <li>{selectedUser?.fullName}</li>
                        <li>{selectedUser?.gender}</li>
                        <li>{selectedUser?.dob}</li>
                        <li>{selectedUser?.address}</li>
                        <li>{selectedUser?.nid}</li>
                        <li>{selectedUser?.czid}</li>
                        <li>{selectedUser?.role}</li>
                        <li>{selectedUser?.maritalStatus}</li>
                        <li>{selectedUser?.email?.[0] || "N/A"}</li>
                        <li>{selectedUser?.phoneNumber?.[0] || "N/A"}</li>
                        <li>{selectedUser?.documents.length}</li>
                        <li>{selectedUser?.properties.length}</li>
                        <li>{selectedUser?.transactions.length}</li>
                        <li>{selectedUser?.verificationDate?.[0] || "N/A"}</li>
                        <li>{selectedUser?.lastLogin?.[0] || "N/A"}</li>
                        <li>{selectedUser?.createdAt}</li>
                    </ul>
                </div>
            }
        />

        <table className="table">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Account ID</th>
                    <th>Citizenship No.</th>
                    <th>Verified</th>
                </tr>
            </thead>
            <tbody>

                {users?.map(([id, user]) => {
                    const { address, fullName, czid, nid, dp, role, isVerified } = user;
                    const img = convertDP(dp);
                    return <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedUser(user)}  >
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={img}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{fullName}</div>
                                    <div className="text-sm opacity-50">{address}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {id}
                            <br />
                            <span className="badge badge-ghost badge-sm">{role.toUpperCase()}</span>
                        </td>
                        <td>{czid}</td>
                        <th>
                            {isVerified ? (
                                <Button
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleVerify(id, false);
                                    }}
                                >
                                    <X />
                                </Button>
                            ) : (
                                <Button
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleVerify(id, true);
                                    }}
                                >
                                    <Check />
                                </Button>
                            )}
                        </th>

                    </tr>
                })}


            </tbody>

            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Account ID</th>
                    <th>Citizenship No.</th>
                    <th>Verified</th>
                </tr>
            </tfoot>
        </table>
    </div>
};

export default Table;