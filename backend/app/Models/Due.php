<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class Due extends Model{protected $fillable=['type','alumni_set_id','title','year','amount','deadline','description','payment_instructions','allow_part_payment','published','closed','created_by'];protected function casts():array{return ['amount'=>'decimal:2','deadline'=>'date','allow_part_payment'=>'boolean','published'=>'boolean','closed'=>'boolean'];}public function payments(){return $this->hasMany(DuePayment::class);}public function set(){return $this->belongsTo(AlumniSet::class,'alumni_set_id');}}
