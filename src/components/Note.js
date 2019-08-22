import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Share
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

    onShare(text) {
        Share.share({
            message: text,
        });

    }

    render() {
        let activeNoteId = this.props.activeNoteId;
        let activeNote = this.props.noteList[activeNoteId];
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.onBack()}>
                        <Icon name="chevron-left" size={35} color="black"/>
                        <Text style={{marginBottom: 7, fontSize: 16}}>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton} onPress={() => this.onShare(activeNote.text)}>
                        <Icon name="share-apple" size={35} color="black"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.textarea}>
                    <TextInput onChangeText={(text) => this.props.updateNote(text)} value={activeNote.text}/>
                </View>
                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => this.onRemoveActiveNote()}>
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 8
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
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
        borderTopColor: '#C8C8C8',
        borderTopWidth: 1
    }
});