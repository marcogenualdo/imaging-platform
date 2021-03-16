import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.scss"
import dnaBg from "../images/bg.svg"

const IndexPage = ({ data }) => (
  <>
    <header>
      <Img fluid={data.banner.childImageSharp.fluid} />
      <div className="title-wrap">
        <h1 className="home-title">
          {"< "}Discovery{" />"}
        </h1>
      </div>
      <div className="head-banner"></div>
    </header>
    <Layout>
      <img className="dna-bg" src={dnaBg} />
      <section className="intro">
        <p>
          Lorem ipsum dolor sit amet,{" "}
          <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.{" "}
          <strong>
            Duis aute irure dolor in reprehenderit in voluptate velit
          </strong>{" "}
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
      </section>
      <section id="news">
        <h1>Latest News</h1>
        <div className="title-underline" />
        <div className="news-container">
          <NewsEntry data={data} key={1} />
          <NewsEntry data={data} key={2} />
          <NewsEntry data={data} key={3} />
        </div>
      </section>
      <SEO title="Home" />
    </Layout>
  </>
)

const NewsEntry = ({ data }) => {
  return (
    <div className="news-entry">
      <div className="news-image">
        <Img className="news-image" fluid={data.news1.childImageSharp.fluid} />
      </div>
      <div className="news-text">
        <h3>Title</h3>
        <div className="news-text-divider" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in ...
        </p>
        <Link to="/" className="read-more">
          Read more {">"}
        </Link>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "dna-banner.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    news1: file(relativePath: { eq: "news-img-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
