<?php
 
namespace App\Models;
 
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Foundation\Auth\User as Authenticatable;
 
class User extends Authenticatable implements FilamentUser
{
    // ...
 
    public function canAccessFilament(): bool
    {
        return $this->is_admin;
    }
}