<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;use Illuminate\Foundation\Auth\User as Authenticatable;use Illuminate\Notifications\Notifiable;use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable{use HasApiTokens,HasFactory,Notifiable;protected $fillable=['name','email','password','graduating_year','phone','occupation','location','photo_url','role','status','privacy'];protected $hidden=['password','remember_token'];protected function casts():array{return ['email_verified_at'=>'datetime','password'=>'hashed','privacy'=>'array'];}public function set(){return $this->belongsTo(AlumniSet::class,'graduating_year','year');}}
