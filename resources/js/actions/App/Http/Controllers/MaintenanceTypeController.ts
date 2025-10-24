import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/maintenance-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTypeController::index
 * @see app/Http/Controllers/MaintenanceTypeController.php:14
 * @route '/maintenance-types'
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
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/maintenance-types/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTypeController::create
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\MaintenanceTypeController::store
 * @see app/Http/Controllers/MaintenanceTypeController.php:27
 * @route '/maintenance-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/maintenance-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::store
 * @see app/Http/Controllers/MaintenanceTypeController.php:27
 * @route '/maintenance-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::store
 * @see app/Http/Controllers/MaintenanceTypeController.php:27
 * @route '/maintenance-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::store
 * @see app/Http/Controllers/MaintenanceTypeController.php:27
 * @route '/maintenance-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::store
 * @see app/Http/Controllers/MaintenanceTypeController.php:27
 * @route '/maintenance-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
export const show = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/maintenance-types/{maintenance_type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
show.url = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance_type: args.maintenance_type,
                }

    return show.definition.url
            .replace('{maintenance_type}', parsedArgs.maintenance_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
show.get = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
show.head = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
    const showForm = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
        showForm.get = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTypeController::show
 * @see app/Http/Controllers/MaintenanceTypeController.php:57
 * @route '/maintenance-types/{maintenance_type}'
 */
        showForm.head = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
export const edit = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/maintenance-types/{maintenance_type}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
edit.url = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance_type: args.maintenance_type,
                }

    return edit.definition.url
            .replace('{maintenance_type}', parsedArgs.maintenance_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
edit.get = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
edit.head = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
    const editForm = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
        editForm.get = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTypeController::edit
 * @see app/Http/Controllers/MaintenanceTypeController.php:0
 * @route '/maintenance-types/{maintenance_type}/edit'
 */
        editForm.head = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
export const update = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/maintenance-types/{maintenance_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
update.url = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance_type: args.maintenance_type,
                }

    return update.definition.url
            .replace('{maintenance_type}', parsedArgs.maintenance_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
update.put = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
update.patch = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
    const updateForm = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
        updateForm.put = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTypeController::update
 * @see app/Http/Controllers/MaintenanceTypeController.php:65
 * @route '/maintenance-types/{maintenance_type}'
 */
        updateForm.patch = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\MaintenanceTypeController::destroy
 * @see app/Http/Controllers/MaintenanceTypeController.php:96
 * @route '/maintenance-types/{maintenance_type}'
 */
export const destroy = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/maintenance-types/{maintenance_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MaintenanceTypeController::destroy
 * @see app/Http/Controllers/MaintenanceTypeController.php:96
 * @route '/maintenance-types/{maintenance_type}'
 */
destroy.url = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance_type: args.maintenance_type,
                }

    return destroy.definition.url
            .replace('{maintenance_type}', parsedArgs.maintenance_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTypeController::destroy
 * @see app/Http/Controllers/MaintenanceTypeController.php:96
 * @route '/maintenance-types/{maintenance_type}'
 */
destroy.delete = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MaintenanceTypeController::destroy
 * @see app/Http/Controllers/MaintenanceTypeController.php:96
 * @route '/maintenance-types/{maintenance_type}'
 */
    const destroyForm = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTypeController::destroy
 * @see app/Http/Controllers/MaintenanceTypeController.php:96
 * @route '/maintenance-types/{maintenance_type}'
 */
        destroyForm.delete = (args: { maintenance_type: string | number } | [maintenance_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MaintenanceTypeController = { index, create, store, show, edit, update, destroy }

export default MaintenanceTypeController