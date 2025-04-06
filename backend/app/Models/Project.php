<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_desc',
        'content',
        'construction_type',
        'sector',
        'location',
        'image_id',
        'status',
    ];

    public function image()
    {
        return $this->belongsTo(TempImage::class, 'image_id');
    }
}
