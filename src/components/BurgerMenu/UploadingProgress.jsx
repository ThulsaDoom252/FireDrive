import React from 'react';

const UploadingProgress = ({isMediaLoading, uploadProgress, totalUploadedBytes, totalBytesToUpload}) => {
    return (
        <div className={'w-full flex justify-center items-center flex-col'}>
            {isMediaLoading &&
                <>
                    <div>{uploadProgress}</div>
                    <input type={'range'}
                           value={totalUploadedBytes}
                           min={0}
                           max={totalBytesToUpload}/>
                </>
            }
        </div>
    );
};

export default UploadingProgress;