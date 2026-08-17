<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class ProjectDueAssignment extends Model{protected $fillable=['project_due_id','alumni_set_id','amount'];protected function casts():array{return ['amount'=>'decimal:2'];}public function project(){return $this->belongsTo(ProjectDue::class,'project_due_id');}public function set(){return $this->belongsTo(AlumniSet::class,'alumni_set_id');}public function payments(){return $this->hasMany(ProjectDuePayment::class);} }
