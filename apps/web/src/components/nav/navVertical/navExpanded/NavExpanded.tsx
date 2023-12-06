import { List, Stack, SxProps } from "@mui/material"
import { NavListProps } from "../../types"
import { memo } from "react"
import { StyledSubheader } from "./styles"
import NavList from "./NavList"

type inputProps = {
  data: NavListProps[],
  sx?: SxProps
}

const NavExpanded = ({ data, sx, ...other }: inputProps) => {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>
            )}

            <NavList
              key={group.title + group.path}
              data={group}
              depth={1}
            />
          </List>
        );
      })}
    </Stack>
  )
}

export default memo(NavExpanded);