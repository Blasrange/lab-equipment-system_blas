import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::excel
 * @see app/Http/Controllers/UserController.php:207
 * @route '/users/export-excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: excel.url(options),
    method: 'post',
})

excel.definition = {
    methods: ["post"],
    url: '/users/export-excel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::excel
 * @see app/Http/Controllers/UserController.php:207
 * @route '/users/export-excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::excel
 * @see app/Http/Controllers/UserController.php:207
 * @route '/users/export-excel'
 */
excel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: excel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::excel
 * @see app/Http/Controllers/UserController.php:207
 * @route '/users/export-excel'
 */
    const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: excel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::excel
 * @see app/Http/Controllers/UserController.php:207
 * @route '/users/export-excel'
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