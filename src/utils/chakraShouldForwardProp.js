import { chakra } from "@chakra-ui/react";
import isPropValid from "@emotion/is-prop-valid";

const chakraShouldForwardProp = (CkComponent, baseStyle) =>
  chakra(CkComponent, {
    shouldForwardProp: (props) => isPropValid(props),
    baseStyle,
  });

export default chakraShouldForwardProp;
