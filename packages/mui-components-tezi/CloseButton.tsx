import { IconButton } from "@mui/material"
import SvgColor from "./SvgColor"
import { T_Dialog } from "./DialogCustom"

export const CloseButton = ({onClose, ...other}:{onClose: T_Dialog['onClose']}) => (
  <IconButton onClick={(e) => onClose(e, 'backdropClick')} {...other}>
    <SvgColor iconFileName="close-fill" />
  </IconButton>
)