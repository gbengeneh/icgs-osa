<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class AdminAuditLog extends Model{protected $fillable=['actor_id','action','method','path','subject_type','subject_id','metadata','ip_address'];protected function casts():array{return ['metadata'=>'array'];}public function actor(){return $this->belongsTo(User::class,'actor_id');}}
