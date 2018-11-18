<template>
    <div class="homepage">
        <Navbar/>
        <b-container>
            <!-- presentation -->
            <b-row class="fullscreen">
                <vue-particles
                    color="#dedede"
                    :particleOpacity="0.7"
                    :particlesNumber="80"
                    shapeType="circle"
                    :particleSize="5"
                    linesColor="#dedede"
                    :linesWidth="1"
                    :lineLinked="true"
                    :lineOpacity="0.4"
                    :linesDistance="150"
                    :moveSpeed="3"
                    :hoverEffect="true"
                    hoverMode="grab"
                    :clickEffect="true"
                    clickMode="repulse"
                >
                </vue-particles>
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
    width: 100%;
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
    position: absolute;
    z-index: 0;
    width: 70%;
}
</style>
