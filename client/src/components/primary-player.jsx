import Genre from './genre.jsx';
import Wave from './wave.jsx';
import FooterPlayer from './footer-player.jsx';

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');
const moment = require('moment');

const localUrl = 'http://localhost:3004';
// former prodUrls = 'http://ec2-52-41-170-203.us-west-2.compute.amazonaws.com:3004';
//                 & 'http://ec2-54-176-133-165.us-west-1.compute.amazonaws.com:3004';
// 5/1 Server Module 1 &  'http://ec2-54-177-234-64.us-west-1.compute.amazonaws.com:3004';
const prodUrl = 'ec2-18-144-155-168.us-west-1.compute.amazonaws.com:3004'// This is the load-balancer => 'http://ec2-54-193-221-123.us-west-1.compute.amazonaws.com';
  // 5/1 The above prodUrl now points to the NginX Load-Balancer
// const API_URL = (window.location.host === 'localhost:3004') ? localUrl : prodUrl;
const API_URL = (window.location.hostname === 'localhost') ? localUrl : prodUrl;

class PrimaryPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      author: 'Mrotek Music',
      title: 'Song Title - Here',
      uploadTime: '3 months ago',
      genre: 'Electronic',
      image: 'https://i1.sndcdn.com/artworks-000621689221-np6gn7-t500x500.jpg',
      songUrl: 'http://d1vgv8e3fkby3.cloudfront.net/song1.mp3',
      songId: (location.href.substring(location.href.lastIndexOf('/') + 1) || 1),
      // songUrl: 'http://localhost:3004/sample.mp3',
      users: [],
      playedPercentage: 0,
      currentTime: "0:00",
      duration: "0:00"
    };
  }

  componentDidMount() {
    console.log('this is the songId: ', this.state.songId, 'this is the API_URL: ', API_URL)
    // axios.get(`http://ec2-34-220-99-82.us-west-2.compute.amazonaws.com:8080/comment/${this.state.songId}`)
      // This url is Taka's load balancer: 3.101.21.253:8000
    axios.get(`http://3.101.21.253:8000/comment/${this.state.songId}`)
      .then((response) => {
        // handle success
        // console.log('comments: ', response.data);
        const returnedComments = response.data;
        this.setState({
          users: returnedComments,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }

  getSong(loadSongCallback) {
    axios.get(`${API_URL}/songs/${this.state.songId}`)  //changed by Shain 4/20/20
    //axios.get(`${localUrl}/songs/${this.state.songId}`)
      .then((response) => {
        // handle success
        const returnedSong = response.data;
        this.setState({
          author: returnedSong.author,
          title: returnedSong.title,
          uploadTime: returnedSong.createdAt,
          songUrl: returnedSong.audio_file_path,
          genre: returnedSong.genre,
          image: returnedSong.artwork_url,
        });
      })
      .catch((error) => {
        // handle error
        console.log('This is the error from get request: ', error);
      })
      .finally(() => {
        // always executed
        loadSongCallback();
      });
  }

  toggleSong() {
    const newSongStatus = !(this.state.isPlaying);
    this.setState({
      isPlaying: newSongStatus,
    });
  }

  updatePlayedPercentage(newTime, totalDuration) {
    let percentage = (newTime * 100) / totalDuration;
    this.setState({
      playedPercentage: percentage
    });
  }

  formatTime(time) {
    let minutes = "0";
    let seconds = "0";
    if (time > 60) {
      minutes = Math.floor(time / 60);
      seconds = Math.floor(time % 60);
    } else {
      seconds = time.toFixed(0);
    }
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
  }

  updateCurrentTime(newTime) {
    let formattedTime = this.formatTime(newTime);
    this.setState({
      currentTime: formattedTime
    });
  }

  updateDuration(duration) {
    let formattedDuration = this.formatTime(duration);
    this.setState({
      duration: formattedDuration
    });
  }

  render() {
    return (
      <div className="primary-player">
        <div className="box play-intro">
          <div className="play-intro__icon-box">
            <div className="play-intro__icon-wrapper">
              <div onClick={this.toggleSong.bind(this)} className={`play-intro__icon ${this.state.isPlaying ? 'play-intro__icon--pause' : ''} `} />
            </div>
          </div>
          <div className="play-intro__info">
            <div className="play-intro__author-box">
              <span className="play-intro__author">{this.state.author}</span>
            </div>
            <div className="play-intro__title-box">
              <span className="play-intro__title">{this.state.title}</span>
            </div>
          </div>
        </div>
        <div className="box info-box">
          <div className="info-box__uploadTime">
            {moment(this.state.uploadTime).fromNow()}
          </div>
          <Genre genre={this.state.genre} />
        </div>
        <div className="box artwork">
          <img src={this.state.image} alt="" />
        </div>
        <Wave
          waveRef={this.state.waveRef}
          users={this.state.users}
          songUrl={this.state.songUrl}
          getSong={this.getSong.bind(this)}
          isPlaying={this.state.isPlaying}
          updatePlayedPercentage={this.updatePlayedPercentage.bind(this)}
          updateCurrentTime={this.updateCurrentTime.bind(this)}
          updateDuration={this.updateDuration.bind(this)}
          toggleSong={this.toggleSong.bind(this)}
        />
        <FooterPlayer
          isPlaying={this.state.isPlaying}
          author={this.state.author}
          title={this.state.title}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          playedPercentage={this.state.playedPercentage}
          toggleSong={this.toggleSong.bind(this)}
        />
      </div>

    );
  }
}

export default PrimaryPlayer;
