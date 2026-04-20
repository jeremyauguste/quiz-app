import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, FlatList } from 'react-native-web';
import { useState } from 'react';
import { ButtonGroup } from '@rneui/themed';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import * as React from 'react'

const data = [
  {
    "prompt": "What color are Sonic's shoes?",
    "type": "multiple-choice",
    "choices": [
      "Blue",
      "Yellow",
      "Green",
      "Red"
    ],
    "correct": 3
  },
  {
    "prompt": "Sonic is...",
    "type": "multiple-answer",
    "choices": [
      "fast",
      "red",
      "a professional plumber",
      "spiny"
    ],
    "correct": [0, 3]
  },
  {
    "prompt": "True or false: Sonic's shoes have buckles on them.",
    "type": "true-false",
    "choices": [
      "True",
      "False",
    ],
    "correct": 0
  }
]

let score = 0;

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Question',
  screens: {
    Question: {
      screen: Question,
      initialParams: { data: data, testID: 0, score: 0 },
      options: {
        title: 'Sonic the Hedgehog Quiz'
      }
    },
    Summary: {
      screen: Summary,
      initialParams: { score: score }
    }
  }
})

const Navigation = createStaticNavigation(RootStack)


export default function App() {
  return (
    <Navigation />
    // <View style={styles.container}>
    //   <h1>Sonic the Hedgehog Quiz</h1>
    //   <Question />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answer: {
    backgroundColor: '#78a0ff',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    width: '100%',
    height: '100px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 100,
    gap: 5
  },
  next: {
    backgroundColor: '#cfd9f0',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    width: '200px',
    alignItems: 'center',
    borderRadius: 100,
    textAlign: 'center',
  }
});

function Question({ route }) {
  let { data, testID, score } = route.params

  const navigation = useNavigation()
  // const [answers,setAnswers] = useState(new Array(3).fill(null));
  // const [selected, setSelected] = useState(0)
  // const [chosen, setChosen] = useState(null)
  // // const data = [
  // //   {
  // //     "prompt": "What color are Sonic's shoes?",
  // //     "type": "multiple-choice",
  // //     "choices": [
  // //       "Blue",
  // //       "Yellow",
  // //       "Green",
  // //       "Red"
  // //     ],
  // //     "correct": 3
  // //   },
  // //   {
  // //     "prompt": "Sonic is...",
  // //     "type": "multiple-answer",
  // //     "choices": [
  // //       "fast",
  // //       "red",
  // //       "a professional plumber",
  // //       "spiny"
  // //     ],
  // //     "correct": [0, 3]
  // //   },
  // //   {
  // //     "prompt": "True or false: Sonic's shoes have buckles on them.",
  // //     "type": "true-false",
  // //     "choices": [
  // //       "True",
  // //       "False",
  // //     ],
  // //     "correct": 0
  // //   }
  // // ]

  // const questions = data.map((item, i) => {
  //   return (
  //     <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
  //       <Pressable key={i} style={styles.answer}>{item.choices}</Pressable>
  //     </View>
  //   )
  // })

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedIndexes, setSelectedIndexes] = useState([])
  let value

  const next = selectedIndex != null && testID < 2 ? <Pressable style={styles.next} onPress={() => {
    {
      testID++; if (selectedIndex == data[0].correct) { score++ }; navigation.replaceParams({
        data: data, testID: testID, score: score
      })
    }; setSelectedIndex(null)
  }}>Continue</Pressable> : <Text style={styles.next}>Answer to Continue</Text>

  const nextMult = selectedIndexes.length > 0 && testID < 2 ? <Pressable style={styles.next} onPress={() => {
    {
      testID++; if (selectedIndexes.includes(0) && selectedIndexes.includes(3)) { score++ }; navigation.replaceParams({
        data: data, testID: testID, score: score
      })
    }; setSelectedIndexes([0])
  }}>Continue</Pressable> : <Text style={styles.next}>Answer to Continue</Text>

  const last = selectedIndex != null ? <Pressable style={styles.next} onPress={() => {
    {
      testID++; if (selectedIndex == data[2].correct) { score++ }; navigation.navigate('Summary', { score: score })
    }; setSelectedIndex(null)
  }}>Results</Pressable> : <Text style={styles.next}>Answer to Continue</Text>

  return (
    <View>
      <h2>{data[testID].prompt}</h2>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        {Array.isArray(data[testID].correct) ?
          <ButtonGroup
            buttonStyle={styles.answer}
            buttons={data[testID].choices}
            selectMultiple={true}
            selectedIndexes={selectedIndexes}
            onPress={(value) => {
              setSelectedIndexes(value); console.log(value);
            }} />
          :
          <ButtonGroup
            buttonStyle={styles.answer}
            buttons={data[testID].choices}
            selectedIndex={selectedIndex}
            onPress={(value) => setSelectedIndex(value)} />}
      </View>
      {testID == 0 ? next : null}
      {testID == 1 ? nextMult : null}
      {testID == 2 ? last : null}

    </View>
  )

}

function Summary({ route }) {
  let { score } = route.params
  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <h1>Quiz Results</h1>
      <h2>Score: {score}/3</h2>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {data.map((item, i) => {
          return (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <h3 key={i}>{item.prompt}</h3>
              <View>
                {item.choices.map((jitem, j) => {
                  if (Array.isArray(item.correct)) {
                    console.log(item.correct.indexOf(j))
                    console.log(j, item.correct);

                  }

                  return (
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      {(Array.isArray(item.correct) && item.correct.indexOf(j) != -1) || j == item.correct ? <p key={j} style={{ fontWeight: 'bold' }}>{jitem}</p> : <p key={j} style={{ textDecoration: 'line-through' }}>{jitem}</p>}
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}