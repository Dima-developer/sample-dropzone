import React, { useState, useCallback, useEffect } from 'react';
// import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import clsx from 'classnames';
import styles from './upload_dropzone.module.scss';
import CloseIcon from '../svg/CloseIcon';

const UploadDropZone = ({ name, isDisabled, setFile}) => {
  const [isDisabledZone, setIsDisabledZone] = useState(true);
  const [docFile, setDocFile] = useState([]);
  const [rejFile, setRejFile] = useState([]);

  useEffect(() => {
    setIsDisabledZone(isDisabled);
    if (isDisabled) {
      setDocFile([]);
      setRejFile([]);
    }
  }, [isDisabled]);

  useEffect(() => {
    // setFile(docFile[0]);
    if (docFile.length > 0) {
      let fileDoc = docFile[0].path;
      setFile(fileDoc)
    } else {
      setFile('')
    }
  }, [docFile]);
  
  // console.log('docFile Array: ', docFile);

  const onDrop = useCallback((accFiles, rejFiles) => {
    console.log('accFiles: ', accFiles);
    setDocFile(accFiles);
    setRejFile(rejFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragAccept, open } =
    useDropzone({
      onDrop,
      disabled: isDisabledZone,
      noClick: true,
      noKeyboard: true,
      accept:
        '.pdf, .doc, .docx, .xml, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain',
    });

  const removeFileHandler = () => {
    setDocFile([]);
  };

  return (
    <section
      className={clsx(
        styles.dndContainer,
        isDisabledZone && styles.disableZone
      )}
    >
      <input style={{ display: 'none' }} type='file' name={name} />
      
      <div
        {...getRootProps({
          className: clsx(styles.dndZone, isDragAccept && styles.dragEnterZone),
        })}
      >
        <input {...getInputProps()} className={styles.inputUpload} />
        {/* <div className={styles.uploadIcon}>
          <Image
            src="/upload-icon.svg"
            alt="upload icon"
            layout="fill"
            objectFit="fill"
          />
        </div> */}
        <p className={styles.textBtn}>
          Drag &#38; Drop files here or{' '}
          <span className={styles.chooseFile} onClick={open}>
            choose file
          </span>
          
        </p>
      </div>
      {docFile.length > 0 && (
        <aside
          className={styles.filePreviewContainer}
          onClick={removeFileHandler}
        >
          <div className={styles.dropedDocument}>
            {/* <div className={styles.docIconContainer}>
              <Image
                src="/doc-icon.svg"
                alt="document icon"
                layout="fill"
                objectFit="fill"
              />
            </div> */}
            <p className={styles.fileName}>{docFile[0].name}</p>
          </div>
          <CloseIcon
            onClick={removeFileHandler}
            classIcon={styles.closeIcon}
            color="#2D6EC4"
          />
        </aside>
      )}
      {rejFile.length > 0 && (
        <aside className={styles.errorMessageContainer}>
          <p className={styles.errorMessage}>
            <span className={styles.warningText}>Wrong file selected.</span>
            &ensp;
            <span className={styles.chooseAnother} onClick={open}>
              Choose another
            </span>
          </p>
        </aside>
      )}
    </section>
  );
};
export default UploadDropZone;
