<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{

    public function index()
    {
        return response()->json([
            "products" => Product::all()
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,bmp,png'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->toJson()
            ], 400);
        }
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $name = time() . rand(1000, 9999);
            $ext = $file->extension();
            $imgName = $name . "." . $ext;
            $request->image->move(('images'), $imgName);


            $cloudinary = new Cloudinary();
            $folder = "s-food";
            $cloudinary->uploadApi()->upload(public_path('images/' . $imgName), [
                "folder" => $folder,
                "public_id" => $name,
                "format" => $ext
            ]);

            // Save DB image name
            $product->image = $folder . "/" .  $imgName;

            // Delete file in storage after upload
            File::delete("images/" . $imgName);
        }
        $product->save();
        return response()->json([
            'message' => 'Tạo thành công.',
            'product' => $product,
        ]);
    }




    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->toJson(),
            ], 400);
        }

        $cloudinary = new Cloudinary();

        $product =  Product::find($id);
        $product->name = $request->name;
        $product->price = $request->price;


        if ($request->hasFile('image')) {
            if ($product->image) {
                $cloudinary->uploadApi()->destroy(explode(".", $product->image)[0]);
            }

            $file = $request->file('image');
            $name = time() . rand(1000, 9999);
            $ext = $file->extension();
            $imgName = $name . "." . $ext;
            $request->image->move(('images'), $imgName);


            $folder = "s-food";
            $cloudinary->uploadApi()->upload(public_path('images/' . $imgName), [
                "folder" => $folder,
                "public_id" => $name,
                "format" => $ext
            ]);

            // Save DB image name
            $product->image = $folder . "/" .  $imgName;

            // Delete file in storage after upload
            File::delete("images/" . $imgName);
        }
        $product->save();
        return response()->json([
            'message' => 'Cập nhật thành công.',
            'product' => $product,
        ]);
    }
    public function destroy($id)
    {
        $product =  Product::find($id);
        if ($product->image) {

            $cloudinary = new Cloudinary();

            $cloudinary->uploadApi()->destroy(explode(".", $product->image)[0]);
        }
        $product->delete();
        return response()->json([
            'message' => 'Xóa thành công.',
        ]);
    }
}
