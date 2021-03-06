<template>
    <div class="doctor-page">
        <Navbar/>
        <vue2-sidebar :links="links">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <b-form>
                            <h4>Dados do paciente</h4>
                            
                            <div class="load-info">
                                <loading 
                                    :active.sync="isLoading"
                                    :can-cancel="true"
                                    :is-full-page="true"
                                ></loading>
                                <strong v-if="isLoading">{{ loadingMessage }}</strong>
                            </div>

                            <b-form-group label="Paciente">
                                <b-form-select :options="options.pacientes" v-model="consulta.paciente"></b-form-select>
                            </b-form-group>
                            <b-form-group label="Horário de início da consulta">
                                <b-form-input v-model="consulta.dataInicio"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Horário de fim">
                                <b-form-input v-model="consulta.dataFim"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Observações sobre o paciente">
                                <b-form-textarea :rows="3" v-model="consulta.evolucoes"></b-form-textarea>
                            </b-form-group>
                        </b-form>
                    </b-col>
                
                    <b-col cols="4"> 
                        <b-form>
                            <h6>Solicitar medicamento</h6>
                            <b-form-group label="Medicamento">
                                <b-form-select :options="options.medicamentos" v-model="medicamento.nome"></b-form-select>
                            </b-form-group>
                            <b-form-group label="Posologia">
                                <b-form-input v-model="medicamento.posologia"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Prazo">
                                <b-form-input type="number" v-model="medicamento.prazo"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-col>
                    <b-col cols="4">
                        <b-form>
                            <h6>Solicitar repouso</h6>
                            <b-form-group label="Periodo de Afastamento (em dias)">
                                <b-form-input type="number" v-model="repouso.periodo"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Justificativa">
                                <b-form-input v-model="repouso.justificativa"></b-form-input>
                            </b-form-group>
                            <b-form-group label="CID">
                                <b-form-select :options="options.cids" v-model="repouso.cid"></b-form-select>
                            </b-form-group>
                        </b-form>
                    </b-col>
                    <b-col cols="4">
                        <b-form>
                            <h6>Solicitar exame</h6>
                            <b-form-group label="Exame">
                                <b-form-select :options="options.exames" v-model="exame.nome"></b-form-select>
                            </b-form-group>
                            <b-form-group label="Observação">
                                <b-form-textarea :rows="4" v-model="exame.observacao"></b-form-textarea>
                            </b-form-group>
                        </b-form>
                    </b-col>
                    <b-col cols="12">
                        <b-button variant="success" v-bind:disabled="isLoading" v-on:click="deployConsulta">Finalizar consulta</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </vue2-sidebar>
    </div>    
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'
import axios from 'axios'
import Loading from 'vue-loading-overlay'

// contract consulta compiled
var consultaInterface = require('./consulta.js')
var consultaInterface = consultaInterface.consulta

// web3 provider
// const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/8b06d0b7817b4271850f52f13db61eb8')
const provider = new HDWalletProvider(
    'pave team season brush juice young alone away decorate high choose magic',
    'https://rinkeby.infura.io/v3/8b06d0b7817b4271850f52f13db61eb8'
)
var web3 = new Web3(provider)

// getting account
var account = ""
web3.eth.getAccounts().then(response => {
    account = response[0]
})

// links for sidebar
var links = [
    {label: "Nova consulta", href: "#/medico"}
]

// consulta
var consulta = {
    id: "010101",
    paciente: "JB010203",
    profissional: "DC010203",
    dataInicio: "2018-11-28 19:00",
    dataFim: "2018-11-28 19:15",
    evolucoes: "Dores de cabeça, febre, náuseas"
}

// medicamento
var medicamento = {
    nome: 'Doril',
    posologia: "10mg 3x ao dia a cada 8h",
    prazo: "60"
}

// repouso
var repouso = {
    periodo: '0',
    justificativa: "",
    cid: null
}

// exame
var exame = {
    id: '020120',
    nome: null,
    observacao: ""
}

// hardcoded data
var pacientes = [
    {value: 'JB010203', text: 'João Benedito'}
]

var medicamentos = [
    {value: null, text: 'Nenhum medicamento selecionado'},
    {value: 'DVoid', text: 'DVoid'},
    {value: 'Daforin', text: 'Daforin Cápsula'},
    {value: 'Haldol Gotas', text: 'Haldol Gotas'},
    {value: 'Gardenal', text: 'Gardenal'},
    {value: 'Paclitaxel', text: 'Paclitaxel'},
    {value: 'Doril', text: 'Doril'},
]

