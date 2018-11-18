<template>
    <div class="homepage">
        <Navbar/>
        <vue2-sidebar :links="links">

        </vue2-sidebar>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

// define links for sidebar
var links = [
    {label: 'Home', href: '#/'},
    {label: 'Home', href: '#/'},
    {label: 'Home', href: '#/'},
    {label: 'Home', href: '#/'}
]

export default {
    name: "Homapage",
    data () {
        return {
            links: links
        }
    },
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>

</style>
