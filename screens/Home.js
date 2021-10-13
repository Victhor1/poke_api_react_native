import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Colors from '../const/Colors'
import Picture from './Picture'

function Home({navigation}) {

    useEffect(() => {
        getPokemons()
    }, [])

    const [limit, setLimit] = useState(22)
    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])

    const getPokemons = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        const {results} = data
        setPokemons(results)
        setLoading(false)
    }

    /*const getPicture = (url) => {
    
        const replaceUrl = 'https://pokeapi.co/api/v2/pokemon/'
        const replace = url.replace(replaceUrl, '')
        const number = replace.replace('/','.png')
    
        return(
            <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}`}} style={{width:100, height:100, borderRadius:100, resizeMode:'cover', backgroundColor:Colors.green, padding:10}} />
        )
    }*/

    const RenderPokemon = ({item}) => (
        <TouchableOpacity
            style={{flex:1}}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('details', {name: item.name})}
        >
            <Picture name={item.name} />
        </TouchableOpacity>
    )

    const MainView = () => (
        <>
            <FlatList 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding:10}}
                numColumns={2}
                data={pokemons}
                renderItem={RenderPokemon}
                keyExtractor={item => item.name.toString()}
            />
        </>
    )

    return (
        <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
            {loading ?
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color={Colors.white} />
                </View>
                :
                <MainView />
            }
        </SafeAreaView>
    )
}

export default Home
