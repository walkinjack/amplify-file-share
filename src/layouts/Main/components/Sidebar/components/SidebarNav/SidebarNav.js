import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import darkLogo from '../../../../../../images/walk-in-jack.svg';
import lightLogo from '../../../../../../images/walk-in-jack.svg';

const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="File Share"
          width={{ xs: 70, md: 80 }}
        >
          <Box
            component={'img'}
            src={
              mode === 'light'
                ? darkLogo
                : lightLogo
            }
            height={1}
            width={1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
