import { connect } from 'react-redux'
import Citation from '../components/Citation/index'

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => {
            this.props.navigate('Camera')
        },
        onSave: () => {

        },
        onUndo: () => {

        },
        onRedo: () => {

        }
    }
};

export default connect(mapDispatchToProps)(Citation);