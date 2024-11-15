import { Sheets } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Property } from '@/declarations/backend/backend.did';
import { backend } from '@/declarations/export';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const FindProperty: React.FC = () => {
  const [propertyid, setPropertyID] = useState<string>('');
  const [docurl, setDocUrl] = useState<string>('');
  const [property, setProperty] = useState<Property>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleFind = async () => {
    setLoading(true);
    try {
      const { message, property } = await backend.getProperty(propertyid);

      if (message == '200') {
        setProperty(property);
        const fileBlob = new Blob([new Uint8Array(property.img)], {
          type: 'image/jpeg',
        });
        const imageUrl = URL.createObjectURL(fileBlob);
        setDocUrl(imageUrl);
        return;
      }

      if (message == '404') {
        toast.error('Document not found!');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheets
      side="top"
      trigger={
        <Button variant="pri">
          Find
          <Search />
        </Button>
      }
      title="Find a property."
      desciption="You can find a property by its id."
      content={
        <div>
          <div className="flex gap-6">
            <Input
              placeholder="Property ID"
              onChange={(e) => setPropertyID(e.target.value)}
            />
            <Button variant="pri" onClick={handleFind}>
              {isLoading ? <Spinner /> : <Search />}
            </Button>
          </div>

          {docurl && (
            <div className="flex gap-6 items-center">
              <img className="h-96 rounded-lg border my-6" src={docurl} />
              <div className="border h-72"></div>
              <div>
                <p className="font-bold pl-6 text-2xl text-gradient">
                  Property Details
                </p>
                <div className="flex gap-24 p-6">
                  <ul>
                    <li className="text-slate-700">
                      <strong>Property ID</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Owner</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Reg. no.:</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Valuation</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Type</strong>
                    </li>
                    <li className="text-slate-700">
                      <strong>Created At</strong>
                    </li>
                  </ul>
                  <ul>
                    <li className="text-slate-700">{property?.id}</li>
                    <li className="text-slate-700">
                      {property?.owner.fullName}({property?.owner.id})
                    </li>
                    <li className="text-slate-700">{property?.regNo}</li>
                    <li className="text-slate-700">
                      Rs. {Number(property?.valuation)}
                    </li>
                    <li className="text-slate-700">
                      {property?.proptype}
                    </li>
                    <li className="text-slate-700">{property?.createdAt}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

export default FindProperty;
