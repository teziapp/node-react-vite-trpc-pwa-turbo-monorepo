import { Button, DialogActions, MenuItem } from "@mui/material"
import { Fragment, useState } from "react"
import { DialogCustom } from "./DialogCustom"

type inputProps = {
  deleteFunction: () => any,
  dialogTitle: string
}

export const DeleteButton = ({deleteFunction, dialogTitle}: inputProps) => {
  const [ openConfirmation, setOpenConfirmation ] = useState(false);

  const handleDelete = () => {
    deleteFunction().then(() => setOpenConfirmation(false))
  }

  return (
    <Fragment>
      <MenuItem key="delete" onClick={() => setOpenConfirmation(true)}>
        Delete
      </MenuItem>
      {openConfirmation &&
        <DialogCustom
          onClose={() => setOpenConfirmation(false)}
          title={dialogTitle}
        >
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => setOpenConfirmation(false)} autoFocus>
              No
            </Button>
          </DialogActions>
        </DialogCustom>
      }
    </Fragment>
  )
}