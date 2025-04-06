<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPasswordManagementColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('temporary_password')->default(false)->after('password');
            $table->string('password_reset_token')->nullable()->after('temporary_password');
            $table->timestamp('password_reset_expires')->nullable()->after('password_reset_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['temporary_password', 'password_reset_token', 'password_reset_expires']);
        });
    }
}
