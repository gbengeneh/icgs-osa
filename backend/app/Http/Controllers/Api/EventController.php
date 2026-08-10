<?php
namespace App\Http\Controllers\Api;use App\Http\Controllers\Controller;use App\Models\Event;
class EventController extends Controller{public function index(){return Event::where('published',true)->where('starts_at','>=',now())->orderBy('starts_at')->paginate(12);}}
