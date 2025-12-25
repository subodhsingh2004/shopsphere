import React, { useEffect, useState } from 'react'
import { deleteProduct, getSingleProduct, updateProduct } from '../../services/productApi'
import { useNavigate, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; import Loader from '../../components/Loader';
import { toast } from 'react-toastify'


function SingleProductPage() {

    const navigate = useNavigate()
    const { productId } = useParams()
    const [product, setProduct] = useState({})

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [editStatus, setEditStatus] = useState(false)

    const [productName, setProductName] = useState("")
    const [productImage, setProductImage] = useState("")
    const [productPrice, setProductPrice] = useState()
    const [productQuantity, setProductQuantity] = useState()
    const [productDescription, setProductDescription] = useState("")

    const getProductInfo = async () => {
        const productInfo = await getSingleProduct(productId)
        setProduct(productInfo.data.product)
        setProductName(productInfo.data.product.name)
        setProductPrice(productInfo.data.product.price)
        setProductImage(productInfo.data.product.image)
        setProductQuantity(productInfo.data.product.quantity)
        setProductDescription(productInfo.data.product.description)
    }

    useEffect(() => {
        getProductInfo()
    }, [])

    const handleEdit = () => {
        setEditStatus(true)
    }

    const handleSave = async () => {
        setEditStatus(true)
        try {
            const response = await updateProduct(product._id,{
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                description: productDescription
            })
            if (response.data) {
                getProductInfo()
                toast.success("Updated successfully")
                setEditStatus(false)
            }
        } catch (error) {

        }
    }

    const handleDeleteProduct = async () => {
        try {
            setLoadingStatus(true)

            const response = await deleteProduct(product._id)

            if (response.data) {
                setLoadingStatus(false)
                navigate('/admin/all-products')
                toast.success("Deleted successfully")
            }
        } catch (error) {

        }
    }

    if(product.image){ return (
        <>
            <Loader isActive={loadingStatus} />
            <div className="relative w-full md:h-[85vh] bg-white dark:bg-black py-10 px-5 md:px-8 xl:px-[10%] font-[poppins] space-y-10 md:space-y-0">
                <div className=" w-full h-auto md:h-full flex flex-col justify-between space-y-4 md:space-y-0 md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-[45%] h-full flex justify-center md:justify-start">
                        <img src={productImage} alt={productName} className="rounded-xl h-[80%] lg:h-full" />
                    </div>
                    {/* Details */}
                    <div className="w-full md:w-[50%] h-full flex flex-col justify-between">
                        <div className="space-y-3">
                            {
                                product.quantity == 0 ? <span className="bg-[#ff0000] text-white text-xs font-medium w-fit py-1 px-2 rounded font-[dmsans]">
                                    Out of Stock
                                </span> : null
                            }

                            {/* Product Name */}
                            <input
                                readOnly={!editStatus}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className={`font-[poppins] outline-none w-full dark:text-white text-xl font-medium ${product.quantity == 0 ? "pt-2" : "pt-0"}`} />

                            {/* Rating */}
                            <div className="flex items-center">
                                <div>
                                    <StarIcon sx={{ color: "#ffd400" }} />
                                    <StarIcon sx={{ color: "#ffd400" }} />
                                    <StarIcon sx={{ color: "#ffd400" }} />
                                    <StarIcon sx={{ color: "#ffd400" }} />
                                    <StarBorderIcon sx={{ color: "#ffd400" }} />
                                </div>
                                <span className="text-sm text-gray-500">(4k reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="text-2xl dark:text-white font-bold">₹
                                <input
                                    readOnly={!editStatus}
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    className='outline-none'
                                />
                            </div>

                            {/* Description */}
                            <div className="text-sm text-gray-500">
                                <textarea
                                    style={{ resize: 'none' }}
                                    readOnly={!editStatus}
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className='outline-none w-full text-wrap text-sm'
                                />
                            </div>
                            <div>
                                <span className='font-medium text-lg'>Quantity : </span>
                                <input
                                    readOnly={!editStatus}
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                    className='outline-none'
                                />
                            </div>
                            {/* purchase count */}
                            <div>
                                <span className='font-medium text-lg'>Purchase count : </span>
                                {product.purchaseCount}
                            </div>
                        </div>

                        <div className='flex justify-end space-x-2'>
                            {
                                editStatus ?
                                    <div className='space-x-2'>
                                        <button onClick={handleSave} className='bg-[#3772ff] rounded-md text-white px-3 py-1.5 cursor-pointer'>Save</button>
                                        <button onClick={() => setEditStatus(false)} className=' text-[#3772ff] border border-[#3772ff] rounded-md px-3 py-1.5 cursor-pointer'>Cancel</button>
                                    </div> :
                                    <button onClick={handleEdit} className='bg-[#3772ff] rounded-md text-white px-3 py-1.5 cursor-pointer'>Edit</button>

                            }
                            <button onClick={handleDeleteProduct} className='bg-red-500 cursor-pointer space-x-1 rounded-md text-white px-3 py-1.5 flex items-center'>
                                <span>Delete </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )}
    else{
        return <Loader isActive={true}/>
    }
}

export default SingleProductPage