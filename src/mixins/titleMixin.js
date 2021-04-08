// thanks to https://medium.com/@Taha_Shashtari/the-easy-way-to-change-page-title-in-vue-6caf05006863 + fixes

function getTitle (vm) {
    const { title } = vm.$route.meta
    if (title) {
        return typeof title === 'function'
        ? title(vm)
        : title
    }
}

/**
 * if they're in a route like /cr/:username (/cr/chuks). It'll return 'chuks'
 * @param {VueComponent} vm 
 * @returns string username
 */
function getRouteUsername (vm) {
    const { username } = vm.$route.params
    if (username) {
        return username
    }
}

export default {
    created () {
        const title = getTitle(this)
        if (title) {
            document.title = title
        }
        let routeUsername = getRouteUsername(this)
        if (routeUsername) {
            document.querySelector('head meta[property="twitter:image"]').content = `${process.env.BASE_URL}/api/smp/${routeUsername}`;
            document.querySelector('head meta[property="og:image"]').content = `${process.env.BASE_URL}/api/smp/${routeUsername}`;
        }
    }
}
