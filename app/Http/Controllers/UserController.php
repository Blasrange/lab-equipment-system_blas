<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Construir query base con selección de campos
        $query = User::select('id', 'name', 'email', 'active', 'created_at');

        // Filtro de búsqueda por nombre, email o estado
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('active', 'like', "%$search%");
            });
        }

        // Filtro por estado activo/inactivo
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('active', $request->status === 'active');
        }

        // Filtro por fecha de creación
        if ($request->filled('date_from') && $request->date_from) {
            $query->where('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to') && $request->date_to) {
            $query->where('created_at', '<=', $request->date_to);
        }

        // Ordenamiento
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        
        $allowedSortFields = ['name', 'email', 'active', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Paginación
        $perPage = $request->input('per_page', 5);
        $users = $query->paginate($perPage)->withQueryString();

        // DEBUG: Log para verificar los datos
        Log::info('Usuarios cargados con filtros:', [
            'total' => $users->total(),
            'current_page' => $users->currentPage(),
            'filters' => $request->all()
        ]);

        // Retornar la vista Inertia con datos
        return Inertia::render('users/UsersPage', [
            'users' => $users,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to', 'sort_field', 'sort_direction']),
            'options' => [
                'status_options' => [
                    ['value' => 'all', 'label' => 'Todos'],
                    ['value' => 'active', 'label' => 'Activos'],
                    ['value' => 'inactive', 'label' => 'Inactivos']
                ]
            ]
        ]);
    }

    public function create()
    {
        // Retornar el formulario de creación si es necesario
        // return Inertia::render('users/Create');
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario INCLUYENDO active
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'active' => 'boolean',
        ]);

        // DEBUG: Log para verificar los datos recibidos
        Log::info('Datos para crear usuario:', $validated);

        // Crear el usuario INCLUYENDO active
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'active' => $validated['active'] ?? true,
        ]);

        // Redirigir a la lista de usuarios con mensaje de éxito
        return redirect()->route('users.index')->with([
            'message' => 'Usuario creado exitosamente',
            'type' => 'success'
        ]);
    }

    public function show(User $user)
    {
        // return Inertia::render('Users/Show', [
        //     'user' => $user
        // ]);
    }

    public function edit(User $user)
    {
        // Retornar el formulario de edición
        // return Inertia::render('users/Edit', [
        //     'user' => $user
        // ]);
    }

    public function update(Request $request, User $user)
    {
        // Validar los datos del formulario INCLUYENDO active
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'active' => 'boolean',
        ]);

        // DEBUG: Log para verificar los datos recibidos
        Log::info('Datos para actualizar usuario:', $validated);

        // Actualizar el usuario INCLUYENDO active
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'active' => $validated['active'] ?? $user->active,
        ]);

        // Actualizar contraseña si se proporcionó
        if ($request->filled('password')) {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        // Redirigir a la lista de usuarios con mensaje de éxito
        return redirect()->route('users.index')->with([
            'message' => 'Usuario actualizado exitosamente',
            'type' => 'success'
        ]);
    }

    public function destroy(User $user)
    {
        // Eliminar el usuario
        $user->delete();

        // Redirigir a la lista de usuarios con mensaje de éxito
        return redirect()->route('users.index')->with([
            'message' => 'Usuario eliminado exitosamente',
            'type' => 'success'
        ]);
    }

    /**
     * Activar usuario
     */
    public function activate($id)
    {
        $user = User::findOrFail($id);
        $user->active = true;
        $user->save();

        return redirect()->route('users.index')->with([
            'message' => 'Usuario activado exitosamente',
            'type' => 'success'
        ]);
    }

    /**
     * Inactivar usuario
     */
    public function inactivate($id)
    {
        $user = User::findOrFail($id);
        $user->active = false;
        $user->save();

        return redirect()->route('users.index')->with([
            'message' => 'Usuario inactivado exitosamente',
            'type' => 'success'
        ]);
    }

    /**
     * Exportar usuarios a Excel
     */
    public function exportToExcel(Request $request)
    {
        Log::info('Iniciando exportación de usuarios a Excel', $request->all());

        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        try {
            $startDate = $request->start_date;
            $endDate = $request->end_date;

            Log::info('Fechas validadas para exportación de usuarios', [
                'start' => $startDate, 
                'end' => $endDate
            ]);

            $filename = "usuarios_" . date('Y-m-d_H-i-s') . ".xlsx";

            Log::info('Generando archivo de usuarios', ['filename' => $filename]);

            // Si tienes un export para usuarios, descomenta esta línea
            // return \Maatwebsite\Excel\Facades\Excel::download(
            //     new \App\Exports\UsersExport($startDate, $endDate),
            //     $filename
            // );

            return response()->json([
                'message' => 'Exportación de usuarios configurada correctamente'
            ]);

        } catch (\Exception $e) {
            Log::error('Error en exportación Excel de usuarios', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error al generar el archivo Excel: ' . $e->getMessage()
            ], 500);
        }
    }
}