import { ChevronDown } from '@tamagui/lucide-icons';
import { Accordion, Paragraph, Square } from 'tamagui';

interface Props {
  title: string;
  children: React.ReactNode;
}

const AccordionC: React.FC<Props> = ({ title, children }) => {
  return (
    <Accordion overflow="hidden" width="$20" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open }: { open: boolean }) => (
            <>
              <Paragraph>{title}</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            {children}
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionC;
