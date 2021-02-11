import { StatusBar } from 'expo-status-bar';
import Expo from 'expo';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottles] = useState(1);
  const [gender, setGender] = useState('male');
  const [time, setTime] = useState(1);
  const [promilles, setPromilles] = useState(0);

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  function calculate() {
    let gramsleft = 0;
    let litres = 0;
    let grams = 0;
    let burning = 0;
    let result = 0;

    if (weight != 0 && bottle != 0 && time != 0 && (gender === 'male' || gender === 'female')) {

    litres = bottle * 0.33;
    grams = litres * 8 * 4.5;
    burning = weight / 10;
    gramsleft = grams - burning * time;

    if(gender === 'male') {
      result = gramsleft / (weight * 0.7);

      if(result < 0) {
        result = 0;
      }
    }
    else if (gender === 'female') {
      result = gramsleft / (weight * 0.6);

      if(result < 0) {
        result = 0;
      }
    }
    else
    {
      result = 0;
    }
  }
  else {
    result = 0;
  }

    setPromilles(result);
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text> Weight</Text>
        <TextInput
          onChangeText={text => setWeight(text)}
          placeHolder="in kilograms"
          backgroundColor= '#fafafa'
          keyboardType='numeric'></TextInput>
      </View>
      <View style={{margin: 10, minHeight: 200}}>
        <Text> Bottles</Text>
        <DropDownPicker 
          items={[
            {label: '1 bottle', value: 1},
            {label: '2 bottles', value: 2},
            {label: '3 bottles', value: 3},
            {label: '4 bottles', value: 4},
            {label: '5 bottles', value: 5},
            {label: '6 bottles', value: 6},
          ]}
          defaultValue={1}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
         dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setBottles(item.value)}
        />
      </View>
      <View style={{margin: 10, minHeight: 200}}>
        <Text> Time</Text>
        <DropDownPicker 
          items={[
            {label: '1 hour', value: 1},
            {label: '2 hours', value: 2},
            {label: '3 hours', value: 3},
            {label: '4 hours', value: 4},
            {label: '5 hours', value: 5},
            {label: '6 hours', value: 6},
          ]}
          defaultValue={1}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
         dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setTime(item.value)}
        />
      </View>
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm
          style={styles.radio}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />
        <Text style={styles.txt}>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
      </View>
      <Button onPress={calculate} title="Calculate"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 50,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    marginBottom: 5,
  }
});
