<template>    

 <v-card class="pa-10">
  <v-card-title class="purple darken-3 white--text">CADASTRO DE ALUNO</v-card-title>    
    <v-card-text> 
       <v-form v-model="valid">             
          <v-container>
            <v-row>
              <input v-model="student.id" hidden />
                 <v-col cols="12" md="4">
                    <v-text-field 
                          v-model="student.ra" 
                          type="Number"
                          label="RA"
                          :rules="[v => !!v || 'RA é obrigatório',                                   
                                   v => v.length >= 5 || 'RA não pode ser menor que 5 ']"
                          required  
                                                    
                          >
                          {{ student.ra }}
                   </v-text-field>    
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field 
                          v-model="student.name" 
                          label="NOME" 
                          :rules="[v => !!v || 'Nome é Obrigatório',
                                   v => v.length <= 40 || 'Nome não pode ser maior que 40 caracters',
                                   v => v.length >= 5 || 'Nome não pode ser menor que 5 caracters']"
                                   :counter="40"                           
                          required
                          > 
                          {{ student.name }} 
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field 
                            v-model="student.email" 
                            label="EMAIL"
                            :rules="[v => !!v || 'E-mail é obrigatório',
                                   v => /.+@.+\..+/.test(v) || 'E-mail não é vélido']"
                            required
                             > 
                            {{ student.email }} 
                   </v-text-field>
                  </v-col>

                   <v-col cols="12" md="4">
                    <v-text-field 
                            v-model="student.cpf" 
                            label="CPF"
                            v-mask="'###.###.###-##'"
                            :rules="[v => !!v || 'CPF é obrigatório',
                                     v => v.length >= 14 || 'CPF não pode ser menor que 14 caracters']"
                                     :counter="14"
                            required
                             > 
                            {{ student.cpf }} 
                   </v-text-field>
                  </v-col>

                  
                </v-row>
              </v-container>            
          </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="clear()" color="blue-grey"  class="white--text">Limpar Campos</v-btn>
            <v-btn @click="saveStudent()" type="submit" color="orange" class="white--text" :disabled="!valid" >Salvar Aluno</v-btn>
          </v-card-actions>

        </v-card>
</template>

<script>
  import axios from "axios";
  import Swal from 'sweetalert2';
  import { Api } from '../../config/api';

  export default {
    data(){
      return {
        valid: false,
        student:{
            ra:'',
            name:'',
            email:'',
            cpf:''
          },
        }
      },
    
    methods: {

     saveStudent(){
       let parameter = {
           ra: this.student.ra, 
           name: this.student.name, 
           email: this.student.email, 
           cpf: this.student.cpf, 
         };                
       axios.post( Api, parameter)
       .then(response =>{
         Swal.fire('Aluno Cadastrado Com Sucesso!', '', 'success')             
         this.clear();
       })
       .catch(error => {
         if(error){
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'RA já existe não pode salvar, por favor tente outro RA!' 
           }) 
            }
          });
          },

      clear(){
          this.student.ra = '';
          this.student.name = '';
          this.student.email = '';
          this.student.cpf = '';
      },
    },
  }
</script>