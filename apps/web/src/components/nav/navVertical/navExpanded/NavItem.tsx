// @mui
import { Box, Link, ListItemText, Tooltip } from '@mui/material';
//
import SvgColor from 'mui-components-tezi/SvgColor';
import { InternalLink } from '../../../InternalLink';
import { NavItemProps } from '../../types';
import { StyledDotIcon, StyledIcon, StyledItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemProps) {
  const { title, path, icon, info, children, disabled, caption, navLabel, navPath } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} active={active} disabled={disabled} caption={!!caption} {...other}>

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}
      
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <ListItemText
        primary={navLabel || title}
        secondary={
          caption && (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <SvgColor
          iconFileName={open ? 'arrow-ios-downward-fill' : 'arrow-ios-forward-fill'}
          sx={{ ml: 1, flexShrink: 0, height: 16, width: 16 }}
        />
      )}
    </StyledItem>
  );

  // ExternalLink
  if (isExternalLink)
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </Link>
    );

  // Has child
  if (children?.some(child => child.title)) {
    return renderContent;
  }

  // Default
  return (
    <InternalLink to={navPath || path} title={title}>
      {renderContent}
    </InternalLink>
  );
}