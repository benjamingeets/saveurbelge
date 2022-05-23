<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ShopRequest;
use App\Mail\ShopEdit;
use App\Models\Shop;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ShopsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('homepage',['shops'=>Shop::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('form');
    }

   
    public function store(ShopRequest $request)
    {
        $shop = Shop::create($request->all());
        return $shop;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $shop = Shop::where('slug',$slug)->get();
        return view('shop',['shop'=>$shop[0]]);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$slug)
    {
        if (! $request->hasValidSignature()) {
            abort(401);
        }
        $shop = Shop::where('slug',$slug)->get()[0];
        return view('form',['shop'=>$shop]);
    }

    public function sendEditMail(Request $request, $slug)
    {
        
        $shop = Shop::where('slug',$slug)->get()[0];
        if($shop->email != $request->email){
            abort(401);
        }
        $url = URL::temporarySignedRoute('shop.edit', now()->addMinutes(60), ['slug' => $slug]);
       Mail::to('benjamin@geets.dev')->send(new ShopEdit($shop,$url));
        return $request;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
