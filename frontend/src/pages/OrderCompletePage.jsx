import React, { useEffect, useState } from 'react'
import { userOrder } from '../services/orderApi'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
import { Link, useParams } from 'react-router-dom';


function OrderCompletePage() {
    const { orderId } = useParams()
    const [order, setOrder] = useState()

    const getOrderDetails = async () => {
        const response = await userOrder(orderId)
        if (response.data) setOrder(response.data)
    }

    const receiptGenerator = () => {
        const doc = new jsPDF();

        // Set up fonts and sizes
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(14);

        // Add Title
        doc.setFontSize(14);
        doc.setFont("Helvetica", "bold");
        doc.text("Receipt", 105, 20, null, null, "center");

        // Add Order Details
        const headers = ['Item', 'Quantity', 'Price', 'Total'];

        // Table rows (Itemized list)
        console.log(order)
        const data = order.items.map(item => [
            item.productId.name,
            String(item.quantity),
            item.productId.price.toFixed(2),
            (item.quantity * item.productId.price).toFixed(2)
        ]);

        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 40,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 123, 255],
                textColor: [255, 255, 255],
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'center', fontStyle: 'bold' },
            },
            bodyStyles: { fontSize: 10 },
            margin: { horizontal: 10 },
        })

        // Add Total Amount
        const totalAmount = order.items.reduce((total, item) => total + item.quantity * item.productId.price, 0);
        doc.setFont("Helvetica", "bold");
        doc.text(`Total: ${totalAmount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10); // Position total after the table

        // Add Footer (e.g., order date or notes)
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        const footerY = doc.lastAutoTable.finalY + 20;
        doc.text(`Name: ${order.customer.username}`, 10, footerY);
        doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString('en-GB',
            { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}`
            , 10, footerY + 6);
        doc.text(`Thank you for your purchase!`, 10, footerY + 12);

        doc.setFontSize(14);
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(55, 114, 255)
        doc.text(`Shop`, 10, footerY + 20);

        doc.setTextColor(255, 212, 0)
        doc.text(`Sphere`, 22.5, footerY + 20);

        // Save the document
        doc.save(`receipt-${order._id}.pdf`);

    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    return (
        (order && orderId) && <div className='w-full h-[91vh] relative top-[9vh] flex justify-center items-center dark:bg-[#111] font-[poppins] transition-all duration-200 ease-in'>
            <div className='flex flex-col items-center'>
                <CheckCircleIcon sx={{ color: "#28a745", fontSize: "50px" }} />

                <span className='text-2xl font-medium leading-none mt-1 dark:text-white'>Order confirmed</span>

                <p className='text-gray-400'>Thank you for shopping with us</p>

                <button onClick={receiptGenerator} className='text-blue-500 text-sm mt-2 cursor-pointer'>Download receipt</button>

                <Link to={'/'} className='bg-[#3772ff] text-white px-3 py-1 rounded-lg mt-5 cursor-pointer'>Continue</Link>
            </div>
        </div>
    )
}

export default OrderCompletePage