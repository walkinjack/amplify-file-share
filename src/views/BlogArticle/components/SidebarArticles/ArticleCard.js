/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const ArticleCard = ({ item, k }) => {
  const theme = useTheme();

  return item ? (
    <Grid key={k} item xs={12}>
      <Box
        component={Card}
        width={1}
        height={1}
        boxShadow={0}
        borderRadius={0}
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
      >
        <Box
          sx={{
            width: { xs: 1, md: '50%' },
            '& .lazy-load-image-loaded': {
              height: 1,
              display: 'flex !important',
            },
          }}
        >
          <Box
            component={LazyLoadImage}
            height={1}
            width={1}
            src={item.frontmatter.thumbnail?.childImageSharp.fluid?.src || ''}
            alt='...'
            effect='blur'
            sx={{
              objectFit: 'cover',
              maxHeight: 120,
              borderRadius: 2,
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(0.7)'
                  : 'none',
            }}
          />
        </Box>
        <CardContent
          sx={{ padding: 1, '&:last-child': { paddingBottom: 1 } }}
        >
          <Typography fontWeight={700}>{item.frontmatter.title}</Typography>
          <Box marginY={1 / 4}>
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              component={'i'}
            >
              {item.frontmatter.author} - {item.frontmatter.date}
            </Typography>
          </Box>
          <Button size={'small'} href={item.fields.slug}>Read More</Button>
        </CardContent>
      </Box>
    </Grid>
  ) : (<></>);
};

ArticleCard.propTypes = {
  item: PropTypes.any,
  k: PropTypes.any
};
export default ArticleCard;