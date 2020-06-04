import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions/index';
import {Link}  from 'react-router-dom';
class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    }
    renderAdmin=(stream)=>{
        if(stream.userId === this.props.userID){
            return(
                <div className=" right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui primary button">
                     EDIT
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui red button">
                    DELETE
                    </Link>
                    
                </div>
            )
        }

    }
    renderList=()=>{
    
        // console.log(this.props.streamList);
        return Object.values(this.props.streamList).map((stream)=>{
            return (
                <div key={stream.id} className="item">
                    {this.renderAdmin(stream)}
                    <i className="large camera middle aligned icon"> </i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }
    renderStreamCreate=()=>{
        if(this.props.isSignedIn){

            return(
                <div style={{textAlign:'right'}}>
                <Link to="/streams/new" className="ui primary button">
                Create Stream
                </Link>
                </div>
                )
        }
    }
    render(){
        return(
            <div className="streams">
            <div className="ui celled list">
            {this.renderList()}
            {this.renderStreamCreate()}
            </div>
            </div>
        );
    }
};
const mapStateToProps=(state)=>{
    return {
        streamList: state.streams,
        userID:  state.auth.userId,
        isSignedIn:state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,{fetchStreams})(StreamList);