<template>
    <div class="navbar">
        <b-navbar toggleable="md" type="dark" variant="default">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#/">E-Health</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                <b-nav-item href="#/">Homepage</b-nav-item>
                <b-nav-item href="#/ehealth">Acessar o E-Health</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style lang="scss" scoped>
.navbar {
    margin: 0;
    padding: 0;
    width: 100%;
    nav {
        padding: 5px 30px;
        background: rgba(0, 0, 0, 0.6);
    }
}
</style>