<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $fillable = [
        'firstname',
        'lastname',
        'profile_image',
        'email',
        'password',
        'university_id',
        'status'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'admin';
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
