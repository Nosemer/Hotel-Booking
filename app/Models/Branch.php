<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'city', 'state', 'zip_code'];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
