import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Button } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  var heroImage={ 
    backgroundImage: "url(" + "/home-page-hero-1-min.png" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: '250px',
    paddingBottom: '250px'
  }

  var heroHeading={
    paddingLeft: '30px',
    color: 'white',
    maxWidth: '520px',
    lineHeight: '90%',
    paddingBottom: '2rem'
  }

  var heroText={
    paddingLeft: '30px',
    marginBottom: '80px',
    color: 'white',
    fontSize: '1.25rem',
    maxWidth: '520px'
  }

  var heroButton={
    marginLeft: '30px',
    width: '20%'
  }

  return (
    <div>
      {/* Adding Hero Image and CTA*/}
      <div style={heroImage}>
            <h1 style={heroHeading} class="text-5xl font-extrabold">THE RIGHT GEAR FOR WEATHER</h1>
            <p style={heroText}>Don’t be left without the right type of gear, 
              use our tool to make sure you’re decked out right.</p>
          <div>
            <Button style={heroButton} href="/products" Component="a" width="40%">
                Shop Our Products
            </Button>       
          </div>
      </div>
      

      {/* <h1 className="text-3xl">HEADING</h1> */}

      {/* <Grid>
        {featured.slice(0, 1).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 0 ? 1080 : 540}
            imgHeight={i === 0 ? 1080 : 540}
            imgPriority
            imgLoading="eager"
          />
        ))}
      </Grid> */}
      {/* <Marquee variant="secondary">
        {bestSelling.slice(3, 6).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee> */}
      <Hero
        headline="Create Your Adventure: AlpineLight XL Extereme Packs"
        description="
        With the right gear you can work towards reaching all your outdoor goals.
        Get the gear that helps you find the line or carry the send, to pack the 
        journey with ease. Using our ultralight materials you'll be able to 
        venture without the weight for regular packs."
      />
      {/* <Grid layout="B">
        {featured.slice(3, 6).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 1 ? 1080 : 540}
            imgHeight={i === 1 ? 1080 : 540}
          />
        ))}
      </Grid> */}
      {/* <Marquee>
        {bestSelling.slice(0, 3).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
      /> */}
    </div>
  )
}

Home.Layout = Layout
