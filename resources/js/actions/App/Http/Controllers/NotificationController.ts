import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
const indexd3f40fab60887a2723ab34bfa72648a2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd3f40fab60887a2723ab34bfa72648a2.url(options),
    method: 'get',
})

indexd3f40fab60887a2723ab34bfa72648a2.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
indexd3f40fab60887a2723ab34bfa72648a2.url = (options?: RouteQueryOptions) => {
    return indexd3f40fab60887a2723ab34bfa72648a2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
indexd3f40fab60887a2723ab34bfa72648a2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd3f40fab60887a2723ab34bfa72648a2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
indexd3f40fab60887a2723ab34bfa72648a2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd3f40fab60887a2723ab34bfa72648a2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
    const indexd3f40fab60887a2723ab34bfa72648a2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexd3f40fab60887a2723ab34bfa72648a2.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
        indexd3f40fab60887a2723ab34bfa72648a2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd3f40fab60887a2723ab34bfa72648a2.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications'
 */
        indexd3f40fab60887a2723ab34bfa72648a2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd3f40fab60887a2723ab34bfa72648a2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexd3f40fab60887a2723ab34bfa72648a2.form = indexd3f40fab60887a2723ab34bfa72648a2Form
    /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
const index69ff71926174d56404990b370250c20b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index69ff71926174d56404990b370250c20b.url(options),
    method: 'get',
})

