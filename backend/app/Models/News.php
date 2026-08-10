<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class News extends Model{protected $table='news';protected $fillable=['title','slug','body','image_url','pinned','published_at','created_by'];protected function casts():array{return ['pinned'=>'boolean','published_at'=>'datetime'];}}
