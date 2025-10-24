import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\NotificationController::update
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
export const update = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/notifications/settings/{setting}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\NotificationController::update
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
update.url = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { setting: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    setting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        setting: typeof args.setting === 'object'
                ? args.setting.id
                : args.setting,
                }

    return update.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::update
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
update.put = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\NotificationController::update
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
    const updateForm = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::update
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
        updateForm.put = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const settings = {
    update: Object.assign(update, update),
}

export default settings