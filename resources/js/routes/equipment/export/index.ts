import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\EquipmentController::excel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: excel.url(options),
    method: 'post',
})

excel.definition = {
    methods: ["post"],
    url: '/equipment/export-excel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::excel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::excel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
excel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: excel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::excel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
    const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: excel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::excel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
        excelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: excel.url(options),
            method: 'post',
        })
    
    excel.form = excelForm
const exportMethod = {
    excel: Object.assign(excel, excel),
}

export default exportMethod