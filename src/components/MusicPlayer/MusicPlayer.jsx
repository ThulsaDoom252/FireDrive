import {FiSkipBack, FiSkipForward, FiPlay, FiPause} from 'react-icons/fi';
import {connect, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {audioRoute, delay} from "../../common/commonData";
import SeekBar from "./SeekBar";


const MusicPlayer = ({smallScreenMode}) => {
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const currentRoute = useSelector(state => state.media.currentRoute)

    const audioPage = currentRoute === audioRoute

    const audioIsPresent = currentMediaSet.length !== 0
    const currentTrack = currentMediaSet[currentTrackIndex]

    const audioRef = useRef(null)
    const audio = audioRef.current

    const handlePlay = () => {
        if (audioIsPresent && audio !== null) {
            isCurrentTrackPlaying ? audio.play() : audio.pause()
        }
    }

    useEffect(() => {
        handlePlay()
    }, [isCurrentTrackPlaying]);

    useEffect(() => {
        if (audioPage) {
            const audio = audioRef.current
            if (audioIsPresent && audio) {
                audio.src = currentTrack.url
                audio.load()

                const handleEnded = () => {
                    toggleCurrentTrackPlaying(false);
                    goToNextTrack({dispatch}, currentTrackIndex, audioSet)
                };
                audio.addEventListener('ended', handleEnded);

                return () => {
                    audio.removeEventListener('ended', handleEnded);
                };
            }
        } else {
            void 0
        }

    }, [audioIsPresent, currentTrackIndex, currentRoute]);

    const playCurrentTrack = () => toggleCurrentTrackPlaying(!isCurrentTrackPlaying)

    const handleNextTrack = async () => {
        setCurrentTrackIndex(currentTrackIndex + 1)
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        }
    }
    const handlePreviousTrack = async () => {
        setCurrentTrackIndex(currentTrackIndex - 1)
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        }

    }

    const prevBtnDisabled = currentTrackIndex === 0
    const nextBtnDisabled = currentTrackIndex === currentMediaSet.length - 1


    return (
        <div className={`${!smallScreenMode && 'rounded'} w-full h-full flex flex-col justify-center`}>
            <div className={`w-full h-full flex items-center justify-between  p-5`}>
                <button className="text-2xl text-black disabled:text-gray-500 " disabled={prevBtnDisabled}
                        onClick={handlePreviousTrack}>
                    <FiSkipBack/>
                </button>
                <button className="text-4xl text-black disabled:text-gray-500 " onClick={playCurrentTrack}>
                    {isCurrentTrackPlaying ? <FiPause/> : <FiPlay/>}
                </button>
                <button className="text-2xl text-black disabled:text-gray-500 " disabled={nextBtnDisabled}
                        onClick={handleNextTrack}>
                    <FiSkipForward/>
                </button>
                <audio ref={audioRef}/>
            </div>
            {/*<div>*/}
            {/*    <SeekBar value={0} max={100}/>*/}
            {/*</div>*/}
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen
    }
}

export default connect(mapStateToProps, null)(MusicPlayer);
