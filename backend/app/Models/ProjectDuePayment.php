<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class ProjectDuePayment extends Model{protected $fillable=['project_due_assignment_id','submitted_by','amount','reference','method','paid_at','note','status','verified_by','verified_at'];protected function casts():array{return ['amount'=>'decimal:2','paid_at'=>'date','verified_at'=>'datetime'];}public function assignment(){return $this->belongsTo(ProjectDueAssignment::class,'project_due_assignment_id');}public function submitter(){return $this->belongsTo(User::class,'submitted_by');}}
