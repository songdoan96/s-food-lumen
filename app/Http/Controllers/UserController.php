<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:4',
        ], [
            'name.required' => "Vui lòng nhập họ tên.",
            'email.required' => "Vui lòng nhập email.",
            'password.required' => "Vui lòng nhập mật khẩu.",
            'password.confirmed' => "Mật khẩu chưa khớp.",
            'password.min' => "Mật khẩu tối thiểu :min ký tự",
            'email.email' => "Vui lòng nhập đúng định dạng.",
            'email.unique' => "Email đã tồn tại.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->toJson()
            ], 400);
        }
        $user = User::create(array_merge($validator->validate(), ['password' => Hash::make($request->password), 'role' => 'user']));
        return response()->json(['message' => 'Tạo tài khoản thành công.']);
    }
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => "Vui lòng nhập email",
            'password.required' => "Vui lòng nhập mật khẩu",
            'email.email' => "Vui lòng nhập đúng định dạng",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->toJson()
            ], 400);
        }


        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'message' => json_encode(["email" => 'Tài khoản không tồn tại.'])
            ], 401);
        }

        return $this->respondWithToken($token);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Đăng xuất thành công.'
        ]);
    }
    public function me()
    {
        return response()->json(['user' => auth()->user()]);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'user' => [
                'token' => $token,
                'id' => auth()->user()->_id,
                'name' => auth()->user()->name,
                'role' => auth()->user()->role
            ]
        ]);
    }
}
