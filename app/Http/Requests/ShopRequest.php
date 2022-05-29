<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:shops|max:255' . $this->id,
            'street' => 'required',
            'city' => 'required',
            'facebook',
            'instagram',
            'website',
            'title' => 'required',
            'logo' => 'max:2000',
            'banner' => 'max:2000',
            'description' => 'max:255',
            'phone',
            'email' => 'required|unique:shops',
            'is_bio',
            'is_productor',
            'accept_local_currency'
        ];
    }
}
