import React from "react";
import ReactHowler from "react-howler";
import raf from "raf"; // requestAnimationFrame polyfill

// icon
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { BiShuffle } from "react-icons/bi";
import { MdLoop } from "react-icons/md";
import { BsMusicNote } from "react-icons/bs";

// css
import "./musicPlayer.scss";
import MusicList from "../MusicList/MusicList";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.sources = this.props.data.musicList.map((song) => song.src);
    this.image = this.props.data.musicList.map((image) => image.image);
    this.singer = this.props.data.musicList.map((singer) => singer.singer);
    this.songName = this.props.data.musicList.map((songName) => songName.name);

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false,
      muteIcon: false,
      volumeIcon: false,
      currentSrcIndex: 0,
      currentImageIndex: 0,
      currentSingerIndex: 0,
      currentSongNameIndex: 0,
      shuffle: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this);
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this);
    this.handleSeekingChange = this.handleSeekingChange.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.handlePrevSong = this.handlePrevSong.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  handleNextSong() {
    if (this.state.currentSrcIndex < this.sources.length - 1) {
      this.setState({ currentSrcIndex: this.state.currentSrcIndex + 1 });
      this.setState({ currentImageIndex: this.state.currentSrcIndex + 1 });
      this.setState({ currentSongNameIndex: this.state.currentSrcIndex + 1 });
      this.setState({ currentSingerIndex: this.state.currentSrcIndex + 1 });
    } else {
      this.setState({ currentSrcIndex: 0 });
      this.setState({ currentImageIndex: 0 });
      this.setState({ currentSongNameIndex: 0 });
      this.setState({ currentSingerIndex: 0 });
    }
  }

  handlePrevSong() {
    if (this.state.currentSrcIndex === 0) {
      this.setState({ currentSrcIndex: this.sources.length - 1 });
      this.setState({ currentImageIndex: this.sources.length - 1 });
      this.setState({ currentSongNameIndex: this.sources.length - 1 });
      this.setState({ currentSingerIndex: this.sources.length - 1 });
    } else {
      this.setState({ currentSrcIndex: this.state.currentSrcIndex - 1 });
      this.setState({ currentImageIndex: this.state.length - 1 });
      this.setState({ currentSongNameIndex: this.state.length - 1 });
      this.setState({ currentSingerIndex: this.state.length - 1 });
    }
  }

  handleShuffle() {
    this.setState({ shuffle: !this.state.shuffle, loop: false });
  }

  handleToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
    });
  }

  handleOnPlay() {
    this.setState({
      playing: true,
    });
    this.renderSeekPos();
  }

  handleRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.sources.length);
    } while (newIndex === this.state.currentSrcIndex);
    return newIndex;
  }

  handleOnEnd() {
    const randomSong = this.handleRandomSong();
    if (this.state.shuffle) {
      this.setState({ currentSrcIndex: randomSong });
      this.setState({ currentImageIndex: randomSong });
      this.setState({ currentSingerIndex: randomSong });
      this.setState({ currentSongNameIndex: randomSong });
    } else if (this.state.loop) {
      this.setState({ currentSrcIndex: this.state.currentSrcIndex });
    } else if (this.state.currentSrcIndex < this.sources.length - 1) {
      this.setState({ currentSrcIndex: this.state.currentSrcIndex + 1 });
      this.setState({ currentSrcIndex: this.state.currentImageIndex + 1 });
      this.setState({ currentSrcIndex: this.state.currentSingerIndex + 1 });
      this.setState({ currentSrcIndex: this.state.currentSongNameIndex + 1 });
    } else {
      this.setState({
        playing: false,
        currentSrcIndex: 0,
        currentImageIndex: 0,
        currentSingerIndex: 0,
        currentSongNameIndex: 0,
      });
    }
    this.clearRAF();
    console.log(this.state.currentSrcIndex);
    console.log(this.state.currentSrcIndex);
  }

  handleLoop() {
    this.setState({
      loop: !this.state.loop,
      shuffle: false,
    });
    this.setState({ currentSrcIndex: this.state.currentSrcIndex });
  }

  handleMuteToggle() {
    this.setState({
      mute: !this.state.mute,
      muteIcon: !this.state.muteIcon,
      volumeIcon: !this.state.volumeIcon,
    });
  }

  handleMouseDownSeek() {
    this.setState({
      isSeeking: true,
    });
  }

  handleMouseUpSeek(e) {
    this.setState({
      isSeeking: false,
    });

    this.player.seek(e.target.value);
  }

  handleSeekingChange(e) {
    this.setState({
      seek: parseFloat(e.target.value),
    });
  }

  renderSeekPos() {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek(),
      });
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  handleRate(e) {
    const rate = parseFloat(e.target.value);
    this.player.rate(rate);
    this.setState({ rate });
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  render() {
    return (
      <div
        className="absolute bottom-[17%] left-[50%]"
        style={{ transform: "translate(-50%,0)" }}
      >
        <div className="flex flex-col items-center justify-center mb-[20%] space-y-5">
          <div className="rounded-full w-[250px] h-[250px] shadow-2xl">
            <img
              src={this.image[this.state.currentImageIndex]}
              alt="image"
              className="w-full h-full rounded-full spin object-cover"
            />
          </div>
          <div className="flex items-center justify-center space-x-5">
            <BsMusicNote size={20} />
            <p className="text-[20px] cursor-default">
              {this.songName[this.state.currentSongNameIndex]} &#40;
              {this.singer[this.state.currentSingerIndex]}&#41;
            </p>
          </div>
        </div>
        <ReactHowler
          src={this.sources[this.state.currentSrcIndex]}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />
        <div className="flex items-center justify-center my-5 space-x-5">
          <p>{new Date(this.state.seek * 1000).toISOString().substr(11, 8)}</p>
          <label>
            <span>
              <input
                className="playerRange"
                type="range"
                min="0"
                max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                step=".01"
                value={this.state.seek}
                onChange={this.handleSeekingChange}
                onMouseDown={this.handleMouseDownSeek}
                onMouseUp={this.handleMouseUpSeek}
              />
            </span>
          </label>

          <p>
            {this.state.duration
              ? new Date(this.state.duration * 1000).toISOString().substr(11, 8)
              : "..."}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-6 my-5">
          <>
            <label htmlFor="loop">
              <div className="hover:text-white transition-all cursor-pointer rounded-full">
                {this.state.loop ? (
                  <MdLoop size={30} color="red" />
                ) : (
                  <MdLoop size={30} />
                )}
              </div>
            </label>
            <input
              id="loop"
              className="hidden"
              type="checkbox"
              checked={this.state.loop}
              onChange={this.handleLoop}
            />
          </>
          <button onClick={this.handlePrevSong}>
            <div className="hover:text-white transition-all rounded-full">
              <BiSkipPrevious size={50} />
            </div>
          </button>
          <button onClick={this.handleToggle}>
            {this.state.playing ? (
              <div className="hover:text-white transition-all rounded-full">
                <AiFillPauseCircle size={60} />
              </div>
            ) : (
              <div className="hover:text-white transition-all">
                <AiFillPlayCircle size={60} />
              </div>
            )}
          </button>
          <button onClick={this.handleNextSong}>
            <div className="hover:text-white transition-all rounded-full">
              <BiSkipNext size={50} />
            </div>
          </button>
          <button onClick={this.handleShuffle}>
            <div className="hover:text-white transition-all rounded-full">
              {this.state.shuffle ? (
                <BiShuffle size={30} color="red" />
              ) : (
                <BiShuffle size={30} />
              )}
            </div>
          </button>
        </div>
        <div className="flex items-center justify-center space-x-5 my-5">
          <label htmlFor="mute">
            {this.state.volumeIcon ? (
              <div className="hover:text-white transition-all cursor-pointer rounded-full">
                <BsFillVolumeMuteFill color="red" size={30} />
              </div>
            ) : (
              <div className="hover:text-white transition-all cursor-pointer rounded-full">
                <BsFillVolumeUpFill size={30} />
              </div>
            )}
          </label>
          <input
            className="range"
            type="range"
            min="0"
            max="1"
            step=".05"
            value={this.state.volume}
            onChange={(e) =>
              this.setState({ volume: parseFloat(e.target.value) })
            }
          />
          <div>
            <MusicList />
          </div>
          <div className="hidden">
            <input
              type="checkbox"
              checked={this.state.mute}
              onChange={this.handleMuteToggle}
              className="hidden"
              id="mute"
            />
            <label htmlFor="mute">
              {this.state.muteIcon ? (
                <BsFillVolumeMuteFill color="red" size={30} />
              ) : (
                <BsFillVolumeMuteFill color="black" size={30} />
              )}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
