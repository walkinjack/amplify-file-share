import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import darkLogo from "../../../../images/fileshare.svg";
import lightLogo from "../../../../images/fileshare-light.svg";

const Footer = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="File Share"
            width={150}
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
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.primary"
                variant={'subtitle2'}
              >
                Home
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          <a href="https://github.com/walkinjack/amplify-file-share">Simple File Share</a>
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          A simple project using AWS Amplify
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
