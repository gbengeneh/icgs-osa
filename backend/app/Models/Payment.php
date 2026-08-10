<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class Payment extends Model{protected $fillable=['user_id','type','cycle','cause','amount','reference','proof_path','note','status','confirmed_by','confirmed_at'];protected function casts():array{return ['amount'=>'decimal:2','confirmed_at'=>'datetime'];}}
