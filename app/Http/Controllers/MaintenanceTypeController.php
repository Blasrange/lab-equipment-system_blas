<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MaintenanceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenanceTypes = MaintenanceType::active()
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        return response()->json($maintenanceTypes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:preventive,corrective,predictive',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'estimated_duration_minutes' => 'nullable|integer|min:1',
            'estimated_cost' => 'nullable|numeric|min:0',
            'requires_external_service' => 'boolean',
            'required_skills' => 'nullable|array',
            'required_tools' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $maintenanceType = MaintenanceType::create($request->all());

        return response()->json([
            'message' => 'Tipo de mantenimiento creado exitosamente',
            'data' => $maintenanceType
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenanceType $maintenanceType)
    {
        return response()->json($maintenanceType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaintenanceType $maintenanceType)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|in:preventive,corrective,predictive',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'estimated_duration_minutes' => 'nullable|integer|min:1',
            'estimated_cost' => 'nullable|numeric|min:0',
            'requires_external_service' => 'boolean',
            'required_skills' => 'nullable|array',
            'required_tools' => 'nullable|array',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $maintenanceType->update($request->all());

        return response()->json([
            'message' => 'Tipo de mantenimiento actualizado exitosamente',
            'data' => $maintenanceType
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaintenanceType $maintenanceType)
    {
        $maintenanceType->delete();

        return response()->json([
            'message' => 'Tipo de mantenimiento eliminado exitosamente'
        ]);
    }
}