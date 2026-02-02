<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'genre',
        'author',
        'total_copies',
        'available_copies',
        'image',
        'summary',
        'description',
    ];
    public function borrowRequests()
    {
        return $this->hasMany(BorrowRequest::class);
    }
}
