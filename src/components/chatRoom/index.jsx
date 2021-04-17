import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { THEME } from '../../theme';
import Message from './messageList/Message';

export default Chat = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState('')

  const handleUpdateMessage = (text) => {
    setMessage(text);
  }

  const send = (text) => {
    if(text == ''){
      return;
    }else{
      sendMessage(text);
      setMessage('')
    }
  }

  return (
    <View>
      <View>
        <Text style={styles.title}>Chat</Text>
      </View>
      
      <ScrollView 
        style={styles.wrapper}>
        <FlatList
          data={messages}
          keyExtractor={item => item._id}
          renderItem={ ({item}) => <Message message={item}/>}
        />
          
      </ScrollView>
      <TextInput 
        style={styles.input} 
        placeholder="Enter a message..."
        onChangeText={(text) => handleUpdateMessage(text)} 
        value={message}
      />
      <Button style={styles.button} onPress={() => send(message)} title="Send"/>
    </View>
  )
} 

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  wrapper: {
    margin: 10,
    width: '95%',
    height: 400,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR
  },
  input: {
    width: '90%',
    margin: 15,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  button: {
    backgroundColor: THEME.MAIN_COLOR
  }
})