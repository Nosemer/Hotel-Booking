<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'discount_code',
        'type',
        'value',
        'applicable_to',
        'room_type',
        'room_id',
        'valid_from',
        'valid_to'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function vouchers()
    {
        return $this->hasMany(Voucher::class);
    }
}

