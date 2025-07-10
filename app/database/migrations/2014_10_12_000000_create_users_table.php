<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('country')->nullable();
            $table->string('location')->nullable();
            $table->text('address')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['learner', 'teacher', 'admin'])->default('learner');
            $table->string('avatar_path')->nullable();
            $table->text('bio')->nullable();
            $table->enum('ekyc_status', ['not_verified', 'pending', 'verified', 'rejected'])->default('not_verified');
            $table->json('ekyc_data')->nullable(); // Lưu thông tin giấy tờ, ảnh, v.v.
            $table->string('language_preference')->default('ja');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
