<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;use App\Models\Exco;use Illuminate\Http\Request;use Illuminate\Support\Facades\Storage;
class ExcoController extends Controller{
public function index(){return Exco::where('active',true)->orderByDesc('tenure_end')->orderBy('sort_order')->orderBy('role')->get();}
public function adminIndex(){return Exco::orderByDesc('active')->orderByDesc('tenure_end')->orderBy('sort_order')->paginate(100);}
public function store(Request $request){$data=$this->validated($request);if($request->hasFile('photo'))$data['photo_url']=$this->storePhoto($request);unset($data['photo']);return response()->json(Exco::create($data),201);}
public function update(Request $request,Exco $exco){$data=$this->validated($request,true);if($request->hasFile('photo')){$this->deletePhoto($exco->photo_url);$data['photo_url']=$this->storePhoto($request);}unset($data['photo']);$exco->update($data);return $exco->fresh();}
public function destroy(Exco $exco){$exco->update(['active'=>false]);return response()->json(['message'=>'Executive archived.']);}
private function validated(Request $request,bool $partial=false):array{$required=$partial?'sometimes':'required';return $request->validate(['user_id'=>'nullable|exists:users,id','name'=>"$required|string|max:120",'role'=>"$required|string|max:120",'graduating_year'=>'nullable|integer|min:1979|max:'.date('Y'),'occupation'=>'nullable|string|max:120','bio'=>'nullable|string|max:2000','photo_url'=>'nullable|string|max:500','photo'=>'sometimes|image|mimes:jpeg,jpg,png,webp|max:5120','tenure_start'=>"$required|integer|min:1979",'tenure_end'=>"$required|integer|gte:tenure_start",'sort_order'=>'integer|min:0','active'=>'boolean']);}
private function storePhoto(Request $request):string{$path=$request->file('photo')->store('excos','public');return Storage::disk('public')->url($path);}
private function deletePhoto(?string $url):void{if($url&&str_contains($url,'/storage/'))Storage::disk('public')->delete(str($url)->after('/storage/')->toString());}
}
