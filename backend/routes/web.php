<?php
use Illuminate\Support\Facades\Route;
Route::get('/',fn()=>response()->json(['name'=>'ICGS-OSA API','status'=>'online']));
