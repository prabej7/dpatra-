import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  onRequest: (amount: number, purpose: string) => void;
}

const Billing: React.FC<Props> = ({ onRequest }) => {
  const [amount, setAmount] = useState<number>();
  return (
    <>
      <p className="text-xl text-green-500 my-3">Make a Bill Request</p>
      <div className="flex gap-6">
        <Input
          placeholder="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button
          onClick={() => amount && onRequest(amount, 'Tax')}
          variant="pri"
        >
          Request
        </Button>
      </div>
    </>
  );
};

export default Billing;
