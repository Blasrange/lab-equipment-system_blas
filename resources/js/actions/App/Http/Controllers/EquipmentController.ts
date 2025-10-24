import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::dashboard
 * @see app/Http/Controllers/EquipmentController.php:317
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
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
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
export const maintenanceHistory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'get',
})

maintenanceHistory.definition = {
    methods: ["get","head"],
    url: '/equipment/{id}/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
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
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
maintenanceHistory.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
maintenanceHistory.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenanceHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
    const maintenanceHistoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenanceHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
 */
        maintenanceHistoryForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenanceHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::maintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:114
 * @route '/equipment/{id}/history'
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
/**
* @see \App\Http\Controllers\EquipmentController::exportToExcel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
export const exportToExcel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportToExcel.url(options),
    method: 'post',
})

exportToExcel.definition = {
    methods: ["post"],
    url: '/equipment/export-excel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::exportToExcel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
exportToExcel.url = (options?: RouteQueryOptions) => {
    return exportToExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::exportToExcel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
exportToExcel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportToExcel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::exportToExcel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
    const exportToExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: exportToExcel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::exportToExcel
 * @see app/Http/Controllers/EquipmentController.php:176
 * @route '/equipment/export-excel'
 */
        exportToExcelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: exportToExcel.url(options),
            method: 'post',
        })
    
    exportToExcel.form = exportToExcelForm
/**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
export const downloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/equipment/download-template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
downloadTemplate.url = (options?: RouteQueryOptions) => {
    return downloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
downloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
downloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
    const downloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
        downloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::downloadTemplate
 * @see app/Http/Controllers/EquipmentController.php:213
 * @route '/equipment/download-template'
 */
        downloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
/**
* @see \App\Http\Controllers\EquipmentController::previewImport
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
export const previewImport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewImport.url(options),
    method: 'post',
})

previewImport.definition = {
    methods: ["post"],
    url: '/equipment/preview-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::previewImport
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
previewImport.url = (options?: RouteQueryOptions) => {
    return previewImport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::previewImport
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
previewImport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewImport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::previewImport
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
    const previewImportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: previewImport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::previewImport
 * @see app/Http/Controllers/EquipmentController.php:229
 * @route '/equipment/preview-import'
 */
        previewImportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: previewImport.url(options),
            method: 'post',
        })
    
    previewImport.form = previewImportForm
/**
* @see \App\Http\Controllers\EquipmentController::importEquipment
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
export const importEquipment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importEquipment.url(options),
    method: 'post',
})

importEquipment.definition = {
    methods: ["post"],
    url: '/equipment/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EquipmentController::importEquipment
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
importEquipment.url = (options?: RouteQueryOptions) => {
    return importEquipment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::importEquipment
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
importEquipment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importEquipment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EquipmentController::importEquipment
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
    const importEquipmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importEquipment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::importEquipment
 * @see app/Http/Controllers/EquipmentController.php:270
 * @route '/equipment/import'
 */
        importEquipmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importEquipment.url(options),
            method: 'post',
        })
    
    importEquipment.form = importEquipmentForm
/**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
export const getMaintenanceHistory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMaintenanceHistory.url(args, options),
    method: 'get',
})

getMaintenanceHistory.definition = {
    methods: ["get","head"],
    url: '/api/equipment/{id}/maintenance-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
getMaintenanceHistory.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getMaintenanceHistory.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
getMaintenanceHistory.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMaintenanceHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
getMaintenanceHistory.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMaintenanceHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
    const getMaintenanceHistoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getMaintenanceHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
        getMaintenanceHistoryForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMaintenanceHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EquipmentController::getMaintenanceHistory
 * @see app/Http/Controllers/EquipmentController.php:74
 * @route '/api/equipment/{id}/maintenance-history'
 */
        getMaintenanceHistoryForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMaintenanceHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getMaintenanceHistory.form = getMaintenanceHistoryForm
const EquipmentController = { dashboard, store, index, update, inactivate, activate, maintenanceHistory, exportToExcel, downloadTemplate, previewImport, importEquipment, getMaintenanceHistory }

export default EquipmentController