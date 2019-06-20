import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {
  const operations = ['D', '+', '-', '*', '/'];
  const [resultText, setResultText] = useState('');
  const [calculationText, setCalculationText] = useState('');

  const buttonPressed = (num) => {
    if (num == '=') {
      return setCalculationText(calculate());
    }
    setResultText(resultText + num);
  }

  const calculate = () => {
    return eval(resultText);
  }

  const operate = (op) => {
    switch (op) {
      case 'D':
        setResultText(resultText.substr(0, resultText.length - 1));
        setCalculationText('');
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText.split('').pop();
        if (operations.indexOf(lastChar) > 0) {
          setResultText(resultText.substr(0, resultText.length - 1) + op);
          return;
        }
        if (resultText == "") return;
        setResultText(resultText + op);
    }
  }

  let rows = [];
  let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity key={nums[i][j]}
          onPress={() => buttonPressed(nums[i][j])}
          style={styles.btn}>
          <Text style={styles.btntext}>{nums[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(<View style={styles.row}>{row}</View>);
  }


  let ops = [];
  for (let i = 0; i < operations.length; i++) {
    ops.push(
      <TouchableOpacity
        onPress={() => operate(operations[i])}
        style={styles.btn}>
        <Text style={[styles.btntext, styles.white]}>{operations[i]}</Text>
      </TouchableOpacity>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculationText}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>
          {rows}
        </View>
        <View style={styles.operations}>
          {ops}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  white: {
    color: 'white'
  },
  btntext: {
    fontSize: 30
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: '#D7D7D7',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#ACACAC',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'yellow'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'black'
  }
});
