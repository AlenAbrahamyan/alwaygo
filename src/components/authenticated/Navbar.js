import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import Logout from './Logout';
import SearchBox from './SearchBox';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



class Navbar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    state = {
        friendship_info: null,
        forStatus: false
    }

    componentDidMount() {
        axios.get('../api/friendship/friendship_info/' + this.props.auth.user.user.username)
            .then(res => {
                this.setState({
                    friendship_info: res.data
                });
                console.log('axxaaaaaaaaaa');
                console.log(this.state);
            });
    }

    render() {
        const { user } = this.props.auth.user;
        
        if (this.state.forStatus){
            window.location.replace("/notifications");
    }

        const SubmitStatus = this.state.friendship_info ? (async (e) => {

            e.preventDefault();

            axios.post('../api/friendship/status_true', { user: this.props.auth.user.user.username })
                .then(res => { console.log(res.data.msg); this.setState({forStatus: true}) });

        }) : (null);

        
        return (
            <div>
            <div className="Navbar" >
                <a href="/" ><img className="Logo" height="50px" src={Logo} /></a>
                <SearchBox />
                <div className="inNavbar">
                   
                <a href="/MyProfile"className="NameInNavbar"><img className="nav_img" height="25px" src={user ? `${user.profile_img}`  : ''}/><div className="for_sl_size">{user ? `${user.name}`  : ''}</div></a>
                <a href="/friends"className="NameInNavbar"><img src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/67571739_2352949318126973_373308584454258688_n.png?_nc_cat=106&_nc_oc=AQmp_wFrqC1GgPYnNtTQ32bHHsbU9i9v4LP0wll0BZsRUv34h5qnqBJxAVhyUWKDNxo&_nc_ht=scontent.fevn5-1.fna&oh=a006647a45f720778f8b15b7a57c55aa&oe=5DA54050'/><div className="for_sl_size">Frienship</div></a>
                <form className="inline" onSubmit={SubmitStatus}><button className="clean_btn"><a href=""className="NameInNavbar"> <img src={this.state.friendship_info? (this.state.friendship_info.status?('https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/67422531_737376266716017_1888034058152181760_n.png?_nc_cat=103&_nc_oc=AQm_wEl2Hw5-GY_IGo65kar2mSfVk3rkCQmv7wTPQcuUkqs_pqBf3cFkpBuVUwt-DbI&_nc_ht=scontent.fevn5-1.fna&oh=860cc60651d48c0506ffc874e2c352ae&oe=5DAC99A6'):('https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/68456922_465170557653023_9212497957050384384_n.png?_nc_cat=107&_nc_oc=AQnXAyxyAmiGUMnIo7KSh4scFawuiz1za09EJTMURkHRnpeNPxjj_dxH8OMjjbnaSaY&_nc_ht=scontent.fevn5-1.fna&oh=59997ed694e7bfc9cfe0b42e1388552f&oe=5E13A072')) : ('https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/67422531_737376266716017_1888034058152181760_n.png?_nc_cat=103&_nc_oc=AQm_wEl2Hw5-GY_IGo65kar2mSfVk3rkCQmv7wTPQcuUkqs_pqBf3cFkpBuVUwt-DbI&_nc_ht=scontent.fevn5-1.fna&oh=860cc60651d48c0506ffc874e2c352ae&oe=5DAC99A6') }/><div className="for_sl_size">Notifications</div></a></button></form>
                <a href="/messages"className="NameInNavbar"><img src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/67458040_2361392167433194_664182177969209344_n.png?_nc_cat=101&_nc_oc=AQlDAnWO2yMdoKqI2py4woxea-sl7MjGUGQuadBd6ntYDRXj1CY8-JxZh8FF7IqN8_U&_nc_ht=scontent.fevn5-1.fna&oh=e0ed0d03ecab09dad8c3de9730002677&oe=5DDA0182'/><div className="for_sl_size">Messages</div></a>
                <Logout />
                </div>
                </div>
                <div className="justSize">
                    ]
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  
  export default connect(mapStateToProps, null)(Navbar); 



