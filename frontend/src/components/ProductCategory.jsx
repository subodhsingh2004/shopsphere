import { Link } from "react-router-dom"

function ProductCategory() {
  return (
    <div className="w-full h-auto sm:pb-0">
      <div className="w-full h-auto bg-[#ffffff] dark:bg-black py-10 md:py-20 space-y-14">

        <h2 className="text-black dark:text-[#ffe66b] font-[poppins] text-[28px] md:text-[50px] font-bold text-center leading-7">Shop by Category</h2>

        <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5">

          <Link to={`/shop-by-category/?category=Men`}>
            <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
              <div className="w-full h-full flex justify-center items-center rounded-md duration-200">
                <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Men's Clothing</span>
              </div>
            </div>
          </Link>

          <Link to={`/shop-by-category/?category=Women`}>
            <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] bg-white rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
              <div className="w-full h-full flex justify-center items-center rounded-md duration-200">
                <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Women's Clothing</span>
              </div>
            </div>
          </Link>

          <Link to={`/shop-by-category/?category=Kids`}>
            <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] bg-white rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
              <div className="w-full h-full flex justify-center items-center  rounded-md duration-200 px-1">
                <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Kid's Clothing</span>
              </div>
            </div>
          </Link>

          <Link to={`/shop-by-category/?category=Smartphones`}>
            <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] bg-white rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
              <div className="w-full h-full flex justify-center items-center rounded-md duration-200 px-1">
                <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Mobile Phones</span>
              </div>
            </div>
          </Link>

          <Link to={`/shop-by-category/?category=Footwear`}>
            <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] bg-white rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
              <div className="w-full h-full flex justify-center items-center rounded-md duration-200 px-1">
                <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Footwear</span>
              </div>
            </div>
          </Link>

          <Link to={`/shop-by-category/?category=Electronics`}>
          <div className="flex justify-center items-center w-[100px] h-[120px] md:w-[200px] md:h-[220px] bg-white rounded-md cursor-pointer bg-center bg-cover backdrop-blur">
            <div className="w-full h-full flex justify-center items-center rounded-md duration-200 px-1">
              <span className="font-[poppins] font-bold text-center md:text-[28px] text-white">Electronics Appliances</span>
            </div>
          </div>
        </Link>

        </div>

      </div >
    </div >
  )
}

export default ProductCategory