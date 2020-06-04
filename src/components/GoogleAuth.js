import React from 'react';
import {connect } from 'react-redux';
import {signIn,signOut} from '../actions';
class GoogleAuth extends React.Component{
    
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                client_id:'763290351987-4t1al68b2ehb9jkmsgigrcfcj8m8m741.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
                    
            });
        });
    }
    onAuthChange=(isSignedIn)=>{
        
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
            
        }
        else{
            this.props.signOut();
        }
    }
    onSignIn=()=>{
        this.auth.signIn();
    }
    onSignOut=()=>{
        this.auth.signOut();
    }
    render(){
    
            if(this.props.isSignedIn === null){
                return null;
            }


            else if(this.props.isSignedIn){
                return(
                    <button onClick={this.onSignOut} className="ui red google button" >
                        <i className="google icon" />
                            Sign Out
                    
                    </button>
                    );
                }
            else{
                return(
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                        Sign in with google
                    
                </button>

                );
            }
        
    };
}

const mapStateToProps=(state)=>{
    return{isSignedIn:state.auth.isSignedIn}
}
export default connect(
    mapStateToProps,
    {signIn,signOut}
)(GoogleAuth);