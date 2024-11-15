import { Sheets } from "@/components"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Document } from "@/declarations/backend/backend.did"
import { backend } from "@/declarations/export"
import { Search } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

const FindDoc: React.FC = () => {

    const [docId, setDocID] = useState<string>("");
    const [docurl, setDocUrl] = useState<string>("");
    const [doc, setDoc] = useState<Document>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const handleFind = async () => {
       
        setLoading(true);
        try {
            const { message, doc } = await backend.getDoc(docId);

            if (message == "200") {
                setDoc(doc);
                const fileBlob = new Blob([new Uint8Array(doc.img)], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(fileBlob);
                setDocUrl(imageUrl);
                return;
            }

            if(message=="404"){
                toast.error("Document not found!")
            }

        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return <Sheets side="top" trigger={<Button variant="pri"  >Find
        <Search />
    </Button>} title="Find a document." desciption="You can find a document by its id." content={<div>
        <div className="flex gap-6" >
            <Input placeholder="Document ID" onChange={(e) => setDocID(e.target.value)} />
            <Button variant="pri" onClick={handleFind}  >
                {isLoading ? <Spinner /> : <Search />}
            </Button></div>

        {docurl && <div className="flex gap-6 items-center" > <img className="h-96 rounded-lg border my-6" src={docurl} />
            <div className="border h-72" ></div>
            <div>
                <p className="font-bold pl-6 text-2xl text-gradient" >Document Details</p>
                <div className="flex gap-24 p-6" >

                    <ul>
                        <li className="text-slate-700" ><strong>Document ID</strong></li>
                        <li className="text-slate-700"><strong>Document Name</strong></li>
                        <li className="text-slate-700"><strong>Is Veirified</strong></li>
                        <li className="text-slate-700"><strong>Document Type</strong></li>
                        <li className="text-slate-700"><strong>Created At</strong></li>
                    </ul>
                    <ul>
                        <li className="text-slate-700">{doc?.id}</li>
                        <li className="text-slate-700">{doc?.name}</li>
                        <li className="text-slate-700">{doc?.isVerified ? "Yes" : "No"}</li>
                        <li className="text-slate-700">{doc?.dtype}</li>
                        <li className="text-slate-700" >{doc?.createdAt}</li>
                    </ul>
                </div>
            </div>
        </div>}

    </div>} />
};

export default FindDoc;

