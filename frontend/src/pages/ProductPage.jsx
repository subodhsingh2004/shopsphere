import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleProduct } from "../services/productApi"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReviewCard from "../components/ReviewCard";
import { getReviews } from "../services/reviewApi";
import ReviewForm from "../components/ReviewForm";
import { toast } from "react-toastify"
import { addProductToCart } from "../services/cartApi";
import { addProductInCart } from "../slices/cartSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Loader from "../components/Loader";


const ProductPage = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const user = useSelector(state => state.user.userDetails)

    const { productId } = useParams()
    const [product, setProduct] = useState()
    const [reviews, setReviews] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [reviewFormStatus, setReviewFormStatus] = useState(false)
    const stars = [];
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    const [boxState, setBoxState] = useState("description")
    const handleCheckboxChange = (id) => {
        setBoxState(id);
    };

    const [limit, setLimit] = useState(1)
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalReviews, setTotalReviews] = useState(0)
    const [avgRating, setAvgRating] = useState(0)

    const increaseQuantity = async () => {
        if (selectedQuantity < product.quantity) {
            let newQuantity = selectedQuantity + 1;
            setSelectedQuantity(newQuantity)
        } else {
            toast.info(`Only ${product.quantity} items are available in stock`)
        }
    }

    const decreaseQuantity = async () => {
        if (selectedQuantity > 1) {
            let newQuantity = selectedQuantity - 1;
            setSelectedQuantity(newQuantity)
        }
    }

    const getProductInfo = async () => {
        const productInfo = await getSingleProduct(productId)
        setLoadingStatus(false)
        setProduct(productInfo.data.product)
    }

    const getReviewInfo = async () => {
        try {
            const response = await getReviews(productId, limit, skip)
            if (response.data) {
                setReviews(response.data.reviews)
                setTotalPage(response.data.totalPages)
                setTotalReviews(response.data.totalPages)
                setAvgRating(response.data.avgRating)
                calculateAvgReviews()
            }
        } catch (error) {

        }
    }

    const calculateAvgReviews = () => {
        for (let i = 0; i < Math.floor(avgRating); i++) {
            stars.push(<StarIcon key={i} sx={{ color: "#ffd400", fontSize: "18px" }} />);
        }

        // Add empty stars (StarBorderIcon)
        for (let i = Math.floor(avgRating); i < 5; i++) {
            stars.push(<StarBorderIcon key={i} sx={{ color: "#ffd400", fontSize: "18px" }} />);
        }
    }

    const addToCart = async () => {
        if (!isLoggedIn) toast.error("Please login")
        else {
            try {
                const response = await addProductToCart({ productId: productId, quantity: selectedQuantity, userId: user._id })
                dispatch(addProductInCart(response.data?.product))
                toast.success("Product added to cart")
            } catch (error) {
                toast.error(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        getProductInfo()
    }, [])

    useEffect(() => {
        getReviewInfo()
    }, [page])

    const renderSpecification = (spec) => {
        if (typeof spec === 'object' && !Array.isArray(spec)) {
            return (
                <ul>
                    {Object.entries(spec).map(([key, value]) => (
                        <li key={key} className="capitalize dark:text-gray-300 text-xs sm:text-sm">
                            <strong className="font-[poppins]">{key} : </strong> {renderSpecification(value)}
                        </li>
                    ))}
                </ul>
            );
        }

        if (Array.isArray(spec)) {
            return <span className="dark:text-gray-300 text-xs sm:text-sm">{spec.join(', ')}</span>;
        }

        return <span className="dark:text-gray-300 text-xs sm:text-sm">{spec}</span>;
    };

    const handleReviewFormStatus = () => {
        if (!isLoggedIn) toast.error("Please login to add review")
        else setReviewFormStatus(!reviewFormStatus)
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
            setSkip(skip - limit)
        }
    }

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(page + 1)
            setSkip(skip + limit)
        }
    }

    if (!loadingStatus) {
        return (
            <>
                <div className="relative top-[8vh] md:top-[9vh] w-full md:h-auto bg-white dark:bg-black py-10 px-5 md:px-8 xl:px-[10%] font-[poppins] space-y-10 md:space-y-0">
                    {/* ProductBox */}
                    <div className="w-full h-auto md:h-[80vh] flex flex-col justify-between space-y-4 md:space-y-0 md:flex-row">
                        {/* Image */}
                        <div className="w-full md:w-[45%] h-full flex justify-center md:justify-start">
                            <img src={product.image} alt={product.name} className="rounded-xl h-[80%] lg:h-[90%]" />
                        </div>
                        {/* Details */}
                        <div className="w-full md:w-[50%] h-full flex flex-col">
                            <div className="space-y-3">
                                {
                                    product.quantity == 0 ? <span className="bg-[#ff0000] text-white text-xs font-medium w-fit py-1 px-2 rounded font-[dmsans]">
                                        Out of Stock
                                    </span> : null
                                }
                                {/* Product Name */}
                                <h1 className={`font-[poppins] dark:text-white text-xl font-medium ${product.quantity == 0 ? "pt-2" : "pt-0"}`}>{product.name}</h1>
                                {/* Rating */}
                                <div className="flex items-center space-x-1">
                                    <div>
                                        {stars}
                                    </div>
                                    <span className="text-sm text-gray-500">({totalReviews} Reviews)</span>
                                </div>
                                {/* Price */}
                                <div className="text-2xl dark:text-white font-bold">
                                    ₹{product.price}
                                </div>
                                {/* Description */}
                                <div className="text-sm md:text-[16px] text-gray-500">
                                    {product.description}
                                </div>
                                {/* Quantity Selector */}
                                <div className="flex justify-between border-y border-gray-200 dark:border-[#313131] mt-8 py-4">
                                    <div className="w-1/2 flex flex-col items-start">
                                        <span className="font-medium dark:text-gray-400">Select Quantity</span>
                                        <div className="space-x-4 flex justify-center w-auto">
                                            <button onClick={decreaseQuantity} className="cursor-pointer"><RemoveCircleOutlineIcon sx={{ color: "#6a7282" }} /></button>
                                            <span className="font-medium font-[jetbrains] dark:text-white">{selectedQuantity}</span>
                                            <button onClick={increaseQuantity} className="cursor-pointer"><AddCircleOutlineIcon sx={{ color: "#6a7282" }} /></button>
                                        </div>
                                    </div>
                                    <div className="w-1/2 flex justify-end space-x-4">
                                        <button disabled={product.quantity == 0} onClick={addToCart} className=" disabled:cursor-not-allowed w-full cursor-pointer py-3 bg-[#ffd400] disabled:bg-[#d0b200] rounded-md font-medium">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                            {/* Buttons */}

                        </div>
                    </div>

                    {/* Description / Reviews */}
                    <div className={`w-full ${boxState === "description" ? "h-auto" : "h-auto"} rounded-2xl dark:bg-[#191919] shadow-xl border border-gray-200 dark:border-[#212121] flex flex-col`}>

                        {/* Heading */}
                        <div className="w-full h-[50px] bg-[#919eab14] border-b border-gray-200 dark:border-[#313131] px-4 flex space-x-5">
                            <input
                                type="checkbox"
                                id="description"
                                className="absolute opacity-0"
                                checked={boxState === "description"}
                                onChange={() => handleCheckboxChange("description")}
                            />
                            <label htmlFor="description" className={`h-full flex items-center w-fit cursor-pointer ${boxState === 'description' ? "text-black dark:text-white" : "text-gray-500"} `}>
                                Description
                            </label>

                            <input
                                type="checkbox"
                                id="reviews"
                                className="absolute opacity-0"
                                checked={boxState === "reviews"}
                                onChange={() => handleCheckboxChange("reviews")}
                            />
                            <label htmlFor="reviews" className={`h-full flex items-center justify-center w-fit  cursor-pointer ${boxState === 'reviews' ? "text-black dark:text-white" : "text-gray-500"} `}>
                                Reviews <span className="text-sm pl-1">({totalReviews})</span>
                            </label>

                            <span className={`w-[90px] h-[2px] rounded mt-[48px] ease-in transition duration-300 bg-black dark:bg-white absolute ${boxState === 'reviews' ? "translate-x-[110px]" : "translate-x-0 "}`}></span>
                        </div>

                        {/* Content */}
                        <div className="w-full">
                            {
                                boxState === 'description' ?
                                    <div className="dark:text-white h-full w-full flex flex-col text-[18px] px-3 py-5">
                                        <div>
                                            <span className="text-lg font-medium">Product Specification</span>
                                            <div className="pt-2 space-y-2">
                                                {
                                                    product.details.map(
                                                        (detail, index) =>
                                                        (<p className="block text-gray-500 text-sm leading-none" key={index}>
                                                            {detail}
                                                        </p>)
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div> :

                                    <div className="dark:text-white w-full h-auto text-[18px]">

                                        {/* Rating Box */}
                                        <div className="w-full h-[220px] border-b border-b-gray-200 dark:border-b-[#313131] flex justify-center">

                                            <div className="h-full w-auto justify-center px-5 space-y-2 flex items-center flex-col">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Rating</span>
                                                <span className="text-4xl font-extrabold">{avgRating}/5</span>
                                                <div className="flex items-center">
                                                    <div>
                                                        {stars}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">({totalReviews} reviews)</span>
                                                <button onClick={handleReviewFormStatus} className="py-2 px-4 rounded-md cursor-pointer bg-[#919eab14] hover:bg-[#919eab42] text-sm font-medium">
                                                    Write your review
                                                </button>
                                            </div>

                                        </div>

                                        {/* Reviews Box */}
                                        <div className="w-full min-h-[200px] max-h-[800px] flex flex-col justify-center space-y-2 md:space-y-0">
                                            {
                                                reviews.length > 0 ?
                                                    reviews.map(review =>
                                                        <ReviewCard
                                                            key={review._id}
                                                            reviewUserId={review.user?._id}
                                                            userId={user?._id}
                                                            username={review.user?.username}
                                                            rating={review.rating}
                                                            review={review.review}
                                                            createdAt={review.createdAt}
                                                        />
                                                    ) : <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-sm text-gray-500">No reviews yet</span>
                                                    </div>
                                            }
                                        </div>

                                        {/* Pagination */}
                                        <div className="w-full h-[60px] flex justify-center items-center border-t border-gray-200 rounded-b-2xl space-x-4">
                                            <button onClick={handlePreviousPage} className="cursor-pointer bg-[#919eab14] hover:bg-[#919eab42] rounded-md h-[30px] w-[30px] flex items-center justify-center">
                                                <ArrowBackIcon />
                                            </button>
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">Page <b>{page}</b> of {totalPage != 0 ? totalPage : 1}</span>
                                            <button onClick={handleNextPage} className="cursor-pointer bg-[#919eab14] hover:bg-[#919eab42] rounded-md h-[30px] w-[30px] flex items-center justify-center">
                                                <ArrowForwardIcon />
                                            </button>
                                        </div>

                                    </div>
                            }
                        </div>

                    </div>

                </div>
                <ReviewForm isActive={reviewFormStatus}
                    closeFunction={setReviewFormStatus}
                    productId={productId}
                    getReviews={getReviewInfo}
                />
            </>
        )
    }
    else return <Loader isActive={true} />
}

export default ProductPage