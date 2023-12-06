import { Box, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material"
import { CloseButton } from "./CloseButton"

export type T_Dialog = Omit<DialogProps, 'onClose' | 'open'> & {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void,
  open?: boolean
  title?: string
}

export const DialogCustom = ({
  children,
  onClose,
  open = true,
  title,
  ...props
}: T_Dialog) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      {...props}
    >
      <Stack
        direction='row'
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <Box>
          <CloseButton
            onClose={onClose}
          />
        </Box>
      </Stack>
      {children}
    </Dialog>
  )
}