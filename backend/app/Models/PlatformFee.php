<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class PlatformFee extends Model{protected $fillable=['year','title','amount','deadline','payment_instructions','published','closed','created_by'];protected function casts():array{return ['amount'=>'decimal:2','deadline'=>'date','published'=>'boolean','closed'=>'boolean'];}public function payments(){return $this->hasMany(PlatformFeePayment::class);}}
