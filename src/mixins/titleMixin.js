// thanks to https://medium.com/@Taha_Shashtari/the-easy-way-to-change-page-title-in-vue-6caf05006863 + fixes

function getTitle (vm) {
    const { title } = vm.$route.meta
    if (title) {
        return typeof title === 'function'
        ? title(vm)
        : title
    }
}
export default {
    created () {
        const title = getTitle(this)
        if (title) {
            document.title = title
        }
    }
}
