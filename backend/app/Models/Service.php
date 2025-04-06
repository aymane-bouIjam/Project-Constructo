<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'short_desc', 'content', 'image_id', 'status',
    ];

    public function image()
    {
        return $this->belongsTo(TempImage::class, 'image_id');
    }
}
