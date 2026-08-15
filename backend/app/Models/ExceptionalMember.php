<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class ExceptionalMember extends Model{protected $fillable=['user_id','name','graduating_year','title','citation','photo_url','sort_order','published','created_by','updated_by'];protected function casts():array{return ['published'=>'boolean'];}public function member(){return $this->belongsTo(User::class,'user_id');}}
