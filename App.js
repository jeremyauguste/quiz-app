import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';
import { useState } from 'react';
import { ButtonGroup } from '@rneui/themed';

export default function App() {
  return (
    <View style={styles.container}>
      <h1>Sonic the Hedgehog Quiz</h1>
      <Question/>
      <StatusBar style="auto" />
    </View>
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
    textAlign:'center',
  }
});

function Question() {
  // const [answers,setAnswers] = useState(new Array(3).fill(null));
  const [selected, setSelected] = useState(0)
  const [chosen, setChosen] = useState(null)
  const data = [
    {"prompt" : "What color are Sonic's shoes?",
      "type" : "multiple-choice",
      "choices" : [
        "Blue",
        "Yellow",
        "Green",
        "Red"
      ],
      "correct" : 3
    },
    {"prompt" : "Sonic is...",
      "type" : "multiple-answer",
      "choices" : [
        "fast",
        "red",
        "a professional plumber",
        "spiny"
      ],
      "correct" : [0, 3]
    },
    {"prompt" : "True or false: Sonic's shoes have buckles on them.",
      "type" : "true-false",
      "choices" : [
        "True",
        "False",
      ],
      "correct" : 0
    }
  ]

  // const questions = data.map((item, i) => {
  //   return (
  //     <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
  //       <Pressable key={i} style={styles.answer}>{item.choices}</Pressable> 
  //     </View>
  //   )
  // })
  const answers = [
    3,
  ]
  
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedIndexes, setSelectedIndexes] = useState([0,0])

  return (
    <View>
      <h2>{data[selected].prompt}</h2>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
          {/* <Pressable key={i} style={styles.answer} onPress={()=>{setChosen(i); console.log(chosen)}}><Text>{item}</Text></Pressable>  */}
          <ButtonGroup 
          containerStyle={styles.answer} 
          buttons={data[selected].choices} 
          selectedIndex={selectedIndex}
          onPress={(value)=>setSelectedIndex(value)}/>
        </View>
      {selectedIndex != null ? <Pressable style={styles.next} onPress={()=>{setSelected((s)=> s+1); setSelectedIndex(null)}}>Continue</Pressable> : <Text style={styles.next}>Answer to Continue</Text> }
    </View>
  )

}

function Summary() {

  return(
    <View>
      <h2>Summary</h2>
      <h2>Score: </h2>

    </View>
  )
}