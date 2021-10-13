import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import Colors from '../const/Colors'
import * as Progress from 'react-native-progress';

function Details({route}) {
    const name = route.params.name

    useEffect(() => {
        getPokemon()
    }, [])

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [species, setSpecies] = useState([])
    const [color, setColor] = useState()
    const [stats, setStats] = useState([])
    const [desc, setDesc] = useState([])
    const [abilities, setAbilities] = useState([])

    const getPokemon = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setPokemon(data)
        setStats(data.stats)
        setAbilities(data.abilities)
        getSpecies()
    }

    const getSpecies = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        setSpecies(data)
        setColor(data.color.name)

        /*data.flavor_text_entries.some(flavor => {
            if(flavor.language.name == 'en'){
                setDesc(flavor.flavor_text.replace(/\s/g, ' '))
            }
        })*/

        setDesc(data.flavor_text_entries[0])
        setLoading(false)
    }

    const MainView = () => (
        <ScrollView>
            <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
                <Image source={{uri: `${pokemon.sprites.front_default}`}} style={{width:300, height:300}} />
            </View>
            <View 
                style={{
                    backgroundColor: color == 'white' ? Colors.black : Colors.white, 
                    padding:20, 
                    borderTopLeftRadius:30, 
                    borderTopRightRadius:30
                }}
            >
                <View style={{marginTop:10, width:"100%", flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:"80%"}}>
                        <Text style={{fontWeight:'bold', fontSize:40, textTransform:'capitalize', color:color == 'white' ? Colors.white : Colors.black}}>
                            {pokemon.name}
                        </Text>
                    </View>
                    <View style={{width:"20%", justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{fontSize:20, color:color == 'white' ? Colors.white : Colors.black}}>
                            #{pokemon.id}
                        </Text>
                    </View>
                </View>
                <View style={{marginTop:20, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontWeight:'bold', marginRight:20, fontSize:20, color:color == 'white' ? Colors.white : Colors.black}}>
                        Abilities:
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {abilities.map((ability, index) => (
                            <View 
                                key={index}
                                style={{
                                    backgroundColor:Colors[color],
                                    marginRight:10,
                                    paddingHorizontal:15,
                                    paddingVertical: 5,
                                    borderRadius:100
                                }}
                            > 
                                <Text
                                    style={{
                                        color: color == 'white' ? Colors.black : Colors.white,
                                        fontWeight:'bold',
                                        textTransform:'capitalize'
                                    }}
                                >
                                    {ability.ability.name}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{width:"100%", marginTop:20}}>
                    <Text style={{fontSize:22, textAlign:'justify', color:color == 'white' ? Colors.white : Colors.black}}>
                        {desc.flavor_text.replace(/\s/g, ' ')}
                    </Text>
                </View>
                <View style={{marginTop:20, width:"100%", flexDirection:'row'}}>
                    <View style={{backgroundColor:Colors[color], flex:1, padding:10, borderRadius:5, marginRight:3, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:color == 'white' ? Colors.black : Colors.white, fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>
                            exp
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center', color:color == 'white' ? Colors.black : Colors.white}}>
                            {pokemon.base_experience}
                        </Text>
                    </View>
                    <View style={{backgroundColor:Colors[color], flex:1, padding:10, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:color == 'white' ? Colors.black : Colors.white, fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>
                            height
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center', color:color == 'white' ? Colors.black : Colors.white}}>
                            {(pokemon.height * 10) / 100}m
                        </Text>
                    </View>
                    <View style={{backgroundColor:Colors[color], flex:1, padding:10, borderRadius:5, marginLeft:3, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:color == 'white' ? Colors.black : Colors.white, fontWeight:'bold', textTransform:'uppercase', textAlign:'center'}}>
                            weight
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center', color:color == 'white' ? Colors.black : Colors.white}}>
                            {(pokemon.weight * 100) /1000}kg
                        </Text>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontWeight:'bold', marginTop:20, fontSize:25, color:color == 'white' ? Colors.white : Colors.black}}>
                        Stats
                    </Text>
                    {stats.map((stat, index) => (
                        <View key={index} 
                            style={{
                                width:"100%",
                                flexDirection:'row',
                                marginTop:10,
                            }}
                        >
                            <Text style={{fontSize:20, textTransform:'capitalize', color:color == 'white' ? Colors.white : Colors.black}}>
                                {stat.stat.name}
                            </Text>
                            <View style={{justifyContent:'center', flex:1, paddingHorizontal:5}}>
                                <Progress.Bar 
                                    progress={stat.base_stat * 0.01}
                                    indeterminate={false}
                                    color={Colors[color]}
                                    width={null}
                                />
                            </View>
                            <Text style={{fontSize:20, color:color == 'white' ? Colors.white : Colors.black}}>
                                {stat.base_stat}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )

    return (
        <SafeAreaView style={{backgroundColor: `${Colors[color]}`, flex:1}}>
            {loading ?
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
                :
                <MainView />
            }
        </SafeAreaView>
    )
}

export default Details
