<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'instrument' => 'required|string|max:255',
            'int_code' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'system_number' => 'required|string|max:255',
            'ext_calibration_periodicity' => 'nullable|string|max:255',
            'internal_check_periodicity' => 'nullable|string|max:255',
            'last_ext_calibration' => 'nullable|date',
            'next_ext_calibration' => 'nullable|date',
            'active' => 'required|boolean',
        ];
    }
}
