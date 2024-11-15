import { Dialogue } from '@/components';
import { Document } from '@/declarations/backend/backend.did';

interface Props {
  documents: [string, Document][];
}
const Docs: React.FC<Props> = ({ documents }) => {
  return (
    <div>
      <div>
        {documents.map(([_, doc]) => {
          const fileBlob = new Blob([new Uint8Array(doc.img)], {
            type: 'image/jpeg',
          });
          const imageUrl = URL.createObjectURL(fileBlob);
          return (
            <div className="flex gap-6 items-center">
              <img className="h-96 rounded-lg border my-6" src={imageUrl} />
              <div className="border h-72"></div>
              <div>
                <p className="font-bold pl-6 text-2xl text-gradient">
                  Document Details
                </p>
                <div className="flex gap-24 p-6">
                  <ul>
                    <li className="text-slate-700">
                      <strong>Document ID</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Document Name</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Is Veirified</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Document Type</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Created At</strong>
                    </li>
                  </ul>
                  <ul>
                    <li className="text-slate-700">{doc?.id}</li>
                    <li className="text-slate-700">{doc?.name}</li>
                    <li className="text-slate-700">
                      {doc?.isVerified ? 'Yes' : 'No'}
                    </li>
                    <li className="text-slate-700">{doc?.dtype}</li>
                    <li className="text-slate-700">{doc?.createdAt}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Docs;
