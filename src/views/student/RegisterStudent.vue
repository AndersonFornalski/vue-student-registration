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
                          :rules="[v => !!v || 'RA obrigatorio',                                   
                                   v => v.length >= 5 || 'RA nao pode ser menor que 5 ']"
                          required  
                                                    
                          >
                          {{ student.ra }}
                   </v-text-field> 
   
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field 
                          v-model="student.name" 
                          label="NOME" 
                          :rules="[v => !!v || 'Nome is required',
                                   v => v.length <= 40 || 'Nome nao pode ser maior que 40 caracters',
                                   v => v.length >= 5 || 'Nome nao pode ser menor que 5 caracters']"
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
                            :rules="[v => !!v || 'E-mail e obrigatorio',
                                   v => /.+@.+\..+/.test(v) || 'E-mail nao e valido']"
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
                            :rules="[v => !!v || 'CPF e obrigatorio',
                                     v => v.length >= 14 || 'CPF nao pode ser menor que 14 caracters']"
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
            <v-btn @click="clear()" color="blue-grey" dark>Clear</v-btn>
            <v-btn @click="saveStudent()" type="submit" color="orange" :disabled="!valid" >Save</v-btn>
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
            Swal.fire('Aluno Cadastrado!', '', 'success')             
            this.clear();
          })
          .catch(error => {
            if(error){
              Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'RA ja existe nao pode salvar, por favor tente outro RA!' 
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