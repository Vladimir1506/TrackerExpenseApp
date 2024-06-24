import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManageExpense from './screens/ManageExpense';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {GlobalStyles} from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './UI/IconButton';
import {ExpensesContextProvider} from './store/expenses-context';
import {ScreenNames} from './types/types';

const {primary500, accent500} = GlobalStyles.colors
const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()
export default function App() {
    return (
        <>
            <StatusBar style={'light'}/>
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {backgroundColor: primary500,},
                        headerTintColor: 'white',
                        headerTitleAlign: 'center',
                    }}>
                        <Stack.Screen name={ScreenNames.OverviewExpenses} component={OverviewExpenses}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name={ScreenNames.ManageExpense} component={ManageExpense}
                                      options={{presentation: 'modal'}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
            <StatusBar style="auto"/>
        </>
    );
}

const OverviewExpenses = () =>
    <BottomTab.Navigator screenOptions={({navigation}) => ({
        headerStyle: {
            backgroundColor: primary500,
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        tabBarStyle: {backgroundColor: primary500},
        tabBarActiveTintColor: accent500,
        headerRight: ({tintColor}) => <IconButton color={tintColor} size={24} name={'add'}
                                                  onPress={() => navigation.navigate(ScreenNames.ManageExpense)}/>
    })}>
        <BottomTab.Screen name={ScreenNames.RecentExpenses} component={RecentExpenses} options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({color, size}) => <Ionicons name={'hourglass'} color={color} size={size}/>
        }}/>
        <BottomTab.Screen name={ScreenNames.AllExpenses} component={AllExpenses} options={{
            title: 'All Expenses',
            tabBarLabel: 'All',
            tabBarIcon: ({color, size}) => <Ionicons name={'calendar'} color={color} size={size}/>
        }}/>
    </BottomTab.Navigator>


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
