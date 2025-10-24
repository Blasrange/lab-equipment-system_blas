import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import exportMethod from './export'
import download from './download'
import preview from './preview'
/**
* @see \App\Http\Controllers\EquipmentController::store
 * @see app/Http/Controllers/EquipmentController.php:37
 * @route '/equipment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/equipment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::store
 * @see app/Http/Controllers/EquipmentController.php:37
 * @route '/equipment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::store
 * @see app/Http/Controllers/EquipmentController.php:37
 * @route '/equipment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::store
 * @see app/Http/Controllers/EquipmentController.php:37
 * @route '/equipment'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::store
 * @see app/Http/Controllers/EquipmentController.php:37
 * @route '/equipment'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/equipment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::index
 * @see app/Http/Controllers/EquipmentController.php:12
 * @route '/equipment'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\EquipmentController::update
 * @see app/Http/Controllers/EquipmentController.php:51
 * @route '/equipment/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/equipment/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\EquipmentController::update
 * @see app/Http/Controllers/EquipmentController.php:51
 * @route '/equipment/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::update
 * @see app/Http/Controllers/EquipmentController.php:51
 * @route '/equipment/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\EquipmentController::update
 * @see app/Http/Controllers/EquipmentController.php:51
 * @route '/equipment/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::update
 * @see app/Http/Controllers/EquipmentController.php:51
 * @route '/equipment/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\EquipmentController::inactivate
 * @see app/Http/Controllers/EquipmentController.php:58
 * @route '/equipment/{id}/inactivate'
 */
export const inactivate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: inactivate.url(args, options),
    method: 'patch',
})

inactivate.definition = {
    methods: ["patch"],
    url: '/equipment/{id}/inactivate',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\EquipmentController::inactivate
 * @see app/Http/Controllers/EquipmentController.php:58
 * @route '/equipment/{id}/inactivate'
 */
inactivate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return inactivate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::inactivate
 * @see app/Http/Controllers/EquipmentController.php:58
 * @route '/equipment/{id}/inactivate'
 */
inactivate.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: inactivate.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EquipmentController::inactivate
 * @see app/Http/Controllers/EquipmentController.php:58
 * @route '/equipment/{id}/inactivate'
 */
    const inactivateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: inactivate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::inactivate
 * @see app/Http/Controllers/EquipmentController.php:58
 * @route '/equipment/{id}/inactivate'
 */
        inactivateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: inactivate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    inactivate.form = inactivateForm
/**
* @see \App\Http\Controllers\EquipmentController::activate
 * @see app/Http/Controllers/EquipmentController.php:66
 * @route '/equipment/{id}/activate'
 */
export const activate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: activate.url(args, options),
    method: 'patch',
})

activate.definition = {
    methods: ["patch"],
    url: '/equipment/{id}/activate',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\EquipmentController::activate
 * @see app/Http/Controllers/EquipmentController.php:66
 * @route '/equipment/{id}/activate'
 */
activate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return activate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::activate
 * @see app/Http/Controllers/EquipmentController.php:66
 * @route '/equipment/{id}/activate'
 */
activate.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: activate.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EquipmentController::activate
 * @see app/Http/Controllers/EquipmentController.php:66
 * @route '/equipment/{id}/activate'
 */
    const activateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: activate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::activate
 * @see app/Http/Controllers/EquipmentController.php:66
 * @route '/equipment/{id}/activate'
 */
        activateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: activate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    activate.form = activateForm
/**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
export const history = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/equipment/{id}/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
history.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return history.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
history.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
history.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
    const historyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
        historyForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::history
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
        historyForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/equipment/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
export const qr = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})

qr.definition = {
    methods: ["get","head"],
    url: '/equipment/{id}/qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
qr.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return qr.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
qr.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
qr.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qr.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
    const qrForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: qr.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
        qrForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::qr
 * @see app/Http/Controllers/QrController.php:18
 * @route '/equipment/{id}/qr'
 */
        qrForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    qr.form = qrForm
const equipment = {
    store: Object.assign(store, store),
index: Object.assign(index, index),
update: Object.assign(update, update),
inactivate: Object.assign(inactivate, inactivate),
activate: Object.assign(activate, activate),
history: Object.assign(history, history),
export: Object.assign(exportMethod, exportMethod),
download: Object.assign(download, download),
preview: Object.assign(preview, preview),
import: Object.assign(importMethod, importMethod),
qr: Object.assign(qr, qr),
}

export default equipment