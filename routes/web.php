<?php

/** @var \Laravel\Lumen\Routing\Router $router */


$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix' => 'api'], function () use ($router) {
    $router->group(['prefix' => 'auth'], function () use ($router) {
        $router->post('register', 'UserController@register');
        $router->post('login', 'UserController@login');

        $router->group(['middleware' => ['auth']], function () use ($router) {
            $router->post('logout', 'UserController@logout');
            $router->post('me', 'UserController@me');
        });
    });

    $router->get('product', 'ProductController@index');

    $router->group(['middleware' => ['auth']], function () use ($router) {

        $router->post('checkout', 'CheckoutController@checkout');
        $router->get('user-orders', 'UserOrderController@getOrdersUser');
        $router->get('user-order-detail/{id}', 'UserOrderController@userOrderDetail');
    });
    $router->group(['middleware' => ['auth', 'admin']], function () use ($router) {
        $router->post('product', 'ProductController@store');
        $router->put('product/{id}', 'ProductController@update');
        $router->delete('product/{id}', 'ProductController@destroy');

        $router->get('orders', 'CheckoutController@orders');
        $router->get('order/{id}', 'CheckoutController@order');
        $router->post('order-success', 'CheckoutController@orderSuccess');
    });
});
