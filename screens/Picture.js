import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image } from 'react-native'
import Colors from '../const/Colors'

const Pictrue = ({name}) => {

    useEffect(() => {
        getPicture()
        getColor()
    }, [])

    const [image, setImage] = useState()
    const [color, setColor] = useState([])

    const getPicture = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setImage(data.sprites.front_default)
    } 

    const getColor = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        setColor(data.color.name)
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor: Colors[color], margin:6, padding:10, borderRadius:10, elevation:5}}>
                <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
                    <Image 
                        source={{uri: image}} 
                        style={{
                            width:100, 
                            height:100, 
                            borderRadius:100, 
                            resizeMode:'cover',
                            padding:10,
                            backgroundColor:color == 'white' ? Colors.mainGray : Colors.white 
                        }} 
                    />
                </View>
                <View style={{width:"100%", justifyContent:'center', alignItems:'center', marginVertical:10}}>
                    <Text style={{
                        textAlign:'center', 
                        fontSize:18, 
                        textTransform:'capitalize', 
                        fontWeight:'bold', 
                        color: color == 'white' ? Colors.black : Colors.white
                    }}>
                        {name}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Pictrue;