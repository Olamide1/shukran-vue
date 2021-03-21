// thanks to https://medium.com/@Taha_Shashtari/the-easy-way-to-change-page-title-in-vue-6caf05006863 + fixes

function getTitle (vm) {
    const { title } = vm.$route.meta
    if (title) {
        return typeof title === 'function'
        ? title(vm)
        : title
    }
}

function getMetaImage (vm) {
    // console.log(vm);
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
        let metaImage = getMetaImage(this)
        if (metaImage) {
            document.querySelector('head meta[property="twitter:image"]').content = `${process.env.BASE_URL}/api/smp/${metaImage}`;
            document.querySelector('head meta[property="og:image"]').content = `${process.env.BASE_URL}/api/smp/${metaImage}`;
        }
    }
}
