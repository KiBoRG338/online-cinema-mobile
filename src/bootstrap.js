import * as Font from 'expo-font';

export async function bootstrap(){
    try{
        await Font.loadAsync({
            'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
        })

        console.log('Database started...')
    } catch(e) {
        console.log('Error: ', e)
    }
    
}