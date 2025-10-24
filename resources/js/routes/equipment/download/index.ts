import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
export const template = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/equipment/download-template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
    const templateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
        templateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::template
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
        templateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
const download = {
    template: Object.assign(template, template),
}

export default download