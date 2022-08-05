import { Text, View ,SafeAreaView, TouchableOpacity, Image, FlatList, useWindowDimensions} from 'react-native';
import axios from 'axios';
import {getAnalytics, logEvent} from 'firebase/analytics'
import { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseApp} from '../firebase-config'
const Home = ({navigation})=>{
    const [videos, setVideos]= useState([])
    const {width, height} = useWindowDimensions()
    const [email, setEmail] = useState('')
    console.log('videos', videos)
    const fetchData =async  ()=>{
      let accessToken = await AsyncStorage.getItem('userAccessToken')
      let user =JSON.parse(await AsyncStorage.getItem('user'))
      console.log('accessToken', user.email)
      setEmail(user.email)
        axios.get('https://videoapp-api.herokuapp.com/api/todos/', {headers:{
      //  axios.get('http://localhost:4000/api/todos/', {headers:{
        Authorization: `Bearer ${JSON.parse(accessToken)}`
      }}).then((data)=>{
        setVideos(data.data.data)
      }).catch(err=>{
        console.log('err.response.data.error', err.response.data.error)
        if(err.response.data.error === 'auth/id-token-expired'){
          console.log('err', err.response.data.error)
        }
      })
      }
useEffect(()=>{
  const analytics = getAnalytics(firebaseApp)
  logEvent(analytics, 'homepage_visited')
  console.log('first')
    fetchData()
},[])    
    return (
      <SafeAreaView style={{flex:1,  backgroundColor:'#fff'}}>
        <View style={{
            borderRadius:50,
            display:'flex',
            flexDirection:'row',
            padding:30,
            marginTop:30
        }}>
            <Text style={{ color:'#333', flex:1, fontFamily:'Roboto', fontSize:20,  opacity:.7, borderRadius:10, alignSelf:'flex-start'}}>Video Library</Text>
          <TouchableOpacity style={{  justifyContent:'center',alignItems:'center', backgroundColor:'green', height:40,width:40,color:'#fff', borderRadius:100}} >
            <Text style={{color:'#fff', fontSize:20}} >{email.slice(0,1)}</Text>
          </TouchableOpacity>
        </View>
      <FlatList style={{padding:20, marginBottom:20}} data={videos} renderItem={({item})=>{
        return (
            <View key={item.id} style={{
                backgroundColor:'#333',
                opacity:.6,
                marginVertical:10,
                borderRadius:10
            }}>
        <Video
        style={{
            height:height/3.4,
            width:width * .9,
            borderRadius:10
        }}
        resizeMode='cover'
        source={{
            uri: item.videoUrl,
        }}
        useNativeControls
        />
        </View>
        )
      }}/>
      </SafeAreaView>
    )
  }

  export default Home