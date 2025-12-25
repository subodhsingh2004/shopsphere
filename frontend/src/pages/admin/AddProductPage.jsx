import React, { useState } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddIcon from '@mui/icons-material/Add';
import { addProduct } from '../../services/productApi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify'


function AddProductPage() {

    const [loadingStatus, setLoadingStatus] = useState(false)

    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productDetails, setProductDetails] = useState("")
    const [productQuantity, setProductQuantity] = useState(1)
    const [productPrice, setProductPrice] = useState(1)
    const [productCategory, setProductCategory] = useState("")

    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        setImage(null);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault()


        const formData = new FormData()
        formData.append("name", productName)
        formData.append("description", productDescription)
        formData.append("details", productDetails)
        formData.append('file', image)
        formData.append("quantity", productQuantity)
        formData.append("category", productCategory)
        formData.append("price", productPrice)

        try {
            setLoadingStatus(true)
            const response = await addProduct(formData)

            if (response) {
                setLoadingStatus(false)
                toast.success("Product added successfully")

                // clear the form
                setProductName("")
                setProductDescription("")
                setProductDetails("")
                setImage(null)
                setProductCategory("")
                setProductQuantity(1)
                setProductPrice(1)
            }
        } catch (error) {
            setLoadingStatus(false)
            toast.error(error?.response.data.error)
        }
    }

    return (
        <div className='w-full relative h-auto dark:bg-[#000] p-6 flex items-center flex-col font-[poppins]'>

            <form onSubmit={handleAddProduct} className='w-full flex flex-col items-center space-y-6'>
                <div className='flex justify-between items-center w-full md:w-[50%]'>
                    <h1 className='font-bold text-2xl dark:text-white leading-none'>Add a new product</h1>
                    <button type='submit' className='bg-[#3772ff] text-white pl-2 pr-3 py-[6px] h-[35px] rounded-md text-sm font-medium cursor-pointer flex items-center justify-center'> <AddIcon />Add</button>
                </div>

                <div className='w-full h-auto flex justify-center items-center'>

                    <div onSubmit={handleAddProduct} className='h-full w-full md:w-[50%] dark:bg-[#141414] border border-gray-200 dark:border-[#212121] rounded-2xl shadow-xl'>
                        <div className='w-full dark:text-white text-lg border-b p-4 border-gray-200 dark:border-[#414141]'>Details</div>

                        <div className='w-full px-5 py-8'>
                            <div className="relative mb-6 flex flex-col space-y-6">

                                <div className="relative">
                                    <input id='product-name' type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                                    <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Product name</label>
                                </div>

                                <div className="relative">
                                    <textarea id='product-name' style={{ resize: 'none' }} type="text" required value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='w-full h-[80px] pt-2 border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                                    <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Product description</label>
                                </div>

                                <div className="relative">
                                    <textarea id='product-name' style={{ resize: 'none' }} placeholder='write the detailed product descripton separated by comma' type="text" required value={productDetails} onChange={(e) => setProductDetails(e.target.value)} className='w-full h-[150px] pt-2 border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer placeholder:text-sm placeholder:pt-1' />
                                    <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Detail description</label>
                                </div>

                                <span className='font-medium dark:text-white leading-0'>Image</span>

                                <div className='relative flex flex-col border rounded-md h-auto space-y-0 py-2 items-center justify-center text-gray-400 dark:text-[#707070]'>
                                    <input onChange={handleFileChange} type="file" name="" id="" required className='absolute h-full w-full cursor-pointer opacity-0' />
                                    <InsertPhotoIcon sx={{ fontSize: "60px" }} />
                                    <label htmlFor="" className='text-black mt-2 dark:text-white text-[16px] font-medium'>Drop or select image</label>
                                    <span className='text-sm mt-1 text-center'>Drop files here or click to <b className='underline font-normal text-[#ffd400]'>upload</b> image</span>
                                </div>

                                {
                                    image && <div className='mt-2 border rounded-md h-[45px] flex items-center px-2'>
                                        <span>{image.name}</span>
                                        <span className='text-black dark:text-white pl-1'>{Math.floor(image.size / 1048576 * 100) / 100}Mb</span>
                                        <button onClick={handleRemoveFile} className='text-red-500 pl-4 cursor-pointer'>Remove</button>
                                    </div>
                                }

                                <div className='relative flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-6'>

                                    <div className='w-full md:w-1/2'>
                                        <input id='product-name' type="number" required value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white dark:text-white'>Quantity</label>
                                    </div>

                                    <div className='w-full md:w-1/2 h-[45px] relative border border-gray-400 dark:border-[#707070] rounded-md'>
                                        <select value={productCategory} required onChange={(e) => setProductCategory(e.target.value)} name="" id="" className='w-full h-full px-2 rounded-md cursor-pointer dark:text-white'>
                                            <option value="">Select</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Footwear">Footwear</option>
                                            <option value="Kids">Kids</option>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            <option value="Smartphones">Smartphones</option>
                                        </select>
                                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Category</label>
                                    </div>

                                </div>

                                <div className="relative">
                                    <input id='product-name' type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                                    <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Price (₹)</label>
                                </div>

                            </div>
                        </div>

                    </div>

                </div >
                <Loader isActive={loadingStatus} />
            </form>
        </div >
    )
}

export default AddProductPage