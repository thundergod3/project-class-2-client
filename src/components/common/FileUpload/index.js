import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { Text } from "@chakra-ui/react";

import useUploadFile from "hooks/useUploadFile";
import utilsService from "services/UtilsService";

import Loading from "../Loading";

import {
  Container,
  FileContainer,
  FileNameContainer,
  FormLabel,
  UploadButton,
} from "./fileUpload.styles";

const FileUpload = ({
  label,
  name,
  minWidthLabel,
  formLabelStyle,
  isRequired,
  setFieldValue,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChooseFile = (valueFile) => {
    setLoading(true);

    const reader = new FileReader();

    reader.readAsDataURL(valueFile);
    reader.onloadend = async () => {
      const {
        data: { file },
      } = await utilsService.uploadFile({
        base64EncodedFile: reader.result,
      });

      if (file?.url) {
        setFieldValue((values) => ({
          ...values,
          [name]: file?.url,
        }));
      }

      setLoading(false);
    };
  };

  const { file, onClickFile, FileInput } = useUploadFile({
    handleChooseFile,
    acceptFile: ".txt,.pdf",
  });

  return (
    <>
      <Container>
        {label && (
          <FormLabel minWidth={minWidthLabel} {...formLabelStyle}>
            {label}{" "}
            {isRequired && (
              <Text as="span" color="red.500">
                *
              </Text>
            )}
          </FormLabel>
        )}
        <FileContainer>
          <UploadButton onClick={onClickFile}>
            {loading ? (
              <Loading size="md" />
            ) : (
              <>
                <BsUpload />
                <Text color="#fff" fontSize="14px">
                  Tải lên
                </Text>
              </>
            )}
          </UploadButton>
          <FileNameContainer>{file?.name}</FileNameContainer>
        </FileContainer>
      </Container>
      <FileInput />
    </>
  );
};

export default FileUpload;
