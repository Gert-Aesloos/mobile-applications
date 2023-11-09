import {Key} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  catList: string[];
  times: number;
};

const CatOverview: React.FC<Props> = ({catList, times}: Props) => {
  return (
    <View>
      {catList &&
        catList.map((cat: string, index: number) => (
          <View key={index} style={styles.container}>
            <FastImage
              source={{uri: cat}}
              style={{width: '100%', aspectRatio: 1}}
            />
            <Text>{cat}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CatOverview;
