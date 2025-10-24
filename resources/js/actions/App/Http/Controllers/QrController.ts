import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
export const showMaintenanceForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showMaintenanceForm.url(args, options),
    method: 'get',
})

showMaintenanceForm.definition = {
    methods: ["get","head"],
    url: '/qr-maintenance/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
showMaintenanceForm.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return showMaintenanceForm.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
showMaintenanceForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showMaintenanceForm.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
showMaintenanceForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showMaintenanceForm.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
    const showMaintenanceFormForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showMaintenanceForm.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
        showMaintenanceFormForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showMaintenanceForm.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::showMaintenanceForm
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
        showMaintenanceFormForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showMaintenanceForm.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showMaintenanceForm.form = showMaintenanceFormForm
/**
* @see \App\Http\Controllers\QrController::storeMaintenance
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
export const storeMaintenance = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMaintenance.url(args, options),
    method: 'post',
})

storeMaintenance.definition = {
    methods: ["post"],
    url: '/qr-maintenance/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QrController::storeMaintenance
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
storeMaintenance.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return storeMaintenance.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::storeMaintenance
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
storeMaintenance.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMaintenance.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QrController::storeMaintenance
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
    const storeMaintenanceForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeMaintenance.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::storeMaintenance
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
        storeMaintenanceForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeMaintenance.url(args, options),
            method: 'post',
        })
    
    storeMaintenance.form = storeMaintenanceForm
/**
* @see \App\Http\Controllers\QrController::updateMaintenanceStatus
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
export const updateMaintenanceStatus = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateMaintenanceStatus.url(args, options),
    method: 'patch',
})

updateMaintenanceStatus.definition = {
    methods: ["patch"],
    url: '/qr-maintenance/{token}/task/{maintenance}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\QrController::updateMaintenanceStatus
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
updateMaintenanceStatus.url = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                    maintenance: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                                maintenance: args.maintenance,
                }

    return updateMaintenanceStatus.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::updateMaintenanceStatus
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
updateMaintenanceStatus.patch = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateMaintenanceStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\QrController::updateMaintenanceStatus
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
    const updateMaintenanceStatusForm = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateMaintenanceStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::updateMaintenanceStatus
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
        updateMaintenanceStatusForm.patch = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateMaintenanceStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateMaintenanceStatus.form = updateMaintenanceStatusForm
/**
* @see \App\Http\Controllers\QrController::createMaintenanceTask
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
export const createMaintenanceTask = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createMaintenanceTask.url(args, options),
    method: 'post',
})

createMaintenanceTask.definition = {
    methods: ["post"],
    url: '/qr-maintenance/{token}/create-task',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QrController::createMaintenanceTask
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
createMaintenanceTask.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return createMaintenanceTask.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::createMaintenanceTask
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
createMaintenanceTask.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createMaintenanceTask.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QrController::createMaintenanceTask
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
    const createMaintenanceTaskForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createMaintenanceTask.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::createMaintenanceTask
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
        createMaintenanceTaskForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createMaintenanceTask.url(args, options),
            method: 'post',
        })
    
    createMaintenanceTask.form = createMaintenanceTaskForm
/**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
export const generateQr = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateQr.url(args, options),
    method: 'get',
})

generateQr.definition = {
    methods: ["get","head"],
    url: '/equipment/{id}/qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
generateQr.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return generateQr.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
generateQr.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateQr.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
generateQr.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateQr.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
    const generateQrForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generateQr.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
        generateQrForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateQr.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::generateQr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
        generateQrForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateQr.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generateQr.form = generateQrForm
/**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
export const getQrToken = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQrToken.url(args, options),
    method: 'get',
})

getQrToken.definition = {
    methods: ["get","head"],
    url: '/api/equipment/{id}/qr-token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
getQrToken.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getQrToken.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
getQrToken.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQrToken.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
getQrToken.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getQrToken.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
    const getQrTokenForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getQrToken.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
        getQrTokenForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getQrToken.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::getQrToken
 * @see app/Http/Controllers/QrController.php:46
 * @route '/api/equipment/{id}/qr-token'
 */
        getQrTokenForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getQrToken.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getQrToken.form = getQrTokenForm
const QrController = { showMaintenanceForm, storeMaintenance, updateMaintenanceStatus, createMaintenanceTask, generateQr, getQrToken }

export default QrController