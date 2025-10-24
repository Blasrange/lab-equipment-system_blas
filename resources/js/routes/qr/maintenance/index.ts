import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
export const form = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(args, options),
    method: 'get',
})

form.definition = {
    methods: ["get","head"],
    url: '/qr-maintenance/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
form.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return form.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
form.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
form.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: form.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
    const formForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: form.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
        formForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: form.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QrController::form
 * @see app/Http/Controllers/QrController.php:69
 * @route '/qr-maintenance/{token}'
 */
        formForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: form.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    form.form = formForm
/**
* @see \App\Http\Controllers\QrController::store
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
export const store = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/qr-maintenance/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QrController::store
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
store.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::store
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
store.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QrController::store
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
    const storeForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::store
 * @see app/Http/Controllers/QrController.php:235
 * @route '/qr-maintenance/{token}'
 */
        storeForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\QrController::update
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
export const update = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/qr-maintenance/{token}/task/{maintenance}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\QrController::update
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
update.url = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::update
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
update.patch = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\QrController::update
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
    const updateForm = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::update
 * @see app/Http/Controllers/QrController.php:140
 * @route '/qr-maintenance/{token}/task/{maintenance}'
 */
        updateForm.patch = (args: { token: string | number, maintenance: string | number } | [token: string | number, maintenance: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\QrController::create
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
export const create = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/qr-maintenance/{token}/create-task',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QrController::create
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
create.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QrController::create
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
create.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QrController::create
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
    const createForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: create.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QrController::create
 * @see app/Http/Controllers/QrController.php:185
 * @route '/qr-maintenance/{token}/create-task'
 */
        createForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: create.url(args, options),
            method: 'post',
        })
    
    create.form = createForm
const maintenance = {
    form: Object.assign(form, form),
store: Object.assign(store, store),
update: Object.assign(update, update),
create: Object.assign(create, create),
}

export default maintenance