<template>
    <div class="doctor-page">
        <Navbar/>
        <vue2-sidebar :links="links">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <b-form>
                            <h4>Dados do paciente</h4>
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
                </b-row>
                <b-row>
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
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-button variant="success" v-on:click="deployConsulta">Finalizar consulta</b-button>
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
import { setTimeout } from 'timers';

// contract consulta compiled
var consultaInterface = {"bytecode": "608060405234801561001057600080fd5b50604051610b27380380610b27833981016040908152815160208084015192840151606085015160808601519386018051909695860195929491830193919092019161006291600091908801906100ae565b5083516100769060019060208701906100ae565b506002839055815161008f9060049060208501906100ae565b5080516100a39060059060208401906100ae565b505050505050610149565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ef57805160ff191683800117855561011c565b8280016001018555821561011c579182015b8281111561011c578251825591602001919060010190610101565b5061012892915061012c565b5090565b61014691905b808211156101285760008155600101610132565b90565b6109cf806101586000396000f3006080604052600436106100a35763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663337c808d81146100a85780634f8612bc14610132578063601845fa14610147578063717eecff146101e257806385a093f9146102b7578063af640d0f146102cc578063badfcc15146102f3578063c37d9aad14610308578063c9abee7114610361578063f1077be9146103fa575b600080fd5b3480156100b457600080fd5b506100bd61040f565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f75781810151838201526020016100df565b50505050905090810190601f1680156101245780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013e57600080fd5b506100bd61049c565b34801561015357600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101e094369492936024939284019190819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a99988101979196509182019450925082915084018382808284375094975050933594506104f79350505050565b005b3480156101ee57600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101e094369492936024939284019190819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a99988101979196509182019450925082915084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a9998810197919650918201945092508291508401838280828437509497506106049650505050505050565b3480156102c357600080fd5b506100bd610770565b3480156102d857600080fd5b506102e16107cb565b60408051918252519081900360200190f35b3480156102ff57600080fd5b506100bd6107d1565b34801561031457600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101e094369492936024939284019190819084018382808284375094975061082c9650505050505050565b34801561036d57600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101e094369492936024939284019190819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a99988101979196509182019450925082915084018382808284375094975050933594506108439350505050565b34801561040657600080fd5b506100bd6108ad565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104945780601f1061046957610100808354040283529160200191610494565b820191906000526020600020905b81548152906001019060200180831161047757829003601f168201915b505050505081565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104945780601f1061046957610100808354040283529160200191610494565b7f456d44a5cb0b7e4fb41af44c401afa20402a651b474ae973ca11bbd0be4935e0838383604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b8381101561056257818101518382015260200161054a565b50505050905090810190601f16801561058f5780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b838110156105c25781810151838201526020016105aa565b50505050905090810190601f1680156105ef5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1505050565b7ffdde9b27bf7ae5049a0006510188199ccc49387f80f69341b330b322cdd3508783838360405180806020018060200180602001848103845287818151815260200191508051906020019080838360005b8381101561066d578181015183820152602001610655565b50505050905090810190601f16801561069a5780820380516001836020036101000a031916815260200191505b50848103835286518152865160209182019188019080838360005b838110156106cd5781810151838201526020016106b5565b50505050905090810190601f1680156106fa5780820380516001836020036101000a031916815260200191505b50848103825285518152855160209182019187019080838360005b8381101561072d578181015183820152602001610715565b50505050905090810190601f16801561075a5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a1505050565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104945780601f1061046957610100808354040283529160200191610494565b60025481565b6004805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104945780601f1061046957610100808354040283529160200191610494565b805161083f906003906020840190610908565b5050565b7fc7da0f86c2ed644f32703e4bc0415beda415fe134fe0f68e8b171a7855f54fed838383604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360008381101561056257818101518382015260200161054a565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104945780601f1061046957610100808354040283529160200191610494565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061094957805160ff1916838001178555610976565b82800160010185558215610976579182015b8281111561097657825182559160200191906001019061095b565b50610982929150610986565b5090565b6109a091905b80821115610982576000815560010161098c565b905600a165627a7a72305820105515beaa0ac16b5088a530524d5df86e485ad94b0a5bd68c89f8c31e1163850029","interface":"[{\"constant\":true,\"inputs\":[],\"name\":\"profissional\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"evolucoes\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"med\",\"type\":\"string\"},{\"name\":\"pol\",\"type\":\"string\"},{\"name\":\"tempo\",\"type\":\"int256\"}],\"name\":\"solicitaMedicamento\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"periodoAfastamento\",\"type\":\"string\"},{\"name\":\"justificativa\",\"type\":\"string\"},{\"name\":\"cid\",\"type\":\"string\"}],\"name\":\"solicitaRepouso\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"fimPermanencia\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"id\",\"outputs\":[{\"name\":\"\",\"type\":\"int256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"inicioPermanencia\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"anotacoes\",\"type\":\"string\"}],\"name\":\"registraConsulta\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"nome\",\"type\":\"string\"},{\"name\":\"obs\",\"type\":\"string\"},{\"name\":\"ident\",\"type\":\"int256\"}],\"name\":\"solicitaExame\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"paciente\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"pac\",\"type\":\"string\"},{\"name\":\"prof\",\"type\":\"string\"},{\"name\":\"idCon\",\"type\":\"int256\"},{\"name\":\"inicio\",\"type\":\"string\"},{\"name\":\"fim\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"medicamento\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"posologia\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"prazo\",\"type\":\"int256\"}],\"name\":\"Instrucoes\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"nomeExame\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"observacao\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"idExame\",\"type\":\"int256\"}],\"name\":\"Exame\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"periodoAfastamento\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"justificativa\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"cid\",\"type\":\"string\"}],\"name\":\"Repouso\",\"type\":\"event\"}]"}

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
        Navbar
    },
    data () {
        return {
            links: links,
            consulta: consulta,
            medicamento: medicamento,
            repouso: repouso,
            exame: exame,
            options: options
        }
    },
    methods: {
        deployConsulta() {
            var deployMedicamento = this.medicamento.nome != null;
            var deployRepouso = this.repouso.periodo > 0;
            var deployExame = this.exame.nome != null;
            var contract = new web3.eth.Contract(JSON.parse(consultaInterface.interface), '0x1E981162720362a0fEc5Cd4bfC95e1b89c3f1214')

            if (deployRepouso && this.repouso.cid == null) {
                alert('Repouso definido sem CID, selecione o CID para finalizar a consulta!')
                return
            }
            
            contract.deploy({
                data: '0x'+consultaInterface.bytecode,
                arguments: [consulta.paciente, consulta.profissional, consulta.id, consulta.dataInicio, consulta.dataFim]
            })
            .send({from: account})
            .then(contractInstance => {
                console.log("Contract deployed at: " + contractInstance.options.address)

                var nonce = 0

                web3.eth.getTransactionCount(account).then(nounce => {
                    nonce = nounce

                    if (deployRepouso) {
                        contractInstance.methods.solicitaRepouso(this.repouso.periodo, this.repouso.justificativa, this.repouso.cid)
                            .send({from: account, nonce: nonce + 1})
                            .then(response => {
                                console.log(response + " aaaaa")
                        })
                    }

                    setTimeout(console.log('delay'), 1000)

                    if (deployMedicamento) {
                        contractInstance.methods.solicitaMedicamento(this.medicamento.nome, this.medicamento.posologia, this.medicamento.prazo)
                            .send({from: account, nonce: nonce + 2})
                            .then(response => {
                                console.log(response)
                            })
                    }

                    if (deployExame) {   
                        contractInstance.methods.solicitaExame(this.exame.nome, this.exame.observacao, this.exame.id)
                            .send({from: account, nonce: nonce + 3})
                            .then(response => {
                                console.log(response)
                            })
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

