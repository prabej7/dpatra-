import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    title?: string;
    description?: string
    content?: React.ReactNode;
    footer?: string
}

const CardC: React.FC<Props> = ({ content, description, footer, title }) => {
    
    return <Card  >
        <CardHeader>
            <CardTitle className="text-slate-600" >{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
            <p className="font-black text-4xl text-green-500" >{content}</p>
        </CardContent>
        {footer && <CardFooter>
            <p>{footer}</p>
        </CardFooter>}
    </Card>

};

export default CardC;