<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class News extends Model{protected $table='news';protected $fillable=['title','slug','category','excerpt','body','image_url','pinned','featured','published_at','created_by'];protected function casts():array{return ['pinned'=>'boolean','featured'=>'boolean','published_at'=>'datetime'];}public function author(){return $this->belongsTo(User::class,'created_by');}}
