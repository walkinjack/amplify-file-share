import React from 'react';
import { withTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  FeaturedArticles,
  Hero,
  LatestStories,
} from './components';
import { graphql, Link } from 'gatsby';
import Button from '@mui/material/Button';


class BlogNewsroom  extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isMd = this.props.theme.breakpoints.up('md');

    console.log(this.props);
    console.log(isMd);

    const posts = this.props.data.allMarkdownRemark.edges;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <Main colorInvert={true}>
        <Hero />
        <Box>
          <Container>
            <FeaturedArticles />
          </Container>
        </Box>
        <Box bgcolor={'alternate.main'}>
          <Container>
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12} id={'stories'}>
                <LatestStories posts={posts} />
                <ul
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    listStyle: 'none',
                    padding: 0,
                  }}
                >
                  {!isFirst && (
                    <Button size={'large'} variant={'contained'} type={'button'} href={`/blog/${prevPage}#stories`} rel={'prev'}>
                      ← Previous Page
                    </Button>
                  )}
                  {Array.from({ length: numPages }, (_, i) => (
                    <li
                      key={`pagination-number${i + 1}`}
                      style={{
                        margin: 0,
                      }}
                    >
                      <Button size={'large'} variant={'contained'} type={'button'} href={`/blog/${i === 0 ? '' : i + 1}#stories`} color={ i + 1 === currentPage ? 'secondary' : 'primary'}>
                        {i + 1}
                      </Button>
                    </li>
                  ))}
                  {!isLast && (
                    <Button size={'large'} variant={'contained'} type={'button'} href={`/blog/${nextPage}#stories`}>
                    Next Page →
                    </Button>
                  )}
                </ul>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Main>
    );
  }
};

export default withTheme(BlogNewsroom);

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
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
                                fluid(maxWidth: 500, quality: 75) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`