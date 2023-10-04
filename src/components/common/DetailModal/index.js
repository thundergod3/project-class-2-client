import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { Fragment, useCallback, useMemo } from "react";

const DetailModal = ({
  data,
  detailList,
  onClose,
  onOriginalClose,
  onSave,
  isLoading,
  closeBtnText,
  saveBtnText,
}) => {
  const formatDetailList = useMemo(
    () =>
      detailList?.map((record) => ({
        ...record,
        value:
          record?.customValue?.(data?.[record?.value]) || data?.[record?.value],
      })),
    [data, detailList]
  );

  const handleClose = useCallback(async () => {
    await onClose?.(data);
    onOriginalClose();
  }, [data, onClose, onOriginalClose]);

  const handleSave = useCallback(async () => {
    await onSave?.(data);
    onOriginalClose();
  }, [data, onOriginalClose, onSave]);

  return (
    <Stack spacing={4}>
      {formatDetailList?.map((record) => (
        <Fragment key={record?.value}>
          {record?.isBorder ? (
            <Stack direction="row" spacing={8}>
              <Text textAlign="right" minWidth="150px">
                {record?.label}:
              </Text>
              <Box border="solid 1px" borderRadius="10px" padding="8px 14px">
                <Text>{record?.value}</Text>
              </Box>
            </Stack>
          ) : (
            <Stack direction="row" spacing={8}>
              <Text textAlign="right" minWidth="150px">
                {record?.label}:
              </Text>
              <Text>{record?.value}</Text>
            </Stack>
          )}
        </Fragment>
      ))}
      {(onClose || onSave) && (
        <Stack direction="row" spacing="8px" justifyContent="flex-end">
          {onClose && (
            <Button variant="outline" mr={3} onClick={handleClose}>
              {closeBtnText}
            </Button>
          )}
          {onSave && (
            <Button
              isLoading={isLoading}
              type="submit"
              background="background.primary"
              color="white"
              _hover={{
                background: "background.primary",
              }}
              onClick={handleSave}>
              {saveBtnText}
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default DetailModal;
