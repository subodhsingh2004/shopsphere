import React from 'react'

function Receipt({ order }) {

    

    return (
        <div>
            <h1>Order Receipt</h1>
            <button onClick={receiptGenerator} className='cursor-pointer text-blue-500'>Download Receipt</button>
        </div>
    )
}

export default Receipt