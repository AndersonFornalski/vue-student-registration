<template>
<div>
   <v-card 
       class="mx-auto mt-5" 
       color="transparent" 
       max-width="1150" 
       elevation="0">

    <router-link to="/registro" style="text-decoration: none">
      <v-btn           
        class="mx-10" 
        fab dark color="#E040FB">
            <v-icon dark>mdi-plus</v-icon>            
      </v-btn>
    </router-link>  
      <v-card-title>
        <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="pesquise aqui..."
            single-line
            hide-details
          ></v-text-field>
    </v-card-title>
    
      <v-data-table 
          :headers="headers"
          :items="students"
          :search="search"
          :items-per-page="5"
          class="elevation-4"
         
        >
      <template v-slot:[`item.acoes`]="{ item }">
        <v-btn 
         class="deep-purple" 
         dark small fab  
         @click="formEdit(
                 item.id, 
                 item.name, 
                 item.email)"
                   ><v-icon>mdi-pencil</v-icon>
        </v-btn> 

         <v-btn 
           class="error" 
           fab dark small 
           @click="remove(item.id)">
               <v-icon>mdi-delete</v-icon>
          </v-btn>
          </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="600">        
        <v-card>
          <v-card-title class="purple darken-4 white--text">EDITAR ALUNO</v-card-title>    
          <v-card-text>            
            <v-form  v-model="valid" >             
              <v-container>
                <v-row>
                  <input v-model="students.id" hidden />
                    <v-col cols="12" md="6">
                      <v-text-field 
                        v-model="students.name" 
                        label="NOME"
                        :rules="[v => !!v || 'Nome é obrigatório',
                                  v => v.length <= 40 || 'Nome não pode ser maior que 40 caracters',
                                  v => v.length >= 5 || 'Nome não pode ser menor que 5 caracters']"
                                  :counter="40"                           
                        required                              
                        >{{ students.name }}                        
                      </v-text-field>                   
                    </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field 
                        v-model="students.email" 
                        label="E-mail"
                        :rules="[v => !!v || 'E-mail é obrigatório',
                                 v => /.+@.+\..+/.test(v) || 'E-mail não e válido']"
                        required
                         >{{ students.email }}                         
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>            
          </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click=" dialog = false" 
                   class="white--text" 
                   color="blue-grey" 
                   >Cancelar</v-btn>

            <v-btn @click="saveStudent()" 
                   type="submit" 
                   class="white--text" 
                   color="orange" 
                   :disabled="!valid" 
                   >Salvar Aluno</v-btn>
          </v-card-actions>       
        </v-card>
      </v-dialog>
    </v-card>         
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from 'sweetalert2';
  import { Api } from '../../config/api';
   
  export default {      
    data(){
      return {
         valid: false,
         search: '',
         students:[],
         dialog: false,
         operation: '',
         headers: [
              { text: "RA", 
                    value: "ra", 
                    sortable: false, 
                    align: "start", 
                    class:"purple darken-3 white--text text-center font-weight-black" },

              { text: "NOME", 
                    value: "name", 
                    sortable: false,  
                    align: "start", 
                    class:"purple darken-3 white--text text-center font-weight-black" },

              { text: "E-MAIL", 
                    value: "email", 
                    sortable: false,  
                    align: "start", 
                    class:"purple darken-3 white--text text-center font-weight-black" },

              { text: "CPF", 
                    value: "cpf", 
                    sortable: false,  
                    align: "start", 
                    class:"purple darken-3 white--text text-center font-weight-black" },

              { text: "AÇÕES", 
                    value: "acoes", 
                    sortable: false,  
                    align: "start", 
                    class:"purple darken-3 white--text text-center font-weight-black"},
            ],            
        }
    },
  
    created(){
       this.listStudents();    
      },

      methods:{
        
        listStudents(){
            axios.get( Api )
              .then(response => {
                this.students = response.data
                console.log(this.students)  
              }).catch((error) => {
                console.log(error)
              })   
        },
       
        edit(){
            let parameter = {
                    name: this.students.name, 
                    email: this.students.email, 
                  };                                  
                 axios.put( `${Api}/${this.students.id}`, parameter )                             
                  .then(response => {                                
                     this.listStudents();
                  })                
                  .catch(error => {
                      console.log(error);            
                  });
            },
        
        saveStudent(){
              if(this.operation == 'edit'){ 
                this.edit(); 
                Swal.fire('Aluno Editado!', '', 'success')                          
              }
              this.dialog=false;                        
            }, 
       
        formEdit(id, name, email){   
              this.students.id = id;   
              this.students.name = name;                            
              this.students.email = email;                            
              this.dialog = true;                            
              this.operation='edit';
            },

        remove(id){
             Swal.fire({
                title: 'Tem certeza que deseja excluir esse aluno?',   
                confirmButtonText: `Confirmar`,                  
                showCancelButton: true,  
                cancelButtonText: `Cancelar`,                        
              }).then((result) => {                
                if (result.isConfirmed) {      
                      axios.delete( `${Api}/${id}`)
                      .then(response => {           
                          this.listStudents();
                       });      
                      Swal.fire('Aluno Excluído!', '', 'success')
                  } else if (result.isDenied) {                  
                }
              });              
            },
      }
  }
</script>
