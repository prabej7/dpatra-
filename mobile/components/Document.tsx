import { Document as DocType } from '@/constants/types';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  documents: DocType;
}

const Document: React.FC<Props> = ({ documents }) => {
  return (
    <View  >
      <Text>Document ID : {documents.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default Document;
