import React from 'react';
import _ from 'lodash';
import {connect } from 'react-redux';
import {fetchStream} from '../../actions/index';
import {editStream} from '../../actions/index';
import StreamForm from './StreamForm'
class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    onSubmit=(formValues)=>{
        this.props.editStream(this.props.match.params.id,formValues);
    }
    render=()=>{
        console.log(this.props);
        if( !this.props.stream){
            return <div>Loading...!</div>
        }
        else{
            return(  <div>
                        <h3>Edit Stream</h3>
                        <StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit={this.onSubmit}></StreamForm>
                     </div>    
            );

        }
    }
}


const mapStateToProps=(state,ownProps)=>{
    // console.log(ownProps);
    return{stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);