index69ff71926174d56404990b370250c20b.definition = {
    methods: ["get","head"],
    url: '/notifications/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
index69ff71926174d56404990b370250c20b.url = (options?: RouteQueryOptions) => {
    return index69ff71926174d56404990b370250c20b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
index69ff71926174d56404990b370250c20b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index69ff71926174d56404990b370250c20b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
index69ff71926174d56404990b370250c20b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index69ff71926174d56404990b370250c20b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
    const index69ff71926174d56404990b370250c20bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index69ff71926174d56404990b370250c20b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
        index69ff71926174d56404990b370250c20bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index69ff71926174d56404990b370250c20b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/settings'
 */
        index69ff71926174d56404990b370250c20bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index69ff71926174d56404990b370250c20b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index69ff71926174d56404990b370250c20b.form = index69ff71926174d56404990b370250c20bForm

export const index = {
    '/notifications': indexd3f40fab60887a2723ab34bfa72648a2,
    '/notifications/settings': index69ff71926174d56404990b370250c20b,
}

/**
* @see \App\Http\Controllers\NotificationController::updateSetting
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
export const updateSetting = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSetting.url(args, options),
    method: 'put',
})

updateSetting.definition = {
    methods: ["put"],
    url: '/notifications/settings/{setting}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\NotificationController::updateSetting
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
updateSetting.url = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateSetting.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::updateSetting
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
updateSetting.put = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSetting.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\NotificationController::updateSetting
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
    const updateSettingForm = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSetting.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::updateSetting
 * @see app/Http/Controllers/NotificationController.php:49
 * @route '/notifications/settings/{setting}'
 */
        updateSettingForm.put = (args: { setting: number | { id: number } } | [setting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSetting.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSetting.form = updateSettingForm
/**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/notifications/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NotificationController::history
 * @see app/Http/Controllers/NotificationController.php:70
 * @route '/notifications/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\NotificationController::exportToExcel
 * @see app/Http/Controllers/NotificationController.php:185
 * @route '/notifications/export-excel'
 */
export const exportToExcel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportToExcel.url(options),
    method: 'post',
})

exportToExcel.definition = {
    methods: ["post"],
    url: '/notifications/export-excel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::exportToExcel
 * @see app/Http/Controllers/NotificationController.php:185
 * @route '/notifications/export-excel'
 */
exportToExcel.url = (options?: RouteQueryOptions) => {
    return exportToExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::exportToExcel
 * @see app/Http/Controllers/NotificationController.php:185
 * @route '/notifications/export-excel'
 */
exportToExcel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportToExcel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NotificationController::exportToExcel
 * @see app/Http/Controllers/NotificationController.php:185
 * @route '/notifications/export-excel'
 */
    const exportToExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: exportToExcel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::exportToExcel
 * @see app/Http/Controllers/NotificationController.php:185
 * @route '/notifications/export-excel'
 */
        exportToExcelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: exportToExcel.url(options),
            method: 'post',
        })
    
    exportToExcel.form = exportToExcelForm
/**
* @see \App\Http\Controllers\NotificationController::resend
 * @see app/Http/Controllers/NotificationController.php:120
 * @route '/notifications/{notification}/resend'
 */
export const resend = (args: { notification: number | { id: number } } | [notification: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/notifications/{notification}/resend',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::resend
 * @see app/Http/Controllers/NotificationController.php:120
 * @route '/notifications/{notification}/resend'
 */
resend.url = (args: { notification: number | { id: number } } | [notification: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notification: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { notification: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    notification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        notification: typeof args.notification === 'object'
                ? args.notification.id
                : args.notification,
                }

    return resend.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::resend
 * @see app/Http/Controllers/NotificationController.php:120
 * @route '/notifications/{notification}/resend'
 */
resend.post = (args: { notification: number | { id: number } } | [notification: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NotificationController::resend
 * @see app/Http/Controllers/NotificationController.php:120
 * @route '/notifications/{notification}/resend'
 */
    const resendForm = (args: { notification: number | { id: number } } | [notification: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resend.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::resend
 * @see app/Http/Controllers/NotificationController.php:120
 * @route '/notifications/{notification}/resend'
 */
        resendForm.post = (args: { notification: number | { id: number } } | [notification: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resend.url(args, options),
            method: 'post',
        })
    
    resend.form = resendForm
/**
* @see \App\Http\Controllers\NotificationController::processNow
 * @see app/Http/Controllers/NotificationController.php:142
 * @route '/notifications/process'
 */
export const processNow = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processNow.url(options),
    method: 'post',
})

processNow.definition = {
    methods: ["post"],
    url: '/notifications/process',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::processNow
 * @see app/Http/Controllers/NotificationController.php:142
 * @route '/notifications/process'
 */
processNow.url = (options?: RouteQueryOptions) => {
    return processNow.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::processNow
 * @see app/Http/Controllers/NotificationController.php:142
 * @route '/notifications/process'
 */
processNow.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processNow.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NotificationController::processNow
 * @see app/Http/Controllers/NotificationController.php:142
 * @route '/notifications/process'
 */
    const processNowForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: processNow.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::processNow
 * @see app/Http/Controllers/NotificationController.php:142
 * @route '/notifications/process'
 */
        processNowForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: processNow.url(options),
            method: 'post',
        })
    
    processNow.form = processNowForm
/**
* @see \App\Http\Controllers\NotificationController::testNotification
 * @see app/Http/Controllers/NotificationController.php:155
 * @route '/notifications/test'
 */
export const testNotification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testNotification.url(options),
    method: 'post',
})

testNotification.definition = {
    methods: ["post"],
    url: '/notifications/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::testNotification
 * @see app/Http/Controllers/NotificationController.php:155
 * @route '/notifications/test'
 */
testNotification.url = (options?: RouteQueryOptions) => {
    return testNotification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::testNotification
 * @see app/Http/Controllers/NotificationController.php:155
 * @route '/notifications/test'
 */
testNotification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testNotification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NotificationController::testNotification
 * @see app/Http/Controllers/NotificationController.php:155
 * @route '/notifications/test'
 */
    const testNotificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: testNotification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::testNotification
 * @see app/Http/Controllers/NotificationController.php:155
 * @route '/notifications/test'
 */
        testNotificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: testNotification.url(options),
            method: 'post',
        })
    
    testNotification.form = testNotificationForm
const NotificationController = { index, updateSetting, history, exportToExcel, resend, processNow, testNotification }

export default NotificationController