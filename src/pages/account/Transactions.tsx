import { Section, TransactionsTable } from "@/components";

const Transactions: React.FC = () => {
    return <Section selected="Transactions" title="Transactions"  >
        <div className="mt-3" >
            <TransactionsTable />
        </div>
    </Section>
};

export default Transactions;