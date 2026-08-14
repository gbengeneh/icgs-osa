<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MemberActivity extends Model{protected $fillable=['user_id','type','title','description','metadata','occurred_at'];protected function casts():array{return ['metadata'=>'array','occurred_at'=>'datetime'];}public function user(){return $this->belongsTo(User::class);}}
