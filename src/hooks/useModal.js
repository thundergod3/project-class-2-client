import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  useMediaQuery,
  Text,
  ModalHeader,
} from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";

const initialStates = {
  isOpen: false,
  title: "",
  data: null,
  closeText: "Huỷ bỏ",
  saveText: "Đồng ý",
};

const useModal = ({
  usingFooter = true,
  usingHeader = true,
  modalBody = null,
  handleSave = async () => {},
  handleClose = () => {},
  sizeModal = "2xl",
}) => {
  const ModalBodyComponent = modalBody;

  const [modalState, setModalState] = useState(initialStates);

  const [checkMobileView] = useMediaQuery("(max-width: 48em)");

  const open = useCallback(({ title = "", data }) => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: true,
      title,
      data,
    }));
  }, []);

  const close = useCallback(() => {
    setModalState(initialStates);
    handleClose?.();
  }, [handleClose]);

  const onSave = useCallback(async () => {
    const result = await handleSave?.(modalState?.data);

    if (result || result === undefined) {
      close();
    }
  }, [close, handleSave, modalState?.data]);

  const Dialog = (props) => {
    return (
      <Modal size={sizeModal} isOpen={modalState.isOpen} onClose={close}>
        <ModalOverlay />

        <ModalContent>
          {usingHeader && (
            <ModalHeader borderBottom="solid" borderColor="background.grey.600">
              <Text fontSize="24px" width="max-content" color="text.secondary">
                {modalState?.title}
              </Text>
            </ModalHeader>
          )}
          {checkMobileView ? (
            <Icon
              as={GrClose}
              fontSize="18px"
              position="absolute"
              top="20px"
              right="25px"
              onClick={close}
            />
          ) : (
            <ModalCloseButton cursor="pointer" fontSize="18px" top="20px" />
          )}

          <ModalBody py={8}>
            <ModalBodyComponent
              {...props}
              {...modalState}
              onOriginalClose={close}
            />
          </ModalBody>
          {usingFooter && (
            <ModalFooter>
              <Button mr={3} onClick={close}>
                {modalState?.closeText}
              </Button>
              <Button
                variant="ghost"
                onClick={onSave}
                background="background.primary"
                _hover={{
                  background: "background.primary",
                }}>
                {modalState?.saveText}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return {
    open,
    close,
    Dialog,
  };
};

export default useModal;
