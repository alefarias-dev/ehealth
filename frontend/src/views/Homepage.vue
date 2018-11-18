<template>
    <div class="homepage">
        <Navbar/>
        <b-container>
            <!-- presentation -->
            <b-row class="fullscreen">
                <vue-particles></vue-particles>
                <div class="presentation">
                    <div class="ehealth-access">
                        <h1>E-Health: plataforma unificada de prontuários</h1>
                        <a href="#/ehealth" class="link">
                            <h2>Acessar o E-Health</h2>
                        </a>
                    </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: "Homapage",
    data () {
        return {

        }
    },
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>

.homepage {
    background: url('../assets/background.jpg');
    background-size: cover;
    width: 100vw;
    height: 100vh;
}

.fullscreen {
    width: 100%;
    height: calc(100vh - 50px);
    .presentation {
        width: 100%;
        height: auto;
        margin: auto;
        z-index: 1;
        .ehealth-access {
            color: white;
            text-shadow: 0px 1px 5px black;
        }
    }
}

.link {
    color: #efc262;
    text-decoration: underline;

    :hover {
        color: #45efe4;
        text-decoration: underline;
        text-shadow: 0px 1px 15px gray;
    }
}

#particles-js {
    position: fixed;
    z-index: 0;
    width: 100%;
}
</style>
