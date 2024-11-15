import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialogue } from "@/components";
import { Transaction } from "@/declarations/backend/backend.did";
import { useUser } from "@/store";
import { useState } from "react";

interface Props {
    limit?: number
}

const TransactionsTable: React.FC<Props> = ({ limit }) => {
    const { user: { transactions } } = useUser();
    const [selectedTransaction, selectTransaction] = useState<Transaction>();
    
    return <Table>
        <div className="absolute" >
            {selectedTransaction && <Dialogue title="Transaction" open={selectedTransaction ? true : false} onOpenChange={() => {
                selectTransaction(undefined);
            }} children={
                <div className="flex gap-24" >
                    <div className="w-48" >
                        <p>Transaction ID</p>
                        <p>From</p>
                        <p>To</p>
                        <p>Amount</p>
                        <p>Purpose</p>
                        <p>Date</p>
                    </div>
                    <div><p>{selectedTransaction.id}</p>
                        <p>{selectedTransaction.from.fullName}</p>
                        <p>{selectedTransaction.to.fullName}</p>
                        <p>Rs. {Number(selectedTransaction.amount)}</p>
                        <p>{selectedTransaction.purpose}</p>
                        <p>{selectedTransaction.createdAt}</p></div>
                </div>
            } />}</div>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">TXN ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((transaction, index) => {
                const { amount, from, id, to } = transaction[1];
                return <>
                    {limit ? <>
                        {index < limit && <TableRow onClick={() => selectTransaction(transaction[1])} >
                            <TableCell className="font-medium">{id}</TableCell>
                            <TableCell>{from.fullName}</TableCell>
                            <TableCell>{to.fullName}</TableCell>
                            <TableCell className="text-right">Rs. {Number(amount)}</TableCell>
                        </TableRow>}
                    </> : <TableRow onClick={() => selectTransaction(transaction[1])} >
                        <TableCell className="font-medium">{id}</TableCell>
                        <TableCell>{from.fullName}</TableCell>
                        <TableCell>{to.fullName}</TableCell>
                        <TableCell className="text-right">Rs. {Number(amount)}</TableCell>
                    </TableRow>}
                </>
            })}

        </TableBody>
    </Table>

};

export default TransactionsTable