import React, {useRef} from 'react';
import { handleUpload } from '../utils/uploadAutomata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadButton = ({dataCallback, uploadTimestampCallback, currentModeCallback}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    currentModeCallback(null);
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile, dataCallback, uploadTimestampCallback);
    fileInputRef.current.value='';
  };

  return (
    <>
    <input type="file" id='fileInput' onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
    <label htmlFor="fileInput" className='button'>
        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
    </label></>
  );
}

export default UploadButton;