var cids = [
    {value: null, text: 'Nenhum CID selecionado'},
    {value: 'A00', text: 'Cólera - A00'},
    {value: 'A06', text: 'Amebíase - A06'},
    {value: 'A05.0', text: 'Intoxicação alimentar estafilocócica - A05.0'},
    {value: 'A06.6', text: 'Abcesso amebiano do cérebro - A06.6'},
    {value: 'A06.7', text: 'Amebíase citânea - A06.7'},
    {value: 'H40', text: 'Glaucoma - H40'},
    {value: 'A07.1', text: 'Giardíase - A07.1'}
]

var exames = [
    {value: null, text: 'Nenhum exame selecionado'},
    {value: 'Hemograma completo', text: 'Hemograma completo'},
    {value: 'Eletrólitos séricos', text: 'Eletrólitos séricos'},
    {value: 'Ureia e creatinina séricas', text: 'Ureia e creatinina séricas'},
    {value: 'Lactato sérico', text: 'Lactato sérico'},
]

var options = {
    pacientes: pacientes,
    medicamentos: medicamentos,
    cids: cids,
    exames: exames
}

export default {
    name: "Doctor",
    components: {
        Navbar,
        Loading
    },
    data () {
        return {
            links: links,
            consulta: consulta,
            medicamento: medicamento,
            repouso: repouso,
            exame: exame,
            options: options,
            isLoading: false,
            loadingMessage: "Carregando"
        }
    },
    methods: {
        finishDeploy(idPaciente) {
            this.isLoading = false;
            this.$swal('Concluído', "Consulta do paciente "+ idPaciente +" foi salva!", 'success')
        },
        deployConsulta() {
            var deployMedicamento = this.medicamento.nome != null;
            var deployRepouso = this.repouso.periodo > 0;
            var deployExame = this.exame.nome != null;
            var contract = new web3.eth.Contract(JSON.parse(consultaInterface.interface), '0x1E981162720362a0fEc5Cd4bfC95e1b89c3f1214')

            if (deployRepouso && this.repouso.cid == null) {
                alert('Repouso definido sem CID, selecione o CID para finalizar a consulta!')
                return
            }

            this.isLoading = true
            this.loadingMessage = "Realizando deploy da consulta..."
            
            contract.deploy({
                data: '0x'+consultaInterface.bytecode,
                arguments: [consulta.paciente, consulta.profissional, consulta.id, consulta.dataInicio, consulta.dataFim]
            })
            .send({from: account})
            .then(contractInstance => {
                var idPaciente = this.consulta.paciente
                var hashConsulta = contractInstance.options.address

                this.loadingMessage = "Salvando " + hashConsulta + " no prontuário do paciente " + idPaciente + "..."
                axios.post('https://ehealth-backend.herokuapp.com/newContract', {'id_paciente':idPaciente, 'hash_consulta':hashConsulta})
                .then(res => {
                    console.log(res)
                })

                this.loadingMessage = "Registrando evolução em " + hashConsulta
                contractInstance.methods.registraConsulta(this.consulta.evolucoes).send({from: account}).then(res => {

                    var promiseRepouso = contractInstance.methods.solicitaRepouso(this.repouso.periodo, this.repouso.justificativa, this.repouso.cid)
                    var promiseExame = contractInstance.methods.solicitaExame(this.exame.nome, this.exame.observacao, this.exame.id)
                    var promiseMedicamento = contractInstance.methods.solicitaMedicamento(this.medicamento.nome, this.medicamento.posologia, this.medicamento.prazo)
                    
                    var promises = []

                    if (deployMedicamento) promises.push({'name': 'medicamento','promise':promiseMedicamento})
                    if (deployRepouso) promises.push({'name': 'repouso','promise':promiseRepouso})
                    if (deployExame) promises.push({'name': 'exame','promise':promiseExame})

                    // promises synchronized
                    if (promises.length > 0) {
                        this.loadingMessage = "Registrando " + promises[0].name + "..."
                        promises[0].promise.send({from: account}).then(response => {
                            if (promises.length > 1) {
                                this.loadingMessage = "Registrando " + promises[1].name + "..."
                                promises[1].promise.send({from: account}).then(response => {
                                    if (promises.length > 2) {
                                        this.loadingMessage = "Registrando " + promises[2].name + "..."
                                        promises[2].promise.send({from: account}).then(response => {
                                            this.finishDeploy(idPaciente)
                                        })
                                    } else this.finishDeploy(idPaciente)
                                })
                            } else this.finishDeploy(idPaciente)
                        })
                    } else this.finishDeploy(idPaciente)

                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.load-info {
    text-align: center;
}
</style>

