import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any): Promise<any> => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
}


const getData = async (key: string): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e);
    }
}

const removeData = async (key: string): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export { storeData, getData, removeData };