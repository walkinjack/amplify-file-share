import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { graphql, StaticQuery } from 'gatsby';

const mock = [
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img13.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
    date: '10 Sep',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img14.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'Sed ut perspiciatis',
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img17.jpg',
    description:
      'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
    title: 'Unde omnis iste natus',
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    },
    date: '05 Mar',
  },
];

const FeaturedArticles = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={4}
      >
        <Box>
          <Typography fontWeight={700} variant={'h4'} gutterBottom>
            Featured stories
          </Typography>
          <Typography color={'text.secondary'}>
            Here’s what we’ve been up to recently.
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={4}>
        <StaticQuery query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                allMarkdownRemark(filter: { frontmatter: { isFeatured: { eq: true }} }, limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
                  nodes {
                      excerpt
                      fields {
                          slug
                      }
                      frontmatter {
                          date(formatString: "MMMM DD, YYYY")
                          title
                          description
                          author
                          thumbnail  {
                              childImageSharp {
                                  fluid(maxWidth: 360, quality: 75) {
                                      ...GatsbyImageSharpFluid
                                  }
                              }
                          }
                      }
                  }
                }
            }
        `}
        render={data => (
          data.allMarkdownRemark.nodes.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                component={'a'}
                href={item.fields.slug}
                display={'block'}
                width={1}
                height={1}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  boxShadow={0}
                  sx={{ bgcolor: 'transparent', backgroundImage: 'none' }}
                >
                  <CardMedia
                    image={item.frontmatter.thumbnail?.childImageSharp.fluid?.src}
                    title={item.frontmatter.title}
                    sx={{
                      height: { xs: 300, md: 360 },
                      position: 'relative',
                      filter:
                         theme.palette.mode === 'dark'
                           ? 'brightness(0.7)'
                           : 'none',
                    }}
                  />
                  <Box
                    width={'90%'}
                    margin={'0 auto'}
                    display={'flex'}
                    flexDirection={'column'}
                    boxShadow={3}
                    borderRadius={2}
                    bgcolor={'background.paper'}
                    position={'relative'}
                    zIndex={3}
                    sx={{ transform: 'translateY(-30px)' }}
                  >
                    <Box component={CardContent} position={'relative'}>
                      <Typography variant={'h6'} gutterBottom>
                        {item.frontmatter.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {item.frontmatter.description}
                      </Typography>
                    </Box>
                    <Box flexGrow={1} />
                    <Box padding={2} display={'flex'} flexDirection={'column'}>
                      <Box marginBottom={2}>
                        <Divider />
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Box display={'flex'} alignItems={'center'}>
                          {/*<Avatar*/}
                          {/*  src={item.author.avatar}*/}
                          {/*  sx={{ marginRight: 1 }}*/}
                          {/*/>*/}
                          <Typography color={'text.secondary'}>
                            {item.frontmatter.author}
                          </Typography>
                        </Box>
                        <Typography color={'text.secondary'}>
                          {item.frontmatter.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        )}
        />
      </Grid>
    </Box>
  );
};

export default FeaturedArticles;
