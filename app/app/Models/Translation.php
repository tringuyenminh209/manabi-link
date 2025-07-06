<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Translation extends Model
{
    use HasFactory;

    protected $fillable = [
        'translatable_type',
        'translatable_id',
        'field',
        'locale',
        'value',
    ];

    /**
     * Get the owning translatable model.
     */
    public function translatable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope to filter by locale
     */
    public function scopeForLocale($query, string $locale)
    {
        return $query->where('locale', $locale);
    }

    /**
     * Scope to filter by field
     */
    public function scopeForField($query, string $field)
    {
        return $query->where('field', $field);
    }
}
