import { api } from '@/constants/api';
import colors from '@/constants/Colors';
import useUserStore from '@/store/useUser';
import { X } from '@tamagui/lucide-icons';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  Unspaced,
} from 'tamagui';
import Alert from './Alert';
import { Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import BiometricAuth from './useLocalAuth';

interface Props {
  button?: React.ReactNode;
  accNo?: number;
}
const TransferFundsDialogue: React.FC<Props> = ({ button, accNo }) => {
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const [accountID, setAccountID] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<{
    text: string;
    isError: boolean;
  }>({
    text: '',
    isError: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();
  const { handleBiometricAuth } = BiometricAuth();

  useEffect(() => {
    if (accNo) {
      setModalOpen(true);
      setAccountID(accNo);
    }
  }, [accNo]);

  const handleSubmit = async () => {
    setLoading(true);
    if (await handleBiometricAuth()) {
      try {
        const response = await axios.post(`${api}/transactions/perform`, {
          to: String(accountID),
          from: user?.id,
          amount: String(amount),
          purpose: purpose,
        });

        if (response.status == 200) {
          setMsg({
            text: 'Successfully Transfered!',
            isError: false,
          });
          setAmount(0);
          setAccountID(0);
          setPurpose('');
          setModalOpen(false);
        }
      } catch (error) {
        console.log(error);
        const { status } = error as AxiosError;
        setError(true);
        if (status == 404) {
          setMsg({
            text: 'Insufficient Funds!',
            isError: true,
          });
          setMsg({
            text: 'Something went wrong.',
            isError: true,
          });
          return;
        }

        return;
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Dialog
      modal
      open={modelOpen}
      onOpenChange={() => setModalOpen(!modelOpen)}
    >
      <Dialog.Trigger asChild onPress={() => setModalOpen(!modelOpen)}>
        {button}
      </Dialog.Trigger>
      {msg.text && !msg.isError && (
        <Alert
          open={msg.text && !msg.isError ? true : false}
          title="Success"
          description="Successfully transfered funds."
          onClick={() =>
            setMsg({
              text: '',
              isError: false,
            })
          }
        />
      )}
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Transfer Funds</Dialog.Title>
          <Dialog.Description>
            Type in the account number and amount.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Account No.
            </Label>
            <Input
              value={String(accountID)}
              onChangeText={(text) => setAccountID(Number(text))}
              flex={1}
              keyboardType="number-pad"
              id="accountNo"
              placeholder="Account No."
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Amount
            </Label>
            <Input
              flex={1}
              value={String(amount)}
              onChangeText={(text) => setAmount(Number(text))}
              id="amount"
              keyboardType="number-pad"
              placeholder="0"
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Purpose
            </Label>
            <Input
              flex={1}
              value={purpose}
              onChangeText={setPurpose}
              id="purpose"
              placeholder="Purpose"
            />
          </Fieldset>
          <Button
            disabled={isLoading}
            style={{
              backgroundColor: !isLoading ? colors.light.primary : '#a4a4a4',
              color: colors.light.white,
            }}
            onPress={handleSubmit}
          >
            {isLoading ? 'Transfering...' : 'Transfer'}
          </Button>
          <Text
            style={{
              color: msg.isError ? 'red' : 'green',
              textAlign: 'center',
            }}
          >
            {msg.text}
          </Text>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default TransferFundsDialogue;
