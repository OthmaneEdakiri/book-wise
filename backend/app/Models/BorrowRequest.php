<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorrowRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'user_id',
        'status',
        'borrowed_date',
        'due_date',
        'return_date',
    ];

    protected $casts = [
        'borrowed_date' => 'datetime',
        'due_date' => 'datetime',
        'return_date'=> 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function canTransitionTo($newStatus)
    {
        $valid = [
            'pending'  => ['borrowed', 'expired'],
            'borrowed' => ['returned', 'overdue'],
            'overdue'  => ['returned', 'expired'],
            'returned' => [],
            'expired'  => [],
        ];

        return in_array($newStatus, $valid[$this->status] ?? []);
    }
}
