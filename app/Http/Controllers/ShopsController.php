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
        return view('homepage', ['shops' => Shop::all()->makeHidden(['email', 'created_at', 'updated_at'])]);
    }
    public function list()
    {
        return view('shops-list', ['shops' => Shop::all()->makeHidden(['email', 'created_at', 'updated_at'])]);
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
        try {
            $shop = Shop::create($request->all());
            return view('shop-created');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['address' => "L'adresse entrée n'a pas été reconnue."])->withInput();
        }
        // if(!$shop->save()){
        //     
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $shop = Shop::where('slug', $slug)->first();
        if(empty($shop->name)){
            abort(404);
        }
        return view('shop', ['shop' => $shop]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $slug)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }
        $shop = Shop::where('slug', $slug)->first();
        return view('form', ['shop' => $shop]);
    }

    public function sendEditMail(Request $request, $slug)
    {

        $shop = Shop::where('slug', $slug)->first();
        if ($shop->email == $request->email) {

            $url = URL::temporarySignedRoute('shop.edit', now()->addMinutes(60), ['slug' => $slug]);
            Mail::to($request->email)->send(new ShopEdit($shop, $url));
        }
        return $request;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {   
        $shop = Shop::where('slug', $slug)->first();
        $shop->update($request->all());
        $shop->save();

        return redirect()->route('shop.show', ['slug' => $shop->slug]);
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
