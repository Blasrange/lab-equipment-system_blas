import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
export const qrToken = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qrToken.url(args, options),
    method: 'get',
})

qrToken.definition = {
    methods: ["get","head"],
    url: '/api/equipment/{id}/qr-token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
qrToken.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return qrToken.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
qrToken.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qrToken.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
qrToken.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qrToken.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
    const qrTokenForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: qrToken.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
        qrTokenForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qrToken.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::qrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
        qrTokenForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qrToken.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    qrToken.form = qrTokenForm
/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
export const maintenanceHistory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'get',
})

maintenanceHistory.definition = {
    methods: ["get","head"],
    url: '/api/equipment/{id}/maintenance-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
maintenanceHistory.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return maintenanceHistory.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
maintenanceHistory.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
maintenanceHistory.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
    const maintenanceHistoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenanceHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
        maintenanceHistoryForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenanceHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
        maintenanceHistoryForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenanceHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    maintenanceHistory.form = maintenanceHistoryForm
const equipment = {
    qrToken: Object.assign(qrToken, qrToken),
maintenanceHistory: Object.assign(maintenanceHistory, maintenanceHistory),
}

export default equipment