import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle, TouchableHighlight } from 'react-native';


const ADD = '+'
const SUBTRACT = '−'
const MULTIPLY = '×'
const DIVIDE = '÷'
const MODULUS = '%'

const MathOperations = [ADD, SUBTRACT, MULTIPLY, DIVIDE, MODULUS];

function Calculator() {
  const [displayValue, setDisplayValue] = useState<string | null>(null)
  const [action, setAction] = useState<string | null>(null)
  const [storedValue, setStoredValue] = useState<number | null>(null)
  const [clearDisplay, setClearDisplay] = useState(false)
  const [actionActive, setActionActive] = useState<string | null>(null)

  function calculate(): number | null {
    const num = Number(displayValue)
    if (!storedValue) return num
    switch (action) {
      case ADD:
        return storedValue + num
      case SUBTRACT:
        return storedValue - num
      case MULTIPLY:
        return storedValue * num
      case DIVIDE:
        return storedValue / num
      case MODULUS:
        return storedValue % num
    }
  }

  const onPress = (value: string) => {
    if (value === 'AC') {
      setDisplayValue(null)
      setAction(null)
      setStoredValue(null)
      return
    }
    if (Number(value) || value === '0') {
      if (!displayValue && value === '0') return
      if (clearDisplay) {
        setDisplayValue(value)
        setClearDisplay(false)
        setActionActive(null)
        return
      }
      setDisplayValue((prev) => prev ? prev + value : value);
      return
    }
    if (MathOperations.includes(value)) {
      setActionActive(value)

      if (!Number(displayValue)) return

      const num = Number(displayValue)
      if (storedValue) {
        setStoredValue(calculate())
      } else {
        setStoredValue(num)
      }

      if (action) {
        setDisplayValue(String(calculate()))
      }

      setAction(value)
      setClearDisplay(true)
      return
    } else {
      if (actionActive) {
        setActionActive(null)
      }
    }
    if (value === '=') {
      setDisplayValue(String(calculate()))
      setStoredValue(null)
      return
    }

    if (value === '+/-') {
      setDisplayValue(value => {
        const num = Number(value)
        if (num > 0) {
          return '-' + value
        } else if (num < 0) {
          return value.slice(1)
        } else return value
      })
    }

  }
  console.log({ displayValue, action, storedValue })

  const buttons = ['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '=']
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: 'black', flexDirection: 'column', height: '100%', }}>
        <View style={{ height: '35%', flexDirection: 'row-reverse', alignItems: 'flex-end', paddingHorizontal: 35 }}>
          <Text numberOfLines={1} style={{ color: 'white', fontSize: displayValue?.length > 6 ? 60 : 90, fontFamily: 'Helvetica', fontWeight: '300' }}>{displayValue?.slice(0, 6) || 0}</Text>
        </View>
        <View style={{ height: '100%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {buttons.map((button, idx) => {
            let buttonStyle: StyleProp<ViewStyle> = styles.button
            let textStyle: StyleProp<TextStyle> = { color: 'white', fontSize: 40, }
            if (button === '0') {
              buttonStyle = { ...buttonStyle, flexGrow: 2 }
            }
            if (['AC', '+/-', '%'].includes(button)) {
              buttonStyle = { ...buttonStyle, backgroundColor: '#B3B3B3' }
              textStyle = { ...textStyle, color: 'black' }
            }
            if (['÷', '×', '−', '+', '='].includes(button)) {
              buttonStyle = { ...buttonStyle, backgroundColor: '#FF9500' }
            }
            if (button === actionActive) {
              buttonStyle = {
                ...buttonStyle, backgroundColor: 'white'
              }
              textStyle = {
                ...textStyle, color: '#FF9500'
              }
            }
            let displayButton = button
            if (button === 'AC' && displayValue) {
              displayButton = 'C'
            }
            return (
              <TouchableHighlight underlayColor={'#D4D4D2'} key={idx} style={buttonStyle}
                onPress={() => onPress(button)}
              >
                <Text style={textStyle}>{displayButton}</Text>
              </TouchableHighlight>
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Calculator

const buttonSize = 80;

const styles = StyleSheet.create({
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#505050',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  }
});
