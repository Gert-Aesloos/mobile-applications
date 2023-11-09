/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CatOverview from './components/CatOverview';
import CatService from './services/CatService';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const App = (): JSX.Element => {
  const [image, setImage] = useState<string>();
  const [catList, setCatList] = useState<string[]>([]);

  const [times, setTimes] = useState<number>(1);

  const getCat = async () => {
    try {
      const response = await CatService.getRandomCat();

      if (response.ok) {
        const imageData = await response.json();
        const imageUrl = `https://cataas.com/cat/${imageData._id}`;
        setImage(imageUrl);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const likeCat = () => {
    if (image) {
      setCatList(catList => [...catList, image]);
      setTimes(times => times++);
    }
    getCat();
  };

  const purgeCats = () => {
    setCatList([]);
  };

  useEffect(() => {
    getCat(); // Fetch the cat image when the component mounts
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function printLikedCats() {
    console.log('liked cats: ', catList);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.container}>
            {image ? (
              <FastImage
                source={{uri: image}}
                style={{width: '100%', aspectRatio: 1}}
              />
            ) : (
              <Text>Loading cat image...</Text>
            )}

            <Section title="description">
              <Text>name: gatto</Text>

              <Text>description: boy who likes sleeping and eating</Text>
            </Section>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={getCat}>
                <Text>👎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={likeCat}>
                <Text>👍</Text>
              </TouchableOpacity>
            </View>

            {/* <Section title="liked cats">
            {catList.length != 0 ? (
              <View>
                <CatOverview catList={catList!} times={0} />
                <TouchableOpacity style={styles.button} onPress={purgeCats}>
                  <Text>purge list</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text>no liked cats</Text>
            )}
          </Section> */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={printLikedCats}>
                <Text>print liked cats</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={purgeCats}>
                <Text>purge list</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // This places the buttons side by side
    justifyContent: 'space-between', // Adjust the spacing between buttons
    paddingHorizontal: 16, // Add horizontal padding to create space between buttons and screen edges
  },
});

export default App;
