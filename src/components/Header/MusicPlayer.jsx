import { FiSkipBack, FiSkipForward, FiPlay } from 'react-icons/fi';

const MusicPlayer = () => {
    return (
        <div className="w-300  h-12 mx-auto flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-4">
            <button disabled className="mr-4">
                <FiSkipBack className="text-gray-500 text-2xl" />
            </button>
            <button disabled className="mr-4">
                <FiPlay className="text-gray-500 text-4xl" />
            </button>
            <button disabled>
                <FiSkipForward className="text-gray-500 text-2xl" />
            </button>
        </div>
    );
};

export default MusicPlayer;
