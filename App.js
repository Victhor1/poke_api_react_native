import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import 'react-native-gesture-handler';
import Colors from './const/Colors';
import Details from './screens/Details';
import Home from './screens/Home';
import { FontAwesome5 } from '@expo/vector-icons'
import Search from './screens/Search';
import { TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator()

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="home" 
                    component={Home} 
                    options={({navigation}) => ({
                        title: 'Pokedex',
                        headerStyle:{
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('search')}
                                style={{
                                    width:30,
                                    height:30,
                                    backgroundColor:Colors.white,
                                    marginRight:20,
                                    borderRadius:100,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <FontAwesome5 
                                    name='search' 
                                    color={Colors.primary}
                                    size={15}
                                />
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen 
                    name="details" 
                    component={Details} 
                    options={{
                        title: 'Details',
                        headerStyle:{
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} 
                />
                <Stack.Screen 
                    name="search" 
                    component={Search} 
                    options={{
                        title: 'Search',
                        headerStyle:{
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
