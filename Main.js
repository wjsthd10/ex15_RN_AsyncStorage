import React,{Component} from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component{

    constructor(){
        super();
        this.state={
            text:'result',
            // TextInput에서 입력된 글씨를 가진 변수
            inputText:''
        }
    }

    render(){
        return(
            <View style={styles.root}>
                <TextInput 
                    style={styles.textinput}
                    placeholder='Enter Some Text here'
                    onChangeText={(value)=>{this.setState({inputText:value})}}
                    // {this.changeText}
                    value={this.state.inputText}
                >
                    {/* {this.state.inputText} */}
                </TextInput>
                <View style={styles.button}>
                    <Button title="save Button" onPress={()=>{this.saveData()}}></Button>
                </View>
                
                    <Button title="load Button" color='orange' onPress={()=>{this.loadData()}}></Button>

                    <Button title="ES7을 이용한 비동기 처리" color='green' onPress={()=>{this.getData()}}></Button>

                <Text style={styles.text}>{this.state.text}</Text>
            </View>
        )
    }

    changeText=(value)=>{
        this.setState({inputText:value})
    }

    saveData=async()=>{
        // AsyncStorage에 저장 [마치 android의 SharedPreferencesd와 비슷]
        await AsyncStorage.setItem('Data',this.state.inputText);
        // alert(this.state.inputText);
        this.setState({inputText:''});

        // 원래 저장하는 것도 비동기처리를 해야한다. async await문법 사용해야함
    }

    loadData=()=>{
        // 저장되어 있는 값 읽기 'Data'식별자로 저장된
        // 비동기 방식 별도 스레드라는것
        // 즉.. 값을 주세요.. 라는 요청과 별도로 메인 스레드가 진행된다.
        // 비동기처리는 promiss문법으로 처리 .then()
        AsyncStorage.getItem('Data')
        .then((value)=>{this.setState({text:value})})
    }

    getData=async()=>{
        const value= await AsyncStorage.getItem('Data');
        if(value !=null) this.setState({text:value});
    }
    // async await문법

}

const styles=StyleSheet.create({
    root:{
        flex:1,
        padding:16
    },
    textinput:{
        paddingHorizontal:16,
        borderWidth:1,
        borderRadius:8,
        marginBottom:16,
        borderColor:'#55226688'
    },
    button:{
        marginVertical:8
    },
    text:{
        marginHorizontal:16,
        fontSize:20,
        padding:16,
        fontWeight:"bold"
    }

})