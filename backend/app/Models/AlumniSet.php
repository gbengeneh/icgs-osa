<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class AlumniSet extends Model{protected $table='alumni_sets';protected $fillable=['year','coordinator_id','description'];public function members(){return $this->hasMany(User::class,'graduating_year','year');}}
