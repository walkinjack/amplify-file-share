import * as React from 'react';
import { Link, graphql } from "gatsby"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Hero,
  SidebarArticles,
} from './components';

import { Helmet } from 'react-helmet';

const BlogArticle = ({ data, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = data;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>{data.site.siteMetadata.title} {post.frontmatter.title}</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content={post.frontmatter.description}
        />
        <meta
          property="og:image"
          content={post.frontmatter.thumbnail?.childImageSharp.fluid?.src}
        />
        <meta
          property="og:title"
          content={post.frontmatter.title}
        />
        <meta
          property="og:description"
          content={post.frontmatter.description}
        />
        <meta
          property="og:url"
          content={`https://sammy.life${location.pathname}`}
        />
      </Helmet>
      <Main colorInvert={false}>
        <Box bgcolor={theme.palette.alternate.main}>
          <Hero post={post} />
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <section
                  dangerouslySetInnerHTML={{ __html: post.html }}
                  itemProp="articleBody"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {isMd ? (
                  <Box marginBottom={4}>
                    <SidebarArticles previous={previous} next={next} />
                  </Box>
                ) : null}

              </Grid>
            </Grid>
          </Container>
          <Box
            component={'svg'}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            sx={{
              marginBottom: -1,
              width: 1,
            }}
          >
            <path
              fill={theme.palette.alternate.main}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </Box>
        </Box>
        <Box bgcolor={'alternate.main'}>
          <Container>

          </Container>
          <Box
            component={'svg'}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            sx={{
              marginBottom: -1,
              width: 1,
            }}
          >
            <path
              fill={theme.palette.background.paper}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </Box>
        </Box>
      </Main>
    </React.Fragment>
  );
};

export default BlogArticle;

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY hh:mma")
                description
                author
                headerImage {
                    childImageSharp {
                        fluid(maxWidth: 1200, quality: 75) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(
                            width: 150
                            formats: [WEBP]
                        )
                    }
                }
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY hh:mma")
                description
                author
                thumbnail  {
                    childImageSharp {
                        fluid(maxWidth: 150, quality: 75) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY hh:mma")
                description
                author
                thumbnail  {
                    childImageSharp {
                        fluid(maxWidth: 150, quality: 75) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`
