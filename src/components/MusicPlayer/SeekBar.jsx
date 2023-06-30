const SeekBar = ({value, max, onChange}) => {
    return (
        <input
            type="range"
            min="0"
            max={max}
            value={value}
            onChange={onChange}
            className="h-2 w-full rounded-lg bg-gray-300"
        />
    );
};


export default SeekBar