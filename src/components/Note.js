import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    onBack() {
        this.props.releaseNote();
    }

    onRemoveActiveNote() {
        this.props.removeActiveNote();
    }

    render() {
        let activeNoteId = this.props.activeNoteId;
        let activeNote = this.props.noteList[activeNoteId];
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.onBack()}>
                        <Icon name="chevron-left" size={35} color="black"/>
                        <Text style={{marginBottom: 7}}>Notes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textarea}>
                    <TextInput onChangeText={(text) => this.props.updateNote(text)} value={activeNote.text}/>
                </View>
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.removeButton} onPress={() => this.onRemoveActiveNote()}>
                        <Icon name="trash" size={35} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'stretch'
    },

    topBar: {
        height: 70,
        backgroundColor: '#fff',
        borderBottomColor: '#C8C8C8',
        borderBottomWidth: 1,
        justifyContent: 'flex-end'
    },

    backButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    textarea: {
        height: 70,
        flex: 2,
        backgroundColor: '#f3f3f3'
    },

    bottomBar: {
        height: 70,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        borderTopColor: '#C8C8C8',
        borderTopWidth: 1
    },

    removeButton: {
        marginTop: 10,
        marginLeft: 3
    }
});