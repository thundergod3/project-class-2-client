import React, { useCallback, useEffect, useRef, useState } from "react";

const useUploadFile = ({
  value,
  acceptFile = "application/*",
  handleChooseFile,
}) => {
  const [selectedFile, setSelectedFile] = useState(value);

  const fileInputRef = useRef();

  const handleChange = useCallback(async (event) => {
    const images = event.target.files;

    setSelectedFile(images?.[0]);
    handleChooseFile?.(images?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickFile = () => {
    fileInputRef.current.click();
  };

  const handleDeleteFile = () => setSelectedFile(undefined);

  const FileInput = useCallback(
    () => (
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept={acceptFile}
        onChange={handleChange}
      />
    ),
    [acceptFile, handleChange]
  );

  useEffect(() => {
    if (value) setSelectedFile(value);
  }, [value]);

  return {
    file: selectedFile,
    onClickFile: handleClickFile,
    onDeleteFile: handleDeleteFile,
    FileInput,
  };
};

export default useUploadFile;
