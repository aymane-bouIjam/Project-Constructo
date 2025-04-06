<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'job_title',
        'linkedin_url',
        'image_id',
        'status',
    ];

    public function image()
    {
        return $this->belongsTo(TempImage::class, 'image_id');
    }
}
