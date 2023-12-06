import { forwardRef } from 'react';
// @mui
import { Link, ListItemText, Tooltip } from '@mui/material';
//
import SvgColor from 'mui-components-tezi/SvgColor';
import { InternalLink } from '../../../InternalLink';
import { NavItemProps } from '../../types';
import { StyledIcon, StyledItem } from './styles';

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { title, path, icon, children, disabled, caption, navLabel, navPath } = item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        <ListItemText
          primary={navLabel || title}
          primaryTypographyProps={{
            noWrap: true,
            sx: {
              width: 72,
              fontSize: 10,
              lineHeight: '16px',
              textAlign: 'center',
              ...(active && {
                fontWeight: 'fontWeightMedium',
              }),
              ...(subItem && {
                fontSize: 14,
                width: 'auto',
                textAlign: 'left',
              }),
            },
          }}
        />

        {caption && (
          <Tooltip title={caption} arrow placement="right">
            <SvgColor
              iconFileName="info-outline"
              sx={{
                top: 11,
                left: 6,
                position: 'absolute',
                height: 16,
                width: 16,
              }}
            />
          </Tooltip>
        )}

        {!!children && (
          <SvgColor
            iconFileName="chevron-right-fill"
            sx={{
              top: 11,
              right: 6,
              position: 'absolute',
              height: 16,
              width: 16,
            }}
          />
        )}
      </StyledItem>
    );

    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Default
    return (
      <InternalLink to={navPath || path} title={title}>
        {renderContent}
      </InternalLink>
    );
  }
);

export default NavItem;