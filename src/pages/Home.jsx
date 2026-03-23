import Banner      from '../components/Banner.jsx'
import ProductList from '../components/ProductList.jsx'

export default function Home({ activeCat, searchQuery, ...cartProps }) {
  return (
    <>
      <Banner />
      <ProductList activeCat={activeCat} searchQuery={searchQuery} {...cartProps} />
    </>
  )
}