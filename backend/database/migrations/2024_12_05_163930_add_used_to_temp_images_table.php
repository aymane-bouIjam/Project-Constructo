<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('temp_images', function (Blueprint $table) {
            $table->boolean('used')->default(false);
        });
    }
    
    public function down()
    {
        Schema::table('temp_images', function (Blueprint $table) {
            $table->dropColumn('used');
        });
    }
    
};
