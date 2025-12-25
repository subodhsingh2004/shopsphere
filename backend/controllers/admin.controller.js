import { Order } from "../models/OrderModel.js";
import { User } from "../models/UserModel.js";
import { Product } from "../models/ProductModel.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getTotalSales = asyncHandler(async function (req, res) {
    const sales = await Order.find({ orderStatus: "Completed" }).select("totalAmount -_id")
    const total = sales.reduce((sum, current) => sum += current.totalAmount, 0)
    return res.status(200).json(total)
})

const getTotalOrders = asyncHandler(async function (req, res) {
    // find the orders and populate the customer field and items field
    const orders = await Order.find().populate("customer", "username").populate("items.productId", "name price image")
    return res.status(200).json(orders)
})

const getTotalCustomers = asyncHandler(async function (req, res) {
    const customers = await User.countDocuments()
    return res.status(200).json(customers)
})

const getLastSixMonthSalesData = asyncHandler(async function (req, res) {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));

    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo }
            }
        },
        {
            $project: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
                total: "$totalAmount" // Or whatever the field is for order amount
            }
        },
        {
            $group: {
                _id: { year: "$year", month: "$month" },
                totalSales: { $sum: "$total" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
        }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedSalesData = salesData.map(item => ({
        month: monthNames[item._id.month - 1], // Adjust for zero-based index
        year: item._id.year,
        totalSales: item.totalSales
    }));

    res.status(200).json(formattedSalesData);

})

const getCurrentMonthSalesData = asyncHandler(async function (req, res) {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: firstDay, $lte: lastDay },
                orderStatus: "Completed"
            }
        },
        {
            $project: {
                day: { $dayOfMonth: "$createdAt" },
                total: "$totalAmount"
            }
        },
        {
            $group: {
                _id: "$day",
                totalSales: { $sum: "$total" }
            }
        },
        {
            $sort: { "_id": 1 } // Sort by day
        }
    ]);

    const monthlySalesData = salesData.map(item => ({
        day: item._id,
        totalSales: item.totalSales
    }))

    // sum the total sales of the month
    const totalMonthlySales = monthlySalesData.reduce((sum, current) => sum += current.totalSales, 0)

    // today sales
    const today = new Date().getDate();
    const todaySalesData = monthlySalesData.find(item => item.day === today)?.totalSales || 0;

    res.status(200).json({ monthlySalesData, totalMonthlySales, todaySalesData });
})

const getSalesByCategory = asyncHandler(async function (req, res) {
    const data = await Order.aggregate([
        {
            $unwind: "$items"
        },
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "items"
            }
        },
        {
            $group: {
                _id: "$items.category",
                totalSales: { $sum: "$totalAmount" }
            }
        }
    ])

    const salesData = data.map(item => ({
        category: item._id[0],
        totalSales: item.totalSales
    }))

    res.status(200).json(salesData)
})

const getOutofStockProducts = asyncHandler(async function (req, res) {
    const products = await Product.find({ quantity: 0 }).select("name price image")
    res.status(200).json(products)
})

export { getTotalSales, getTotalOrders, getTotalCustomers, getLastSixMonthSalesData, getCurrentMonthSalesData, getSalesByCategory, getOutofStockProducts }