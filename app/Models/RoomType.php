<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
