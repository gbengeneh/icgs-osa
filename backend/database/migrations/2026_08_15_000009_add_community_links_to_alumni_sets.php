<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alumni_sets', function (Blueprint $table) {
            $table->string('whatsapp_url', 500)->nullable()->after('description');
            $table->string('telegram_url', 500)->nullable()->after('whatsapp_url');
        });
    }

    public function down(): void
    {
        Schema::table('alumni_sets', function (Blueprint $table) {
            $table->dropColumn(['whatsapp_url', 'telegram_url']);
        });
    }
};
