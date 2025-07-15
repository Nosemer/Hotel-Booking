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
        'room_type_id',
        'room_id',
        'booking_id',
        'branch_id',
        'valid_from',
        'valid_to'
    ];

     public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}

