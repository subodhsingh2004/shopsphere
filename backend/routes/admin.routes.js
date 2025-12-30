import { Router } from 'express'
import { getCurrentMonthSalesData, getLastSixMonthSalesData, getTotalOrders, getTotalSales, getTotalCustomers, getSalesByCategory, getOutofStockProducts } from '../controllers/admin.controller.js'

const limiter = (maxRequests) => rateLimit({
    windowMs: 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 429, message: "Too many requests, Please try again later." }
});

const router = Router()

router.use(limiter(10));
router.route('/get-total-sales').get(getTotalSales)
router.route('/get-total-orders').get(getTotalOrders)
router.route('/get-total-customers').get(getTotalCustomers)
router.route('/get-last-6-months-data').get(getLastSixMonthSalesData)
router.route('/get-current-month-sales-data').get(getCurrentMonthSalesData)
router.route('/get-total-sales-by-category').get(getSalesByCategory)
router.route('/get-out-of-stock-products').get(getOutofStockProducts)

export default router