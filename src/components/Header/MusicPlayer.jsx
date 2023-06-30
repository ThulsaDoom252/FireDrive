import {FiSkipBack, FiSkipForward, FiPlay} from 'react-icons/fi';
import {connect} from "react-redux";

const MusicPlayer = ({smallScreenMode}) => {
    return (
        <div
            className={`${!smallScreenMode && 'rounded'} w-full h-full  flex items-center justify-between  p-5`}>
            <button disabled className="mr-4">
                <FiSkipBack className="text-gray-500 text-2xl"/>
            </button>
            <button disabled className="mr-4">
                <FiPlay className="text-gray-500 text-4xl"/>
            </button>
            <button disabled>
                <FiSkipForward className="text-gray-500 text-2xl"/>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen
    }
}

export default connect(mapStateToProps, null)(MusicPlayer);
