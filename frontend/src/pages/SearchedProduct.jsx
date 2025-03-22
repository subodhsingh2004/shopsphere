import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getSearchedProducts } from '../services/productApi'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../services/cartApi'
import ProductCard from '../components/ProductCard'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Slider } from '@mui/material'

function SearchedProduct() {

    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')

    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState('All')
    const [priceRange, setPriceRange] = useState([100, 200000]);

    const [filterBarStatus, setFilterBarStatus] = useState(false)


    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const searchFunction = async () => {
        const response = await getSearchedProducts(query)
        setProducts(response.data)
        setFilterProducts(response.data)
    }

    const filter = () => {
        const fProducts = products.filter(p => {
            const isInCategory = category === 'All' || p.category === category;
            const isInPriceRange = p.price >= priceRange[0] && p.price <= priceRange[1];
            return isInCategory && isInPriceRange;
        });
    
        setFilterProducts(fProducts);
    };

    useEffect(() => {
        searchFunction()
    }, [query])

    useEffect(() => {
        filter()
    }, [category, priceRange])

    const handleFilterClick = () => {
        setFilterBarStatus(true)
    }

    const handleFilterClose = () => {
        setFilterBarStatus(false)
    }

    return (
        <>
            <div className='flex flex-col bg-white dark:bg-black relative top-[8vh] md:top-[9vh] w-full h-auto font-[poppins]'>


                <div className='w-full min-h-[91vh] flex justify-center'>

                    {/* Filter Section */}

                    <div className={`${filterBarStatus ? "right-0 hide-scrollbar" : "right-[-300px]"} fixed top-0 transition-all duration-300 z-30 h-screen w-[300px] shadow-2xl bg-white dark:bg-[#191919]`}>

                        <div className='w-full h-[9vh] flex justify-between items-center px-4 border-b border-b-gray-200 dark:border-b-[#414141] dark:text-white'>
                            <span className='font-medium text-lg'>Filters</span>
                            <button className='cursor-pointer' onClick={handleFilterClose}><CloseOutlinedIcon /></button>
                        </div>

                        <div className='p-4 space-y-4'>
                            <div>
                                <span className='text-sm font-medium dark:text-white'>Category</span>

                                <div className="space-y-2 mt-4 flex flex-col">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="options"
                                            value="All"
                                            checked={category === "All"}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm cursor-pointer dark:text-[#888]">All</span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="options"
                                            value="Electronics"
                                            checked={category === "Electronics"}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm cursor-pointer dark:text-[#888]">Electronics</span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="options"
                                            value="Clothing"
                                            checked={category === "Clothing"}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm cursor-pointer dark:text-[#888]">Clothing</span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="options"
                                            value="Accessories"
                                            checked={category === "Accessories"}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm cursor-pointer dark:text-[#888]">Accessories</span>
                                    </label>
                                </div>
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <span className='text-sm font-medium dark:text-white'>Price</span>
                                <div className='flex justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-sm text-[#707070]'>min</span>
                                        <span className='bg-gray-200 rounded-md py-2 text-sm w-[80px] text-center'>{priceRange[0]}</span>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-sm text-[#707070]'>max</span>
                                        <span className='bg-gray-200 rounded-md py-2 text-sm w-[80px] text-center'>{priceRange[1]}</span>

                                    </div>
                                </div>
                                <div className='w-full'>
                                    <Slider min={0} step={1000} max={200000} value={priceRange} onChange={handlePriceChange} disableSwap color='blue'
                                        sx={{ color: "#3772ff" }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Product Section */}
                    <div className='bg-white h-auto dark:bg-black w-[85%] p-4 pb-10'>

                        <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center'>
                            <div>
                                <h1 className='dark:text-white font-medium font-[dmsans] text-lg'>Search Result for <span className='text-[#3772ff]'>"{query}"</span></h1>
                                <h2 className='dark:text-white font-[poppins] text-sm'>Showing {filterProducts.length} results</h2>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={handleFilterClick} className='hover:bg-gray-100  dark:hover:bg-[#212121] cursor-pointer duration-200 flex items-center space-x-2 h-fit py-2 px-3 rounded-md text-[16px] font-medium dark:text-[#999]'>
                                    <span className=''>Filters</span>
                                    <FilterListOutlinedIcon />
                                </button>
                            </div>
                        </div>

                        {
                            filterProducts.length > 0 ?
                                <div className='flex h-auto items-center justify-center mt-6'>

                                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                        {
                                            filterProducts.map(p => (
                                                <ProductCard key={p._id} product_id={p._id} productName={p.name} productImage={p.image} productPrice={p.price} />
                                            ))
                                        }
                                    </div>

                                </div> : <div className='flex w-full px-0 h-full flex-col items-center justify-center space-y-2'>
                                    <span className='text-[#707070] text-xl font-medium'>No products found!</span>
                                    <p className='w-[280px] md:w-[400px] text-sm text-center leading-4'>We couldn't find any products matching your search. <br /> Try adjusting your filters or search terms</p>
                                </div>
                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default SearchedProduct