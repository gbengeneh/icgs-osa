<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class Event extends Model{protected $fillable=['title','description','starts_at','location','image_url','created_by','published'];protected function casts():array{return ['starts_at'=>'datetime','published'=>'boolean'];}public function attendees(){return $this->belongsToMany(User::class,'rsvps')->withTimestamps();}}
