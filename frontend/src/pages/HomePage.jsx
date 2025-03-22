import Herosection from "../components/Herosection"
import LatestCategory from "../components/LatestCategory"
import OfferSection from "../components/OfferSection"
import ProductCategory from "../components/ProductCategory"

function HomePage() {
  return (
    <>
      <div className="relative top-[8vh] sm:top-[9vh]">
        <Herosection />
        <ProductCategory />
        <OfferSection />
        <LatestCategory />
      </div>
    </>
  )
}

export default HomePage