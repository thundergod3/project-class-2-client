import { Flex as CkFlex } from "@chakra-ui/react";

import chakraShouldForwardProp from "utils/chakraShouldForwardProp";

export const PagePaginationContainer = chakraShouldForwardProp(CkFlex, ({ positionContent }) => ({
	width: "100%",
	maxWidth: "320px",
	justifyContent: "center",
	alignItems: "center",
	my: "50px",
	marginRight: positionContent === "center" ? "auto" : positionContent === "left" ? "auto" : "",
	marginLeft: positionContent === "center" ? "auto" : positionContent === "right" ? "auto" : "",
}));
