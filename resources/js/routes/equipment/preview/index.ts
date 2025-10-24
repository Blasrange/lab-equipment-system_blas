import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/equipment/preview-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::importMethod
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
const preview = {
    import: Object.assign(importMethod, importMethod),
}

export default preview