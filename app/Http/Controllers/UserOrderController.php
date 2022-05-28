<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Checkout;
use App\Models\Order;

class UserOrderController extends Controller
{
    function getOrdersUser()
    {
        return response()->json([
            'orders' => Checkout::where('user_id', auth()->user()->_id)->get()
        ]);
    }
    function userOrderDetail($id)
    {
        $checkout = Checkout::find($id);
        $order = Order::where('checkout_id', $checkout->_id)->get();
        return response()->json([
            'checkout' => $checkout,
            'order' => $order,
        ]);
    }
}
