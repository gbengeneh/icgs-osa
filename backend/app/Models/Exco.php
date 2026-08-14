<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Exco extends Model{protected $fillable=['user_id','name','role','graduating_year','occupation','bio','photo_url','tenure_start','tenure_end','sort_order','active'];protected $appends=['lifecycle'];protected function casts():array{return ['active'=>'boolean','tenure_start'=>'integer','tenure_end'=>'integer'];}public function getLifecycleAttribute():string{if(!$this->active)return 'archived';$year=(int)now()->year;if($this->tenure_end<$year)return 'previous';if($this->tenure_start>$year)return 'upcoming';return 'current';}public function user(){return $this->belongsTo(User::class);}}
