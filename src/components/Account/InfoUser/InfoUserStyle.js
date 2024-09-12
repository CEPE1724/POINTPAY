import {StyleSheet} from 'react-native';
import { Avatar } from 'react-native-elements';

export const styles = StyleSheet.create({

    content: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        paddingVertical: 30,
    },
    Avatar: {
        marginRight: 20,
        backgroundColor: 'green',
    },
    infoContainer: {
        flexDirection: 'column',
      },
      text: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});