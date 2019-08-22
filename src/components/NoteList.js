import * as React from 'react';
import {Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class NoteList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.photoButton} onPress={() => this.props.navigation.navigate('Playground')}>
                <Icon name="camera" size={35} color="black"/>
            </TouchableOpacity>
            <Text style={styles.headerLabel}>Notes</Text>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.noteList}
                    renderItem={ ({item}) => (
                        <TouchableOpacity key={item.id} onPress={() => this.props.openNote(item.id)} >
                            <View style={styles.note}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.noteTitle}>
                                    {item.title}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.noteDate}>
                                        {item.date}
                                    </Text>
                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.noteText}>
                                        {item.text}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={this.renderHeader}
                    stickyHeaderIndices={[0]}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',

    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 70,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderBottomColor: '#C8C8C8',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },

    photoButton: {
        position: 'absolute',
        left: 10,
        bottom: 2.5
    },

    headerLabel: {
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'FontAwesome'
    },

    note: {
        overflow: 'hidden',
        marginLeft: 15,
        padding: 15,
        height: 70,
        borderBottomColor: '#b4b4b4',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        color: '#434743'
    },

    noteTitle: {
        fontWeight: '900',
        color: '#474947'
    },

    noteDate: {
        marginRight: 5,
        color: '#b4b4b4'
    },

    noteText: {
        width: 200,
        color: '#9e9e9e'
    }
});
