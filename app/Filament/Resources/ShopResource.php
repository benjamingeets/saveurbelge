<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShopResource\Pages;
use App\Filament\Resources\ShopResource\RelationManagers;
use App\Models\Shop;
use Closure;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\FileUpload;
use Livewire\TemporaryUploadedFile;
use Illuminate\Support\Str;

class ShopResource extends Resource
{
    protected static ?string $model = Shop::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $recordTitleAttribute = 'name';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required(),
                TextInput::make('slug')->disabled(),
                Fieldset::make('adresse')->schema([
                    TextInput::make('street')->required(),
                    TextInput::make('city')->required(),
                ]),
                Fieldset::make('liens')->schema([
                    TextInput::make('facebook'),
                    TextInput::make('instagram'),
                    TextInput::make('website'),
                ]),
                Fieldset::make('position')->schema([
                    TextInput::make('latitude'),
                    TextInput::make('longitude')
                ]),
                Fieldset::make('contact')->schema([
                    TextInput::make('phone'),
                    TextInput::make('email')->required(),
                ]),
                Fieldset::make('options')->schema([
                    Checkbox::make('is_bio'),
                    Checkbox::make('is_productor'),
                    Checkbox::make('accept_local_currency'),
                ]),

                TextInput::make('title')->required(),
                TextArea::make('description'),
                FileUpload::make('logo')->disk('public')->directory('logos'),
                FileUpload::make('banner')->disk('public')->directory('banners')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('city'),
                Tables\Columns\TextColumn::make('email'),
            ])
            ->filters([
                //
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListShops::route('/'),
            'create' => Pages\CreateShop::route('/create'),
            'edit' => Pages\EditShop::route('/{record}/edit'),
        ];
    }
}
