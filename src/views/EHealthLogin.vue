<template>
    <div class="ehealth-login">
        <Navbar/>
        <b-container>
            <b-row>
                <!-- user registration form -->
                <b-col cols="6">
                    <div class="form-container">
                        <b-form>
                            <!-- tipo de cadastro -->
                            <b-form-group label="Tipo de cadastro" label-size="sm">
                                <b-form-select size="sm" :options="opcoesRegistro" v-model="tipoCadastro"></b-form-select>
                            </b-form-group>

                            <!-- CADSUS -->
                            <b-form-group label="Número CADSUS"  label-size="sm" v-if="tipoCadastro == 1">
                                <b-form-input size="sm" placeholder="Digite o número do seu CADSUS"></b-form-input>
                            </b-form-group>

                            <!-- CRM -->
                            <b-form-group label="Número CRM" label-size="sm" v-if="tipoCadastro == 2">
                                <b-form-input size="sm" placeholder="Digite o número de seu CRM"></b-form-input>
                            </b-form-group>

                            <!-- Nome -->
                            <b-form-group label="Nome completo" label-size="sm">
                                <b-form-input size="sm" placeholder="Digite seu nome completo"></b-form-input>
                            </b-form-group>

                            <!-- E-mail -->
                            <b-form-group label="E-mail" label-size="sm">
                                <b-form-input size="sm" type="email" placeholder="Digite seu e-mail"></b-form-input>
                            </b-form-group>

                            <!-- Senha -->
                            <b-form-group label="Senha" label-size="sm">
                                <b-form-input size="sm" type="password" placeholder="***************"></b-form-input>
                            </b-form-group>

                            <!-- Confirmacao de senha -->
                            <b-form-group label="Confirme a senha" label-size="sm">
                                <b-form-input size="sm" type="password" placeholder="***************"></b-form-input>
                            </b-form-group>

                            <b-button size="sm" type="submit" variant="primary" disabled>Finalizar cadastro</b-button>
                            <b-button size="sm" type="reset" variant="danger" disabled>Limpar formulário</b-button>
                           
                        </b-form>
                    </div>
                </b-col>

                <!-- user login form -->
                <b-col cols="6">
                    <div class="form-container">
                        <h6>Já possui um cadastro? Faça login aqui!</h6>
                        <b-form>
                            <!-- tipo de cadastro -->
                            <b-form-group label="Tipo de cadastro" label-size="sm">
                                <b-form-select size="sm" :options="opcoesRegistro" v-model="tipoLogin"></b-form-select>
                            </b-form-group>
                            <!-- cadsus -->
                            <b-form-group label-size="sm" label="CADSUS" v-if="tipoLogin==1">
                                <b-form-input size="sm" v-bind:required="tipoLogin==1" placeholder="Digite o número do seu CADSUS"></b-form-input>
                            </b-form-group>
                            <!-- CRM -->
                            <b-form-group label-size="sm" label="CRM" v-if="tipoLogin==2">
                                <b-form-input size="sm" v-bind:required="tipoLogin==2" placeholder="Digite o número do seu CRM"></b-form-input>
                            </b-form-group>
                            <!-- senha -->
                            <b-form-group label-size="sm" label="Senha">
                                <b-form-input size="sm" type="password" placeholder="***************" required></b-form-input>
                            </b-form-group>

                            <b-button size="sm" type="submit" variant="success">Entrar</b-button>
                        </b-form>
                    </div>
                </b-col>

            </b-row>
        </b-container>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

// opcoes para cadastro
var opcoesRegistro = [
    {value: 1, text: 'Paciente'},
    {value: 2, text: 'Médico'},
];

var tipoCadastro = 1;
var tipoLogin = 1;

export default {
    name: "EHealthLogin",
    data () {
        return {
            opcoesRegistro: opcoesRegistro,
            tipoCadastro: tipoCadastro,
            tipoLogin: tipoLogin
        }
    },
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>
.ehealth-login {
    background: url('../assets/background.jpg');
    background-size: cover;
    width: 100%;
    height: 100vh;
}

.form-container {
    color: white;
    margin-top: 6vh;
    padding: 20px;
    width: 100%;
    height: auto;
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid transparent;
    box-shadow: 1px 1px 5px black;
    border-radius: 4px;
}
</style>