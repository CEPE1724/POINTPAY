// useFilePicker.js
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { setFileInfo } from '../filePickerSlice/filePickerSlice';

export default () => {
    const dispatch = useDispatch();

    const handleSelectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.plainText], // Solo archivos de texto plano
            });

            // Guardar la información del archivo
            dispatch(setFileInfo({
                path: res.uri,
                type: res.type,
                name: res.name,
                size: res.size,
                encrypted: await RNFS.readFile(res.uri, 'base64'),
            }));
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                dispatch(setFileInfo({})); // Limpiar el estado si se cancela
            } else {
                dispatch(setFileInfo({}));
                throw err;
            }
        }
    };

    return { handleSelectFile };
};
