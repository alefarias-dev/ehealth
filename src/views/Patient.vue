<template>
    <div class="doctor-page">
        <Navbar/>
        <vue2-sidebar :links="links">
            
            <b-container>
                <b-row>
                    <!-- para cada consulta um card desse -->
                    <b-col cols="12" v-for="consulta in consultas">
                        <div class="consulta">
                            <h5>Consulta: {{ consulta.address }}</h5>
                            <div class="info">
                                <label>Paciente</label>
                                <strong>{{ consulta.paciente }}</strong>
                            </div>
                            <div class="info">
                                <label>Profissional</label>
                                <strong>{{ consulta.profissional }}</strong>
                            </div>
                            <div class="info">
                                <label>Início Permanência</label>
                                <strong>{{ consulta.inicioPermanencia }}</strong>
                            </div>
                            <div class="info">
                                <label>Fim Permanência</label>
                                <strong>{{ consulta.fimPermanencia }}</strong>
                            </div>
                            <div class="info">
                                <label>Observações</label>
                                <strong>{{ consulta.evolucoes.length > 0 ? consulta.evolucoes : 'Nenhum observação cadastrada' }}</strong>
                            </div>
                        </div>
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

// contract consulta compiled
var consultaInterface = require('./consulta.js')
var consultaInterface = consultaInterface.consulta

// web3 provider
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
    {label: "Minhas consultas", href: "#/paciente"}
]

export default {
    name: "Patient",
    components: {
        Navbar
    },
    data () {
        return {
            links: links,
            pacienteId: 'JB010203',
            consultas: [],
            hashConsultas: []
        }
    },
    beforeMount () {
        this.getPatientContracts()
    },
    methods: {
        getPatientContracts() {
            var api_url = 'https://ehealth-backend.herokuapp.com/getContracts/' + this.pacienteId
            axios.get(api_url).then(res => {
                this.hashConsultas = res.data.items
                console.log(this.hashConsultas)
                this.getAllContractsFromEthereum()
            })
        },
        getContract(address) {
            var contract = new web3.eth.Contract(JSON.parse(consultaInterface.interface), address)

            var consulta = {
                'address': address,
                'paciente': "",
                'profissional': "",
                'inicioPermanencia': "",
                'fimPermanencia': "",
                'evolucoes': ""
            }

            contract.methods.paciente().call().then(response => {
                consulta.paciente = response
            })
            contract.methods.profissional().call().then(response => {
                consulta.profissional = response
            })
            contract.methods.inicioPermanencia().call().then(response => {
                consulta.inicioPermanencia = response
            })
            contract.methods.fimPermanencia().call().then(response => {
                consulta.fimPermanencia = response
            })
            contract.methods.evolucoes().call().then(response => {
                consulta.evolucoes = response
            })

            // push to consultas list
            this.consultas.push(consulta)
            console.log(this.consultas)
        },
        getAllContractsFromEthereum() {
            this.hashConsultas.forEach((consulta) => {
                this.getContract(consulta)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.consulta {
    border: 1px solid transparent;
    border-radius: 10px;
    width: 100%;
    height: auto;
    box-shadow: 0px 1px 12px lightgray;
    padding: 20px;
    font-size: .8em;
    margin-top: 10px;

    .info {
        display: inline-block;
        margin: 5px 10px;

        label {
            margin-right: 10px;
        }
    }
}
</style>

