<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class ProjectDue extends Model{protected $fillable=['title','description','deadline','payment_instructions','bank_name','account_name','account_number','published','closed','created_by'];protected function casts():array{return ['deadline'=>'date','published'=>'boolean','closed'=>'boolean'];}public function assignments(){return $this->hasMany(ProjectDueAssignment::class);} }
