<?php
use Illuminate\Database\Migrations\Migration;use Illuminate\Database\Schema\Blueprint;use Illuminate\Support\Facades\Schema;
return new class extends Migration{public function up():void{Schema::table('news',function(Blueprint $t){$t->string('category')->default('Association update')->after('slug');$t->text('excerpt')->nullable()->after('category');$t->boolean('featured')->default(false)->after('pinned');});}public function down():void{Schema::table('news',function(Blueprint $t){$t->dropColumn(['category','excerpt','featured']);});}};
