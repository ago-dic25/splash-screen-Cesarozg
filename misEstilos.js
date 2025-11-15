import { StyleSheet } from "react-native";

export const estiloTextos = StyleSheet.create({
    texto: {
        color: '#BD93BD',
        fontSize: 16
    },
    counter: {
        color: '#ffffff',
        fontSize: 24
    }
});

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'transparent' 
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    buttonText: {
        fontSize: 16,
        color: '#000'
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    preview: {
        width: '100%',
        height: '80%'
    },
    permissionDeniedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20 
    }
});