import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useUserStore } from '@/store';
import Document from '@/components/Document';
import { AccordionC } from '@/components/user';
export default function TabTwoScreen() {
  const { user } = useUserStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      {user?.documents.map(([key, doc], i) => {
        // const base64String = Buffer.from(doc.img).toString('base64');

        return (
          <AccordionC
            key={key}
            title={`${i + 1}. ${doc.name}`}
            children={
              <View style={{}}>
                <View>
                  <Text style={styles.text}>Document ID: {doc.id}</Text>
                  <Text style={styles.text}>Document Name: {doc.name}</Text>
                  <Text style={styles.text}>
                    Verified: {doc.isVerified ? 'Yes' : 'No'}
                  </Text>
                </View>
              </View>
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 48,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bold',
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontFamily: 'Regular',
  },
});
