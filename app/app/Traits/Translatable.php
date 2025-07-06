<?php

namespace App\Traits;

use App\Models\Translation;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Translatable
{
    /**
     * Get all translations for the model
     */
    public function translations(): MorphMany
    {
        return $this->morphMany(Translation::class, 'translatable');
    }

    /**
     * Get translation for specific field and locale
     */
    public function getTranslation(string $field, string $locale = 'ja'): ?string
    {
        $translation = $this->translations()
            ->where('field', $field)
            ->where('locale', $locale)
            ->first();

        return $translation ? $translation->value : $this->getAttribute($field);
    }

    /**
     * Set translation for specific field and locale
     */
    public function setTranslation(string $field, string $locale, string $value): void
    {
        $this->translations()->updateOrCreate(
            [
                'field' => $field,
                'locale' => $locale,
            ],
            [
                'value' => $value,
            ]
        );
    }

    /**
     * Get all translations for a field
     */
    public function getTranslationsForField(string $field): array
    {
        $translations = $this->translations()
            ->where('field', $field)
            ->get()
            ->pluck('value', 'locale')
            ->toArray();

        // Add the original value as fallback
        if (!empty($this->getAttribute($field))) {
            $translations['original'] = $this->getAttribute($field);
        }

        return $translations;
    }

    /**
     * Get localized attribute
     */
    public function getLocalizedAttribute(string $attribute, string $locale = 'ja')
    {
        if (in_array($attribute, $this->getTranslatableFields())) {
            return $this->getTranslation($attribute, $locale);
        }

        return $this->getAttribute($attribute);
    }

    /**
     * Define which fields are translatable
     * Override this method in your model
     */
    protected function getTranslatableFields(): array
    {
        return $this->translatable ?? [];
    }
}
