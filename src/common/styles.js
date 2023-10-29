/// Video related styles
export const videoContainerStyle = {
    position: 'relative',
    paddingTop: '100%',
};

export const topVideoOptionsBtn = {
    background: 'rgba(104,140,171,0.5)',
    color: '#b9b1b1',
    cursor: 'pointer',
    height: '3rem',
    width: '4rem',
    zIndex: 10,

    '&: hover': {
        color: '#fff',
        background: 'rgba(51,84,131,0.5)',
    }
}

export const videoPlayerOptionsBlock = {
    position: 'absolute',
    display: 'flex',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '30',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease',
}