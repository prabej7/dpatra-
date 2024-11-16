import { PayReq } from "@/app/(tabs)";
import { Text, View } from "react-native";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

interface Props {
  request?: PayReq;
  onAccept: () => void;
  onDeny: () => void;
}

export const PaymentRequest: React.FC<Props> = ({
  request,
  onAccept,
  onDeny,
}) => {
  return (
    <AlertDialog open={request ? true : false}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          width={300}
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Payment Request</AlertDialog.Title>
            <AlertDialog.Description
              style={{
                marginBottom: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Regular",
                  }}
                >
                  Requester: {request?.requester.fullName}(
                  {request?.requester.id})
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",
                  }}
                >
                  Amount: Rs. {request?.amount}
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",
                  }}
                >
                  Purpose: {request?.purpose}
                </Text>
              </View>
            </AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end" marginBottom="$3">
              <AlertDialog.Cancel asChild onPress={onDeny}>
                <Button theme="red">Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onPress={onAccept}>
                <Button theme="blue">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
