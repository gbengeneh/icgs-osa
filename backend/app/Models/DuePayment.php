<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class DuePayment extends Model{protected $fillable=['due_id','user_id','amount','reference','method','note','status','paid_at','verified_by','verified_at'];protected function casts():array{return ['amount'=>'decimal:2','paid_at'=>'datetime','verified_at'=>'datetime'];}public function due(){return $this->belongsTo(Due::class);}public function member(){return $this->belongsTo(User::class,'user_id');}}
