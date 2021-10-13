import React, { useState, useEffect } from "react"
import { SafeAreaView, View, TextInput, ActivityIndicator, Text, TouchableOpacity } from "react-native"
import Colors from "../const/Colors"
import { FontAwesome5 } from '@expo/vector-icons'
import axios from "axios"
import Pictrue from "./Picture"

const Search = ({navigation}) => {

    const [search, setSearch] = useState()
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    const getSearch = async () => {
        setLoading(true)
        setPokemon([])
        console.log(search.toLowerCase())
        if(search.length == 0){
            setLoading(true)
            setPokemon([])
        }else{
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
            .then(res => {
                setPokemon(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setPokemon([])
                setLoading(false)
            })
        }
    }

    const MainView = () => (
        <>
        {pokemon.name ? 
            <TouchableOpacity
                style={{flex:1}}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('details', {name: pokemon.name})}
            >
                <Pictrue name={pokemon.name} />
            </TouchableOpacity>
            :
            <View>
                <Text>I can´t find pokemon {search}</Text>
            </View>
        }
        </>
    )

    return(
        <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
            <View style={{margin:10, flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <TextInput 
                        placeholder="Search by ID or Name"
                        style={{
                            backgroundColor:Colors.purple,
                            borderRadius:8,
                            paddingLeft:40,
                            height:40,
                            color:Colors.white
                        }}
                        placeholderTextColor={Colors.white}
                        onChangeText={(value) => setSearch(value)}
                    />
                    <FontAwesome5 name="search" color={Colors.white} style={{position:'absolute', left:15, top:"33%"}} />
                </View>
                <TouchableOpacity 
                    style={{
                        backgroundColor:Colors.green, 
                        paddingHorizontal:20, 
                        marginLeft:5, 
                        borderRadius:8, 
                        justifyContent:'center', 
                        alignItems:'center'
                    }}
                    activeOpacity={0.8}
                    onPress={() => getSearch()}
                >
                    <FontAwesome5 name="search" color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={{
                padding:20,
                flex:1
            }}>
                {loading ?
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                    :
                    <View style={{height:162}}>
                        <MainView />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Search