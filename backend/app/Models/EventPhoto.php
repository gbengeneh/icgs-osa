<?php
namespace App\Models;use Illuminate\Database\Eloquent\Casts\Attribute;use Illuminate\Database\Eloquent\Model;use Illuminate\Support\Facades\Storage;
class EventPhoto extends Model{protected $fillable=['event_id','path','original_name','caption','sort_order','uploaded_by'];protected $appends=['url'];public function event(){return $this->belongsTo(Event::class);}protected function url():Attribute{return Attribute::get(fn()=>Storage::disk('public')->url($this->path));}}
