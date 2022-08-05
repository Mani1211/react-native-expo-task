import { Text, View ,SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import  { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import VideoImage from '../assets/video.png'
import { firebaseApp } from '../firebase-config';
import { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAnalytics, logEvent} from 'firebase/analytics'


const Login = ({navigation})=>{
  const analytics = getAnalytics(firebaseApp)
  useEffect(async ()=>{
    logEvent(analytics, 'login_visited')
      const accessToken = JSON.parse(await AsyncStorage.getItem('userAccessToken'))
      if(!accessToken) {navigation.navigate('home')}
  },[])

  const [email, setEmail] = useState('')
  const [islogin, setlogin] = useState(false)
  const [password, setPassword] = useState('')
  const login =async ()=>{
    const auth= getAuth(firebaseApp)
    signInWithEmailAndPassword(auth, email, password).then((user)=>{
      const {accessToken}=  user.user
      AsyncStorage.setItem('user', JSON.stringify(user.user))
      AsyncStorage.setItem('userAccessToken', JSON.stringify(accessToken))
      navigation.navigate('home')
      logEvent(analytics, 'login')
    })
  }
  const signup =async ()=>{
    const auth= getAuth(firebaseApp)
    createUserWithEmailAndPassword(auth, email, password).then((user)=>{
      const {accessToken}=  user.user
      AsyncStorage.setItem('user', JSON.stringify(user.user))
      AsyncStorage.setItem('userAccessToken', JSON.stringify(accessToken))
      navigation.navigate('home')
      logEvent(analytics, 'signup')
    })
  }

  console.log('email', email)
    return(
      <SafeAreaView style={{
        flex:1,
        margin:20,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff'
      }}>
          <Text style={{color:'#333', fontSize:30}}>Welcome</Text>
          <View style={{justifyContent:'center', alignItems:'center'}}>
        <Image source={VideoImage} style={{
          width:300,
          height:300
        }}/>
          </View>
          <>
            <TextInput style={{
              height:60,
              borderRadius:30,
              borderColor:'#333',
              width:300,
              borderWidth:1,
              textAlign:'center',
              marginBottom:10
            }}
            placeholder='Email'
            value={email}
            onChangeText={(text)=>setEmail(text)}
            />
            <TextInput style={{
              height:60,
              borderRadius:30,
              borderColor:'#333',
              width:300,
              borderWidth:1,
              textAlign:'center'
            }}
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={(text)=>setPassword(text)}
            />
          </>
          {islogin ? (<> 
          <TouchableOpacity style={{
          backgroundColor:'#AD40AF',
          opacity:.6,
          width:'90%',
          alignItems:'center',
          justifyContent:'center',
          padding:10,
          borderRadius:10
        
        }}  onPress={()=>login()}>
          <Text style={{color:'#fff'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setlogin(!islogin)}>
        <Text>Dont have a account?</Text>
        </TouchableOpacity>
        </>) : (
          <>
        <TouchableOpacity style={{
          backgroundColor:'#AD40AF',
          opacity:.6,
          width:'90%',
          alignItems:'center',
          justifyContent:'center',
          padding:10,
          borderRadius:10
        
        }}  onPress={()=>signup()}>
          <Text style={{color:'#fff'}}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setlogin(!islogin)}>
        <Text>Already have a account? Login</Text>
        </TouchableOpacity>
        </>
      )}
      </SafeAreaView>
    )
}
export default Login