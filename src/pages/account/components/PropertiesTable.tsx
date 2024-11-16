import { Dialogue } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Coords } from '@/components/user/Map/LocationUpdater';
import MapSheet from '@/components/user/Map/MapSheet';
import { Property } from '@/declarations/backend/backend.did';
import { Map } from 'lucide-react';
import { useState } from 'react';

interface Props {
  properties: [string, Property][];
}

const PropertiesTable: React.FC<Props> = ({ properties }) => {
  const [selected, setSelected] = useState<Property>();
  const [coords, setCoords] = useState<Coords>();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {selected && (
        <Dialogue
          onOpenChange={() => setSelected(undefined)}
          open={selected ? true : false}
          title="Property Details"
          children={
            <>
              <div className="flex gap-12">
                <ul>
                  <li>ID</li>
                  <li>Reg no.:</li>
                  <li>Valuation</li>
                  <li>Type</li>
                  <li>Registered At</li>
                </ul>
                <ul>
                  <li>{selected.id}</li>
                  <li>{selected.regNo}</li>
                  <li>{Number(selected.valuation)}</li>
                  <li>{selected.proptype}</li>
                  <li>{selected.createdAt}</li>
                </ul>
              </div>
              <MapSheet coords={coords} onLocationSelect={() => {}} />
            </>
          }
        />
      )}
      <Table>
        <TableCaption>A list of propperties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Registration ID</TableHead>
            <TableHead>Coords</TableHead>
            <TableHead className="text-right">Valuation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map(([_, property]) => {
            const { id, lat, lon, regNo, valuation } = property;
            return (
              <TableRow onClick={() => setSelected(property)}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{regNo}</TableCell>
                <TableCell>
                  {lat}, {lon}
                </TableCell>
                <TableCell className="text-right">
                  Rs. {Number(valuation)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default PropertiesTable;
